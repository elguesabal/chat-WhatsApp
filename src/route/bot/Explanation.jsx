/**
 * @author VAMPETA
 * @brief COMPONENTE EXPLICATIVO DE COMO FUNCIONA OS CAMPOS DE PREENCHIMENTO DE IA
*/
export default function Explanation() {
	return (
		<div className="flex flex-col gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-5">
			<h2 className="text-lg font-semibold">Como configurar o comportamento do bot</h2>
			<p className="text-sm text-zinc-400">O prompt define como a inteligência artificial deve responder seus clientes. Cada campo é uma instrução simples que orienta o comportamento do bot.</p>
			<ul className="flex flex-col gap-2 text-sm text-zinc-400 list-disc pl-5">
				<li>Adicione instruções curtas, uma por campo.</li>
				<li>Descreva como o bot deve responder (ex: educado, objetivo).</li>
				<li>Evite textos longos e prefira frases simples e diretas.</li>
				<li>Quanto mais claro o prompt, melhores serão as respostas.</li>
			</ul>
			<div className="bg-zinc-800 border border-zinc-700 rounded p-3 text-sm text-zinc-300">
				<p className="font-medium mb-1">Exemplos:</p>
				<p>Seja educado e profissional</p>
				<p>Responda de forma clara e objetiva</p>
				<p>Não invente informações</p>
			</div>
		</div>
	);
}