import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, , removeCookie] = useCookies(["discordToken"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const validateUser = async () => {
    if (cookies.discordToken) {
      await fetch("http://localhost:8080/api/auth/discord/validate", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            setUser(data.user);
          } else {
            setUser(null);
            navigate("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      navigate("/");
    }
  };

  const logout = async () => {
    removeCookie("discordToken", { path: "/", domain: "localhost" });
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    validateUser();
  }, [cookies.discordToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        validateUser,
        logout,
        isAdmin,
        setIsAdmin,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
