import { applyForJob } from './commands/applyForJob.js';
import { hunt } from './commands/hunt.js';
import { shuffle } from './utils/random.js';

const runBot = async () => {
    const commands = shuffle([hunt, applyForJob]);

    for (const command of commands) {
        await command();
    }
}

await runBot();

