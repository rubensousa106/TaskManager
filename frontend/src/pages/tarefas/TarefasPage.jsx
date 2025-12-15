import { useEffect, useState } from "react";
import {deleteTask, getTasks} from "../../api/apiClient.js";
import Button from "../../components/design/Button.jsx";
import Input from "../../components/design/Input.jsx";
import Title from "../../components/design/Title.jsx";
import {ArrowBigLeft,SquareChartGantt,Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";


export default function TarefasPage({onCreateTaskClick }) {
    const [tasks, setTasks] = useState([]);
    const[title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await getTasks();
                console.log("Tasks from API:", data); // <- para ver os dados recebidos
                setTasks(data);
            } catch (err) {
                console.error("Erro ao carregar tarefas:", err); // <- erro detalhado
                setError("Erro ao carregar tarefas");
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
        if (!title.trim() || !description.trim()) {
            alert("O título e Descrição são obrigatórios!");
            return;
        }

        try {
            console.log("handleCreateTask -> a enviar para backend:", { title, description });
            const newTask = await onCreateTaskClick(title, description);

            console.log("handleCreateTask -> resposta do backend:", newTask);
            // adicionar a nova tarefa à lista atual
            setTasks((prev) => [...prev, newTask]);

            // limpar campos
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("Erro ao criar tarefa:", err);
            alert("Erro ao criar tarefa.");
        }
    }

    if (loading) return <p>A carregar tarefas...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div>
            {/* Button Navegar Para o Menu Anterior */}
            <div className={"flex items-center gap-4"}>
                <Button
                    onClick={() => navigate("/")}
                    title="Dashboard"
                >
                    <ArrowBigLeft/>
                </Button>
                <Title>Tarefas</Title>
            </div>

            {/* Lista de tarefas */}
            <ul>
                {tasks.map((t) => (
                    <li key={t.id} className="flex items-center gap-4">
                        <strong>{t.title}</strong> — {t.status}
                        <p>{t.description}</p>
                        <button onClick={() => navigate(`/tarefas/${t.id}`)}>
                            <SquareChartGantt className="cursor-pointer text-blue-500 hover:text-blue-700"/>
                        </button>

                        <Button onClick={() => handleDeleteTask(t.id)}>
                            <Trash2/>
                        </Button>

                    </li>
                ))}
            </ul>

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

                <Button
                    onClick={handleCreateTask}
                >
                    Criar tarefa
                </Button>
            </div>
        </div>
    );
}
