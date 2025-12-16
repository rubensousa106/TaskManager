import { useEffect, useState } from "react";
import {createTask, deleteTask, getTaskById, getTasks} from "../../api/apiClient.js";
import Button from "../../components/design/Button.jsx";
import Input from "../../components/design/Input.jsx";
import Title from "../../components/design/Title.jsx";
import { ArrowBigLeft, SquareChartGantt, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function TarefasPage({ onCreateTaskClick }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        async function load() {
            try {
                const data = await getTasks();
                setTasks(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erro ao carregar tarefas:", err);
                setError("Erro ao carregar tarefas");
                setTasks([]); // em erro, trata como lista vazia
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function handleDeleteTask(id) {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Erro ao apagar tarefa:", err);
            alert("Erro ao apagar tarefa.");
        }
    }

    async function handleCreateTask() {
        if (!title.trim() || !description.trim() || !dueDate) {
            alert("Título, descrição e data limite são obrigatórios!");
            return;
        }

        const payload = {
            title,
            description,
            status: "TODO",
            dueDate: new Date(dueDate).toISOString()
        };

        try {
            const newTask = await createTask(payload);
            setTasks((prev) => [...prev, newTask]);

            setTitle("");
            setDescription("");
            setDueDate("");
        } catch (err) {
            console.error("Erro ao criar tarefa:", err);
            alert("Erro ao criar tarefa.");
        }
    }



    return (
        <div>
            {/* Button Navegar Para o Menu Anterior */}
            <div className="flex items-center gap-4">
                <Button onClick={() => navigate("/")} title="Dashboard">
                    <ArrowBigLeft />
                </Button>
                <Title>Tarefas</Title>
            </div>

            {/* Loading / Error (sem perder o layout) */}
            {loading && <p className="mt-4 text-gray-600">A carregar tarefas...</p>}
            {!loading && error && <p className="mt-4 text-red-600">{error}</p>}

            {/* Lista de tarefas (aparece quando apos o loading) */}
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
                                        {`${t.description} - Até : ${t.dueDate ? t.dueDate.slice(0, 10) : "-"}`}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/tarefas/${t.id}`)}
                                    className="cursor-pointer"
                                >
                                    <SquareChartGantt className="text-blue-500 hover:text-blue-700" />
                                </button>

                                <Button onClick={() => handleDeleteTask(t.id)}>
                                    <Trash2 />
                                </Button>
                            </li>
                        ))
                    )}
                </ul>
            )}

            {/* Formulário de criação */}
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
                <li>Insira a Data limite da Tarefa</li>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <Button onClick={handleCreateTask}>Criar tarefa</Button>
            </div>
        </div>
    );
}
