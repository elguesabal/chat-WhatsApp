import FooterMessage from "./FooterMessage.jsx";
import { memo, useMemo } from "react";

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

// /**
//  * @author VAMPETA
//  * @brief RENDERIZA MENSAGEM DE TEXTO
//  * @param {Object} message MENSAGEM A SER RENDERIZADA
// */
// export default function Text({ message }) {
// console.log("renderizou");
// 	return (
// 		<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">
// 			{formattedText(message.data.text.body)}
// 			<FooterMessage message={message} />
// 		</div>
// 	);
// }


/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE TEXTO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
const Text = memo(function Text({ message }) {
console.log("renderizou");
	const text = useMemo(() => formattedText(message.data.text.body), [message.data.text.body]);
	return (
		<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[80%] break-words whitespace-pre-wrap">
			{text}
			<FooterMessage message={message} />
		</div>
	);
});

export default Text;