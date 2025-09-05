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
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);

        if (artwork.categories && Array.isArray(artwork.categories)) {
          setSelectedCategories(artwork.categories.map((cat) => cat.id));
        } else {
          setSelectedCategories([]);
        }
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
        toast.error("Impossible de charger les catégories");
      }
    };

    fetchCategories();
  }, [artwork]);

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      console.error("Valeur de catégorie invalide:", e.target.value);
      return;
    }

    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }

    const toastId = toast.loading("Modification en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/artworks/${artwork.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: title.trim(),
            author: author.trim(),
            product_year: product_year ? parseInt(product_year, 10) : null,
            image_url: image_url.trim(),
            description: description.trim(),
            categories: selectedCategories,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || `Erreur HTTP: ${res.status}`);
      }

      const updatedArtwork = await res.json();
      toast.success(`Œuvre modifiée avec succès !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
      onEditSuccess(updatedArtwork);
    } catch (err) {
      console.error("Erreur modification artwork:", err);
      toast.error("Échec de la modification !", {
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
            Titre * :
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Auteur :
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
          <label>
            URL de l'image :
            <input
              type="url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </label>
          <fieldset>
            <legend>Catégories :</legend>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <label key={cat.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={selectedCategories.includes(cat.id)}
                    onChange={handleCategoryChange}
                  />
                  {cat.categorie || cat.name}
                </label>
              ))
            ) : (
              <p>Aucune catégorie disponible</p>
            )}
          </fieldset>
          <label>
            Année :
            <input
              type="number"
              value={product_year}
              onChange={(e) => setProductYear(e.target.value)}
              min="1000"
              max="2030"
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
