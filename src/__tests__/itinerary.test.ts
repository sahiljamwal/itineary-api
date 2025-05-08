import request from "supertest";
import { describe, expect, it, beforeEach } from "@jest/globals";
import app from "../app";
import { Types } from "mongoose";

describe("Itinerary Tests", () => {
  let authToken: string;
  let userId: string;

  const testUser = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  const testItinerary = {
    title: "Test Itinerary",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
    destination: "Paris",
    activities: [
      {
        time: new Date(),
        location: "Paris",
        description: "Visit the iconic Eiffel Tower",
      },
    ],
  };

  beforeEach(async () => {
    // Register and login user
    const registerResponse = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    authToken = registerResponse.body.accessToken;
    userId = registerResponse.body._id;
  });

  describe("POST /api/itineraries", () => {
    it("should create a new itinerary", async () => {
      const response = await request(app)
        .post("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", testItinerary.title);
      expect(response.body).toHaveProperty("userId", userId);
    });

    it("should not create itinerary without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/itineraries")
        .send(testItinerary);

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/v1/itineraries", () => {
    beforeEach(async () => {
      // Create a test itinerary
      await request(app)
        .post("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);
    });

    it("should get all itineraries for authenticated user", async () => {
      const response = await request(app)
        .get("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty(
        "title",
        testItinerary.title
      );
    });

    it("should not get itineraries without authentication", async () => {
      const response = await request(app).get("/api/v1/itineraries");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/v1/itineraries/:id", () => {
    let itineraryId: string;

    beforeEach(async () => {
      // Create a test itinerary
      const createResponse = await request(app)
        .post("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);

      itineraryId = createResponse.body._id;
    });

    it("should get a specific itinerary", async () => {
      const response = await request(app)
        .get(`/api/v1/itineraries/${itineraryId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", itineraryId);
      expect(response.body).toHaveProperty("title", testItinerary.title);
    });

    it("should not get non-existent itinerary", async () => {
      const response = await request(app)
        .get(`/api/v1/itineraries/${new Types.ObjectId()}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /api/v1/itineraries/:id", () => {
    let itineraryId: string;

    beforeEach(async () => {
      // Create a test itinerary
      const createResponse = await request(app)
        .post("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);

      itineraryId = createResponse.body._id;
    });

    it("should update an itinerary", async () => {
      const updatedItinerary = {
        ...testItinerary,
        title: "Updated Title",
      };

      const response = await request(app)
        .put(`/api/v1/itineraries/${itineraryId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedItinerary);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title", "Updated Title");
    });

    it("should not update non-existent itinerary", async () => {
      const response = await request(app)
        .put(`/api/v1/itineraries/${new Types.ObjectId()}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/v1/itineraries/:id", () => {
    let itineraryId: string;

    beforeEach(async () => {
      // Create a test itinerary
      const createResponse = await request(app)
        .post("/api/v1/itineraries")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testItinerary);

      itineraryId = createResponse.body._id;
    });

    it("should delete an itinerary", async () => {
      const response = await request(app)
        .delete(`/api/v1/itineraries/${itineraryId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);

      // Verify itinerary is deleted
      const getResponse = await request(app)
        .get(`/api/v1/itineraries/${itineraryId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(getResponse.status).toBe(404);
    });

    it("should not delete non-existent itinerary", async () => {
      const response = await request(app)
        .delete(`/api/v1/itineraries/${new Types.ObjectId()}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});
