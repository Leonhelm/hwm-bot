import { applyForJob } from './commands/applyForJob.js';
import { hunt } from './commands/hunt.js';

const runBot = async () => {
    const hours = new Date().getUTCHours() + 3; // Делаем таймзону как на сервере игры

    if (hours < 9 || hours > 22) {
        console.log(`Не запускаем бота потому что час: ${hours}`);
        return;
    }

    await hunt();
    await applyForJob();
}

await runBot();

