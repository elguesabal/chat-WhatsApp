import toast from "react-hot-toast";

/**
 * @author VAMPETA
 * @brief ADICIONA UM CAMPO DE DIGITACAO DE NUMERO
 * @param {Object} setFields FUNCAO QUE MODIFICA fields
*/
export function addField(setFields) {
	setFields((prev) => ([...prev, ""]));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA O CAMPO CADA VEZ QUE UMA NOVA LETRA E INSERIDA
 * @param {Object} setFields FUNCAO QUE MODIFICA fields
 * @param {Object} value NOVO VALOR DO CAMPO
 * @param {Object} index INDEX DO COMPONENTE NO ARRAY DE COMPONENTES
*/
export function updateField(setFields, value, index) {
	setFields((prev) =>(prev.map((item, i) => ((i === index) ? value : item))));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE APAGA UM CAMPO DE DIGITACAO DO NUMERO
 * @param {Object} setFields FUNCAO QUE MODIFICA fields
 * @param {Object} index INDEX DO COMPONENTE NO ARRAY DE COMPONENTES
*/
export function removeField(setFields, index) {
	setFields((prev) => (prev.filter((_, i) => (i !== index))));
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ENVIA OS NOVOS NUMEROS DE REDIRECIONAMENTO PARA O BACK END
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} fields ARRAY COM OS CONTEUDOS DOS CAMPOS DE NUMEROS
*/
export function handleSaveNumbers(socket, fields) {
	const cleanedFields = fields.map((f) => (f.trim())).filter((f) => (f !== ""));

	socket.emit("bot:update_redirect", { numbers: cleanedFields }, (res) => {
		if (res !== 204) return (toast.error("Erro ao salvar!"));
		toast.success("Salvo com sucesso!");
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ENVIA A NOVA MENSAGEM DE REDIRECIONAMENTO PARA O BACK END
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} input TEXTO COM A NOVA MENSAGEM DE REDIRECIONAMENTO
*/
export function handleSaveMessage(socket, input) {
	socket.emit("bot:update_message_redirect", { message: input }, (res) => {
		if (res !== 204) return (toast.error("Erro ao salvar!"));
		toast.success("Salvo com sucesso!");
	});
}