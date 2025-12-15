import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <aside>
            <h2>Admin</h2>
            <nav>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/contactos">Contactos</Link></li>
                    <li><Link to="/admin/tarefas">Tarefas</Link></li>
                    <li><Link to="/admin/utilizadores">Utilizadores</Link></li>
                </ul>
            </nav>
        </aside>
    );
}
