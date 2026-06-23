import { useState, useEffect } from "react";

import toast from "react-hot-toast";

/**
 * @author VAMPETA
 * @brief HOOK QUE BUSCA INFORMACOES DE CONFIGURACOES DA PLANILHA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useGetSpreadsheet(socket) {
	const [infoSpreadsheets, setInfoSpreadsheets] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		socket.emit("spreadsheets:get_spreadsheets", {}, (res) => {
			if (!res || res.code !== 200 || res.error) return (setError(true));
			setInfoSpreadsheets(res);
			setLoading(false);
		});
	}, [socket]);
	return ({ infoSpreadsheets, setInfoSpreadsheets, loading, error });
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA QUAIS PLANILHAS ESTAO SENDO USADAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} infoSpreadsheets VARIAVEL QUE CONTEM AS PLANILHAS DISPONIVEIS E QUAIS ESTAO EM USO
 * @param {Object} setInfoSpreadsheets FUNCAO DE CONTROLE DA VARIAVEL spreadsheets
 * @param {Number} index POSICAO DO COMPONENTE QUE SERA ATUALIZADO
*/
export function selectSpreadsheet(socket, infoSpreadsheets, setInfoSpreadsheets, index) {
	const spreadsheet = infoSpreadsheets.pages[index];
    const spreadsheets = infoSpreadsheets.pages.map((item, i) => ((i === index) ? { ...item, active: !item.active } : item)).filter((item) => item.active).map((item) => item.page);

	socket.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: spreadsheets }, (res) => {
		if (!res || res.code !== 204 || res.error) return (toast.error("Erro ao salvar!"));
		setInfoSpreadsheets((prev) => {
			return ({
				...prev,
				pages: prev.pages.map((item, i) => ((i === index) ? { ...item, active: !spreadsheet.active } : item))
			});
		});
		toast.success("Salvo com sucesso!");
	});
}