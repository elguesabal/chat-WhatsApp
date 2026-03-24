import { useParams, useNavigate } from "react-router-dom";

import { botOnOff, useStateBot } from "./useStateBot.js";

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Header({ socket }) {
	const navigate = useNavigate();
	const { phone } = useParams();
	const { stateBot, setStateBot } = useStateBot(socket, phone);

	return (
		<header className="flex justify-around items-center px-4 md:px-6 py-4 border-b border-zinc-800">
	 		<i className="bi bi-arrow-left cursor-pointer text-4xl text-orange-500" onClick={() => navigate(-1)} />
			<h1 className="text-lg md:text-xl font-semibold text-orange-500">{phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}</h1>
	 		{stateBot !== null && <i className={`bi bi-robot cursor-pointer text-4xl ${(stateBot) ? "text-orange-500" : "text-gray-500"}`} onClick={() => botOnOff(socket, phone, setStateBot, !stateBot)} />}
		</header>
	);
}