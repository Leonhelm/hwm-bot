import { applyForJob } from './commands/applyForJob.js';
import { hunt } from './commands/hunt.js';

const runBot = async () => {
    const { isWorkaholicPenalty } = await applyForJob();
    await hunt({ isWorkaholicPenalty });
}

await runBot();
