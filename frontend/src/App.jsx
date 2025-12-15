import TarefasPage from "./pages/tarefas/TarefasPage.jsx";
import { createTask } from "./api/apiClient.js";

function App() {
    // esta função fala com o backend e devolve a nova tarefa criada
    async function onCreateTaskClick(title, description) {

        console.log("onCreateTaskClick chamado com:", { title, description });

        const newTask = await createTask({
            title: title,
            description: description,
            status: "TODO", // default
        });

        console.log("Resposta do backend (newTask):", newTask);
        return newTask; // TarefasPage depois usa isto para atualizar a lista
    }

    return <TarefasPage onCreateTaskClick={onCreateTaskClick} />;
}

export default App;
