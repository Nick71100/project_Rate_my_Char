import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toast } from "sonner";
import {
  fetchCharacters,
  fetchCriteria,
  fetchUser,
  fetchVotes,
} from "../../services/fetchService";
import { submitVotesWithToast } from "../../services/voteService";
import VoteModal from "../../components/modals/VoteModal";
import EditPseudoModal from "../../components/modals/pseudoModal";
import ChangePasswordModal from "../../components/modals/PasswordModal";
import ConfirmDeleteModal from "../../components/modals/DeleteModal";
import EditGenderModal from "../../components/modals/GenderModal";

const DashboardUser = () => {
  const [user, setUser] = useState({});
  const [characters, setCharacters] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showEditPseudo, setShowEditPseudo] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, votes, chars, crits] = await Promise.all([
          fetchUser(),
          fetchVotes(),
          fetchCharacters(),
          fetchCriteria(),
        ]);
        setUser(user);
        setVotes(votes);
        setCharacters(chars);
        setCriteria(crits);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVoteId = (id) => {
    const vote = votes.find((v) => v.id_criteria === id);
    return vote ? vote.character_name : "Non voté";
  };

  const totalVotes = votes.length;

  const handleVoteSubmit = (votes) => {
    submitVotesWithToast(votes, () => setShowVoteModal(false));
  };

  const handleDeleteAccount = async () => {
    const toastId = toast.loading("supression en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.success("Compte supprimé !", {
          id: toastId,
          style: {
            background: "#27ae60",
            color: "white",
          },
        });
        dispatch(logout());
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
      toast.error("Échec de la suppression du compte !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handlePseudoUpdate = async (newPseudo) => {
    const toastId = toast.loading("Modification en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ pseudo: newPseudo }),
        }
      );
      if (res.ok) {
        toast.success("Pseudo changé !", {
          id: toastId,
          style: {
            background: "#27ae60",
            color: "white",
          },
        });
        setUser((prev) => ({ ...prev, pseudo: newPseudo }));
        setShowEditPseudo(false);
      }
    } catch (err) {
      toast.error("Échec ddu changement de pseudo", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
          width: "200px",
        },
      });
      console.error("Erreur update pseudo :", err);
    }
  };

  const handlePasswordChange = async ({ newPwd }) => {
    const toastId = toast.loading("Modification en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ password: newPwd }),
        }
      );
      if (res.ok) {
        toast.success("Mot de passe changé !", {
          id: toastId,
          style: {
            background: "#27ae60",
            color: "white",
          },
        });
        setShowPwdModal(false);
      }
    } catch (err) {
      console.error("Erreur changement mot de passe :", err);
      toast.error("Échec du changement du mot de passe !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleGenderChange = async ({ id_gender }) => {
    const toastId = toast.loading("Modification en cours...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id_gender }),
        }
      );
      if (res.ok) {
        toast.success("Genre changé !", {
          id: toastId,
          style: {
            background: "#27ae60",
            color: "white",
          },
        });
        setUser((prev) => ({ ...prev, id_gender }));
        setShowGenderModal(false);
      }
    } catch (err) {
      console.error("Erreur changement de genre :", err);
      toast.error("Échec du changement de genre !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="user-dashboard">
      <section>
        <h3>Mes votes</h3>
        <div className="user-stats">
          <div>
            <p>Le plus fort : {getVoteId(1)}</p>
          </div>
          <div>
            <p>Le plus stylé : {getVoteId(2)}</p>
          </div>
          <div>
            <p>Le plus intelligent : {getVoteId(3)}</p>
          </div>
          <div>
            <p>La meilleure personalité : {getVoteId(4)}</p>
          </div>
          <div>
            <p>Total de votes : {totalVotes}</p>
            <button
              className="update-btn"
              onClick={() => setShowVoteModal(true)}
            >
              Je revote !
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3>Gérer mon compte</h3>
        <p>Compte créé le : {new Date(user.created_at).toLocaleDateString()}</p>
        <div className="account">
          <div>
            <p>Mon pseudo : {user.pseudo}</p>
            <button
              className="update-btn"
              onClick={() => setShowEditPseudo(true)}
            >
              Modifier
            </button>
          </div>
          <div>
            <p>Mon adresse email : {user.email}</p>
          </div>
          <div>
            <p>Mon genre : {user.id_gender}</p>
            <button
              className="update-btn"
              onClick={() => setShowGenderModal(true)}
            >
              Modifier
            </button>
          </div>
          <div className="account-btns">
            <button
              className="change-password"
              onClick={() => setShowPwdModal(true)}
            >
              Changer mon mot de passe
            </button>
            <button
              className="delete_account"
              onClick={() => setShowDeleteModal(true)}
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </section>

      {showVoteModal && (
        <VoteModal
          characters={characters}
          criteria={criteria}
          onVote={handleVoteSubmit}
          onCancel={() => setShowVoteModal(false)}
        />
      )}

      {showEditPseudo && (
        <EditPseudoModal
          currentPseudo={user.pseudo}
          onConfirm={handlePseudoUpdate}
          onCancel={() => setShowEditPseudo(false)}
        />
      )}

      {showGenderModal && (
        <EditGenderModal
          onConfirm={handleGenderChange}
          onCancel={() => setShowGenderModal(false)}
        />
      )}

      {showPwdModal && (
        <ChangePasswordModal
          onConfirm={handlePasswordChange}
          onCancel={() => setShowPwdModal(false)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </main>
  );
};

export default DashboardUser;
