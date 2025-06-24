import type { Member } from "@/types/TypeFiles";
import { useEffect, useState } from "react";

function memberManage() {
  const [memberMap, setMemberMap] = useState<Member[]>([]);
  const handleDelete = async (memberId: number) => {
    try {
      // Envoie d'une requête à l'adresse du serveur en utilisant la méthode "DELETE" pour supprimer un membre
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/${memberId}`,
        {
          method: "DELETE",
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
    fetch(`${import.meta.env.VITE_API_URL}/api/member`)
      .then((response) => response.json())
      .then((data) => {
        setMemberMap(data);
      });
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
