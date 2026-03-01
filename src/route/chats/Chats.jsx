import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { useSocket } from "../../socket/useSocket.js";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
 * @param navigate FUNCAO DE NAVEGACAO DE ROTA
*/
function logout(navigate) {
	Cookies.remove("phone", { path: "/" });
	Cookies.remove("idPhone", { path: "/" });
	Cookies.remove("token", { path: "/" });
	navigate("/login");
}

function Header() {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between p-4 text-orange-500">
			<div className="text-3xl">Agora Digital</div>
			<div className="text-lg">Conversas</div>
			<i class="bi bi-box-arrow-right text-4xl cursor-pointer" onClick={() => logout(navigate)} />
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
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

	if (!chats) return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white">
			Loading...
		</div>
	);
	return (
		<div className="h-dvh flex flex-col bg-black overflow-hidden">
			<Header />
			<div className="flex flex-col items-center justify-center min-h-screen text-white">
				{chats.map((chat, i) => (
					// <Link className="mt-8 px-6 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition" key={i} to={`/chat/${chat.phone}`}>{chat.phone}</Link>

					<Link className="w-full m-1 px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-orange-400 transition" key={i} to={`/chat/${chat.phone}`}>
						<div>
							{chat.phone}
						</div>
						<div>
							{chat.lastMessage.text}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}