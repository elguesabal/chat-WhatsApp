import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONSULTA O SERVIDOR PARA SABER SE A JANELA DE 24 HORAS DE RESPOSA JA FOI FECHADA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useReplyWindow(socket) {
	const [replyWindow, setReplyWindow] = useState(null);

	useEffect(() => {
		if (!socket) return ;
		socket.emit("messages:reply_window", {}, (res) => {
			setReplyWindow(res);
		});
	}, [socket]);
	return ({ replyWindow, setReplyWindow });
}