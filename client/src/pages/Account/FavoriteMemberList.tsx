import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

interface Favorite {
  recipe_id: number;
  name: string;
  picture: string;
  is_favorite: boolean;
}

function FavoriteMemberList() {
  const { idUserOnline } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/member/${idUserOnline}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token") || ""}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Favorite[]>;
      })
      .then((data) => {
        setFavorites(data);
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
      });
  }, [idUserOnline]);

  return (
    <section>
      {favorites.map((fav) => (
        <div
          key={fav.recipe_id}
          className="bg-[#f9e7cf] shadow-lg rounded-2xl p-4 border-2 border-[#e6d9be] flex flex-col items-center min-w-[260px] max-w-xs"
        >
          <h4 className="font-bold text-lg text-secondary mb-2 text-center">
            {fav.name} {fav.is_favorite}
          </h4>

          <img
            src={fav.picture}
            alt={fav.name}
            className="w-32 h-32 object-cover rounded-xl mb-3"
          />
          {/* <div className="flex flex-wrap gap-2 justify-center text-xs text-secondary mb-2">
            {fav.difficulty && (
              <span className="bg-[#ffe2b7] rounded px-2 py-1">
                👨🏻‍🍳 {fav.difficulty}
              </span>
            )}
            {fav.diet_name && (
              <span className="bg-[#ffe2b7] rounded px-2 py-1">
                {fav.diet_name}
              </span>
            )}
          </div> */}
        </div>
      ))}
    </section>
  );
}

export default FavoriteMemberList;
