import { Link } from "react-router-dom";

import { useLoadChats } from "./useLoadChats.js";
import { useScroll } from "./useScroll.js";
import { useChatsRealTime } from "./useChatsRealtime.jsx";

import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} chat INFORMACOES GERAIS SOBRE O CHAT
*/
async function updateHumanViewed(socket, chat) {
	if (chat.lastMessage.humanViewed) return ;
	socket.emit("chats:update_human_viewed", { phone: chat.phone }, (res) => {});
}

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
 * @param {String} type TIPO DA MENSAGEM
*/
function TypeMessage({ type }) {
	switch (type) {
		case "audio":
			return (<i className="bi bi-mic-fill mr-2 text-orange-400" />);
		case "image":
			return (<i className="bi bi-image mr-2 text-orange-400" />);
		case "video":
			return (<i className="bi bi-film mr-2 text-orange-400" />);
		case "location":
			return (<i className="bi bi-geo-alt-fill mr-2 text-orange-500" />);
		case "contacts":
			return (<i className="bi bi-person-vcard mr-2 text-orange-400" />);
		case "document":
			return (<i className="bi bi-file-earmark-text mr-2 text-orange-400" />);
		case "list":
			return (<i className="bi bi-list-ul mr-2 text-orange-400" />);
		case "button":
			return (<i className="bi bi-list-ul mr-2 text-orange-400" />);
		default:
			return (null);
	}
}

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Contact({ socket }) {
	const { chats, setChats, error, loadMore, hasMore, loadingMore } = useLoadChats(socket);
	const { containerRef, handleScroll } = useScroll({ hasMore, loadingMore, loadMore });

	useChatsRealTime(socket, setChats);
	if (error) return (<Error />);
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
		<div className="flex-1 overflow-y-auto animate-toastIn" ref={containerRef} onScroll={handleScroll}>
			{chats.map((chat) => (
				<Link className={`flex justify-center w-full h-20 my-3 px-6 ${(!chat.lastMessage.humanViewed) ? "bg-gray-600" : "bg-gray-800"} text-white flex flex-col hover:bg-orange-400 transition`} key={chat.phone} to={`/chat/${chat.phone}`} onClick={() => updateHumanViewed(socket, chat)}>
					<div className="flex justify-between">
						<p>{chat.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}</p>
						{!chat.lastMessage.humanViewed && <i className="bi bi-chat-left-dots" />}
					</div>
					<div className="flex justify-between items-center">
						<p className="truncate flex-1">
							<TypeMessage type={chat.lastMessage.type} />
							{chat.lastMessage.text}
						</p>
						<span className="ml-2 shrink-0 text-xs text-gray-400">{formatDate(chat.lastMessage.timestamp)}</span>
					</div>
				</Link>
			))}
			{loadingMore && (
				<div className="flex items-center justify-center my-4">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
				</div>
			)}
		</div>
	);
}