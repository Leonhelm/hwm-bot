import { makeRequestText } from '../utils/makeRequest.js';
import { getRandom } from '../utils/random.js';

export const hunt = async ({ isWorkaholicPenalty } = {}) => {
    const mapPage = await makeRequestText('/map.php');
    const isVeryLowDanger = mapPage.includes('очень низкая');

    if (!isVeryLowDanger) {
        await makeRequestText(`/map.php?action=skip&js_output=1&rand=${getRandom(701491, 791491)}.${getRandom(9087982016, 9987982016)}`);
        console.log('Пропустил охоту из-за высокого уровня опасности монстра');
        return {};
    }

    if (!isWorkaholicPenalty) {
        return {};
    }

    const isPossibleAutobattle = mapPage.includes('hint="Автобой"');

    if (isPossibleAutobattle) {
        const sign = mapPage?.split(`var PL_JS_SIGN = '`)?.at(1)?.split(`';`)?.at(0);
        await makeRequestText(`/map.php?action=attack&auto=1&sign=${sign}&js_output=1&&rand=${getRandom(701491, 791491)}.${getRandom(9087982016, 9987982016)}`);
        await makeRequestText(`/waiting_for_results.php?exit=1`);
        console.log('Провёл охоту автобоем');
        return {};
    }

    throw new Error('Закончилась возможность провести охоту автобоем, надо обновить Зеркало перемен');
}
