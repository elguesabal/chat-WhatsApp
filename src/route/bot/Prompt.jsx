import { usePrompt } from "./usePrompt.js";

import { addField, updateField, removeField, handleSave, parsePrompt, buildPrompt } from "./prompt.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE DE CONFIGURACAO DE PROMPT
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} bot INFORMACOES DO BOT
 * @param {Object} setBot FUNCAO QUE MODIFICA bot
*/
export default function Prompt({ socket, bot, setBot }) {
	const { fields, setFields } = usePrompt(bot, setBot);

	return (
		<div className="flex flex-col gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-5">
			<div>
				<h2 className="text-lg font-semibold">Prompt de IA</h2>
				<p className="text-sm text-zinc-400">Adicione instruções curtas para o comportamento da IA.</p>
			</div>
			<div className="flex flex-col gap-2">
				{fields.map((field, index) => (
					<div key={index} className="flex gap-2">
						<input className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 outline-none focus:border-orange-500" type="text" value={field} onChange={(e) => updateField(setFields, e.target.value, index)} placeholder="Ex: Seja educado" />
						<button className="px-2 text-red-400 hover:text-red-300 cursor-pointer" onClick={() => removeField(setFields, index)}>
							<i className="bi bi-trash text-xl" />
						</button>
					</div>
				))}
			</div>
			<div className="flex justify-between">
				<button className="text-sm text-orange-500 hover:underline cursor-pointer" onClick={() => addField(setFields)}>
					+ Adicionar instrução
				</button>
				<button className="px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition cursor-pointer" onClick={() => handleSave(fields, socket)}>
					Salvar
				</button>
			</div>
		</div>
	);
}