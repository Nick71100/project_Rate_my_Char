import { useState } from "react";
import { toast } from "sonner";

const AddCharacterModal = ({
  onCancel,
  onAddSuccess,
  userId,
  defaultArtworkId = 1,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Ajout en cours...");

    if (!name.trim()) {
      toast.warning("Le nom du personnage est requis.");
      return;
    }

    setLoading(true);

    try {
      const newCharacter = {
        name,
        short_desc: "à compléter",
        long_desc: "à compléter",
        image_url: "image_url.webp",
        id_gender: 3,
        id_artwork: defaultArtworkId,
        id_user: userId,
      };

      console.log("Payload envoyé :", newCharacter);

      const response = await fetch("http://localhost:3000/characters/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCharacter),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data?.message || "Erreur lors de l'ajout du personnage."
        );
      }

      const created = await response.json();
      toast.success(`Personnage ajouté à la liste !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      onAddSuccess({
        id: created.id,
        ...newCharacter,
      });
    } catch (error) {
      toast.error("Ajout de personnage échoué !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter un personnage</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom du personnage</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? "Ajout en cours..." : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCharacterModal;
