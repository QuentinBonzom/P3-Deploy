import type { TypeUser } from "@/types/TypeFiles";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

//Interface pour Children Joker du Typage
interface ContextInterface {
  children: ReactNode;
}

//Interface (variable = typage classic avec option Undefined) + SET(variable = typage React.Dispatch<React.SetStateAction<Type> | undefined)
interface UserContextValue {
  // userOnline: string; // Commented out or remove if not used elsewhere
  isConnected: boolean;
  email: string;
  password: string;
  user: TypeUser;
  // setUserOnline: React.Dispatch<React.SetStateAction<string>>; // Commented out or remove if not used elsewhere
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<TypeUser>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDisconnect: () => void;
  idUserOnline: number | null;
}

// creation du context
const UserContext = createContext<UserContextValue | undefined>(undefined);

//Creation composant Provider (appliquant le context sur tout les enfants)
export function UserProvider({ children }: ContextInterface) {
  //Initialisation du State avec la conversion du LocalStorage en String.
  const [idUserOnline, setIdUserOnline] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState<TypeUser>({
    name: "",
    email: "",
    password: "",
  });

  // Verification du Token --------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && isConnected) {
      setIsConnected(false);
    }
  }, [isConnected]);

  ////////////Fait pas attention à ça////////////////////

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isConnected) {
      fetch(`${import.meta.env.VITE_API_URL}/api/member`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data.message !== " Unauthorized") {
            setIsConnected(true);
            setIdUserOnline(data.id);
          } else {
            setIsConnected(false);
            setIdUserOnline(null);
          }
        });
    }
  }, []);

  // Creation du Token -----------------------------------------

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      localStorage.setItem("token", data.token); // stocké en string
      setIsConnected(true);
      setIdUserOnline(data.userId);
      navigate("/Compte");
    } else {
      setIsConnected(false);
      setIdUserOnline(null);
      navigate("/Compte");
      alert("Compte inconnu");
    }
  }

  async function handleSubmitSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsConnected(true);
      navigate("/Compte");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // Supression Token avec bouton --------------------------------
  function handleDisconnect() {
    localStorage.removeItem("token");
    setIsConnected(false);
    // window.location.reload();
  }

  // console.log(isConnected);
  //return provider avec tout les UseState/ logique / fetch Applicable sur les composants ou App.tsx consommant le context
  return (
    <UserContext.Provider
      value={{
        isConnected,
        setIsConnected,
        email,
        setEmail,
        password,
        setPassword,
        handleDisconnect,
        handleSubmit,
        handleSubmitSignUp,
        handleChange,
        user,
        setUser,
        idUserOnline,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

//creation useHook pour consommer le context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Erreur Provider");
  }
  return context;
};
