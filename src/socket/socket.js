import { useMemo } from "react";
import createSocket from "./config_socket.js";

/**
 * @author VAMPETA
 * @brief HOOK DE USO DO SOCKET.IO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
*/
export function useSocket(idPhone, phone) {
	const socket = useMemo(() => {
		if (!idPhone || !phone) return (null);
		return (createSocket(idPhone, phone));
	}, [idPhone, phone]);

	return (socket);
}