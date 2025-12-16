import { useEffect, useMemo, useState } from "react";
import { getContacts } from "../../api/apiClient.js";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

export default function TopEmailDomainsChart() {
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

    const data = useMemo(() => {
        const freq = new Map();

        for (const c of contacts) {
            const email = (c.email || "").trim().toLowerCase();
            const at = email.indexOf("@");
            if (at === -1) continue;

            const domain = email.slice(at + 1);
            if (!domain) continue;

            freq.set(domain, (freq.get(domain) || 0) + 1);
        }

        return Array.from(freq.entries())
            .map(([domain, count]) => ({ domain, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [contacts]);

    if (loading) return <p className="text-sm text-gray-500">A carregar...</p>;
    if (error) return <p className="text-sm text-red-600">{error}</p>;

    return (
        <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
