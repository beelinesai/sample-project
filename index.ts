import { Beelines } from "@beelinesai/sdk";
import { beelinesApiKey, beelinesApiEndpoint, beelinesEmail } from "./config";

const client = new Beelines({
  endpoint: beelinesApiEndpoint,
  apiKey: beelinesApiKey,
});
const dev = await client.developers.byEmail(beelinesEmail);

if (!dev.success) throw dev.errors;

const agent = await client.agents.create(dev.result?.id!, {
  name: "BitWise Betty",
});

console.log("🐝 Congratulations! Your new AI agent has been created!");
console.log("✨ Say hello to your new agent:", agent.result?.name);
console.log("📋 Agent details:", agent);
