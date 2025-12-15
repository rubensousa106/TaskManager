import Title from "../../components/design/Title.jsx";
import Button from "../../components/design/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <Title>Admin Dashboard</Title>

            <p className="mt-2 text-gray-600">
                Bem-vindo à área de administração.
            </p>

            <div className="mt-6 flex gap-4">
                <Button onClick={() => navigate("/admin/tarefas")}>
                    Gerir Tarefas
                </Button>

                <Button onClick={() => navigate("/admin/contactos")}>
                    Ver Contactos
                </Button>
            </div>
        </div>
    );
}
