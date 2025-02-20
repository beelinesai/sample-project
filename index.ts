import { Beelines } from "@beelinesai/sdk";
import { beelinesApiKey, beelinesApiEndpoint } from "./config";

const client = new Beelines({
  endpoint: beelinesApiEndpoint,
  apiKey: beelinesApiKey,
});

// Replace with your actual email, the one used to create the account.
const email = "your.email@example.com";

const dev = await client.developers.byEmail(email);

if (!dev.success) throw dev.errors;

const agent = await client.agents.create(dev.result?.id!, {
  name: "BitWise Betty",
});

console.log('agent', agent);
