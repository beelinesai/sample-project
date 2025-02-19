import { config } from "dotenv";

// Load environment variables from .env file
config();

// Validate required environment variables
const requiredEnvVars = [
  "BEELINES_API_KEY",
  "BEELINES_API_ENDPOINT"
];

for (const envVar of requiredEnvVars) {
  if (!Bun.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const beelinesApiKey = Bun.env.BEELINES_API_KEY!;
export const beelinesApiEndpoint = Bun.env.BEELINES_API_ENDPOINT!;