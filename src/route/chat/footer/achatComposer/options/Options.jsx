import { useQuickMessages } from "./useQuickMessages";

import { Text, sendReadyText } from "./Text";
import { Location, sendReadyLocation } from "./Locatioin";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE IDENTIFICA O TIPO DA MENSAGEM
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {String} message MENSAGEM A SER ENVIADA
*/
function sendReadyMessage(socket, message) {
	switch (message.type) {
		case "text":
			sendReadyText(socket, message);
			break;
		case "location":
			sendReadyLocation(socket, message);
			break;
	}
}

/**
 * @author VAMPETA
 * @brief IDENTIFICA O TIPO CERTO DA MENSAGEM
 * @param {Object} message MENSAGEM A SER RENDERIZADA
*/
function Message({ message }) {
	switch (message.type) {
		case "text":
			return <Text message={message} />;
		case "location":
			return <Location message={message} />;
		default:
			return (<p className="text-red-900"><i>Mensagem do tipo <b>{message.type}</b> não suportada</i></p>);
	}
}

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR EXIBIR O MENU DE OPCOES
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Options({ socket }) {
	const { messages } = useQuickMessages(socket);

	if (messages === null) return (
		<div className="flex items-center justify-center h-[100%]">
			<div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
		</div>
	);
	if (Array.isArray(messages) && messages.length === 0) return (
		<div className="flex flex-col items-center justify-center h-[100%]">
			<i className="bi bi-chat-right-text text-white text-5xl" />
			<p className="text-white">Nenhuma mensagem</p>
		</div>
	);
	return (
		<>
			{messages.map((message, i) => (
				<div className="flex justify-center my-3 cursor-pointer" key={i} onClick={() => sendReadyMessage(socket, message)}>
					<div className="inline-block bg-gray-400 px-3 py-2 rounded min-w-[60%] max-w-[80%] break-words whitespace-pre-wrap">
						<Message message={message} />
					</div>
				</div>
			))}
		</>
	);
}