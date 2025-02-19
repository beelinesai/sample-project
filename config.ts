// Validate required environment variables
const requiredEnvVars = [
  "BEELINES_API_KEY"
];

for (const envVar of requiredEnvVars) {
  if (!Bun.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const beelinesApiKey = Bun.env.BEELINES_API_KEY!;
