/**
 * @author VAMPETA
 * @brief FUNCAO QUE CRIA UMA NOVA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleNew(setMessages, setSelectedMessage, setView) {
	// const newMsg = {
	// 	id: new Date().toISOString(),
	// 	name: "Nova mensagem",
	// 	content: ""
	// };
	// const newMsg = {
	// 	name: "Nova mensagem",
	// 	timestamp: new Date().toISOString(),
	// 	content: ""
	// };
	const newMsgText = {
		name: "Nova mensagem",
		timestamp: new Date().toISOString(),
		message: {
			type: "text",
			text: {
				body: ""
			}
		}
	};

	setMessages((prev) => ([newMsgText, ...prev]));
	setSelectedMessage(newMsgText.timestamp);
	setView("editor");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE SELECIONA UMA MENSAGEM E ABRE O EDITOR
 * @param {String} timestamp IDENTIFICADOR DA MENSAGEM
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleSelect(timestamp, setSelectedMessage, setView) {
	setSelectedMessage(timestamp);
	setView("editor");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA O CAMPO
 * @param {String} name NOVO NOME DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Number} selectedMessage ID DA MENSAGEM ATUALMENTE SELECIONADA
*/
export function handleUpdateName(name, setMessages, selectedMessage) {
	setMessages((prev) => (prev.map((msg) => ((msg.timestamp === selectedMessage) ? { ...msg, name: name } : msg))));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA O CAMPO
 * @param {String} field CAMPO DA MENSAGEM A SER ATUALIZADO
 * @param {String} value VALOR DO CAMPO
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Number} selectedMessage ID DA MENSAGEM ATUALMENTE SELECIONADA
*/
export function handleUpdateFields(field, value, setMessages, selectedMessage) {
	// const type = msg.message.type;

	// setMessages((prev) => (prev.map((msg) => ((msg.timestamp === selectedMessage) ? { ...msg, message: { ...msg.message, [type]: { ...msg.message[type], [field]: value } } } : msg))));

	setMessages((prev) =>
		prev.map((msg) => {
			if (msg.timestamp !== selectedMessage) return (msg);
			const type = msg.message.type;
			return ({
				...msg,
				message: {
					...msg.message,
					[type]: {
						...(msg.message[type] || {}),
						[field]: value
					}
				}
			});
		})
	);
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE APAGA A MENSAGEM
 * @param {String} timestamp IDENTIFICADOR DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleDelete(timestamp, setMessages, setSelectedMessage, setView) {
	setMessages((prev) => (prev.filter((m) => (m.timestamp !== timestamp))));
	setSelectedMessage(null);
	setView("list");
}