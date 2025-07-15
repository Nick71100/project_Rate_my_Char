import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const submitVotesWithToast = async (votes, onSuccess, onError) => {
  const toastId = toast.loading("Envoi du vote en cours...");
  try {
    const res = await fetch(`${API_URL}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ votes }),
    });

    if (!res.ok) throw new Error("Erreur lors de l'envoi du vote");

    toast.success("Vote enregistré !", {
      id: toastId,
      style: { background: "#27ae60", color: "white" },
    });

    if (onSuccess) onSuccess();
  } catch (err) {
    toast.error("Erreur lors de l'envoi du vote", { id: toastId });
    console.error(err);
    if (onError) onError(err);
  }
};
