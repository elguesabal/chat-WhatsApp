import { io } from "socket.io-client";

// export default io("http://localhost:3000", {
// 	autoConnect: false,
// 	auth: {
// 		idPhone: "871876402681006",
// 		phone: "5521971178764"
// 	}
// });

/**
 * @author VAMPETA
 * @brief CRIA O SOCKET COM OS PARAMETROS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @return {Object} RETORNA O SOCKET CRIADO
*/
export default function createSocket(idPhone, phone) {
	return (io("http://localhost:3000", {
		autoConnect: false,
		auth: {
			idPhone: idPhone,
			phone: phone
		}
	}));
}