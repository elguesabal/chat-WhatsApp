import { useGetSpreadsheet, selectSpreadsheet } from "./useGetSpreadsheet.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELA PARTE DE PLANILHAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Spreadsheet({ socket }) {
	const { spreadsheets, setSpreadsheets, loading } = useGetSpreadsheet(socket);

	return (
		<>
			<h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">Planilhas</h2>
			<p>Testo descritivo de como usar...</p>
			<div className={`flex flex-[3] gap-5 bg-zinc-900 border border-zinc-800 rounded-lg p-5 ${(loading) ? "animate-pulse" : null}`}>
				<div className="flex flex-col gap-4 w-full h-80 overflow-y-auto">
					{spreadsheets?.map((spreadsheet, i) => {
						return (
							<div className={`flex justify-between items-center w-full px-3 py-1 cursor-pointer rounded ${(spreadsheet.selected) ? "bg-orange-500 text-black" : null}`} key={i} onClick={() => selectSpreadsheet(socket, setSpreadsheets, i)}>
								<p>{spreadsheet.page}</p>
								<i className={`bi bi-${(spreadsheet.selected) ? "check2" : "x"}  text-xl`} />
							</div>
						);
					})}
				</div>
				<div className="flex flex-1 justify-center items-center w-full">
					<i className="bi bi-file-earmark-spreadsheet text-7xl text-orange-500" />
				</div>
			</div>
		</>
	);
}