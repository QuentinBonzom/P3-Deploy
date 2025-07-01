import { useUser } from "@/context/UserContext";
import type { Member } from "@/types/TypeFiles";
import { useEffect, useState } from "react";

function memberManage() {
  const { idUserOnline } = useUser();
  const [memberMap, setMemberMap] = useState<Member[]>([]);

  const handleDelete = async (memberId: number) => {
    const token = localStorage.getItem("token");
    try {
      // Envoie d'une requête à l'adresse du serveur en utilisant la méthode "DELETE" pour supprimer un membre
      const response = await fetch(
        //api/admin/:id?=key=value
        `${import.meta.env.VITE_API_URL}/api/admin/${idUserOnline}?idToDelete=${memberId}`,
        {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      // Si tout est ok, on enlève le membre supprimé de la liste
      setMemberMap((prev) => prev.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error("Suppression échouée :", error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      console.log("Token utilisé :", token);

      if (!token) {
        console.warn("Aucun token trouvé !");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/member`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Réponse brute :", errorText);
          throw new Error("Échec de la récupération des membres");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setMemberMap(data);
        } else {
          console.error("Données inattendues :", data);
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="bg-primary/20 rounded-xl p-10 m-10">
      <h2 className="pb-5">Gestion des comptes</h2>
      <ul>
        {memberMap.map((member) => (
          <li
            className="text-secondary py-2 border-t-1 border-primary"
            key={member.id}
          >
            <p className="py-1 font-bold">
              <i className="bi bi-person-circle" /> {member.name}
            </p>
            <p className="py-1">Mail : {member.email}</p>{" "}
            <button
              className="py-1 cursor-pointer text-red-700"
              type="button"
              onClick={() => handleDelete(member.id)}
            >
              Supprimer l'utilisateur <i className="bi bi-trash3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memberManage;
