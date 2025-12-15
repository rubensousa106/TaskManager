import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../api/apiClient";
import Title from "../../components/design/Title.jsx";
import Input from "../../components/design/Input.jsx";
import Button from "../../components/design/Button.jsx";

export default function TarefaDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        async function load() {
            const data = await getTaskById(id);
            setTask(data);
        }
        load();
    }, [id]);

    async function handleSave() {
        await updateTask(id, task);
        navigate("/tarefas");
    }

    if (!task) return <p>A carregar...</p>;

    return (
        <div>
            <Title>Editar Tarefa #{id}</Title>

            <Input
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            <Button
                onClick={handleSave}
            >
                Guardar
            </Button>
            
        </div>
    );
}
