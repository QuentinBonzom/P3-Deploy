import { useUser } from "@/context/UserContext";

function EditMemberForm() {
  const { user, handleChange, handleUpdateMember, handleDelete } = useUser();

  return (
    <>
      <form onSubmit={handleUpdateMember} className="mx-10 pb-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">
          Modifier mon compte
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-secondary mb-1">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Laissez vide pour ne pas changer"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-secondary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-secondary mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Laissez vide pour ne pas changer"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-secondary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-secondary mb-1">
            Nouveau mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Laissez vide pour ne pas changer"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-secondary"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-lg bg-primary text-white font-semibold hover:bg-orange-500 transition-colors"
        >
          Valider les modifications
        </button>
      </form>
      <button
        type="button"
        onClick={handleDelete}
        className="p-2 rounded-xl bg-red-600 text-white ml-4 cursor-pointer"
      >
        Supprimer mon compte
      </button>
    </>
  );
}

export default EditMemberForm;
