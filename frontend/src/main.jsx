import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home/HomePage.jsx";
import ContactPage from "./pages/home/ContactPage.jsx";
import TarefasPage from "./pages/tarefas/TarefasPage.jsx";
import TarefaDetailsPage from "./pages/tarefas/TarefaDetailsPage.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import App from "./App.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminTarefasPage from "./pages/admin/AdminTarefasPage.jsx";
import AdminTarefaDetailsPage from "./pages/admin/AdminTarefaDetailsPage.jsx";

const router = createBrowserRouter([
    //Home
    { path: "/", element: <HomePage /> },
    { path: "/contacto", element: <ContactPage /> },
    // Tarefas
    /* O TarefasPage recebe onCreateTaskClick() como prop via App.jsx,
    entao é necessario renderizar o App */
    { path: "/tarefas", element: <App /> },
    { path: "/tarefas/:id", element: <TarefaDetailsPage /> },
    // Admin
    {path: "/admin/login", element: <AdminLoginPage />},
    { path: "/admin/dashboard", element: <AdminDashboardPage /> },
    { path: "/admin/tarefas", element: <AdminTarefasPage /> },
    { path: "/admin/tarefas/:id", element: <AdminTarefaDetailsPage /> },





]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
