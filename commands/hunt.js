import { makeRequestText } from '../utils/makeRequest.js';
import { getRandom } from '../utils/getRandom.js';

export const hunt = async (mapPage = '') => {
    const isVeryLowDanger = mapPage.includes('очень низкая');

    if (!isVeryLowDanger) {
        return await makeRequestText(`/map.php?action=skip&js_output=1&rand=${getRandom(701491, 791491)}.${getRandom(9087982016, 9987982016)}`);
    }
}