import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export function useHandleRating(recipeId: number, initialValue: number) {
  const { isConnected, idUserOnline } = useUser();
  const navigate = useNavigate();
  const [userRate, setUserRate] = useState(initialValue);

  const handleUserRate = (rate: number) => {
    if (!isConnected) {
      alert("Vous devez être connecté pour donner une note.");
      navigate("/Compte");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/rate/recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId,
        userId: idUserOnline,
        rate,
      }),
    }).then((response) => {
      if (response.ok) {
        setUserRate(rate);
      } else {
        alert("Erreur lors de l'ajout de la note");
      }
    });
  };

  return { userRate, handleUserRate };
}
