import { useState, useEffect } from "react";

import { useSocket } from "./socket/socket.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE PRINCIPAL DO CHAT
*/
export default function Chat() {
	const socket = useSocket();
	const [messages, setMessages] = useState(null);

	useEffect(() => {
		socket.connect();
		socket.on("connect_error", (error) => console.log("Erro ao conectar:", error.message));
// socket.on("teste", () => console.log("testeeeeeeeeeeeeeeeeeeeeeeeeeeeee"));
		socket.on("messages", (messages) => setMessages(messages));
		socket.on("updateMessages", (newMessage) => setMessages((messages) => [...messages, newMessage]));
		return (() => socket.disconnect());
	}, [socket]);

	if (messages === null) return (<>Load</>);
	return (
		<div className="bg-gray-500">
			{messages.map((message, i) => (
				<p key={i}>{message.data.text.body}</p>
			))}
		</div>
	);
}