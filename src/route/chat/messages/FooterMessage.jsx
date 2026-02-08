/**
 * @author VAMPETA
 * @brief CONVERTE A DATA TIMESTAMP PARA STRING NO FORMATO "dd/mm/aaaa hh:mm"
 * @param {String} timestamp DATA A SER CONVERTIDA
 * @return {String} DATA E HORA FORMATADA
*/
function formatDate(timestamp) {
	if (!timestamp) return ("");
	return (new Date(timestamp).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}));
}

/**
 * @author VAMPETA
 * @brief CRIA O ICONE DE STATUS DE VIZUALIZACAO DE MENSAGEM
 * @param {String} status STATUS DE VISUALIZACAO DA MENSAGEM
*/
function Visualization({ status }) {
	if (status === "sending") return (<i className="bi bi-clock ml-2 leading-none text-xs text-gray-700"/>);
	if (status === "sent") return (<i className="bi bi-check ml-2 leading-none text-xl text-gray-700"/>);
	if (status === "delivered") return (<i className="bi bi-check-all ml-2 leading-none text-xl text-gray-700"/>);
	if (status === "read") return (<i className="bi bi-check-all ml-2 leading-none text-xl text-blue-700"/>);
	if (status === "failed") return (<i className="bi bi-exclamation-triangle-fill ml-2 leading-none text-xl text-yellow-500"/>);
	return (<i className="bi bi-x-circle-fill ml-2 leading-none text-xl text-red-500"/>);
}

/**
 * @author VAMPETA
 * @brief COMPONENTE QUE CONTEM DATA HORA DE ENVIO DA MENSAGEM E CASO SEJA UMA MENSAGEM ENVIADA PELO BOT E ADICIONADO O STATUS DE VISUALIZACAO
 * @param {Object} message DADOS DA MENSAGEM
*/
export default function FooterMessage({ message }) {
	return (
		<div className="flex items-center justify-end mt-1">
			<span className="text-xs text-gray-700">{formatDate(message.timestamp)}</span>
			{message.status && <Visualization status={message.status} />}
		</div>
	);
}