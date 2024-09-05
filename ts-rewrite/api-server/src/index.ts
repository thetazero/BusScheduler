import express, { Request, Response } from 'express';
import cors from 'cors';

import { extract_nice_predictions, get_prediction } from './prt';
import { House, getHouse, getHouseStops } from './house';

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.get('/house/:house', async (req: Request, res: Response) => {
    const house: House = getHouse(req.params.house);
    const stop_ids = getHouseStops(house);
    let result = await get_prediction(stop_ids)
    res.send(extract_nice_predictions(result))
});

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
})
