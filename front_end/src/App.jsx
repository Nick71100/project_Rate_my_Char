import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data.user));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <Toaster position="bottom-right" duration={4000} />
      <AppRoutes />
    </>
  );
};

export default App;
