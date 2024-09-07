export enum BusName {
    A61 = "61A",
    B61 = "61B",
    C61 = "61C",
    D61 = "61D",
}

export interface BusArivalTime {
    time_stamp: number // Unix timestamp
    stop_name: string
    bus_name: BusName
    predicted_arival_time: number // Unix timestamp
}
