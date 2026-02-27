import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK CRIADO PARA CARREGAR AS MENSAGENS PREDEFINIDAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useQuickMessages(socket) {
	const [messages, setMessages] = useState(null);

	useEffect(() => {
		socket.emit("messages:quick_messages", { }, (res) => {
			setMessages(res);
		});
	}, [socket]);
	return ({ messages, setMessages });
}