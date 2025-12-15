import React from "react";

export default function AdminLoginPage() {
    // mais tarde: enviar credenciais para backend (/api/auth/login) e guardar token
    return (
        <div>
            <h1>Admin Login</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
