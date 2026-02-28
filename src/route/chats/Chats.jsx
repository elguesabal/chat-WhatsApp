import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSocket } from "../../socket/useSocket.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL POR LOGAR
 * @param phone LOGIN DO USUARIO
 * @param password SENHA DO USUARIO
*/
export default function Chats() {
	const [chats, setChats] = useState(null);
	const { socket, connected, error } = useSocket();

	useEffect(() => {
		if (!socket) return ;
		socket.emit("chats:load_chats", {}, (res) => {
			if (!res || res.error) return ;
			setChats(res);
		});
	}, [socket]);

	if (!chats) return (<></>);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			<p>Chats</p>
			{chats.map((chat, i) => (<Link className="mt-8 px-6 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition" key={i} to={`/chat/${chat.phone}`}>{chat.phone}</Link>))}
		</div>
	);
}