import { useEffect, useMemo, useState } from "react";
import { getTasks } from "../../api/apiClient.js";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const AGING_BUCKETS = [
    { label: "0–2d", min: 0, max: 2 },
    { label: "3–7d", min: 3, max: 7 },
    { label: "8–14d", min: 8, max: 14 },
    { label: "15–30d", min: 15, max: 30 },
    { label: "30+d", min: 31, max: 99999 },
];

function daysBetween(dateA, dateB) {
    const ms = dateA.getTime() - dateB.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export default function AgingChart() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                const t = await getTasks();
                setTasks(Array.isArray(t) ? t : []);
            } catch (e) {
                console.error(e);
                setError("Não foi possível carregar tasks.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const data = useMemo(() => {
        const now = new Date();
        const openTasks = tasks.filter(
            (t) => t.status === "TODO" || t.status === "IN_PROGRESS"
        );

        const buckets = AGING_BUCKETS.map((b) => ({ label: b.label, count: 0 }));

        for (const t of openTasks) {
            if (!t.createdAt) continue;
            const created = new Date(t.createdAt);
            if (Number.isNaN(created.getTime())) continue;

            const ageDays = daysBetween(now, created);
            const idx = AGING_BUCKETS.findIndex((b) => ageDays >= b.min && ageDays <= b.max);
            if (idx >= 0) buckets[idx].count += 1;
        }

        return buckets;
    }, [tasks]);

    if (loading) return <p className="text-sm text-gray-500">A carregar...</p>;
    if (error) return <p className="text-sm text-red-600">{error}</p>;

    return (
        <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
