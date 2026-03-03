import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O LOAD DAS CONVERSAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useLoadChat(socket) {
	const [chats, setChats] = useState(null);

	useEffect(() => {
		if (!socket) return;
		socket.emit("chats:load_chats", {}, (res) => {
			if (!res || res.error) return ;
			setChats(res);
		});
	}, [socket]);
	return ({ chats, setChats });
}





// import { useState, useEffect } from "react";

// /**
//  * @author VAMPETA
//  * @brief HOOK QUE CONTROLA O LOAD DAS CONVERSAS
//  * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
// */
// export function useLoadChat(socket) {
// 	const [chats, setChats] = useState(null);

// 	useEffect(() => {
// 		if (!socket) return;
// 		socket.emit("chats:load_chats", {}, (res) => {
// 			if (!res || res.error) return ;
// 			setChats(res);
// 		});
// 	}, [socket]);
// 	return ({ chats, setChats });
// }










// import { useEffect, useState, useRef, useCallback } from "react";

// export function useLoadChats(socket) {
// 	const [chats, setChats] = useState(null);
// 	const [error, setError] = useState(false);
// 	const [loadingMore, setLoadingMore] = useState(false);
// 	const [hasMore, setHasMore] = useState(true);

// 	const cursorRef = useRef(null);

// 	useEffect(() => {
// 		if (!socket) return;

// 		socket.emit("chat:load_chats", {}, (res) => {
// 			if (!res || res.error) {
// 				setError(true);
// 				return;
// 			}

// 			setChats(res.chats);
// 			setHasMore(res.hasMore);
// 			cursorRef.current = res.nextCursor;
// 		});

// 	}, [socket]);

// 	const loadMore = useCallback(() => {
// 		if (!socket || loadingMore || !hasMore) return;

// 		setLoadingMore(true);

// 		socket.emit("chat:load_chats", {
// 			before: cursorRef.current
// 		}, (res) => {
// 			if (!res || res.error || !res.chats?.length) {
// 				setLoadingMore(false);
// 				return;
// 			}

// 			setChats((prev) => [...(prev ?? []), ...res.chats]);
// 			setHasMore(res.hasMore);
// 			cursorRef.current = res.nextCursor;

// 			setLoadingMore(false);
// 		});

// 	}, [socket, loadingMore, hasMore]);

// 	return { chats, error, loadMore, hasMore, loadingMore };
// }