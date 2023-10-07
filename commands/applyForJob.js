import { makeRequestText } from '../utils/makeRequest.js';

const mapUrls = ['/map.php?st=sh', '/map.php?st=fc', '/map.php?st=mn'];

export const applyForJob = async () => {
    let homePage = await makeRequestText('/home.php');
    const isAuth = homePage.includes('Персональные настройки');

    if (!isAuth) {
        throw new Error('Токен протух');
    }

    console.log(homePage);


    const isNotReviewed = homePage.includes("home.php?skipn=1");

    if (isNotReviewed) {
        homePage = await makeRequestText('/home.php?skipn_day=1');
    }

    const isGoToWork = homePage.includes("Вы нигде не работаете.");

    if (!isGoToWork) {
        console.log('Не устроен на работу: ещё работает');
        return {};
    }

    let jobLink = '';

    for (let i = 0; i < mapUrls.length; i ++) {
        const mapPage = await makeRequestText(mapUrls[i]);
        const tr = mapPage.split(`<tr  class="map_obj_table_hover" style=""><td ><a href='`)?.at(1)?.split(`</tr>`)?.at(0);
        const isFreeWork = tr?.includes('&nbsp;&raquo;&raquo;&raquo;&nbsp;');

        if (isFreeWork) {
            jobLink = tr?.split(`' style`)?.at(0);
            break;
        }
    }

    if (!jobLink) {
        console.log('Не устроен на работу: все рабочие места заняты');
        return {};
    }

    const jobPage = await makeRequestText(`/${jobLink}`);
    const isWorkaholicPenalty = jobPage.includes('штраф трудоголика');

    if (isWorkaholicPenalty) {
        console.log('Не устроен на работу: штраф трудоголика - надо выиграть бой');
        return { isWorkaholicPenalty };
    }

    const inputs = jobPage?.split(`id="wbtn"></div>`)?.at(1)?.split(`<script>`)?.at(0)?.split(`<input type=hidden value='`)?.slice(1)?.map(input => {
        const inputaArr = input.split(`' name=`);
        const value = inputaArr.at(0);
        const separator = input.includes('id=') ? ' id=' : '>';
        const name = inputaArr.at(1)?.split(separator).at(0);
        return [name, value];
    });

    if (!inputs?.length) {
        console.log('Не устроен на работу: надо ввести капчу (пустые inputs)');
        return {};
    }

    const objectPage = await makeRequestText('/object_do.php', {
        method: 'POST',
        body: inputs.map(([name, value]) => `${name}=${value}`).join('&'),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const isEmployed = objectPage.includes('Вы уже устроены.');

    if (isEmployed) {
        console.log('Устроен на работу');
    } else {
        console.log('Не устроен на работу: надо ввести капчу (отсутствует подтверждение)');
    }

    return {};
}