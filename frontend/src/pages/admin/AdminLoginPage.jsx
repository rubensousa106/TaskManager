import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/design/Title.jsx";
import Input from "../../components/design/Input.jsx";
import Button from "../../components/design/Button.jsx";
import { login } from "../../api/apiClient.js";

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    // Função para tratar o envio do formulário de login
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await login(username, password);
            navigate("/admin/dashboard");
        } catch (err) {
            console.error(err);
            setError("Credenciais inválidas");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 text-center p-6 border rounded-md shadow-md">
            <Title>Admin Login</Title>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500">{error}</p>}

                <Button type="submit">Entrar</Button>
            </form>
        </div>
    );
}
