import { useState } from "react";

const ChangePasswordModal = ({ onConfirm, onCancel }) => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    onConfirm({ currentPwd, newPwd });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Changer mon mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Mot de passe actuel"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Valider
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

export default ChangePasswordModal;
