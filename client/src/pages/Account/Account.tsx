import { LoginForm } from "@/components/Connexion/loginForm";
import { useUser } from "@/context/UserContext";

function Account() {
  const { isConnected, handleDisconnect } = useUser();

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
