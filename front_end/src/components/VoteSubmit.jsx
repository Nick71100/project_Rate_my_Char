import { toast } from "sonner";

const HandleVoteSubmit = async (votes) => {
  const toastId = toast.loading("Connexion en cours...");
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ votes }),
    });

    if (res.ok) {
      toast.success(`Vote enregistré !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
    }
  } catch (err) {
    console.error("Erreur lors de l'envoi des votes :", err);
  }
};

export default HandleVoteSubmit;
