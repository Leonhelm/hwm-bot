import { applyForJob } from './commands/applyForJob.js'

const runBot = async () => {
    const hours = new Date().getHours();

    if (hours < 9 || hours > 22) {
        return;
    }

    await applyForJob();
}

await runBot();

