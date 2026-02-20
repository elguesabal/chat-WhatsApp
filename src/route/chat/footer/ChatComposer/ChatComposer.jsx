import { useState, useRef } from "react";

import { sendText } from "./sendMessage.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL POR EXIBIR O MENU DE OPCOES
 * @param {Boolean} options VARIAVEL QUE INDICA SE A ABA DE OPCOES DEVE ESTAR ABERTA
*/
function Options({ options }) {
	let array = [];
	for (let i = 0; i < 50; i++) array.push(0);
	return (
		<div className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${(options) ? "max-h-90" : "max-h-0"}`}>
			{array.map((e, i) => (<p className="text-white" key={i}>aaaaaaa</p>))}
		</div>
	);
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
		<>
			<div className="flex items-center gap-2 px-3 py-2 bg-gray-900">
				<button className="text-gray-400 hover:text-white text-xl cursor-pointer" onClick={() => setOptions((prev) => !prev)}>
					<i className="bi bi-three-dots" />
				</button>
				<div className="flex-1 bg-gray-700 rounded-3xl px-4 py-2 flex items-end">
					<textarea ref={textareaRef} rows={1} value={message} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="Digite uma mensagem" className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-400 max-h-40 overflow-y-auto" />
				</div>
				<button onClick={() => sendText(socket, message, setMessage, textareaRef)} className={`flex items-center justify-center h-10 w-10 bg-orange-500 transition-colors text-white rounded-full ${(message) ? "cursor-pointer hover:bg-orange-400" : ""}`}>
					<i className="bi bi-send-fill text-lg" />
				</button>
			</div>
			<Options options={options} />
		</>
	);
}