import { useState } from "react";

import { useGetContacts } from "./useGetContacts.js";

import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";
import ContactDrawer from "./ContactDrawer.jsx";

/**
 * @author VAMPETA
 * @brief CARD DE CONTATO
 * @param {Objetc} contact INFORMACOES DO CONTATO
 */
function ContactCard({ contact, onClick }) {
	return (
		<div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:bg-orange-500 transition cursor-pointer" onClick={onClick}>
			<p className="font-semibold truncate">{contact.name || "Sem nome"}</p>
			<span className="text-xs text-zinc-500">{contact.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}</span>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief PAGINA DE CONTATOS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Body({ socket }) {
	const { contacts, loading, error } = useGetContacts(socket);
	const [selected, setSelected] = useState(null);
	const [search, setSearch] = useState("");
	
	if (error) return (<Error />);
	if (loading) return (<Load />);
	const filtered = contacts.filter((contact) => (contact.name || "").toLowerCase().includes(search.toLowerCase()));
	return (
		<>
			<div className="flex flex-col gap-6 p-4 md:p-6 overflow-y-auto animate-toastIn">
				<input className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500" type="text" placeholder="Buscar contatos..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
					{filtered.map((contact, i) => (<ContactCard key={i} contact={contact} onClick={() => setSelected(contact)} />))}
				</div>
			</div>
			{selected && <ContactDrawer socket={socket} contact={selected} setContact={setSelected} onClose={() => setSelected(null)} />}
		</>
	);
};