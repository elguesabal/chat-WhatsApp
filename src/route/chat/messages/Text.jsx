/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE TEXTO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
export default function Text({ message }) {
	return (
		<div className="inline-block bg-gray-400 m-4 px-3 py-2 rounded max-w-[70%] break-words">
			{message.data.text.body}
		</div>
	);
}