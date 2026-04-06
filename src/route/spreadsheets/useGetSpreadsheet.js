import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE BUSCA INFORMACOES DE CONFIGURACOES DA PLANILHA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useGetSpreadsheet(socket) {
	const [spreadsheets, setSpreadsheets] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		socket.emit("spreadsheets:get_spreadsheets", {}, (res) => {
			if (!res || res.error) return (setError(true));
			setSpreadsheets(res);
			setLoading(false);
		});
	}, [socket]);
	return ({ spreadsheets, setSpreadsheets, loading, error });
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA QUAIS PLANILHAS ESTAO SENDO USADAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} setSpreadsheets FUNCAO DE CONTROLE DA VARIAVEL spreadsheets
 * @param {Number} index POSICAO DO COMPONENTE QUE SERA ATUALIZADO
*/
export function selectSpreadsheet(socket, setSpreadsheets, index) {
	setSpreadsheets((prev) => (prev.map((item, i) => ((i === index) ? { ...item, selected: !item.selected } : item))));
}