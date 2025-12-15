import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../../components/design/Title.jsx";
import Button from "../../components/design/Button.jsx";
import { SquareChartGantt, Trash2 ,ArrowBigLeft} from "lucide-react";

import { getTasks, deleteTask } from "../../api/apiClient.js";

export default function AdminTarefasPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar tarefas (admin)");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    async function handleDelete(id) {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erro ao apagar tarefa.");
        }
    }

    if (loading) return <p>A carregar tarefas (admin)...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <div className={"flex items-center gap-4"}>
                <Button
                    onClick={() => navigate("/admin/dashboard")}
                    title="Dashboard"
                >
                    <ArrowBigLeft />
                </Button>
                <Title>Admin — Tarefas</Title>
            </div>


            <div className="mt-4 space-y-3">
                {tasks.map((t) => (
                    <div key={t.id} className="border rounded-md p-3">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <div className="flex-1">
                                <div className="font-semibold">{t.title}</div>
                                <div className="text-sm text-gray-600">{t.description}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Status: <span className="font-medium">{t.status}</span> | ID: {t.id}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => navigate(`/admin/tarefas/${t.id}`)}
                                    title="Detalhes"
                                >
                                    <SquareChartGantt />
                                </Button>

                                <Button onClick={() => handleDelete(t.id)} title="Apagar">
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
