import { useEffect, useMemo, useState } from "react";
import { getContacts } from "../../api/apiClient.js";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

// Formata uma data como "YYYY-MM-DD"
function formatDayKey(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
// Componente do gráfico de contactos por dia
export default function ContactsPerDayChart() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                const c = await getContacts();
                setContacts(Array.isArray(c) ? c : []);
            } catch (e) {
                console.error(e);
                setError("Não foi possível carregar contactos.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    // Calcula os contactos por dia nos últimos 14 dias
    const data = useMemo(() => {
        const days = 14;
        const now = new Date();

        const base = [];
        // Inicializa os últimos 14 dias com contagem zero
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const key = formatDayKey(d);
            base.push({ day: key, count: 0 });
        }

        const map = new Map(base.map((x) => [x.day, x]));
        // Conta os contactos criados em cada dia
        for (const c of contacts) {
            if (!c.createdAt) continue;
            const d = new Date(c.createdAt);
            if (Number.isNaN(d.getTime())) continue;

            const key = formatDayKey(d);
            if (map.has(key)) map.get(key).count += 1;
        }

        return base;
    }, [contacts]);

    if (loading) return <p className="text-sm text-gray-500">A carregar...</p>;
    if (error) return <p className="text-sm text-red-600">{error}</p>;

    return (
        <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
