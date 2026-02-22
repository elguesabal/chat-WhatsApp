import { memo } from "react";

/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE LOCALIZACAO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
const Location = memo(function Location({ message }) {
	return (
		<a href={`https://www.google.com/maps?q=${message.data.location.latitude},${message.data.location.longitude}`} target="_blank" rel="noopener noreferrer">
			<div className="flex items-center justify-center py-4 rounded bg-gray-500">
				<i className="bi bi-geo-alt-fill text-red-500 text-6xl" />
			</div>
			<p>{message.data.location.name}</p>
			<p className="text-sm">{message.data.location.address}</p>
		</a>
	);
});

export default Location;