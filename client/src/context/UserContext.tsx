import type { TypeUser } from "@/types/TypeFiles";
import { type ReactNode, createContext, useContext, useState } from "react";

//Interface pour Children Joker du Typage
interface ContextInterface {
  children: ReactNode;
}

//interface (variable = typage classic avec option Undefined) + SET(variable = typage React.Dispatch<React.SetStateAction<Type> | undefined)
interface UserContextValue {
  userOnline: TypeUser[] | undefined;
  isConnected: boolean;
  setUserOnline: React.Dispatch<React.SetStateAction<TypeUser[] | undefined>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: ContextInterface) {
  const [userOnline, setUserOnline] = useState<TypeUser[] | undefined>([]);
  const [isConnected, setIsConnected] = useState(false);

  //return provider
  return (
    <UserContext.Provider
      value={{ userOnline, setUserOnline, isConnected, setIsConnected }}
    >
      {children}
    </UserContext.Provider>
  );
}
//creation hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Erreur Provider");
  }
  return context;
};
