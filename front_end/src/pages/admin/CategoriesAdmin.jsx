import { useEffect, useState } from "react";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCat.trim()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categorie: newCat }),
        }
      );

      if (!res.ok) throw new Error("Erreur ajout catégorie");

      setNewCat("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    const confirm = window.confirm("Supprimer cette catégorie ?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erreur suppression catégorie");

      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCategory = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categorie: editValue }),
        }
      );

      if (!res.ok) throw new Error("Erreur modification catégorie");

      setEditingCat(null);
      setEditValue("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="admin-main">
      <section>
        <h3>Catégories</h3>

        <div className="admin-form">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Nouvelle catégorie"
          />
          <button onClick={handleAddCategory}>Ajouter</button>
        </div>

        <div className="admin-cards">
          {categories.map((cat) => (
            <div key={cat.id} className="admin-card">
              {editingCat === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleEditCategory(cat.id)}>
                    Valider
                  </button>
                  <button onClick={() => setEditingCat(null)}>Annuler</button>
                </>
              ) : (
                <>
                  <p>{cat.categorie}</p>
                  <button
                    onClick={() => {
                      setEditingCat(cat.id);
                      setEditValue(cat.categorie);
                    }}
                  >
                    Modifier
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)}>
                    Supprimer
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoriesAdmin;
