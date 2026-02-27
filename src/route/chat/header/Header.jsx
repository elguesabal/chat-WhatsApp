import { useParams } from "react-router-dom";

import { botOnOff, useStateBot } from "./useStateBot.js";

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Header({ socket }) {
	const { phone } = useParams();
	const { stateBot, setStateBot } = useStateBot(socket, phone);

	return (
		<div className="flex items-center justify-evenly h-14 bg-gray-900 shrink-0">
			<div className="flex items-center">
				<img src="/logo.png" className="w-8 h-8 object-contain" />
				<span className="text-white">{phone}</span>
			</div>
			{stateBot !== null && <i className={`bi bi-robot cursor-pointer text-4xl ${(stateBot) ? "text-orange-500" : "text-gray-500"}`} onClick={() => botOnOff(socket, phone, setStateBot, !stateBot)} />}
		</div>
	);
}