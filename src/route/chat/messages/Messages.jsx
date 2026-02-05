import { useState, useRef, useEffect } from "react";

import Load from "../../../screens/Load";

import Text from "./Text.jsx";
import Location from "./Location.jsx";

/**
 * @author VAMPETA
 * @brief MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Messages({ socket }) {
	const [messages, setMessages] = useState(null);
	const bottomRef = useRef(null);

	useEffect(() => {
		if (!socket) return;
		socket.emit("open_chat", null, (res) => setMessages(res || []));
		const handleNewMessage = (newMessage) => setMessages((prev) => ((prev) ? [...prev, newMessage] : [newMessage]));
		socket.on("new_message", handleNewMessage);
		return (() => socket.off("new_message", handleNewMessage));
	}, [socket]);
	useEffect(() => {
		if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	if (messages === null) return (<Load />);
	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<div key={i} className={`flex ${(message.direction === "outbound") ? "justify-end" : "justify-start" }`}>
					{message.data.type === "text" && <Text message={message} />}
					{message.data.type === "location" && <Location message={message} />}
				</div>
			))}
			<div ref={bottomRef} />
		</div>
	);
}
