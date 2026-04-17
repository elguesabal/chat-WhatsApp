/**
 * @author VAMPETA
 * @brief FUNCAO QUE CRIA UMA NOVA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedId DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleNew(setMessages, setSelectedId, setView) {
	const newMsg = {
		id: new Date().toISOString(),
		name: "Nova mensagem",
		content: ""
	};

	setMessages((prev) => ([newMsg, ...prev]));
	setSelectedId(newMsg.id);
	setView("editor");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE SELECIONA UMA MENSAGEM E ABRE O EDITOR
 * @param {String} id IDENTIFICADOR DA MENSAGEM
 * @param {Function} setSelectedId DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleSelect(id, setSelectedId, setView) {
	setSelectedId(id);
	setView("editor");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA O CAMPO
 * @param {String} field CAMPO DA MENSAGEM A SER ATUALIZADO
 * @param {String} value VALOR DO CAMPO
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Number} selectedId ID DA MENSAGEM ATUALMENTE SELECIONADA
*/
export function handleUpdate(field, value, setMessages, selectedId) {
	setMessages((prev) => (prev.map((msg) => ((msg.id === selectedId) ? { ...msg, [field]: value } : msg))));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE APAGA A MENSAGEM
 * @param {String} id IDENTIFICADOR DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Function} setSelectedId DEFINE QUAL A MENSAGEM ESTA SELECIONADA
 * @param {Function} setView CONTROLA A VISUALIZACAO ATUAL (LISTA OU EDITOR)
*/
export function handleDelete(id, setMessages, setSelectedId, setView) {
	setMessages((prev) => (prev.filter((m) => (m.id !== id))));
	setSelectedId(null);
	setView("list");
}