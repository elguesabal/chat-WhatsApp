import { useEffect, useState, useRef, useCallback } from "react";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DE QUANDO CHEGA NOVA MENSAGEM
 * @param {Object} setMessages DEFINE O VALOR DE messages
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
function handleNewMessage(setMessages, phone) {
	return ((newMessage) => {
		if (newMessage.phone !== phone) return ;
		setMessages((prev) => ((prev) ? [...prev, newMessage] : [newMessage]))
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DE QUANDO CHEGA NOVA VISUALIZACAO DE MENSAGEM
 * @param {Object} setMessages DEFINE O VALOR DE messages
 * @param {String} from NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
function handleUpdateView(setMessages, from) {
	return (({ phone, wamid, status }) => {
		if (phone !== from) return ;
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
 * @param {String} from NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
function handleNewReact(setMessages, from) {
	return (({ phone, wamid, react }) => {
		if (phone !== from) return ;
		setMessages((prev) => {
			if (!prev) return (prev);
			return (prev.map((message) => (message.wamid === wamid) ? { ...message, react } : message));
		});
	});
}

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA A CONEXAO DAS MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
export function useChatMessages(socket, phone) {
	const [messages, setMessages] = useState(null);
	const [error, setError] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const cursorRef = useRef(null);

	useEffect(() => {
		if (!socket) return ;
		socket.emit("messages:load_messages", { phone: phone }, (res) => {
			if (!res || res.error) {
				setError(true);
				return ;
			}
			setMessages(res.messages);
			setHasMore(res.hasMore);
			cursorRef.current = res.nextCursor;
		});
		const onNewMessage = handleNewMessage(setMessages, phone);
		const onUpdateView = handleUpdateView(setMessages, phone);
		const onNewReact = handleNewReact(setMessages, phone);
		socket.on("messages:new_message", onNewMessage);
		socket.on("messages:update_view", onUpdateView);
		socket.on("messages:new_react", onNewReact);
		return (() => {
			socket.off("messages:new_message", onNewMessage);
			socket.off("messages:update_view", onUpdateView);
			socket.off("messages:new_react", onNewReact);
		})
	}, [socket]);
	const loadMore = useCallback(() => {
		if (!socket || loadingMore || !hasMore) return ;
		setLoadingMore(true);
		socket.emit("messages:load_messages", { phone: phone, beforeId: cursorRef.current }, (res) => {
			if (!res || res.error || !Array.isArray(res.messages) || res.messages.length === 0) {
				setLoadingMore(false);
				return ;
			}
			setMessages((prev) => [...res.messages, ...(prev ?? [])]);
			setHasMore(res.hasMore);
			cursorRef.current = res.nextCursor;
			setLoadingMore(false);
		});
	}, [socket, loadingMore, hasMore]);
	return ({ messages, error, loadMore, hasMore, loadingMore });
}