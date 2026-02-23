import { io } from "socket.io-client";
import server from "../server.js";

/**
 * @author VAMPETA
 * @brief CRIA O SOCKET COM OS PARAMETROS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @return {Object} RETORNA O SOCKET CRIADO
*/
export default function createSocket(idPhone, phone) {
	return (io(server, {
		autoConnect: false,
		transports: ["websocket"],
		auth: {
			idPhone: idPhone,
			phone: phone
		}
	}));
}