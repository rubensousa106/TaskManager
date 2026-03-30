import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { getTaskById, updateTask } from "../../api/apiClient.js";
import Title from "../../components/design/Title.jsx";
import Input from "../../components/design/Input.jsx";
import Button from "../../components/design/Button.jsx";

export default function TarefaDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setError("");

                const { data } = await supabase.auth.getSession();
                const token = data.session?.access_token;

                if (!token) {
                    setError("Precisas de fazer login para ver/editar a tarefa.");
                    return;
                }

                const dataTask = await getTaskById(id, token);

                if (!cancelled) {
                    setTask({
                        ...dataTask,
                        dueDate: dataTask.dueDate ? String(dataTask.dueDate).slice(0, 10) : "",
                    });
                }
            } catch (e) {
                if (!cancelled) setError(e.message || "Erro ao carregar tarefa");
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    async function handleSave() {
        try {
            const { data } = await supabase.auth.getSession();
            const token = data.session?.access_token;

            if (!token) {
                alert("Faz login primeiro.");
                return;
            }

            const payload = {
                title: task.title,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
            };

            await updateTask(id, payload, token);
            navigate("/tarefas");
        } catch (e) {
            alert(e.message || "Erro ao guardar tarefa");
        }
    }

    if (error) return <p className="text-red-600">{error}</p>;
    if (!task) return <p>A carregar...</p>;

    return (
        <div>
            <Title>Editar Tarefa #{id}</Title>

            <Input
                value={task.title || ""}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <textarea
                value={task.description || ""}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            <div className="text-sm text-gray-600">Insira a Data limite da Tarefa</div>
            <input
                type="date"
                value={task.dueDate || ""}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />

            <Button onClick={handleSave}>Guardar</Button>
        </div>
    );
}
