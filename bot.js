import { applyForJob } from './commands/applyForJob.js';
import { hunt } from './commands/hunt.js';

const runBot = async () => {
    const hours = new Date().getHours();

    if (hours < 9 || hours > 22) {
        console.log(`Не запускаем бота потому что час: ${hours}`);
        return;
    }

    const { mapPage } = await applyForJob();

    await hunt(mapPage);
}

await runBot();

