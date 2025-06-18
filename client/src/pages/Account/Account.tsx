import { LoginForm } from "@/components/Connexion/loginForm";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

function Account() {
  const { setIsConnected, isConnected } = useUser();

  useEffect(() => {
    const connected = localStorage.getItem("UserConnected");
    if (connected) {
      setIsConnected(true);
    }
  }, [setIsConnected]);

  function handleDisconnect() {
    localStorage.removeItem("UserConnected");
    setIsConnected(false);
    window.location.reload();
  }

  return (
    <>
      {isConnected ? (
        <section>
          <h1>account</h1>

          <button
            onClick={() => handleDisconnect()}
            className="p-2 rounded-xl bg-primary"
            type="button"
          >
            Se déconnecter
          </button>
        </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default Account;
