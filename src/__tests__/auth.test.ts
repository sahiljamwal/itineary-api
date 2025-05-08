import request from "supertest";
import app from "../app";

describe("Authentication Tests", () => {
  const testUser = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("email", testUser.email);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should not register a user with existing email", async () => {
      // First registration
      await request(app).post("/api/v1/auth/register").send(testUser);

      // Second registration with same email
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      // Register a user before each test
      await request(app).post("/api/v1/auth/register").send(testUser);
    });

    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
    });

    it("should not login with invalid password", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });

    it("should not login with non-existent email", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "nonexistent@example.com",
        password: testUser.password,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });
  });
});
