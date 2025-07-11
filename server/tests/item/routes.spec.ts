import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { QueryResult, QueryResultRow } from "pg";
import supertest from "supertest";
import type { Member, TypeCategory } from "../../../client/src/types/TypeFiles";
import databaseClient from "../../database/client";
import app from "../../src/app";
dotenv.config();

// 200 : succès de la requête ;
// 201 : Creation reussis;
// 301 et 302 : redirection, respectivement permanente et temporaire ;
// 401 : utilisateur non authentifié ;
// 403 : accès refusé ;
// 404 : ressource non trouvée ;
// 500, 502 et 503 : erreurs serveur ;
// 504 : le serveur n'a pas répondu.

afterEach(() => {
  jest.restoreAllMocks();
});

//
//  pour mocker databaseClient.query

function mockQuery<T extends QueryResultRow>(rows: T[]) {
  jest
    .spyOn(databaseClient, "query")
    .mockImplementation(async () => ({ rows }) as QueryResult<T>);
}

// Test Time ! //

describe("GET /api/category", () => {
  it("Devrait nous montrer toute les categories", async () => {
    const rows: TypeCategory[] = [];
    mockQuery(rows);

    const res = await supertest(app).get("/api/category");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(rows);
  });
});

describe("PATCH /api/member", () => {
  it("Devrait modifier le profile du Membre", async () => {
    const testMember = {
      id: 192,
      name: "Jean",
      email: "jeannot@example.com",
      password: bcrypt.hashSync("123", 8),
      admin: false,
    };

    const token = jwt.sign(
      { id: testMember.id, admin: testMember.admin },
      process.env.JWT_SECRET as string,
    );

    mockQuery([testMember]);

    const res = await supertest(app)
      .patch("/api/member")
      .set("Authorization", token)
      .send({
        id: 192,
        name: "Jean",
        email: "jeannot@example.com",
        password: "123",
        admin: false,
      });
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(testMember);
  });
});

describe("DELETE /api/admin/208", () => {
  it("Devrait Suprimer un Compte externe en temps qu'Admin", async () => {
    const testMember = {
      id: 192,
      name: "Jean",
      email: "jeannot@example.com",
      password: bcrypt.hashSync("123", 8),
      admin: true,
    };

    const token = jwt.sign(
      { id: testMember.id, admin: testMember.admin },
      process.env.JWT_SECRET as string,
    );

    mockQuery([testMember]);

    const res = await supertest(app)
      .delete("/api/admin/208")
      .set("Authorization", token);
    expect(res.status).toBe(200);
  });
});

describe("POST /api/member/162/list", () => {
  it("Devrait Crée une Liste de Courses", async () => {
    const testList = [
      {
        recipeId: 22,
        userId: 162,
        numberPersons: 2,
      },
    ];

    const token = jwt.sign(
      { id: 162, admin: true },
      process.env.JWT_SECRET as string,
    );

    mockQuery([testList]);

    const res = await supertest(app)
      .post("/api/member/162/list")
      .set("Authorization", token)
      .send({ list: testList }); // car il attend un tableau list (voir listActions)

    expect(res.status).toBe(201);
  });
});

supertest(app);
