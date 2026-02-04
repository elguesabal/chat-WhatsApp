import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "./socket/socket.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE PRINCIPAL DO CHAT
*/
export default function Chat() {
	const { idPhone, phone } = useParams();
	const socket = useSocket(idPhone, phone);
	const [messages, setMessages] = useState(null);

	useEffect(() => {
		if (!socket) return ;
		socket.connect();
		socket.on("connect_error", (error) => console.log("Erro ao conectar:", error.message));
		socket.on("open_chat", (messages) => setMessages(messages));
		socket.on("new_message", (newMessage) => setMessages((messages) => [...messages, newMessage]));
		return (() => socket.disconnect());
	}, [socket]);

	if (messages === null) return (<>Load</>);
	// return (
	// 	<div className="bg-black">
	// 		{messages.map((message, i) => (
	// 			<div key={i} className={`inline-block bg-gray-400 m-4 px-3 py-2 rounded ${(message.direction === "outbound") ? "text-right" : ""}`}>{message.data.text.body}</div>
	// 		))}
	// 	</div>
	// );
	return (
		<div className="bg-black">
			{messages.map((message, i) => (
				<div key={i} className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"}`}>
					<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[70%] break-words">
						{message.data.text.body}
					</div>
				</div>
			))}
		</div>
	);
}