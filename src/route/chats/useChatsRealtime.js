import { useEffect } from "react";

function handleNewMessage(setChats) {
	return ((newMessage) => {
console.log(newMessage.phone, ":", newMessage.data.text.body)	// PAREI AKI
	});
}

/**
 * @author VAMPETA
 * @brief HOOK QUE ADICIONA OS EVENTOS ON DE WEBSOCKET
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} setChats FUNCAO QUE CONTROLA A VARIAVEL "chats"
 */
export function useChatsRealTime(socket, setChats) {
	useEffect(() => {
		const onNewMessage = handleNewMessage(setChats);
		socket.on("chat:new_message", onNewMessage);
		return (() => {
			socket.off("chat:new_message", onNewMessage);
		})
	}, [socket]);
}