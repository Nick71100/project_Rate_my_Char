import { useState } from "react";

const EditPseudoModal = ({ currentPseudo, onConfirm, onCancel }) => {
  const [newPseudo, setNewPseudo] = useState(currentPseudo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPseudo.trim()) onConfirm(newPseudo);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier mon pseudo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPseudo}
            onChange={(e) => setNewPseudo(e.target.value)}
            placeholder="Nouveau pseudo"
            required
          />
          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Enregistrer
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

export default EditPseudoModal;
