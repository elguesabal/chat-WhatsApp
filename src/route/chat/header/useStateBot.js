import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
 * @param {Object} setStateBot MODIFICADOR DE stateBot
 * @param {Object} stateBot VARIAVEL QUE INDICA SE O BOT ESTA ATIVO
*/
export async function botOnOff(socket, phone, setStateBot, stateBot) {
	if (!socket) return ;
	socket.emit("config:bot:on_off", { phone: phone, stateBot: stateBot }, (res) => {
		setStateBot(res);
	});
}

/**
 * @author VAMPETA
 * @brief HOOK QUE OBTEM O ESTADO DO BOT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} phone NUMERO DO CLIENTE QUE ESTA CONVERSANDO COM O BOT
*/
export function useStateBot(socket, phone) {
	const [stateBot, setStateBot] = useState(null);

	useEffect(() => {
		botOnOff(socket, phone, setStateBot);
	}, [socket]);
	return ({ stateBot, setStateBot });
}