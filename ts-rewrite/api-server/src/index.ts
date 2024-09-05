import express, { Request, Response } from 'express';

import { get_prediction } from './prt';
import { BusName } from './types';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    let stop_ids = ['7097']
    // let routes = [BusName.C61]
    let result = await get_prediction(stop_ids)
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
})
