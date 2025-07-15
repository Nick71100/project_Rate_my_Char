import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminLayout = () => {
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
    <>
      <header>
        <Link to="/admin/dashboard">
          <h1>Dashboard Admin</h1>
        </Link>

        <nav className={`nav-links ${isOpen ? "mobile-menu" : ""}`}>
          <ul>
            <li>
              <NavLink to="/admin/users" onClick={handleLinkClick}>
                Utilisateurs
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/characters" onClick={handleLinkClick}>
                Chars'
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/artworks" onClick={handleLinkClick}>
                Oeuvres
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/categories" onClick={handleLinkClick}>
                Catégories
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLinkClick}>
                Retour au site
              </NavLink>
            </li>
          </ul>
        </nav>
        <a href="#" className="menu-hamburger" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </a>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
