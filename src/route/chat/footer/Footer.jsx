import { useState, useRef, useEffect } from "react";

import { sendText } from "./sendMessage.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR GERAR O CAMPO DE DIGITACAO DA MENSAGEM E BOTAO DE ENVIAR
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
function ChatComposer({ socket }) {
	const [message, setMessage] = useState("");
	const textareaRef = useRef(null);
	const handleInput = (e) => {
		setMessage(e.target.value);
		const el = textareaRef.current;
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendText(socket, message, setMessage, textareaRef);
		}
	};

	return (
		<div className="flex items-center gap-2 px-3 py-2 bg-gray-900">
			{/* <button className="text-gray-400 hover:text-white text-xl pb-2">
				<i className="bi bi-emoji-smile" />
			</button> */}
			<div className="flex-1 bg-[#2A3942] rounded-3xl px-4 py-2 flex items-end">
				<textarea ref={textareaRef} rows={1} value={message} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="Digite uma mensagem" className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-400 max-h-40 overflow-y-auto" />
			</div>
			<button onClick={() => sendText(socket, message, setMessage, textareaRef)} className="h-10 w-10 flex items-center justify-center bg-orange-500 hover:bg-orange-400 transition-colors text-white rounded-full">
				<i className="bi bi-send-fill text-lg" />
			</button>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR INFORMAR QUE A JANELA DE RESPOSTA PASSOU DAS 24 HORAS
*/
function OutsideResponseWindow() {
	return (
		<div className="flex items-center justify-center h-14 bg-gray-800 shrink-0">
			<p className="text-red-500">Fora da janela de 24 horas</p>
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
		if (!socket) return;
		socket.emit("reply_window", {}, (res) => {
			setReplyWindow(res);
		});
	}, [socket]);

	switch (replyWindow) {
		case null:
			return (<></>);
		case true:
			return (<ChatComposer socket={socket} />);
		case false:
			return (<OutsideResponseWindow />);
		default:
			return (<></>);
	}
}