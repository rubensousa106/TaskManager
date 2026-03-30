import TarefasPage from "./pages/tarefas/TarefasPage.jsx";
import { createTask } from "./api/apiClient.js";

function App({ session }) {
    async function onCreateTaskClick(title, description) {
        const token = session?.access_token; // JWT do supabase

        const newTask = await createTask(
            {
                title,
                description,
                status: "TODO",
            },
            token
        );

        return newTask;
    }

    return <TarefasPage onCreateTaskClick={onCreateTaskClick} session={session} />;
}

export default App;
