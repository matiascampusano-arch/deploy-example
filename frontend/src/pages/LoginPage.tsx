import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Del Webinar 1 — tipo unión para el estado de la petición.
type RequestStatus = "idle" | "loading" | "success" | "error";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValid = email.includes("@") && password.length >= 6;
  const isSubmitting = status === "loading";

  // Del Webinar 1 — ya funciona, no hace falta tocar nada acá hoy.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("loading");
    try {
      await login(email, password);
      setStatus("success");
      navigate("/");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </label>
      {status === "error" && <p className="error">{error}</p>}
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
      </button>
      <p>
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </form>
  );
}
