/**
 * @author VAMPETA
 * @brief FUNCAO QUE CRIA UMA NOVA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleNew(setMessages, setSelectedMessage, setView) {
	const newMsgText = {
		name: "Nova mensagem",
		id: "new message",
		message: {
			type: "text",
			text: {
				body: ""
			}
		}
	};

	setMessages((prev) => ([newMsgText, ...prev]));
	setSelectedMessage(newMsgText.id);
	setView("editor");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE SELECIONA UMA MENSAGEM E ABRE O EDITOR
 * @param {String} id IDENTIFICADOR DA MENSAGEM
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleSelect(id, setSelectedMessage, setView) {
	setSelectedMessage(id);
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
	setMessages((prev) => (prev.map((msg) => ((msg.id === selectedMessage) ? { ...msg, name: name } : msg))));
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
	setMessages((prev) =>
		prev.map((msg) => {
			if (msg.id !== selectedMessage) return (msg);
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
 * @param {String} id IDENTIFICADOR DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedMessage DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleDelete(id, setMessages, setSelectedMessage, setView) {
	setMessages((prev) => (prev.filter((m) => (m.id !== id))));
	setSelectedMessage(null);
	setView("list");
}