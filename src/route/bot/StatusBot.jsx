import { useState } from "react";

import toast from "react-hot-toast";

/**
 * @author VAMPETA
 * @brief ATUALIZA O STATUS SE O BOT ESTA ATIVADO
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} bot INFORMACOES DO BOT
 * @param {Object} setBot FUNCAO DE CONTROLE DA VARIAVEL bot
*/
function updateStatusBot(socket, bot, setBot) {
	socket.emit("bot:update_status_bot", { status: !bot.activated }, (res) => {
		if ("status" in res) setBot((prev) => ({ ...prev, activated: res.status }));
// console.log(res)
		// if (res !== 204) return (toast.error("Erro ao salvar!"));
		// setBot((prev) => ({ ...prev, activated: !bot.activated }));
		toast.success("Salvo com sucesso!");
	});
}

/**
 * @author VAMPETA
 * @brief COMPONENTE QUE MOSTRA SE O BOT ESTA ATIVADO
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} bot INFORMACOES DO BOT
 * @param {Object} setBot FUNCAO DE CONTROLE DA VARIAVEL bot
*/
export default function StatusBot({ socket, bot, setBot }) {
	// const [status, setStattus] = useState(bot.activated);		// REFATORAR E COMECAR A USAR

	return (
		<div className=" flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-5">
			<div>
				<h2 className="text-lg font-semibold">Status do Bot</h2>
				<p className="text-sm text-zinc-400">Ative ou desative as respostas automáticas da IA no WhatsApp.</p>
			</div>
			<button className="px-4 py-2 rounded-lg bg-orange-500 text-black hover:bg-orange-400 cursor-pointer" onClick={() => updateStatusBot(socket, bot, setBot)}>
				{(bot.activated) ? "Ativo" : "Desativado"}
			</button>
		</div>
	);
}