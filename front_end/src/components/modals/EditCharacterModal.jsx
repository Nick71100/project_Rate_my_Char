import { useState } from "react";
import { toast } from "sonner";

const EditCharacterForm = ({
  character,
  genders,
  artworks,
  onCancel,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: character.name || "",
    short_desc: character.short_desc || "",
    long_desc: character.long_desc || "",
    image_url: character.image_url || "",
    id_gender: character.id_gender || "",
    id_artwork: character.id_artwork || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Modification en cours...");

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${character.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            id_user: character.id_user,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || "Erreur lors de la mise à jour.");
      }

      toast.success(`Personnage modifié avec succès !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      onUpdateSuccess();
    } catch (error) {
      toast.error("Echec de la modifictaion !", {
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
        <h2>Modifier un personnage</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Courte description :
            <input
              type="text"
              name="short_desc"
              value={formData.short_desc}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description longue :
            <textarea
              name="long_desc"
              value={formData.long_desc}
              onChange={handleChange}
            />
          </label>

          <label>
            URL de l’image :
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </label>

          <label>
            Genre :
            <select
              name="id_gender"
              value={formData.id_gender}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner --</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.gender}
                </option>
              ))}
            </select>
          </label>

          <label>
            Œuvre :
            <select
              name="id_artwork"
              value={formData.id_artwork}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner --</option>
              {artworks.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Mise à jour..." : "Enregistrer"}
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCharacterForm;
