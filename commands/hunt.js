import { makeRequestText } from '../utils/makeRequest.js';
import { getRandom } from '../utils/random.js';

export const hunt = async () => {
    const mapPage = await makeRequestText('/map.php');
    const isVeryLowDanger = mapPage.includes('очень низкая');

    if (!isVeryLowDanger) {
        await makeRequestText(`/map.php?action=skip&js_output=1&rand=${getRandom(701491, 791491)}.${getRandom(9087982016, 9987982016)}`);
        console.log('Пропустил охоту из-за высокого уровня опасности монстра');
        return;
    }
}