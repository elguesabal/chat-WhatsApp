import { useEffect, useState, useCallback } from "react";

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
 * @brief HOOK QUE CONTROLA A CONEXAO DAS MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useChatMessages(socket) {
	const [messages, setMessages] = useState(null);
	const [error, setError] = useState(false);
const [loadingMore, setLoadingMore] = useState(false);
const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		if (!socket) return;
		socket.emit("open_chat", null, (res) => {
			if (!res || res.error) {
				setError(true);
				return ;
			}
			setMessages(res);
			if (res.length < 15) setHasMore(false);
		});
		// socket.emit("load_chat", { beforeId: messages?.[0]._id }, (res) => {
		// 	if (!res || res.error) {
		// 		setError(true);
		// 		return ;
		// 	}else if (res.length === 0) {
		// 		// setHasMore(false);
		// 	} else {
		// 		setMessages((prev) => [...res, ...prev]);
		// 	}
		// })
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
	// return ({ messages, error });

	

const loadMore = useCallback(() => {
	if (!socket || !messages || loadingMore || !hasMore) return;

	setLoadingMore(true);

	const oldest = messages[0];

	socket.emit("load_chat", { beforeId: oldest._id }, (res) => {
		if (!res || res.error || res.length === 0) {
			setHasMore(false);
		} else {
			setMessages((prev) => [...res, ...prev]);
		}
		setLoadingMore(false);
	});
}, [socket, messages, loadingMore, hasMore]);

return { messages, error, loadMore, hasMore, loadingMore };
}