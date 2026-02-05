import {useEffect, useMemo, useState} from "react";
import {getTasks} from "../../api/apiClient.js";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";

export default function OverdueVsOnTrackChart() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                const data = await getTasks();
                setTasks(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                setError("Erro ao carregar tarefas.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);
    // Calcula o número de tarefas em atraso vs em dia
    const data = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // comparar só datas

        let overdue = 0;
        let onTrack = 0;

        for (const t of tasks) {
            if (
                t.status !== "TODO" &&
                t.status !== "IN_PROGRESS"
            ) {
                continue; // só tarefas abertas
            }

            if (!t.dueDate) continue;

            const due = new Date(t.dueDate);
            due.setHours(0, 0, 0, 0);

            if (due < today) overdue++;
            else onTrack++;
        }

        return [
            {label: "Overdue", count: overdue},
            {label: "On track", count: onTrack},
        ];
    }, [tasks]);

    if (loading) return <p className="text-sm text-gray-500">A carregar...</p>;
    if (error) return <p className="text-sm text-red-600">{error}</p>;

    return (
        <div style={{width: "100%", height: 260}}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="label"/>
                    <YAxis allowDecimals={false}/>
                    <Tooltip/>
                    <Bar dataKey="count"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
