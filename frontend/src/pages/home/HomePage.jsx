import { useNavigate } from "react-router-dom";
import Button from "../../components/design/Button.jsx";
import Title from "../../components/design/Title.jsx";

export default function HomePage() {
    const navigate = useNavigate();

    function goToTarefas() {
        navigate("/tarefas");
    }

    function goToContact() {
        navigate("/contacto");
    }

    return (
        <div className="w-screen h-screen bg-gray-400 p-6">
            <Button onClick={() => navigate("/admin/login")}>
                Login como Admin
            </Button>
            <div className="flex flex-col justify-center items-center relative mb-6 gap-4">
                <Title>Bem-vindo ao CRM</Title>
                <Title>Escolha uma opção abaixo:</Title>

                <Button onClick={goToTarefas}>
                    Ir para Tarefas
                </Button>

                <Button onClick={goToContact}>
                    Contactar
                </Button>


            </div>
        </div>
    );

}

