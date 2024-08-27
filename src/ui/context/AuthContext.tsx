import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authController } from "@ui/controller/authentication";
import { LoginInputs } from "@ui/schema/login";
import router from "next/router";
import { LoaderCircle } from "lucide-react";
import { showFailedLoginToast, showLogoutToast } from "@ui/toasts/login";

interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: ({ credential }: handleLoginProps) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: function () {
    throw new Error("Function not implemented.");
  },
  handleLogin: function () {
    throw new Error("Function not implemented.");
  },
  handleLogout: function (): void {
    throw new Error("Function not implemented.");
  },
});

interface handleLoginProps {
  credential: LoginInputs;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      // TODO: validate token on API
      setAuth(true);
    }
    setLoading(false);
  }, []);

  function handleLogin({ credential }: handleLoginProps) {
    authController
      .authenticate({
        credential,
      })
      .then((response) => {
        const accessToken = response.access_token;
        localStorage.setItem("access-token", accessToken);
        setAuth(true);
        router.push("/manage");
      })
      .catch((error) => {
        console.error(error);
        showFailedLoginToast();
      });
  }

  function handleLogout() {
    showLogoutToast();
    localStorage.removeItem("access-token");
    router.push("/").then(() => {
      setAuth(false);
    });
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircle className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}
