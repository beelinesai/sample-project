import { Beelines, BeelineStatus, ChatSourceType, SenderType } from "@beelinesai/sdk";
import { beelinesApiKey, beelinesApiEndpoint, beelinesEmail } from "./config";

const client = new Beelines({
  endpoint: beelinesApiEndpoint,
  apiKey: beelinesApiKey,
});
const dev = await client.developers.byEmail(beelinesEmail);

const agent = await client.agents.create(dev.id, {
  name: "BitWise Betty",
});

// Start or get a chat thread
const chat = await client.chat.get({
  sourceId: agent.id,
  sourceType: ChatSourceType.Agent,
});

// Send a message
const messageId = await client.chat.threads.message(chat.latestThread.id, {
  content: "Tell me a joke!",
  senderType: SenderType.User,
});

// Get the response
let response = await client.chat.threads.response(messageId);

while (response?.status !== BeelineStatus.Completed) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  response = await client.chat.threads.response(messageId);
}

console.log("🐝 Congratulations! Your new AI agent has been created!");
console.log("✨ Say hello to your new agent:", agent.name);
console.log("📋 Agent details:", agent);
console.log("💬 Responses:", JSON.stringify(response?.responses ?? [], null, 2));
console.log("✨ Summarized response:", response?.summary);