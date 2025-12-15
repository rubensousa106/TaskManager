import React from "react";
import { Routes, Route } from "react-router-dom";

//Público
import HomePage from "../pages/home/HomePage.jsx";
import TarefasPage from "../pages/tarefas/TarefasPage.jsx";
import ContactPage from "../pages/home/ContactPage.jsx";
//Admin
import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminContactosPage from "../pages/admin/AdminContactosPage.jsx";
import AdminTarefasPage from "../pages/admin/AdminTarefasPage.jsx";
import AdminUtilizadoresPage from "../pages/admin/AdminUtilizadoresPage.jsx";


export default function AppRouter() {
    return (
        <Routes>
            {/* Site público */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tarefas" element={<TarefasPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* Admin / CRM */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/contactos" element={<AdminContactosPage />} />
            <Route path="/admin/tarefas" element={<AdminTarefasPage />} />
            <Route path="/admin/utilizadores" element={<AdminUtilizadoresPage />} />
        </Routes>
    );
}
