import apiKey from "./api-key"
import { BusName } from "./types"

export async function get_prediction(stop_id: string[], routes: BusName[] = [], top: number = 4) {
    const stop_ids = stop_id.join(',')
    const route_ids = routes.join(',')
    const url = `https://realtime.portauthority.org/bustime/api/v3/getpredictions?key=${apiKey}&localestring=en_US&rtpidatafeed=Port+Authority+Bus&tmres=s&rt=${route_ids}&stpid=${stop_ids}&top=${top}&format=json`
    const data = await fetch(url)
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    } else {
        const json = await data.json()
        console.log(json, json['bustime-response']['prd'])
        return json['bustime-response']['prd']
    }
}
