import { useMemo } from "react";
import createSocket from "./config_socket.js";

/**
 * @author VAMPETA
 * @brief HOOK DE USO DO SOCKET.IO
//  * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
//  * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} token TOKEN DE ACESSO
*/
// export function useSocket(idPhone, phone) {
export function useSocket(token) {
	const socket = useMemo(() => {
		// if (!idPhone || !phone) return (null);
		if (!token) return (null);
		// return (createSocket(idPhone, phone));
		return (createSocket(token));
	// }, [idPhone, phone]);
	}, [token]);

	return (socket);
}