import { useEffect, useState } from "react";
import { getContacts } from "../../api/apiClient.js";

export default function AdminContactosPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar contactos");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) return <p>A carregar contactos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Admin - Contactos</h1>
            {contacts.length === 0 ? (
                <p>Sem contactos ainda.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Mensagem</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


