import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";

interface CommentInterface {
  text: string;
  member: string;
}

function CommentRecipe({ comments }: { comments: CommentInterface[] }) {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState<string>("");
  const { isConnected, idUserOnline } = useUser();
  console.log(idUserOnline);

  function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
    // Prevent default form submission
    e.preventDefault();
    if (!isConnected) {
      alert("Vous devez être connecté pour ajouter un commentaire.");
      navigate("/Compte");
    } else {
      //update or create comment with recipeId, userId
      const recipeId = Number(localStorage.getItem("recipeId"));
      const userId = idUserOnline;
      //creer la donnée a faire passer dans la requete
      const commentData = {
        text: commentText,
        recipeId: recipeId,
        userId: userId,
      };
      console.log(JSON.stringify(commentData), commentData);
      //fetch pour poster la donnée dans la requete
      fetch(`${import.meta.env.VITE_API_URL}/api/comment/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }).then((response) => {
        if (response.ok) {
          alert("Commentaire ajouté avec succès");
        } else {
          // Handle error
          alert("Erreur lors de l'ajout du commentaire");
        }
      });
    }
  }

  return (
    <div className="m-4 w-1/2">
      <h3>Commentaires</h3>
      <ul className="text-secondary">
        {comments.map((comment) => (
          <li
            className="bg-primary/20 p-2 rounded  my-4"
            key={`${comment.text}-${comment.member}`}
          >
            {comment.member}: {comment.text}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => handleSubmitComment(e)}
        className="flex flex-col text-secondary  items-end"
      >
        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          style={{ resize: "none" }}
          maxLength={100}
          minLength={5}
          className="w-full p-2 border rounded"
          placeholder="Ajouter un commentaire..."
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-primary text-white px-4 py-2 rounded-full w-28 cursor-pointer "
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CommentRecipe;
