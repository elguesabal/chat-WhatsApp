import { memo } from "react";

/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE FIGURINHA
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
const Sticker = memo(function Sticker({ message }) {
	const src = (message.direction === "outbound") ? message.data.sticker.link : message.data.sticker.url;

	return (
		<img className="w-28 h-auto object-contain m-1 select-none rounded-xl" src={src} alt="Figurinha" />
	);
});

export default Sticker;