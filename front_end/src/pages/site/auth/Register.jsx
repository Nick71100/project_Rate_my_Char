import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    id_gender: 0,
  });
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "id_gender" ? (value === "" ? 0 : parseInt(value, 10)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");

    const toastId = toast.loading("Inscription en cours...");

    if (form.password !== form.confirmPassword) {
      seterror("Les mots de passe ne correspondent pas");
      toast.dismiss(toastId);
      return;
    }

    if (form.password.length < 8) {
      seterror("Le mot de passe doit contenir au moins 8 caractères");
      toast.dismiss(toastId);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          pseudo: form.pseudo,
          email: form.email,
          password: form.password,
          id_gender: form.id_gender === 0 ? undefined : form.id_gender,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors
            .map((err) => err.message)
            .join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Erreur d'inscription");
      }

      toast.success(`Vous ètes inscrit !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });

      navigate("/login");
    } catch (err) {
      seterror(err.message);
      toast.error("Échec de l'inscription !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} aria-label="Inscription utilisateur">
        <h2>Inscription</h2>
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
          placeholder="entrez votre pseudo"
          required
          value={form.pseudo}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="entrez votre email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <p>( un email de confirmation vous sera envoyé )</p>

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="entrez votre mot de passe"
          value={form.password}
          onChange={handleChange}
        />
        <p>
          ( le mot de passe doit contenir au moins 8 caractères, avec au moins
          une majuscule, une minuscule et un chiffre )
        </p>

        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="confirmez votre mot de passe"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="gender">Genre</label>
        <select
          id="gender"
          name="id_gender"
          required
          value={form.id_gender}
          onChange={handleChange}
        >
          <option value="">-- Sélectionnez un genre --</option>
          <option value="1">Homme</option>
          <option value="2">Femme</option>
          <option value="3">Autre</option>
          <option value="4">Préfère ne pas dire</option>
        </select>
        <p>
          ( selectionner un genre permettra d'approfondir les classements en
          fonctions du genre des utilisateurs )
        </p>

        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà inscrit ?<br />
        <Link to="/Login" className="reg-link">
          Se connecter !
        </Link>
      </p>
    </main>
  );
};

export default Register;
