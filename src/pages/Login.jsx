import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    //login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/auth/login", { email, password });
            login(res.data);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="card">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block border p-2 mb-2 w-full" required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block border p-2 mb-2 w-full" required/>
                <button className="primary">Login</button>
            </form>
        </div>
    );
}