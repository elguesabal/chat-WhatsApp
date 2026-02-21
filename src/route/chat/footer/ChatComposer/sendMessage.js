/**
 * @author VAMPETA
 * @brief FUNCAO QUE ENVIA A MENSAGEM PARA O SERVIDOR
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} message MENSAGEM A SER ENVIADA
 * @param {Object} setMessage MODIFICADOR DA VARIAVEL message
 * @param {Object} textareaRef REFERENCIA DA TAG textarea
*/
export function sendText(socket, message, setMessage, textareaRef) {
	if (!message.trim()) return;
	socket.emit("messages:send_text", { text: message });
	setMessage("");
	textareaRef.current.style.height = "auto";
}