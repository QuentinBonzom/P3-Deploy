import { useUser } from "@/context/UserContext";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

export function useHandleFavorite(recipeId: number, initialValue: boolean) {
  const { isConnected, idUserOnline } = useUser();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialValue);

  const toggleFavorite = useCallback(async () => {
    if (!isConnected) {
      alert("Vous devez être connecté pour gérer vos favoris.");
      navigate("/Compte");
      return;
    }

    const nextValue = !isFavorite;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorite/recipe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipeId,
            userId: idUserOnline,
            is_favorite: nextValue,
          }),
        },
      );
      if (!res.ok) throw new Error();

      setIsFavorite(nextValue);
      alert(nextValue ? "Favori ajouté" : "Favori retiré");
    } catch {
      alert("Impossible de mettre à jour le favori.");
    }
  }, [isConnected, idUserOnline, isFavorite, navigate, recipeId]);

  return { isFavorite, toggleFavorite };
}
