import apiKey from "./api-key"
import { BusName, BusArivalTime } from "./types"
import dayjs from "dayjs"
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 10, checkperiod: 120 });

async function cached_get(url: string): Promise<any> {
    const value = cache.get(url)
    if (value) {
        return value
    }
    console.log('cache miss' + Date.now())
    console.log(url)
    const data = await fetch(url)
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    } else {
        const json = await data.json()
        cache.set(url, json)
        return json
    }
}

export async function get_prediction(stop_id: string[], routes: BusName[] = [], top: number = 10): Promise<any> {
    const stop_ids = stop_id.join(',')
    const route_ids = routes.join(',')

    const url = `https://realtime.portauthority.org/bustime/api/v3/getpredictions?key=${apiKey}&localestring=en_US&rtpidatafeed=Port+Authority+Bus&tmres=s&rt=${route_ids}&stpid=${stop_ids}&top=${top}&format=json`
    const data = await cached_get(url)
    return data['bustime-response']['prd']
}

function fix_date(date: string): number {
    // parse from utc -4 with YYYYMMDD HH:mm:ss
    const format = 'YYYYMMDD HH:mm:ss'
    const time = dayjs.tz(date, format, 'America/New_York')
    return time.unix() * 1000
}

export function extract_nice_predictions(predictions: any[]): BusArivalTime[] {
    if (!predictions) {
        return []
    }
    return predictions.map((prediction: any) => {
        return {
            time_stamp: fix_date(prediction['tmstmp']),
            stop_name: prediction['stpnm'],
            bus_name: prediction['rt'],
            predicted_arival_time: fix_date(prediction['prdtm']),
        }
    })
}
