import { useState } from "react";
import { useEffect } from "react";

function DashboardAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/dashboard`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setData(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="admin-main">
      <h3>Bienvenue sur l'espace d'administration du site.</h3>
      <section>
        <h4>Stats du site : </h4>
        <div className="admin-stats">
          <p>Utilisateurs : {data.users}</p>
          <p>Personnages : {data.characters}</p>
          <p>Oeuvres : {data.artworks}</p>
        </div>
      </section>
    </main>
  );
}

export default DashboardAdmin;
