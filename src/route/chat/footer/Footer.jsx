import { useState, useEffect } from "react";

// function teste(socket, message) {
// alert(message)
// console.log(socket)
// 	socket.emit("send_message_text", { text: message }, (res) => {
// console.log(res)
// 	});
// }

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR GERAR O CAMPO DE DIGITACAO DA MENSAGEM E BOTAO DE ENVIAR
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
function ChatComposer(socket) {
	const [message, setMessage] = useState("");

	return (
		<div className="flex items-center justify-center h-14 bg-gray-800 shrink-0">
			<textarea className="px-2 h-12 leading-[3rem] resize-none bg-orange-100 rounded" rows={1} value={message} onChange={(e) => setMessage(e.target.value)} />
			{/* <button onClick={() => teste(socket, message)}> */}
			<button onClick={() => alert(message)}>
				<i className="bi bi-send text-2xl text-orange-500" />
			</button>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief FOOTER DO CHAT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Footer({ socket }) {
	const [replyWindow, setReplyWindow] = useState(null);

	useEffect(() => {
		if (!socket) return ;
		socket.emit("reply_window", {}, (res) => {
			setReplyWindow(res);
		});
	}, [socket]);

	// return (
	// 	<div className="flex items-center justify-center h-14 bg-gray-800 shrink-0">
	// 		{replyWindow === null && <></>}
	// 		{replyWindow === true && <ChatComposer />}
	// 		{replyWindow === false && <p className="text-red-500">Fora da janela de 24 horas</p>}
	// 	</div>
	// );

	switch (replyWindow) {
		case null:
			return (<></>);
		case true:
			return (<ChatComposer socket={socket} />);
		case false:
			return (
				<div className="flex items-center justify-center h-14 bg-gray-800 shrink-0">
					<p className="text-red-500">Fora da janela de 24 horas</p>
				</div>
			);
		default:
			return (<></>);
	}
}