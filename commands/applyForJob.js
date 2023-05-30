import { makeRequestText } from '../utils/makeRequest.js';


export const applyForJob = async () => {
    const mapPage = await makeRequestText('/map.php?st=mn');

    await Deno.writeTextFile("./__log.txt", mapPage);
}