// Charge les variables d'environnement depuis le fichier .env
import "dotenv/config";
import fs from "node:fs";

// Connexion à la base PostgreSQL via Supabase (pg)
import databaseClient from "../database/client";
import type { Rows } from "../database/client";

// Fermer la connexion après tous les tests
afterAll((done) => {
  databaseClient.end().then(done);
});

describe("Installation", () => {
  test("Vous avez créé /server/.env", () => {
    expect(fs.existsSync(`${__dirname}/../.env`)).toBe(true);
  });

  test("Vous avez conservé /server/.env.sample", () => {
    expect(fs.existsSync(`${__dirname}/../.env.sample`)).toBe(true);
  });

  test("Le fichier .env contient des infos valides de connexion à PostgreSQL", async () => {
    expect.assertions(0);
    try {
      // Vérifie juste qu'une requête passe sans erreur
      await databaseClient.query("SELECT 1");
    } catch (error) {
      expect(error).toBeUndefined(); // va forcer l'échec si la connexion échoue
    }
  });

  test("Les scripts de migration de la base ont été exécutés", async () => {
    // ⚠️ Mets ici une vraie table de ta base PostgreSQL
    const { rows } = await databaseClient.query("SELECT * FROM recipe LIMIT 1");
    expect(Array.isArray(rows)).toBe(true);
  });
});
