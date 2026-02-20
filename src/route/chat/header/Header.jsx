import { useState, useEffect } from "react";

async function botOnOff(socket, setStateBot, stateBot) {
	if (!socket) return ;
	socket.emit("config:bot:on_off", { stateBot: stateBot }, (res) => {
		setStateBot(res);
	});
}

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Header({ socket }) {
	const [stateBot, setStateBot] = useState(null);

	useEffect(() => {
		botOnOff(socket, setStateBot);
	}, [socket]);

	return (
		<div className="flex items-center justify-evenly h-14 bg-gray-900 shrink-0">
			<div className="flex items-center">
				<img src="/logo.png" className="w-8 h-8 object-contain" />
				<span className="text-white">{socket.auth.phone}</span>
			</div>
			{stateBot !== null && <i className={`bi bi-robot cursor-pointer text-4xl ${(stateBot) ? "text-orange-500" : "text-gray-500"}`} onClick={() => botOnOff(socket, setStateBot, !stateBot)} />}
		</div>
	);
}