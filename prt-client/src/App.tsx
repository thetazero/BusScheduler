import { useEffect, useState } from 'react'
import { BusArivalTime } from './types'
import ArivalSlot from './ArivalSlots'
import { useParams } from 'react-router-dom'

export interface BusETA {
    stop: string
    seconds_remaining: number
    name: string
    arival_time: Date
}

function App() {
    const [arivalTimes, setArivalTimes] = useState<BusArivalTime[]>([])
    const [busEtas, setBusEtas] = useState<BusETA[]>([])
    const [error, setError] = useState<string | null>(null)

    const { house } = useParams();

    async function updateArivalTimes(house: string) {
        const response = await fetch(`https://us-east1-mutantsand.cloudfunctions.net/house?house=${house}`)
        if (!response.ok) {
            console.error('Failed to fetch arival times')
            setArivalTimes([])
            setError('Failed to fetch arival times')
            return
        }
        const data = await response.json()
        setError(null)
        setArivalTimes(data)
    }

    useEffect(() => {
        updateArivalTimes(house || '')
        console.log('Updated arival times')
    }, [house])

    useEffect(() => {
        const interval = setInterval(() => {
            updateArivalTimes(house || '')
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
                busEtas.map((arival: BusETA, i: number) => {
                    return (
                        <ArivalSlot key={i} {...arival} />
                    )
                }
                )
            }
            {error && <div className="error">{error}</div>}
        </>
    )
}

export default App
