import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} setStateBot MODIFICADOR DE stateBot
 * @param {Object} stateBot VARIAVEL QUE INDICA SE O BOT ESTA ATIVO
*/
export async function botOnOff(socket, setStateBot, stateBot) {
	if (!socket) return ;
	socket.emit("config:bot:on_off", { stateBot: stateBot }, (res) => {
		setStateBot(res);
	});
}

/**
 * @author VAMPETA
 * @brief HOOK QUE OBTEM O ESTADO DO BOT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useStateBot(socket) {
	const [stateBot, setStateBot] = useState(null);

	useEffect(() => {
		botOnOff(socket, setStateBot);
	}, [socket]);
	return ({ stateBot, setStateBot });
}