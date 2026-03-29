import { useState, useEffect, useMemo } from "react";

function useGetContacts(socket) {
	// const [search, setSearch] = useState("");

	// // DADOS MOCK
	// const [contacts] = useState([
	// 	{
	// 		name: "João Silva",
	// 		phone: "5521999999999",
	// 		lastInteraction: "Hoje 14:30"
	// 	},
	// 	{
	// 		name: "Maria Souza",
	// 		phone: "5521988888888",
	// 		lastInteraction: "Ontem 18:10"
	// 	},
	// 	{
	// 		name: "Carlos Lima",
	// 		phone: "5521977777777",
	// 		lastInteraction: "Hoje 09:15"
	// 	}
	// ]);

	// // FILTRO DE BUSCA
	// const filteredContacts = useMemo(() => {
	// 	return (contacts.filter((c) =>
	// 		(c.name || "").toLowerCase().includes(search.toLowerCase()) ||
	// 		c.phone.includes(search)
	// 	));
	// }, [search, contacts]);

	// return ({ search, setSearch, filteredContacts });



	const [contacts, setContacts] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!socket) return ;
		setLoading(true);
		socket.emit("contacts:load_contacts", {}, (res) => {
			if (!res) return ;
			setContacts(res);
			setLoading(false);
		});
	}, [socket]);
	return ({ contacts, loading });
}

/**
 * @author VAMPETA
 * @brief CARD DE CONTATO
 * @param {Array<Objetc>} contact 
 */
function ContactCard({ contact }) {
	return (
		// <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 hover:bg-orange-600 transition cursor-pointer">
		// 	<div className="flex justify-between items-center">
		// 		<p className="font-semibold">{contact.name || "Sem nome"}</p>
		// 		<span className="text-xs text-zinc-400">{contact.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}</span>
		// 	</div>
		// 	<div className="text-sm text-zinc-400">
		// 		<p>Última interação:</p>
		// 		<p>{contact.lastInteraction || "N/A"}</p>
		// 	</div>
		// </div>
		<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 hover:bg-orange-600 transition cursor-pointer">
			<div className="flex justify-between items-center">
				<p className="font-semibold">{contact.name || "Sem nome"}</p>
				<span className="text-xs text-zinc-400">{contact.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}</span>
			</div>
			<div className="text-sm text-zinc-400">
				<p>Última interação:</p>
				{/* <p>{contact.lastInteraction || "N/A"}</p> */}
			</div>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief PAGINA DE CONTATOS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Body({ socket }) {
	// const { search, setSearch, filteredContacts } = useGetContacts(socket);
	const { contacts, loading } = useGetContacts(socket);

	if (loading) return (<>Loading...</>);
	return (
		<div className="p-4 md:p-6 flex flex-col gap-6 overflow-y-auto animate-toastIn">
			{/* <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
				<h2 className="text-lg font-semibold">Lista de contatos</h2>
				<input className="w-full md:w-80 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-orange-500" type="text" placeholder="Buscar por nome ou número..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>
			{filteredContacts.length === 0 ? (
				<div className="flex flex-col items-center justify-center mt-10 text-zinc-400">
					<i className="bi bi-person-x text-4xl mb-2" />
					<p>Nenhum contato encontrado</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{filteredContacts.map((contact, i) => (<ContactCard key={i} contact={contact} />))}
				</div>
			)} */}

			{contacts.length === 0 ? (
				<div className="flex flex-col items-center justify-center mt-10 text-zinc-400">
					<i className="bi bi-person-x text-4xl mb-2" />
					<p>Nenhum contato encontrado</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{contacts.map((contact, i) => (<ContactCard key={i} contact={contact} />))}
				</div>
			)}
		</div>
	);
}