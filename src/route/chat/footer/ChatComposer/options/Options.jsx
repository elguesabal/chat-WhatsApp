/**
 * @author VAMPETA
 * @brief FUNCAO QUE ENVIA A MENSAGEM PRONTA PARA O SERVIDOR
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} message MENSAGEM A SER ENVIADA
*/
export function sendReadyText(socket, message) {
	if (!message) return;
	socket.emit("messages:send_text", { text: message });
}

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR EXIBIR O MENU DE OPCOES
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Boolean} options VARIAVEL QUE INDICA SE A ABA DE OPCOES DEVE ESTAR ABERTA
*/
export function Options({ socket, options }) {
	let array = [
		"Olá! 😊 Em que posso te ajudar hoje?",
		"Boa tarde! Aqui é da farmácia, como posso te auxiliar?",
		"Estamos à disposição! Pode me dizer o que você precisa?",
		"Você pode me informar o nome do medicamento, por favor?",
		"Vou verificar a disponibilidade para você, só um momento.",
		"Temos sim! Deseja que eu separe para retirada ou entrega?",
		"No momento estamos sem esse item, mas posso verificar previsão ou sugerir similar.",
		"Fazemos entrega sim! Pode me enviar seu endereço completo?",
		"O prazo de entrega é de aproximadamente X minutos.",
		"A taxa de entrega para sua região é de R$ X.",
		"Vou consultar o valor atualizado para você, só um instante.",
		"Esse medicamento está saindo por R$ X hoje.",
		"Esse medicamento precisa de receita. Você possui?",
		"Pode nos enviar uma foto da receita, por favor?",
		"Nosso horário de funcionamento é de X até X.",
		"Estamos abertos no momento e prontos para te atender!",
		"Infelizmente esse produto está em falta no momento.",
		"Temos uma opção similar, deseja que eu te informe?",
		"Pedido confirmado! Em breve enviaremos mais informações.",
		"Qualquer dúvida, estamos por aqui 😊"
	];

	return (
		<div className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${(options) ? "max-h-90" : "max-h-0"}`}>
			{array.map((message, i) => (
				<div className="flex justify-center my-3 cursor-pointer" key={i} onClick={() => sendReadyText(socket, message)}>
					<div className="inline-block bg-gray-400 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">{message}</div>
				</div>
			))}
		</div>
	);
}