import { useState, useRef, useEffect } from "react";

import Load from "../../../screens/Load";
import Error from "../../../screens/Error.jsx";

import Text from "./Text.jsx";
import Location from "./Location.jsx";

/**
 * @author VAMPETA
 * @brief MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Messages({ socket }) {
	const [error, setError] = useState(false);
	const [messages, setMessages] = useState(null);
	const bottomRef = useRef(null);

	useEffect(() => {
		if (!socket) return;
		socket.emit("open_chat", null, (res) => {
			if (!res || res.error) {
				setError(true);
				return ;
			}
			setMessages(res);
		});
		const handleNewMessage = (newMessage) => setMessages((prev) => ((prev) ? [...prev, newMessage] : [newMessage]));
		const handleUpdateView = ({ wamid, status }) => {
			setMessages((prev) => {
				if (!prev) return (prev);
				return (prev.map((message) => (message.wamid === wamid) ? { ...message, status } : message));
			});
		}
		socket.on("new_message", handleNewMessage);
		socket.on("update_view", handleUpdateView);
		return (() => {
			socket.off("new_message", handleNewMessage);
			socket.off("update_view", handleUpdateView);
		})
	}, [socket]);
	useEffect(() => {
		if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	if (error) return (<Error />);
	if (messages === null) return (<Load />);
	if (messages.length === 0) {
		return (
			<div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
				<i className="bi bi-chat-right-text text-white text-5xl" />
				<p className="text-white">Nenhuma mensagem</p>
			</div>
		);
	}
	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message) => (
				<div key={message.wamid} className={`flex ${(message.direction === "outbound") ? "justify-end" : "justify-start" }`}>
					{message.data.type === "text" && <Text message={message} />}
					{message.data.type === "location" && <Location message={message} />}
				</div>
			))}
			<div ref={bottomRef} />
		</div>
	);
}
