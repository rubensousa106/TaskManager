import { useState } from "react";
import { createContact } from "../../api/apiClient.js";
import Input from "../../components/design/Input.jsx";
import Button from "../../components/design/Button.jsx";
import Title from "../../components/design/Title.jsx";
import {ArrowBigLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("");

        try {
            await createContact(form);
            setStatus("Mensagem enviada com sucesso!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("Erro ao enviar mensagem.");
        }
    }

    return (
        <div className="w-screen h-screen bg-gray-400 p-8">
            <div className="flex flex-col justify-center items-center relative mb-8 gap-6">
                <div className={"flex items-center gap-4"}>
                    <Button
                        onClick={() => navigate("/")}
                        title="Dashboard"
                    >
                        <ArrowBigLeft/>
                    </Button>
                    <Title>Formulário de Contacto</Title>
                </div>

                <form onSubmit={handleSubmit}
                      className="flex flex-col gap-4 w-80"
                >
                    <div>
                        <label>Nome </label>
                        <Input name="name" value={form.name} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Email </label>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Mensagem </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            className="bg-gray-200 rounded-md p-2"
                        />
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}
