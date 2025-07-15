import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const handleDeleteAccount = async () => {
  const toastId = toast.loading("supression en cours...");

  try {
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Compte supprimé !", {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      dispatch(logout());
      navigate("/", { replace: true });
    }
  } catch (err) {
    console.error("Erreur suppression :", err);
  }
};

const handlePseudoUpdate = async (newPseudo) => {
  const toastId = toast.loading("Modification en cours...");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pseudo: newPseudo }),
      }
    );
    if (res.ok) {
      toast.success("Pseudo changé !", {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      setUser((prev) => ({ ...prev, pseudo: newPseudo }));
      setShowEditPseudo(false);
    }
  } catch (err) {
    toast.error("Échec ddu changement de pseudo", {
      id: toastId,
      style: {
        background: "red",
        color: "white",
        width: "200px",
      },
    });
    console.error("Erreur update pseudo :", err);
  }
};

const handlePasswordChange = async ({ newPwd }) => {
  const toastId = toast.loading("Modification en cours...");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: newPwd }),
      }
    );
    if (res.ok) {
      toast.success("Mot de passe changé !", {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      setShowPwdModal(false);
    }
  } catch (err) {
    console.error("Erreur changement mot de passe :", err);
  }
};

const handleGenderChange = async ({ id_gender }) => {
  const toastId = toast.loading("Modification en cours...");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id_gender }),
      }
    );
    if (res.ok) {
      toast.success("Genre changé !", {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      setUser((prev) => ({ ...prev, id_gender }));
      setShowGenderModal(false);
    }
  } catch (err) {
    console.error("Erreur changement mot de passe :", err);
  }
};
export {
  handleDeleteAccount,
  handlePseudoUpdate,
  handlePasswordChange,
  handleGenderChange,
};
