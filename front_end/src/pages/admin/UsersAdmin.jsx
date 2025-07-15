import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../components/modals/DeleteModal";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${selectedUserId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
        setShowDeleteModal(false);
      } else {
        console.error("Erreur suppression utilisateur");
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="admin-main">
      <h3>Utilisateurs</h3>
      <section>
        <div className="admin-users">
          <div className="admin-cards">
            {users.map((user) => (
              <div className="admin-card" key={user.id}>
                <p>- {user.pseudo}</p>
                <p>{user.email}</p>
                <p>Email verifié : {user.email_verified}</p>
                <p>Genre : {user.id_gender}</p>
                <p>Rôle : {user.id_role}</p>
                <button
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowDeleteModal(true);
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setSelectedUserId(null);
            setShowDeleteModal(false);
          }}
        />
      )}
    </main>
  );
};

export default UsersAdmin;
