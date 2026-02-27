import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONSULTA O SERVIDOR PARA SABER SE A JANELA DE 24 HORAS DE RESPOSA JA FOI FECHADA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
export function useReplyWindow(socket, phone) {
	const [replyWindow, setReplyWindow] = useState(null);

	useEffect(() => {
		if (!socket) return ;
		socket.emit("messages:reply_window", { phone: phone }, (res) => {
			setReplyWindow(res);
		});
	}, [socket]);
	return ({ replyWindow, setReplyWindow });
}