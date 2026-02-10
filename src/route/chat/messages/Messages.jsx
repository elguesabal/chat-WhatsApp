import { useState, useRef, useEffect } from "react";

import Load from "../../../screens/Load";
import Error from "../../../screens/Error.jsx";

import Context from "./context/Context.jsx";
import Text from "./Text.jsx";
import Location from "./Location.jsx";
import Reaction from "./Reaction.jsx";

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
		const handleNewReact = ({ wamid, react }) => {
			setMessages((prev) => {
				if (!prev) return (prev);
				return (prev.map((message) => (message.wamid === wamid) ? { ...message, react } : message));
			});
		};
		socket.on("new_message", handleNewMessage);
		socket.on("update_view", handleUpdateView);
		socket.on("new_react", handleNewReact);
		return (() => {
			socket.off("new_message", handleNewMessage);
			socket.off("update_view", handleUpdateView);
			socket.off("new_react", handleNewReact);
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
		<div className="flex-1 overflow-y-auto scroll-smooth">
			{messages.map((message) => (
				<div key={message.wamid} id={message.wamid} className={`flex ${(message.direction === "outbound") ? "justify-end" : "justify-start" }`}>
					<div className="inline-block relative bg-gray-400 m-4 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">
						{message.context && <Context message={message} phone={socket.auth.phone} />}
						{message.data.type === "text" && <Text message={message} />}
						{message.data.type === "location" && <Location message={message} />}
						{message.react && <Reaction reaction={message.react} />}
					</div>
				</div>
			))}
			<div ref={bottomRef} />
		</div>
	);
}
