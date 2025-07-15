import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/public.layout";
import Home from "../pages/site/Home";
import Login from "../pages/site/auth/Login";
import Register from "../pages/site/auth/Register";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import AdminLayout from "../layouts/admin/admin.layout";
import RequireAuth from "./RequireAuth";
import UsersAdmin from "../pages/admin/UsersAdmin";
import CharsAdmin from "../pages/admin/CharactersAdmin";
import ArtsAdmin from "../pages/admin/ArtworksAdmin";
import CategAdmin from "../pages/admin/CategoriesAdmin";
import Rankings from "../pages/site/Ranking";
import Characters from "../pages/site/Characters";
import Artworks from "../pages/site/Artworks";
import CharDetail from "../pages/site/DetailsCharacters";
import ArtDetail from "../pages/site/DetailsArtworks";
import DashboardUser from "../pages/user/DashboardUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharDetail />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/artworks/:id" element={<ArtDetail />} />
        <Route path="/ranking" element={<Rankings />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
        <Route element={<PublicLayout />}>
          <Route path="/users/dashboard" element={<DashboardUser />} />
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={[1]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/characters" element={<CharsAdmin />} />
          <Route path="/admin/artworks" element={<ArtsAdmin />} />
          <Route path="/admin/categories" element={<CategAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
