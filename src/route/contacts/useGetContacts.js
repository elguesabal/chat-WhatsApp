import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O LOAD DOS CONTATOS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 */
export function useGetContacts(socket) {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!socket) return ;
        socket.emit("contacts:load_contacts", null, (res) => {
            if (!res || res.code !== 200 || res.error) return (setError(true));
            setContacts(res.contacts);
            setLoading(false);
        });
    }, [socket]);

    return ({ contacts, loading, error });
}