import { HttpFunction } from '@google-cloud/functions-framework';

import { getHouse, House, getHouseStops } from './house';
import { extract_nice_predictions, get_prediction } from './prt';

function allow_cors(req: any, res: any) {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    }
}

export const house: HttpFunction = async (request, response) => {
    allow_cors(request, response);
    const house_name: any = request.query.house;
    const house: House | null = getHouse(house_name);
    if (!house) {
        response.status(404).send('Invalid house');
        return;
    }
    const stop_ids = getHouseStops(house);
    let result = await get_prediction(stop_ids);
    response.send(extract_nice_predictions(result))
}
