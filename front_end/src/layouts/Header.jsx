import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import logo from "../assets/logo.png";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header>
      <Link to="/" className="title" onClick={handleLinkClick}>
        {""}
        <img src={logo} alt="Logo Rate-my-chars" className="logo" />
        <h1>ATE MY CHARS'</h1>
      </Link>
      <nav className={`nav-links ${isOpen ? "mobile-menu" : ""}`}>
        <ul>
          <li>
            <NavLink to="/ranking" onClick={handleLinkClick}>
              Classements
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" onClick={handleLinkClick}>
              Chars'
            </NavLink>
          </li>
          <li>
            <NavLink to="/artworks" onClick={handleLinkClick}>
              œuvres
            </NavLink>
          </li>
          {!user ? (
            <>
              <li className="log-btn">
                <NavLink to="/login">
                  <i className="fa-solid fa-circle-user"></i>
                </NavLink>
              </li>
              <li className="log-link">
                <NavLink to="/Login" onClick={handleLinkClick}>
                  Se connecter
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                {user.role === 1 && (
                  <NavLink to="/admin/dashboard">Admin</NavLink>
                )}
              </li>
              <li>
                <NavLink to="/users/dashboard">Dashboard</NavLink>
              </li>
              <li className="log-btn">
                <NavLink onClick={handleLogout}>
                  <i class="fa-solid fa-right-from-bracket"></i>
                </NavLink>
              </li>
              <li className="log-link">
                <NavLink onClick={handleLogout}>Se déconnecter</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <a href="#" className="menu-hamburger" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </a>
    </header>
  );
};

export default Header;
