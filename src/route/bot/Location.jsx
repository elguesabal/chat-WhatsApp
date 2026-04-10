/**
 * @author VAMPETA
 * @brief COMPONENTE PARA SALVAR MENSAGEM DE LOCALIZACAO
*/
export default function Location() {
	return (
		<div className="flex flex-col gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-5">
			<div>
				<h2 className="text-lg font-semibold">Localização do estabelecimento</h2>
				<p className="text-sm text-zinc-400">Informe os dados do endereço para que o bot possa compartilhar com o cliente quando necessário.</p>
			</div>
			<input className="bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" type="text" placeholder="Ex: Loja Centro" />
			<textarea className="bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none resize-none min-h-[70px]" placeholder="Ex: Estamos localizados no centro da cidade, próximo à praça principal." />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				<input className="flex-1 bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" type="text" placeholder="Latitude" />
				<input className="flex-1 bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" type="text" placeholder="Longitude" />
			</div>
			<p className="text-xs text-zinc-500"> Dica: você pode obter latitude e longitude pelo Google Maps. </p>
			<button className="bg-orange-500 text-black rounded p-2 text-sm w-full hover:bg-orange-400 transition cursor-pointer" onClick={() => alert("ainda nao configurado")}>
				Salvar
			</button>
		</div>
	);
}