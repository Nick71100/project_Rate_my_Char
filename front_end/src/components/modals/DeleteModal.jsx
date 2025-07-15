import React from "react";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Confirmer la suppression</h2>
        <p>
          Es-tu sûr de vouloir supprimer le compte ? Cette action est
          irréversible.
        </p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Oui, supprimer
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
