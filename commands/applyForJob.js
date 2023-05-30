import { makeRequestText } from '../utils/makeRequest.js';

export const applyForJob = async () => {
    const homePage = await makeRequestText('/home.php');
    const isGoToWork = homePage.includes("Вы нигде не работаете.");

    if (!isGoToWork) {
        return;
    }

    const mapPage = await makeRequestText('/map.php?st=mn');
    const jobLink = mapPage.split(`<tr  class="map_obj_table_hover" style=""><td ><a href='`)?.at(1)?.split(`' style`)?.at(0);

    if (!jobLink) {
        return;
    }

    const jobPage = await makeRequestText(`/${jobLink}`);
    const inputs = jobPage.split(`id="wbtn"></div>`)?.at(1)?.split(`<script>`)?.at(0).split(`<input type=hidden value='`).map(input => {
        const inputaArr = input.split(`' name=`);
        const value = inputaArr.at(0);
        const separator = input.includes('id=') ? ' id=' : '>';
        const name = inputaArr.at(1)?.split(separator).at(0);
        return [name, value];
    });

    await Deno.writeTextFile("./__log.txt", JSON.stringify(separator));
}