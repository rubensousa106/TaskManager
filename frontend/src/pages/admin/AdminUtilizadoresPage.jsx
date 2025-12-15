import { useEffect, useState } from "react";
import Title from "../../components/design/Title.jsx";
import Button from "../../components/design/Button.jsx";
import { getContacts, deleteContact } from "../../api/apiClient.js";
import { Trash2 } from "lucide-react";

export default function AdminUtilizadoresPage() {
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
                setError("Erro ao carregar utilizadores/contactos");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function handleDelete(id) {
        const ok = confirm("Tens a certeza que queres apagar este registo?");
        if (!ok) return;

        try {
            await deleteContact(id);
            setContacts((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erro ao apagar registo.");
        }
    }

    if (loading) return <p>A carregar utilizadores/contactos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <Title>Admin — Utilizadores (Contactos)</Title>

            <div className="mt-4 space-y-3">
                {contacts.length === 0 && (
                    <p className="text-gray-600">Ainda não existem registos.</p>
                )}

                {contacts.map((c) => (
                    <div key={c.id} className="border rounded-md p-3">
                        <div className="flex flex-col md:flex-row md:items-start gap-3">
                            <div className="flex-1">
                                <div className="font-semibold">{c.name}</div>
                                <div className="text-sm text-gray-700">{c.email}</div>

                                {c.createdAt && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Criado em: {new Date(c.createdAt).toLocaleString()}
                                    </div>
                                )}

                                {c.message && (
                                    <div className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                                        {c.message}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleDelete(c.id)} title="Apagar">
                                    <Trash2 />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
