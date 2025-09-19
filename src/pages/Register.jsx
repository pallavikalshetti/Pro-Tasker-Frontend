import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //register user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/register", { name, email, password });
            navigate("/");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed");
        }
    };


    return (
        <div className="card">
            <h2 className="text-2xl mb-4">Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block border p-2 mb-2 w-full" required/>
                <input type="email"placeholder="Email"value={email}onChange={(e) => setEmail(e.target.value)}className="block border p-2 mb-2 w-full" required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block border p-2 mb-2 w-full" required/>
                <button className="primary">Register</button>
            </form>
        </div>
    );
}