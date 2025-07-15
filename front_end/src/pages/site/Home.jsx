import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "../../components/slider";
import { fetchCharacters, fetchCriteria } from "../../services/fetchService";
import { submitVotesWithToast } from "../../services/voteService";
import VoteModal from "../../components/modals/VoteModal";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chars, crits] = await Promise.all([
          fetchCharacters(),
          fetchCriteria(),
        ]);
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

  const handleVoteSubmit = (votes) => {
    submitVotesWithToast(votes, () => setShowVoteModal(false));
  };

  const handleCharacterAdded = (newCharacter) => {
    setCharacters((prev) => [...prev, newCharacter]);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main>
      <Slider />

      <section className="vote">
        <h2>
          Votez sur <em>Rate My Chars' </em>
        </h2>
        <p>
          Rate My Chars est un site qui répertorie des personnages issus
          d'oeuvres de fiction, où vous pouvez mettre en avant vos personnages
          préféré !
        </p>
        <p>
          Vous êtes persuadés que San Goku est plus fort que Superman ?, que
          Roronoa Zoro est plus stylé que Sasuke Uchiwa ??...
        </p>
        <p>Votez ! ce site établira un classement pour tous les départager !</p>
        <button
          onClick={() => (user ? setShowVoteModal(true) : navigate("/login"))}
        >
          Voter maintenant !
        </button>
      </section>

      <section className="top-rate">
        <h2>Têtes de classements :</h2>
        <div className="cards">
          {characters.slice(0, 4).map((char) => (
            <div className="card" key={char.id}>
              <Link to={`/characters/${char.id}`}>
                <h3>{char.name}</h3>
                <img src={char.image_url} alt="image du personnage" />
                <p>{char.short_desc}</p>
                <p>Oeuvre : {char.id_artwork}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {showVoteModal && (
        <VoteModal
          characters={characters}
          criteria={criteria}
          onVote={handleVoteSubmit}
          onCancel={() => setShowVoteModal(false)}
          onCharacterAdded={handleCharacterAdded}
        />
      )}
    </main>
  );
}

export default Home;
