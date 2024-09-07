import { useEffect, useState } from 'react'
import { BusArivalTime } from './types'
import ArivalSlot from './ArivalSlots'

export interface BusETA {
    stop: string
    seconds_remaining: number
    name: string
    arival_time: Date
}

function App() {
    const [arivalTimes, setArivalTimes] = useState<BusArivalTime[]>([])
    const [busEtas, setBusEtas] = useState<BusETA[]>([])

    async function updateArivalTimes() {
        const response = await fetch('http://localhost:3000/house/drc')
        const data = await response.json()
        setArivalTimes(data)
    }

    useEffect(() => {
        updateArivalTimes()
        console.log('Updated arival times')
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            updateArivalTimes()
        }, 10_000)

        return () => { clearInterval(interval) }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            let newBusEtas: BusETA[] = arivalTimes.map((arival: BusArivalTime) => {
                let predicted_time = new Date(arival.predicted_arival_time)
                let rem = (predicted_time.getTime() - new Date().getTime()) / 1000
                return { stop: arival.stop_name, seconds_remaining: rem, name: arival.bus_name, arival_time: predicted_time }
            })

            setBusEtas(newBusEtas)
        }, 1000)


        return () => { clearInterval(interval) }
    }, [arivalTimes]);

    return (
        <>
         {
            busEtas.map( (arival: BusETA, i:number) => {
                return (
                    <ArivalSlot key={i} {...arival} />
                )
            }
            )
        }
        </>
    )
}

export default App
