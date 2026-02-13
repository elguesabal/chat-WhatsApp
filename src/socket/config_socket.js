import { io } from "socket.io-client";

/**
 * @author VAMPETA
 * @brief CRIA O SOCKET COM OS PARAMETROS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @return {Object} RETORNA O SOCKET CRIADO
*/
export default function createSocket(idPhone, phone) {
	// return (io("http://localhost:3000", {
	// return (io("http://192.168.137.1:3000", {
	// return (io("https://gung-twineable-cole.ngrok-free.dev", {
	return (io("https://bot-whatsapp-w8i2.onrender.com", {
		autoConnect: false,
		transports: ["websocket"],
		auth: {
			idPhone: idPhone,
			phone: phone
		}
	}));
}