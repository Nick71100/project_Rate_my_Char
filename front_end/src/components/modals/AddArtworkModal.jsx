import { useState, useEffect } from "react";
import { toast } from "sonner";

const AddArtworkModal = ({ onCancel, onAddSuccess }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [product_year, setProductYear] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Ajout en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/artworks/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            author,
            product_year,
            image_url,
            description,
            categories: selectedCategories,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Erreur lors de l'ajout.");
      }

      const newArtwork = await res.json();
      toast.success(`Oeuvre ajoutée avec succès !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      onAddSuccess(newArtwork);
    } catch (err) {
      console.error(err);
      toast.error("Ajout d'oeuvre échoué !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une œuvre</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre :
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Auteur :
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
          <fieldset>
            <legend>Catégories :</legend>
            {categories.map((cat) => (
              <label key={cat.id}>
                <input
                  type="checkbox"
                  value={cat.id}
                  checked={selectedCategories.includes(cat.id)}
                  onChange={handleCategoryChange}
                />
                {cat.label || cat.categorie}
              </label>
            ))}
          </fieldset>
          <label>
            Année :
            <input
              type="number"
              value={product_year}
              onChange={(e) => setProductYear(e.target.value)}
              required
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            URL de l'image :
            <input
              type="text"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Ajouter
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtworkModal;
