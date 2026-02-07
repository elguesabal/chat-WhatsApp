import Visualization from "./visualization.jsx";

/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE TEXTO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
export default function Text({ message }) {
	return (
		<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">
			{formattedText(message.data.text.body)}
			<div className="flex items-center justify-end mt-1">
				<span className="text-xs text-gray-700">{formatDate(message.timestamp)}</span>
				{message.status && <Visualization status={message.status} />}
			</div>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief PERCORRE O TEXTO BRUTO PARA INTERPRETAR MARCACAO DE TEXTO COMO NEGRITO E ITALICO
 * @param {String} text TEXTO A SER ANALIZADO
 * @return {Array<String>} RETORNA UM ARRAY PRONTO PARA SER RENDERIZADO
*/
function formattedText(text) {
	const patterns = [
		{ regex: /`([^`]+)`/g, type: "code" },
		{ regex: /\*([^*]+)\*/g, type: "bold" },
		{ regex: /_([^_]+)_/g, type: "italic" },
		{ regex: /~([^~]+)~/g, type: "strike" },
	];
	let parts = [text];

	patterns.forEach(({ regex, type }) => {
		const newParts = [];
		parts.forEach((part, index) => {
			if (typeof part !== "string") {
				newParts.push(part);
				return;
			}
			regex.lastIndex = 0; 
			let lastIndex = 0;
			let match;
			while ((match = regex.exec(part)) !== null) {
				if (match.index > lastIndex) newParts.push(part.slice(lastIndex, match.index));
				const content = match[1];
				let node;
				switch (type) {
					case "code":
						node = (<code key={`${type}-${index}-${match.index}`} className="bg-gray-300 px-1 rounded font-mono text-sm">{content}</code>);
						break;
					case "bold":
						node = (<strong key={`${type}-${index}-${match.index}`}>{content}</strong>);
						break;
					case "italic":
						node = (<em key={`${type}-${index}-${match.index}`}>{content}</em>);
						break;
					case "strike":
						node = (<del key={`${type}-${index}-${match.index}`}>{content}</del>);
						break;
					default:
						node = content;
				}
				newParts.push(node);
				lastIndex = match.index + match[0].length;
			}
			if (lastIndex < part.length) newParts.push(part.slice(lastIndex));
		});
		parts = newParts;
	});
	return (parts);
}

/**
 * @author VAMPETA
 * @brief CONVERTE A DATA TIMESTAMP PARA STRING NO FORMATO "dd/mm/aaaa hh:mm"
 * @param {String} timestamp DATA A SER CONVERTIDA
 * @return {String} DATA E HORA FORMATADA
*/
function formatDate(timestamp) {
	return new Date(timestamp).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
}
