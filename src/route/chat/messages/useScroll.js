import { useRef, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O COMPORTAMENTO DO SCROLL
 * @param {Object} messages LISTA DE MENSAGENS
 * @param {Boolean} loadingMore INDICA SE ESTA CARREGANDO HISTORICO
*/
export function useScroll(messages, loadingMore) {		// DEPRECATED
	// const bottomRef = useRef(null);

	// useEffect(() => {
	// 	if (!messages || messages.length === 0) return ;
	// 	if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	// }, [messages]);
	// return ({ bottomRef });



	// const bottomRef = useRef(null);

	// useEffect(() => {
	// 	if (!messages || messages.length === 0) return ;
	// 	if (loadingMore) return ;
	// 	if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	// }, [messages, loadingMore]);
	// return { bottomRef };



	const bottomRef = useRef(null);
	const firstLoadRef = useRef(true);

	useEffect(() => {
		if (!messages || messages.length === 0) return;
		if (loadingMore) return;
		if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: firstLoadRef.current ? "auto" : "smooth" });
		firstLoadRef.current = false;
	}, [messages, loadingMore]);
	return ({ bottomRef });
}