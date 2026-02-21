import { useState, useRef } from "react";

import { sendText } from "./sendMessage.js";

import { Options } from "./options/Options.jsx";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ADICIONA O VALOR DA TECLA DIGITADA AO TEXTEAREA E AUMENTA O TAMANHO DO TEXTAREA SE NECESSARIO
 * @param {Object} setMessage MODIFICADOR DA VARIAVEL message
 * @param {String} value VALOR ANTES DE INCREMENTAR O TEXTAREA
 * @param {Object} textareaRef REFERENCIA DO TEXTEAREA
*/
function handleInput(setMessage, value, textareaRef) {
	setMessage(value);
	textareaRef.current.style.height = "auto";
	textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA A ACAO DA TECLA ENTER E ENVIA A MENSAGEM
 * @param {Object} element ELEMENTO DO TEXTAREA
 * @param {Object} setMessage MODIFICADOR DA VARIAVEL message
 * @param {String} value VALOR ANTES DE INCREMENTAR O TEXTAREA
 * @param {Object} textareaRef REFERENCIA DO TEXTEAREA
*/
function handleKeyDown(element, socket, message, setMessage, textareaRef) {
	if (element.key === "Enter" && !element.shiftKey) {
		element.preventDefault();
		sendText(socket, message, setMessage, textareaRef);
	}
}

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR GERAR O CAMPO DE DIGITACAO DA MENSAGEM E BOTAO DE ENVIAR
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function ChatComposer({ socket }) {
	const [message, setMessage] = useState("");
	const textareaRef = useRef(null);
	const [options, setOptions] = useState(false);

	return (
		<>
			<div className="flex items-center gap-2 px-3 py-2 bg-gray-900">
				<button className="text-gray-400 hover:text-white text-xl cursor-pointer" onClick={() => setOptions((prev) => !prev)}>
					<i className="bi bi-three-dots" />
				</button>
				<div className="flex-1 bg-gray-700 rounded-3xl px-4 py-2 flex items-end">
					<textarea ref={textareaRef} rows={1} value={message} onChange={(element) => handleInput(setMessage, element.target.value, textareaRef)} onKeyDown={(element) => handleKeyDown(element, socket, message, setMessage, textareaRef)} placeholder="Digite uma mensagem" className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-400 max-h-40 overflow-y-auto" />
				</div>
				<button onClick={() => sendText(socket, message, setMessage, textareaRef)} className={`flex items-center justify-center h-10 w-10 bg-orange-500 transition-colors text-white rounded-full ${(message) ? "cursor-pointer hover:bg-orange-400" : ""}`}>
					<i className="bi bi-send-fill text-lg" />
				</button>
			</div>
			<Options socket={socket} options={options} />
		</>
	);
}