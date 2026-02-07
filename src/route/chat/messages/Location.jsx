/**
 * @author VAMPETA
 * @brief RENDERIZA MENSAGEM DE LOCALIZACAO
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
export default function Location({ message }) {
      return (
            <a className="inline-block bg-gray-400 m-4 px-3 py-2 rounded w-[80vw] sm:w-[70vw] md:w-[360px] break-words" href={`https://www.google.com/maps?q=${message.data.location.latitude},${message.data.location.longitude}`} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center justify-center my-4">
                        <i className="bi bi-geo-alt-fill text-red-500 text-6xl" />
                  </div>
                  <p>{message.data.location.name}</p>
                  <p className="text-sm">{message.data.location.address}</p>
            </a>
      );
}