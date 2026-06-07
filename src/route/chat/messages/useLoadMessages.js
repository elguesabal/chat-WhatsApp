import { useEffect, useState, useRef, useCallback } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O LOAD DAS MENSAGENS DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
export function useLoadMessages(socket, phone) {
	const [messages, setMessages] = useState(null);
	const [error, setError] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const cursorRef = useRef(null);

	useEffect(() => {
		if (!socket) return ;
		socket.emit("chat:load_messages", { phone: phone }, (res) => {
			if (!res || res.code !== 200 || res.error) return (setError(true));
			setMessages(res.messages);
			setHasMore(res.hasMore);
			cursorRef.current = res.nextCursor;
		});
	}, [socket]);
	const loadMore = useCallback(() => {
		if (!socket || loadingMore || !hasMore) return ;
		setLoadingMore(true);
		socket.emit("chat:load_messages", { phone: phone, beforeId: cursorRef.current }, (res) => {
			if (!res || res.code !== 200 || res.error || !Array.isArray(res.messages) || res.messages.length === 0) return (setLoadingMore(false));
			setMessages((prev) => [...res.messages, ...(prev ?? [])]);
			setHasMore(res.hasMore);
			cursorRef.current = res.nextCursor;
			setLoadingMore(false);
		});
	}, [socket, loadingMore, hasMore]);
	return ({ messages, setMessages, error, loadMore, hasMore, loadingMore });
}