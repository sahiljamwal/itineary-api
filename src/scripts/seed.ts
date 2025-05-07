import { config } from "dotenv";
import UserModel from "../v1/schema/users.schema";
import ItineraryModel from "../v1/schema/itineraries.schema";
import { createMongoConnection } from "../common/utils/db.util";
import logger from "../common/utils/logger.util";

config();

const destinations = [
  {
    city: "Paris",
    activities: [
      {
        time: "09:00",
        description: "Visit Eiffel Tower",
        location: "Champ de Mars",
      },
      {
        time: "12:00",
        description: "Lunch at Le Marais",
        location: "Le Marais District",
      },
      {
        time: "14:00",
        description: "Louvre Museum",
        location: "Rue de Rivoli",
      },
      {
        time: "19:00",
        description: "Dinner at Montmartre",
        location: "Montmartre",
      },
    ],
  },
  {
    city: "Tokyo",
    activities: [
      {
        time: "08:00",
        description: "Visit Senso-ji Temple",
        location: "Asakusa",
      },
      {
        time: "11:00",
        description: "Explore Tsukiji Market",
        location: "Tsukiji",
      },
      { time: "14:00", description: "Shibuya Crossing", location: "Shibuya" },
      {
        time: "18:00",
        description: "Dinner in Shinjuku",
        location: "Shinjuku",
      },
    ],
  },
  {
    city: "New York",
    activities: [
      {
        time: "09:00",
        description: "Central Park Walk",
        location: "Central Park",
      },
      {
        time: "12:00",
        description: "Lunch at Times Square",
        location: "Times Square",
      },
      {
        time: "15:00",
        description: "Empire State Building",
        location: "Midtown",
      },
      {
        time: "19:00",
        description: "Broadway Show",
        location: "Theater District",
      },
    ],
  },
];

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "password123",
  },
];

async function seed() {
  try {
    // Connect to MongoDB
    await createMongoConnection();

    // Clear existing data
    await UserModel.deleteMany({});
    await ItineraryModel.deleteMany({});
    logger.info("Cleared existing data");

    // Create users
    const createdUsers = await UserModel.create(users);
    logger.info("Created users");

    // Create itineraries
    const itineraries = [];
    for (const user of createdUsers) {
      for (const dest of destinations) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30)); // Random date within next 30 days

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1); // 1-5 days trip

        const activities = dest.activities.map((activity) => ({
          time: new Date(
            `${startDate.toISOString().split("T")[0]}T${activity.time}`
          ),
          description: activity.description,
          location: activity.location,
        }));

        itineraries.push({
          userId: user._id,
          title: `${dest.city} Adventure`,
          destination: dest.city,
          startDate,
          endDate,
          activities,
        });
      }
    }

    await ItineraryModel.create(itineraries);
    logger.info("Created itineraries");

    logger.info("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
