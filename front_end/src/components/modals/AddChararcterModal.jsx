import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AddCharacterModal = ({
  onCancel,
  onAddSuccess,
  defaultArtworkId = 1,
}) => {
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [idGender, setIdGender] = useState("");
  const [idArtwork, setIdArtwork] = useState(defaultArtworkId);
  const [loading, setLoading] = useState(false);

  const [genders, setGenders] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const authState = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  if (!userId) {
    console.error("Utilisateur non connecté");
    return <div>Erreur : vous devez être connecté</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gendersRes, artworksRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/genders`, {
            credentials: "include",
          }),
          fetch(`${import.meta.env.VITE_API_URL}/artworks`, {
            credentials: "include",
          }),
        ]);

        if (gendersRes.ok) {
          const gendersData = await gendersRes.json();
          setGenders(gendersData);
        } else {
          console.error("Erreur chargement genres");
        }

        if (artworksRes.ok) {
          const artworksData = await artworksRes.json();
          setArtworks(artworksData);
        } else {
          console.error("Erreur chargement œuvres");
        }
      } catch (error) {
        console.error("Erreur chargement données :", error);
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Le nom du personnage est requis.");
      return;
    }
    if (!shortDesc.trim()) {
      toast.warning("La description courte est requise.");
      return;
    }
    if (!idGender) {
      toast.warning("Veuillez sélectionner un genre.");
      return;
    }
    if (!idArtwork) {
      toast.warning("Veuillez sélectionner une œuvre.");
      return;
    }

    const toastId = toast.loading("Ajout en cours...");
    setLoading(true);

    try {
      const newCharacter = {
        name: name.trim(),
        short_desc: shortDesc.trim(),
        long_desc: longDesc.trim() || "",
        image_url: imageUrl.trim() || "",
        id_gender: parseInt(idGender),
        id_artwork: parseInt(idArtwork),
        id_user: userId,
      };

      console.log("Payload envoyé :", newCharacter);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newCharacter),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data?.message || "Erreur lors de l'ajout du personnage."
        );
      }

      const created = await response.json();

      toast.success(created.message || "Personnage soumis avec succès !", {
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
      console.error("Erreur:", error);
      toast.error(error.message || "Ajout de personnage échoué !", {
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
        <h2>Proposer un nouveau personnage</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Nom du personnage <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Son Goku"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortDesc">
              Description courte <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="shortDesc"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Description en quelques mots (150 caractères max)"
              maxLength="150"
              rows="2"
              disabled={loading}
              required
            />
            <small>{shortDesc.length}/150 caractères</small>
          </div>

          <div className="form-group">
            <label htmlFor="longDesc">Description détaillée (optionnel)</label>
            <textarea
              id="longDesc"
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              placeholder="Description plus détaillée (1000 caractères max)"
              maxLength="1000"
              rows="3"
              disabled={loading}
            />
            <small>{longDesc.length}/1000 caractères</small>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de l'image (optionnel)</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idGender">
              Genre <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="idGender"
              value={idGender}
              onChange={(e) => setIdGender(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">-- Choisir un genre --</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idArtwork">
              Œuvre <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="idArtwork"
              value={idArtwork}
              onChange={(e) => setIdArtwork(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">-- Choisir une œuvre --</option>
              {artworks.map((artwork) => (
                <option key={artwork.id} value={artwork.id}>
                  {artwork.title}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              background: "#d1ecf1",
              border: "1px solid #bee5eb",
              borderRadius: "8px",
              padding: "1rem",
              margin: "1rem 0",
              fontSize: "0.9rem",
            }}
          >
            <p>
              <strong>📝 Important :</strong>
            </p>
            <ul style={{ margin: "0.5rem 0", paddingLeft: "1.2rem" }}>
              <li>Votre personnage sera examiné par un administrateur</li>
              <li>Il apparaîtra sur le site seulement après validation</li>
              <li>Vérifiez que le personnage n'existe pas déjà</li>
            </ul>
          </div>

          <div className="modal-actions">
            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? "Envoi en cours..." : "Proposer le personnage"}
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
