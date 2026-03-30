import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks } from "../../api/apiClient.js";
import Button from "../../components/design/Button.jsx";
import Input from "../../components/design/Input.jsx";
import Title from "../../components/design/Title.jsx";
import { ArrowBigLeft, SquareChartGantt, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TarefasPage({ onCreateTaskClick, session }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const token = session?.access_token; // JWT do Supabase

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError("");

            if (!token) {
                if (!cancelled) {
                    setTasks([]);
                    setError("Precisas de fazer login para ver as tarefas.");
                    setLoading(false);
                }
                return;
            }

            try {
                const list = await getTasks(token);
                if (!cancelled) setTasks(Array.isArray(list) ? list : []);
            } catch (err) {
                console.error("Erro ao carregar tarefas:", err);
                if (!cancelled) {
                    setError(err.message || "Erro ao carregar tarefas");
                    setTasks([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [token]);

    async function handleDeleteTask(id) {
        try {
            if (!token) {
                alert("Faz login primeiro.");
                return;
            }
            await deleteTask(id, token);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Erro ao apagar tarefa:", err);
            alert(err.message || "Erro ao apagar tarefa.");
        }
    }

    async function handleCreateTask() {
        if (typeof onCreateTaskClick === "function") {

        }

        if (!token) {
            alert("Faz login primeiro.");
            return;
        }

        if (!title.trim() || !description.trim() || !dueDate) {
            alert("Título, descrição e data limite são obrigatórios!");
            return;
        }

        const payload = {
            title: title.trim(),
            description: description.trim(),
            status: "TODO",
            dueDate: new Date(dueDate).toISOString(),
        };

        try {
            const newTask = await createTask(payload, token);
            setTasks((prev) => [...prev, newTask]);
            setTitle("");
            setDescription("");
            setDueDate("");
        } catch (err) {
            console.error("Erro ao criar tarefa:", err);
            alert(err.message || "Erro ao criar tarefa.");
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4">
                <Button onClick={() => navigate("/")} title="Dashboard">
                    <ArrowBigLeft />
                </Button>
                <Title>Tarefas</Title>
            </div>

            {loading && <p className="mt-4 text-gray-600">A carregar tarefas...</p>}
            {!loading && error && <p className="mt-4 text-red-600">{error}</p>}

            {!loading && (
                <ul>
                    {tasks.length === 0 ? (
                        <li className="mt-4 text-gray-600">Sem tarefas ainda.</li>
                    ) : (
                        tasks.map((t) => (
                            <li key={t.id} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <strong>{t.title}</strong> — {t.status}
                                    <p>
                                        {`${t.description} - Até : ${
                                            t.dueDate ? String(t.dueDate).slice(0, 10) : "-"
                                        }`}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/tarefas/${t.id}`)}
                                    className="cursor-pointer"
                                    title="Detalhes"
                                >
                                    <SquareChartGantt className="text-blue-500 hover:text-blue-700" />
                                </button>

                                <Button onClick={() => handleDeleteTask(t.id)} title="Apagar">
                                    <Trash2 />
                                </Button>
                            </li>
                        ))
                    )}
                </ul>
            )}

            <div className="flex flex-col gap-2 max-w-2xl mt-4">
                <Input
                    placeholder="Insira o Título da tarefa:"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <Input
                    placeholder="Insira a Descrição da tarefa:"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <div className="text-sm text-gray-600">Insira a Data limite da Tarefa</div>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

                <Button onClick={handleCreateTask}>Criar tarefa</Button>
            </div>
        </div>
    );
}
