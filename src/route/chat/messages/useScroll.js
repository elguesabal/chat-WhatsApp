import { useRef, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O COMPORTAMENTO DO SCROLL
 * @param {Object} messages LISTA DE MENSAGENS
*/
export function useScroll(messages) {
	const bottomRef = useRef(null);

	useEffect(() => {
		if (!messages || messages.length === 0) return ;
		if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return ({ bottomRef });
}