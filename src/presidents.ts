import { 
  Beelines, 
  BeelineStatus, 
  ChatSourceType, 
  SenderType, 
  SourceType 
} from "@beelinesai/sdk";
import { beelinesApiEndpoint, beelinesApiKey, beelinesEmail } from "./config";

// use Bun.sh for best results!
import washington from "../eliza-characters/us_presidents/george.washington.json"
import lincoln from "../eliza-characters/us_presidents/abraham.lincoln.json"
import obama from "../eliza-characters/us_presidents/barack.obama.json"

const client = new Beelines({
  endpoint: beelinesApiEndpoint,
  apiKey: beelinesApiKey,
});

const dev = await client.developers.byEmail(beelinesEmail);

const washingtonAgent = await client.agents.importEliza(dev.id, washington as any);
const lincolnAgent = await client.agents.importEliza(dev.id, lincoln as any);
const obamaAgent = await client.agents.importEliza(dev.id, obama as any);
console.log("created president agents")

const myGroup = await client.groups.create({
  name: "US Presidents Focus Group",
  sourceId: dev.id,
  sourceType: SourceType.Developer,
  agentIds: [washingtonAgent.id, lincolnAgent.id, obamaAgent.id]
});

const chat = await client.chat.get({ 
  sourceId: myGroup.id, 
  sourceType: ChatSourceType.Group 
});

const id = await client.chat.threads.message(chat.latestThread.id, {
  content: "How many US states were there during your presidency?",
  senderType: SenderType.User
});

console.log("waiting for presidents to respond")
let response = null;
while (response?.status !== BeelineStatus.Completed) {
  await new Promise(resolve => setTimeout(resolve, 5000));
  response = await client.chat.threads.response(id);
}

console.log('response', response);

// {
//   status: "completed",
//   responses: [
//     {
//       agentId: "8a38921d-3e95-4bea-b1f1-097c5570556f",
//       response: {
//         response: "During my presidency, there were 50 states in the United States. That’s been the case since Hawaii became the 50th state in 1959. It's a diverse country, and each state has its own unique culture and history, which I always found fascinating.",
//       },
//     },
//     {
//       agentId: "cb7379ca-7370-4298-b707-6ee6e14d20a3",
//       response: {
//         response: "During my presidency, there were 13 states in the Union. These were the original states that declared independence from Britain and formed the United States. As I took office in 1789, we were just beginning to shape the future of our nation, with many discussions about expansion and the addition of new states on the horizon. It's a testament to the spirit of our republic that we have grown to 50 states today.",
//       },
//     },
//     {
//       agentId: "ec60c90a-24ac-4935-b3a6-7c4b6a786561",
//       response: {
//         response: "During my presidency, there were 34 states in the Union. When I took office in 1861, there were 34 states, but as the Civil War unfolded, several states seceded from the Union. By the end of my presidency in 1865, the focus was on restoring the Union and ensuring that the states that had left could return. It was a tumultuous time, indeed.",
//       },
//     }
//   ],
//   summary: "During different presidencies, the number of states in the United States varied: 50 states during one presidency, 13 states during another, and 34 states during a third.",
// }