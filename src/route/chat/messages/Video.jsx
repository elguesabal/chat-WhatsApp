import { memo, useState } from "react";
import { useInView } from "react-intersection-observer";

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
		{ regex: /~([^~]+)~/g, type: "strike" }
	];
	let parts = [text];

	patterns.forEach(({ regex, type }) => {
		const newParts = [];
		parts.forEach((part, index) => {
			if (typeof part !== "string") {
				newParts.push(part);
				return ;
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
 * @brief MENSAGENS DE VIDEO DO CHAT
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
const Video = memo(function Video({ message }) {
	const [videoError, setVideoError] = useState(false);
	const { ref, inView } = useInView({ triggerOnce: true });
	const src = (message.direction === "outbound") ? message.data.video.link : message.data.video.url;

	return (
		<div ref={ref}>
			{(!videoError && src && inView) ? (
				<video className="w-full h-auto rounded" controls preload="metadata" playsInline src={src} onError={() => setVideoError(true)} />
			) : (
				<div className="flex flex-col items-center p-20 bg-gray-300 rounded">
					<i className="bi bi-image text-4xl" />
					<p>Vídeo não disponível</p>
				</div>
			)}
			{message?.data?.video?.caption && <p>{formattedText(message.data.video.caption)}</p>}
		</div>
	);
});

export default Video;