/**
 * @author VAMPETA
 * @brief COMPONENTE PARA SALVAR MENSAGEM DE NOVO CONTATO
*/
export default function NewContact() {
	return (
		<div className="flex flex-col gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-5">
			<div>
				<h2 className="text-lg font-semibold">Mensagem de boas-vindas</h2>
				<p className="text-sm text-zinc-400">Mensagem enviada automaticamente quando o cliente entra em contato pela primeira vez.</p>
			</div>
			<textarea className="bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none resize-none min-h-[90px]" placeholder="Ex: Olá! Seja bem-vindo 😊 Como posso te ajudar hoje?" />
			<p className="text-xs text-zinc-500">Dica: seja amigável e convide o cliente a continuar a conversa.</p>
			<button className="bg-orange-500 text-black rounded p-2 text-sm w-full hover:bg-orange-400 transition cursor-pointer" onClick={() => alert("ainda nao configurado")}>
				Salvar
			</button>
		</div>
	);
}