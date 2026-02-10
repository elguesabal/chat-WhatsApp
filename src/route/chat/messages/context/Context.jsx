/**
 * @author VAMPETA
 * @brief RENDERIZA O CONTEUDO DA MENSAGEM (OU PARTE DELE DEPENDENDO DO TIPO DE MENSAGEM)
 * @param {Object} context MENSAGEM RESPONDIDA
*/
function Text({ context }) {
	return (
		<a href={"#" + context.wamid}>
			<p>{context.data.text.body}</p>
		</a>
	);
}

/**
 * @author VAMPETA
 * @brief RENDERIZA O CONTEUDO DA MENSAGEM (OU PARTE DELE DEPENDENDO DO TIPO DE MENSAGEM)
 * @param {Object} context MENSAGEM RESPONDIDA
*/
function Location({ context }) {
	return (
		<a className="flex items-center gap-1" href={"#" + context.wamid}>
			<i className="bi bi-geo-alt-fill text-red-500 text-sm" />
			<p>{context.data.location.name}</p>
		</a>
	);
}

/**
 * @author VAMPETA
 * @brief RENDERIZA O CONTEXTO DA MENSAGEM CASO FOR UMA RESPOSTA A OUTRA MENSAGEM
 * @param {Object} message MENSAGEM COM O CONTEXTO A SER RENDERIZADO
*/
export default function Context({ message, phone }) {
	return (
		<div className="mb-2 p-2 rounded bg-gray-500 border-l-4 border-orange-400">
			<p className="text-xs text-orange-300 font-semibold">{(message.context.direction === "inbound") ? phone : "Bot"}</p>
			{message.context.data.type === "text" && <Text context={message.context} />}
			{message.context.data.type === "location" && <Location context={message.context} />}
		</div>
	);
}