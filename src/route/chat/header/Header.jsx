import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { botOnOff, useStateBot } from "./useStateBot.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE COM OPCOES
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Boolean} selected INFORMA SE O DRAWER ESTA ABERTO OU FECHADO
 * @param {Objetc} onClose FUNCAO DE FECHAMENTO DO DROWER
 */
function OptionsDrawer({ socket, selected, onClose }) {				// PAREI AKI
	if (!selected) return (null);
	return (
		<div className="flex fixed text-white inset-0 z-50">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} />
			<div className="ml-auto w-full md:w-[400px] h-full bg-zinc-900 border-l border-zinc-800 p-6 z-1 animate-slideInRight">
				<button className="mb-4 cursor-pointer" onClick={onClose}>
					<i className="bi bi-x text-2xl" />
				</button>
				<div className="flex flex-col gap-6">
					<Link className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-500 text-black hover:text-white hover:bg-zinc-800" to="" onClick={close}>
						<span>Mostrar contato</span>
					</Link>
					<Link className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-500 text-black hover:text-white hover:bg-zinc-800" to="" onClick={close}>
						<span>Bloquear</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Header({ socket }) {
	const navigate = useNavigate();
	const { phone } = useParams();
	const { stateBot, setStateBot } = useStateBot(socket, phone);
	const [selected, setSelected] = useState(false);

	return (
		<>
			<header className="flex justify-around items-center px-4 md:px-10 py-4 border-b border-zinc-800">
				<i className="bi bi-arrow-left cursor-pointer text-4xl text-orange-500" onClick={() => navigate("/chat")} />
				<h1 className="text-lg md:text-xl font-semibold text-orange-500">{phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}</h1>
				{stateBot !== null && <i className={`bi bi-robot cursor-pointer text-4xl ${(stateBot) ? "text-orange-500" : "text-gray-500"}`} onClick={() => botOnOff(socket, phone, setStateBot, !stateBot)} />}
				<i className="bi bi-three-dots-vertical cursor-pointer text-4xl text-orange-500" onClick={() => setSelected(true)} />
			</header>
			{selected && <OptionsDrawer socket={socket} selected={selected} onClose={() => setSelected(null)} />}
		</>
	);
}