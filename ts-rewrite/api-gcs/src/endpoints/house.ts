import { HttpFunction } from '@google-cloud/functions-framework';

import { getHouse, House, getHouseStops } from '../house';
import { extract_nice_predictions, get_prediction } from '../prt';

export const house: HttpFunction = async (request, response) => {
    const house: House | null = getHouse(request.params.house);
    if (!house) {
        response.status(404).send('Invalid house');
        return;
    }
    const stop_ids = getHouseStops(house);
    let result = await get_prediction(stop_ids);
    response.send(extract_nice_predictions(result))
}
