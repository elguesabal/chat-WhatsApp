/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE LOCALIZACAO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
export default function Location({ message }) {
	return (
		<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[70%] break-words">
            <p>Latitude: {message.data.location.latitude}</p>
            <p>Longitude: {message.data.location.longitude}</p>
            <p>Name: {message.data.location.name}</p>
            <p>Address: {message.data.location.address}</p>
		</div>
	);
}