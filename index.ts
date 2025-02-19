import { Beelines } from "@beelinesai/sdk";
import { beelinesApiKey } from "./config";

const client = new Beelines({
  endpoint: "https://api.beelines.ai/graphql",
  apiKey: beelinesApiKey,
});

const result = await client.developers.byId("your_developer_id_here");
// const dimensions = await client.sdk.dimensions();

console.log('result', result);