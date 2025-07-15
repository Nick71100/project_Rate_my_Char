import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditArtworkModal = ({ artwork, onCancel, onEditSuccess }) => {
  const [title, setTitle] = useState(artwork.title || "");
  const [author, setAuthor] = useState(artwork.author || "");
  const [product_year, setProductYear] = useState(artwork.product_year || "");
  const [image_url, setImageUrl] = useState(artwork.image_url || "");
  const [description, setDescription] = useState(artwork.description || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
        setSelectedCategories(artwork.categories.map((cat) => cat.id));
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
      }
    };

    fetchCategories();
  }, [artwork]);

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Modification en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/artworks/${artwork.id}`,
        {
          method: "PATCH",
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
        throw new Error(
          errorData?.message || "Erreur lors de la modification."
        );
      }

      const updatedArtwork = await res.json();
      toast.success(`Oeuvre modifiée avec succès !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      onEditSuccess(updatedArtwork);
    } catch (err) {
      console.error(err);
      toast.error("Echec de la modifictaion !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier l'œuvre</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre :
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Auteur :
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
          <label>
            URL de l'image :
            <input
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
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
                {cat.categorie}
              </label>
            ))}
          </fieldset>
          <label>
            Année :
            <input
              type="number"
              value={product_year}
              onChange={(e) => setProductYear(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Modifier
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

export default EditArtworkModal;
