import { useState, useRef, useEffect } from "react";

import Load from "../../../screens/Load";
import Error from "../../../screens/Error.jsx";

import FooterMessage from "./FooterMessage.jsx";
import Context from "./context/Context.jsx";
import Text from "./Text.jsx";
import Location from "./Location.jsx";
import Reaction from "./Reaction.jsx";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DE QUANDO CHEGA NOVA MENSAGEM
 * @param {Object} setMessages DEFINE O VALOR DE messages
*/
function handleNewMessage(setMessages) {
	return ((newMessage) => setMessages((prev) => ((prev) ? [...prev, newMessage] : [newMessage])));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DE QUANDO CHEGA NOVA VISUALIZACAO DE MENSAGEM
 * @param {Object} setMessages DEFINE O VALOR DE messages
*/
function handleUpdateView(setMessages) {
	return (({ wamid, status }) => {
		setMessages((prev) => {
			if (!prev) return (prev);
			return (prev.map((message) => (message.wamid === wamid) ? { ...message, status } : message));
		});
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DE QUANDO CHEGA NOVA REACAO DE MENSAGEM
 * @param {Object} setMessages DEFINE O VALOR DE messages
*/
function handleNewReact(setMessages) {
	return (({ wamid, react }) => {
		setMessages((prev) => {
			if (!prev) return (prev);
			return (prev.map((message) => (message.wamid === wamid) ? { ...message, react } : message));
		});
	});
}

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
export default function Messages({ socket }) {					// TESTANDO
	const [error, setError] = useState(false);
	const [messages, setMessages] = useState(null);
	const bottomRef = useRef(null);

	useEffect(() => {
		if (!socket) return;
		socket.emit("open_chat", null, (res) => {
			if (!res || res.error) {
				setError(true);
				return ;
			}
			setMessages(res);
		});
		const onNewMessage = handleNewMessage(setMessages);
		const onUpdateView = handleUpdateView(setMessages);
		const onNewReact = handleNewReact(setMessages);
		socket.on("new_message", onNewMessage);
		socket.on("update_view", onUpdateView);
		socket.on("new_react", onNewReact);
		return (() => {
			socket.off("new_message", onNewMessage);
			socket.off("update_view", onUpdateView);
			socket.off("new_react", onNewReact);
		})
	}, [socket]);
	useEffect(() => {
		if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

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
		<div className="flex-1 overflow-y-auto scroll-smooth">
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