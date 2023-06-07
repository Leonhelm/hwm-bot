import { applyForJob } from './commands/applyForJob.js';
import { hunt } from './commands/hunt.js';

const runBot = async () => {
    await hunt();
    await applyForJob();
}

await runBot();

