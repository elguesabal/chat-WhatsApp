import { useRef, useEffect } from "react";
import { useChatMessages } from "./useChatMessages.js";
import { useScroll } from "./useScroll.js";

import Load from "../../../screens/Load.jsx";
import Error from "../../../screens/Error.jsx";

import FooterMessage from "./FooterMessage.jsx";
import Context from "./context/Context.jsx";
import Text from "./Text.jsx";
import Location from "./Location.jsx";
import Reaction from "./Reaction.jsx";

/**
 * @author VAMPETA
 * @brief IDENTIFICA O TIPO CERTO DA MENSAGEM
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
function Message({ message }) {
	switch (message.data.type) {
		case "text":
			return (<Text message={message} />);
		case "location":
			return (<Location message={message} />);
		default:
			return (
				<p className="text-red-900"><i>Mensagem do tipo <b>{message.data.type}</b> não suportada</i></p>
			);
	}
}

/**
 * @author VAMPETA
 * @brief MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Messages({ socket }) {
	// const { messages, error } = useChatMessages(socket);
	// const { bottomRef } = useScroll(messages);
const { messages, error, loadMore, hasMore, loadingMore } = useChatMessages(socket);
const { bottomRef } = useScroll(messages);
const containerRef = useRef(null);

useEffect(() => {
	const el = containerRef.current;
	if (!el) return;

	const onScroll = () => {
		if (el.scrollTop === 0 && hasMore && !loadingMore) {
			loadMore();
		}
	};

	el.addEventListener("scroll", onScroll);
	return () => el.removeEventListener("scroll", onScroll);
}, [loadMore, hasMore, loadingMore]);

	if (error) return (<Error />);
	if (messages === null) return (<Load />);
	if (messages.length === 0) {
		return (
			<div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
				<i className="bi bi-chat-right-text text-white text-5xl" />
				<p className="text-white">Nenhuma mensagem</p>
			</div>
		);
	}
	return (
		<div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth">
{loadingMore && (
	<div className="text-center text-gray-400 py-2 text-sm">Carregando mensagens...</div>
)}
			{messages.map((message) => (
				<div key={message.wamid} id={message.wamid} className={`flex ${(message.direction === "outbound") ? "justify-end" : "justify-start" }`}>
					<div className="inline-block relative bg-gray-400 m-4 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">
						{message.context && <Context message={message} phone={socket.auth.phone} />}
						<>
							<Message message={message} />
							<FooterMessage message={message} />
						</>
						{message.react && <Reaction reaction={message.react} />}
					</div>
				</div>
			))}
			<div ref={bottomRef} />
		</div>
	);
}