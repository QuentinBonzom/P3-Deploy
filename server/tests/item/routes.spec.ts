// import supertest from "supertest";
// import app from "../../src/app";
// import databaseClient from "../../database/client";
// import type { Rows, Result } from "../../database/client";

// afterEach(() => {
//   jest.restoreAllMocks();
// });

// describe("GET /api/items", () => {
//   it("should fetch items successfully", async () => {
//     const rows = [] as Rows;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rows } as Result);

//     const response = await supertest(app).get("/api/items");

//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual(rows);
//   });
// });

// describe("GET /api/items/:id", () => {
//   it("should fetch a single item successfully", async () => {
//     const rows = [{}] as Rows;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rows } as Result);

//     const response = await supertest(app).get("/api/items/1");

//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual(rows[0]);
//   });

//   it("should fail on invalid id", async () => {
//     const rows = [] as Rows;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rows } as Result);

//     const response = await supertest(app).get("/api/items/0");

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({});
//   });
// });

// describe("POST /api/items", () => {
//   it("should add a new item successfully", async () => {
//     const rows = [{ id: 1 }];

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rows } as Result);

//     const fakeItem = { title: "foo", user_id: 0 };

//     const response = await supertest(app).post("/api/items").send(fakeItem);

//     expect(response.status).toBe(201);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body.id).toBe(1);
//   });

//   it("should fail on invalid request body", async () => {
//     const fakeItem = { title: "foo" }; // missing user_id

//     const response = await supertest(app).post("/api/items").send(fakeItem);

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({});
//   });
// });

// describe("PUT /api/items/:id", () => {
//   it("should update an existing item successfully", async () => {
//     const rowCount = 1;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rowCount } as Result);

//     const fakeItem = { title: "foo", user_id: 0 };

//     const response = await supertest(app).put("/api/items/42").send(fakeItem);

//     expect(response.status).toBe(204);
//     expect(response.body).toEqual({});
//   });

//   it("should fail on invalid request body", async () => {
//     const fakeItem = { title: "foo" };

//     const response = await supertest(app).put("/api/items/42").send(fakeItem);

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({});
//   });

//   it("should fail on invalid id", async () => {
//     const rowCount = 0;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rowCount } as Result);

//     const fakeItem = { title: "foo", user_id: 0 };

//     const response = await supertest(app).put("/api/items/43").send(fakeItem);

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({});
//   });
// });

// describe("DELETE /api/items/:id", () => {
//   it("should delete an existing item successfully", async () => {
//     const rowCount = 1;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rowCount } as Result);

//     const response = await supertest(app).delete("/api/items/42");

//     expect(response.status).toBe(204);
//     expect(response.body).toEqual({});
//   });

//   it("should fail on invalid id", async () => {
//     const rowCount = 0;

//     jest
//       .spyOn(databaseClient, "query")
//       .mockResolvedValueOnce({ rowCount } as Result);

//     const response = await supertest(app).delete("/api/items/43");

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({});
//   });
// });
