import { useEffect, useState } from "react";
import Title from "../../components/design/Title.jsx";
import Button from "../../components/design/Button.jsx";
import { getContacts } from "../../api/apiClient.js";
import {ArrowBigLeft, FileText} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function AdminContactosPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
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

    function handleGeneratePdf(contactId) {
        // placeholder para gerar PDF
        alert(`Gerar PDF para o contacto #${contactId} (a implementar)`);
    }

    if (loading) return <p>A carregar contactos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <div className={"flex items-center gap-4"}>
                <Button
                    onClick={() => navigate("/admin/dashboard")}
                    title="Dashboard"
                >
                    <ArrowBigLeft/>
                </Button>
                <Title>Admin — Contactos</Title>
            </div>


            {contacts.length === 0 ? (
                <p className="mt-4 text-gray-600">Sem contactos ainda.</p>
            ) : (
                <div className="mt-4 overflow-x-auto border rounded-md">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-2">#</th>
                            <th className="p-2">Nome</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Mensagem</th>
                            <th className="p-2">Data</th>
                            <th className="p-2">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                        {contacts.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="p-2">{c.id}</td>
                                <td className="p-2 font-medium">{c.name}</td>
                                <td className="p-2">{c.email}</td>
                                <td className="p-2">
                                    <div className="max-w-md whitespace-pre-wrap">
                                        {c.message}
                                    </div>
                                </td>
                                <td className="p-2 text-gray-600">
                                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
                                </td>
                                <td className="p-2">
                                    <Button onClick={() => handleGeneratePdf(c.id)} title="Gerar PDF">
                                        <FileText/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
