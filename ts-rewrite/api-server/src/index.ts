import express, { Request, Response } from 'express';
import cors from 'cors';
import apicache from 'apicache';

import { extract_nice_predictions, get_prediction } from './prt';
import { House, getHouse, getHouseStops } from './house';

const app = express();
const cache = apicache.middleware;

app.use(cors());

const port = process.env.PORT || 3000;

app.get('/house/:house',
    cache('10 seconds'),
    async (req: Request, res: Response) => {
        const house: House | null = getHouse(req.params.house);
        if (!house) {
            res.status(404).send('Invalid house');
            return;
        }
        const stop_ids = getHouseStops(house);
        let result = await get_prediction(stop_ids);
        res.send(extract_nice_predictions(result))
    });

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
})
