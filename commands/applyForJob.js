import { makeRequestText } from '../utils/makeRequest.js';

export const applyForJob = async () => {
    const homePage = await makeRequestText('/home.php');

    const isGoToWork = homePage.includes("<body class=txt bgcolor='#ddd9cd'  style='margin: 0;'>");

    console.log('isGoToWork', isGoToWork);

    // await Deno.writeTextFile("./__log.txt", homePage);
}