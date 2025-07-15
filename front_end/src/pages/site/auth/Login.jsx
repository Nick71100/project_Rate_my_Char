import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/authSlice";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ pseudo: "", password: "" });
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");

    const toastId = toast.loading("Connexion en cours...");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Réponse reçue :", data);

      if (!res.ok) throw new Error(data.error || "Erreur de connexion");

      console.log(data.user);
      dispatch(setUser(data.user));

      toast.success(`Bienvenue ${data.user.pseudo} !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });

      navigate("/");
    } catch (err) {
      toast.error("Échec de la connexion", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
          width: "200px",
        },
      });
      seterror(err.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} aria-label="Connexion utilisateur">
        <h2>Connexion</h2>
        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <label htmlFor="pseudo">Pseudo</label>
        <input
          id="pseudo"
          name="pseudo"
          type="text"
          placeholder="pseudo"
          required
          value={form.pseudo}
          onChange={handleChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Se connecter</button>
      </form>

      <p>
        Pas encore inscrit ?<br />
        <Link to="/Register" className="reg-link">
          S'inscrire !
        </Link>
      </p>
    </main>
  );
};

export default Login;
