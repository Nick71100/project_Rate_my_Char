import { useState } from "react";

const EditGenderModal = ({ currentGender, onConfirm, onCancel }) => {
  const [newGender, setNewGender] = useState(currentGender);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGender) onConfirm({ id_gender: newGender });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier mon genre</h2>
        <form onSubmit={handleSubmit}>
          <select
            id="gender"
            name="id_gender"
            required
            value={newGender}
            onChange={(e) => setNewGender(e.target.value)}
          >
            <option value="">-- Sélectionnez un genre --</option>
            <option value="1">Homme</option>
            <option value="2">Femme</option>
            <option value="3">Autre</option>
            <option value="4">Préfère ne pas dire</option>
          </select>
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

export default EditGenderModal;
