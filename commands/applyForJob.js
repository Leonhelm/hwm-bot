import { makeRequestText } from '../utils/makeRequest.js';

const mapUrls = ['/map.php?st=sh', '/map.php?st=fc', '/map.php?st=mn'];

export const applyForJob = async (mapPageCb) => {
    const homePage = await makeRequestText('/home.php');
    const isGoToWork = homePage.includes("Вы нигде не работаете.");

    if (!isGoToWork) {
        console.log('Не устроен на работу: ещё работает');
        return;
    }

    let jobLink = '';

    for (let i = 0; i < mapUrls.length; i ++) {
        const mapPage = await makeRequestText('/map.php?st=mn');

        jobLink = mapPage.split(`<tr  class="map_obj_table_hover" style=""><td ><a href='`)?.at(1)?.split(`' style`)?.at(0);

        if (jobLink) {
            break;
        }
    }

    if (!jobLink) {
        console.log('Не устроен на работу: все рабочие места заняты');
        return;
    }

    const jobPage = await makeRequestText(`/${jobLink}`);
    const inputs = jobPage?.split(`id="wbtn"></div>`)?.at(1)?.split(`<script>`)?.at(0)?.split(`<input type=hidden value='`)?.slice(1)?.map(input => {
        const inputaArr = input.split(`' name=`);
        const value = inputaArr.at(0);
        const separator = input.includes('id=') ? ' id=' : '>';
        const name = inputaArr.at(1)?.split(separator).at(0);
        return [name, value];
    });

    if (!inputs?.length) {
        throw new Error('Не устроен на работу: отсутствуют inputs при просмотре места работы');
    }

    const objectPage = await makeRequestText('/object_do.php', {
        method: 'POST',
        body: inputs.map(([name, value]) => `${name}=${value}`).join('&'),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });

    const isEmployed = objectPage.includes('Вы уже устроены.');

    if (!isEmployed) {
        throw new Error('Не устроен на работу: отсутствует подтверждение');
    }
}