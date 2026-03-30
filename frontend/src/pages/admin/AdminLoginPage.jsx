import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // se já estiver logado, salta
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) navigate("/tarefas");
        });
    }, [navigate]);

    async function handleLogin(e) {
        e.preventDefault();
        setErr("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErr(error.message);
            return;
        }

        if (data.session) navigate("/tarefas");
    }

    return (
        <div style={{ maxWidth: 420, margin: "40px auto" }}>
            <h2>Admin Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginTop: 12, padding: 10 }}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginTop: 12, padding: 10 }}
                />

                {err && <p style={{ color: "red" }}>{err}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", marginTop: 12, padding: 10 }}
                >
                    {loading ? "A entrar..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
