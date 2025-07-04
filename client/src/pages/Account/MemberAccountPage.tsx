import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

interface accountPageType {
  id: number;
  email: string;
  name: string;
  password: string;
  admin: boolean;
}

function MemberAccountPage() {
  const { idUserOnline, isAdmin } = useUser();
  const [profile, setProfile] = useState<accountPageType[]>([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/member/${idUserOnline}/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token") || ""}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setProfile)
      .catch((err) => {
        console.error("Erreur lors de la récupération des commentaires :", err);
      });
  }, [idUserOnline]);

  return (
    <section>
      {profile.map((pro) => (
        <article key={pro.id}>
          <h2>{pro.name}</h2>
          {isAdmin ? (
            <button type="button" className="bg-green-700 px-2 py-1 rounded-xl">
              Admin
            </button>
          ) : (
            <button type="button" className="bg-blue-700 px-2 py-1 rounded-xl">
              Member
            </button>
          )}
          <p>Email : {pro.email}</p>
        </article>
      ))}
    </section>
  );
}

export default MemberAccountPage;
