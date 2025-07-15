import { useState } from "react";
import AddCharacterModal from "./AddChararcterModal";

const VoteModal = ({
  characters,
  criteria,
  onVote,
  onCancel,
  onCharacterAdded,
}) => {
  const [selectedVotes, setSelectedVotes] = useState({});
  const [showAddCharModal, setShowAddCharModal] = useState(false);

  const handleChange = (criteriaId, characterId) => {
    setSelectedVotes((prev) => ({
      ...prev,
      [criteriaId]: characterId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedVotes = Object.entries(selectedVotes).map(
      ([id_criteria, id_character]) => ({
        id_criteria: Number(id_criteria),
        id_character: Number(id_character),
      })
    );

    if (formattedVotes.length === 0) {
      alert("Veuillez voter au moins pour un critère.");
      return;
    }

    onVote(formattedVotes);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Votez pour vos personnages préférés</h2>
        <form onSubmit={handleSubmit}>
          {criteria.map((crit) => (
            <div key={crit.id} className="form-group">
              <label>{crit.label}</label>
              <select
                value={selectedVotes[crit.id] || ""}
                onChange={(e) =>
                  handleChange(crit.id, parseInt(e.target.value))
                }
              >
                <option value="">-- Choisir un personnage --</option>
                {characters.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <p className="add-char-link">
            Personnage manquant ?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => setShowAddCharModal(true)}
            >
              Ajouter un personnage
            </button>
          </p>

          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Envoyer mes votes
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Annuler
            </button>
          </div>
        </form>

        {showAddCharModal && (
          <AddCharacterModal
            onCancel={() => setShowAddCharModal(false)}
            onAddSuccess={(newCharacter) => {
              onCharacterAdded(newCharacter);
              setShowAddCharModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VoteModal;
