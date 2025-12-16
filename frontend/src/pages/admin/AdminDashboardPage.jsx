import Title from "../../components/design/Title.jsx";
import Button from "../../components/design/Button.jsx";
import { useNavigate } from "react-router-dom";

// IMPORTA OS GRÁFICOS (componentes ou código inline)
import AgingChart from "../../components/dashboard/AgingChart.jsx";
import ContactsPerDayChart from "../../components/dashboard/ContactsPerDayChart.jsx";
import TopEmailDomainsChart from "../../components/dashboard/TopEmailDomainsChart.jsx";
import OverdueVsOnTrackChart from "../../components/dashboard/OverdueVsOnTrackChart.jsx";


export default function AdminDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <Title>Admin Dashboard</Title>

            <p className="mt-2 text-gray-600">
                Bem-vindo à área de administração.
            </p>

            {/* GRID PRINCIPAL */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUNA ESQUERDA */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border rounded-md p-4">
                        <h2 className="font-semibold mb-2">Ações rápidas</h2>

                        <div className="flex flex-col gap-3">
                            <Button onClick={() => navigate("/admin/tarefas")}>
                                Gerir Tarefas
                            </Button>

                            <Button onClick={() => navigate("/admin/contactos")}>
                                Ver Contactos
                            </Button>
                        </div>
                    </div>
                </div>

                {/* COLUNA DIREITA — GRÁFICOS */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* AGING */}
                    <div className="border rounded-md p-4 md:col-span-2">
                        <h2 className="font-semibold mb-3">
                            Aging (TODO + IN_PROGRESS)
                        </h2>
                        <AgingChart/>
                    </div>

                    {/* OVERDUE VS ON TRACK */}
                    <div className="border rounded-md p-4">
                        <h2 className="font-semibold mb-3">
                            Overdue vs On track
                        </h2>
                        <OverdueVsOnTrackChart/>
                    </div>

                    {/* CONTACTOS POR DIA */}
                    <div className="border rounded-md p-4">
                        <h2 className="font-semibold mb-3">
                            Contactos por dia (14 dias)
                        </h2>
                        <ContactsPerDayChart/>
                    </div>

                    {/* TOP DOMÍNIOS */}
                    <div className="border rounded-md p-4">
                        <h2 className="font-semibold mb-3">
                            Top domínios de email
                        </h2>
                        <TopEmailDomainsChart/>
                    </div>



                </div>
            </div>
        </div>
    );
}
