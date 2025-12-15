import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/design/Title.jsx";
import Input from "../../components/design/Input.jsx";
import Button from "../../components/design/Button.jsx";
import { getTaskById, updateTask } from "../../api/apiClient.js";
import { ArrowBigLeft } from "lucide-react";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export default function AdminTarefaDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");

    async function loadTask() {
        setLoading(true);
        setError("");
        try {
            const task = await getTaskById(id);
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");
            setStatus(task.status ?? "TODO");
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar tarefa.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTask();

    }, [id]);

    async function handleSave() {
        if (!title.trim()) {
            alert("O título é obrigatório.");
            return;
        }

        try {
            await updateTask(id, { title, description, status });
            navigate("/admin/tarefas");
        } catch (err) {
            console.error(err);
            alert("Erro ao guardar alterações.");
        }
    }

    if (loading) return <p>A carregar...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 max-w-2xl">
            <button
                className="flex items-center gap-2 mb-4"
                onClick={() => navigate("/admin/tarefas")}
            >
                <ArrowBigLeft />
                Voltar
            </button>

            <Title>Admin — Editar Tarefa</Title>

            <div className="flex flex-col gap-3 mt-4">
                <Input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="border rounded-md p-2 bg-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2 mt-2">
                    <Button onClick={handleSave}>Guardar</Button>
                    <Button onClick={loadTask}>Repor</Button>
                </div>
            </div>
        </div>
    );
}
