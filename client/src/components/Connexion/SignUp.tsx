import type { TypeUser } from "@/types/TypeFiles";
import { useState } from "react";

function SignUp() {
  const [user, setUser] = useState<TypeUser>({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(response);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className=" p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">
          Inscription
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-secondary mb-1">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-secondary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-secondary mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-secondary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-secondary mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-secondary border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-seconday"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-primary text-white font-semibold hover:bg-orange-500 transition-colors"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
