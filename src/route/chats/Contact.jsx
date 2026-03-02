import { Link } from "react-router-dom";

import { useLoadChat } from "./useLoadChats.js";

import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";

/**
 * @author VAMPETA
 * @brief CONVERTE A DATA TIMESTAMP PARA STRING NO FORMATO "dd/mm/aaaa hh:mm"
 * @param {String} timestamp DATA A SER CONVERTIDA
 * @return {String} DATA E HORA FORMATADA
*/
function formatDate(timestamp) {
	if (!timestamp) return ("");
	return (new Date(timestamp).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}));
}

/**
 * @author VAMPETA
 * @brief COMPONENTE QUE VERIFICA O TIPO DA MENSAGEM E RENDERIZA O ICONE CORRETO
 * @param {Object} type TIPO DA MENSAGEM
*/
function TypeMessage({ type }) {
	switch (type) {
		case "text":
			return (<></>);
		case "image":
			return (<i className="bi bi-image mr-2 text-gray-400" />);
		case "video":
			return (<i className="bi bi-film mr-2 text-gray-400" />);
		case "contacts":
			return (<i className="bi bi-person-vcard mr-2 text-gray-400" />);
		case "location":
			return (<i className="bi bi-geo-alt-fill mr-2 text-red-500" />);
		case "":
			return (<></>);
		default:
			return (<></>);
	}
}

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Contact({ socket }) {
	const { chats } = useLoadChat(socket);

	// if (error) return (<Error />);
	if (chats === null) return (<Load />);
	if (chats.length === 0) {
		return (
			<div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
				<i className="bi bi-chat-right-text text-white text-5xl" />
				<p className="text-white">Nenhum histórico de conversa</p>
			</div>
		);
	}
	return (
		<div className="flex-1 overflow-y-auto">
			{chats.map((chat, i) => (
				<Link className="w-full my-3 px-6 py-2 bg-gray-800 text-white flex flex-col hover:bg-orange-400 transition" key={i} to={`/chat/${chat.phone}`}>
					<div>{chat.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}</div>
					<div className="flex justify-between items-center">
						<p className="truncate flex-1">
							<TypeMessage type={chat.lastMessage.type} />
							{chat.lastMessage.text}
						</p>
						<span className="ml-2 shrink-0 bg-red-5000 text-xs text-gray-400">{formatDate(chat.lastMessage.timestamp)}</span>
					</div>
				</Link>
			))}
		</div>
	);
}