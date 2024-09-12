import { useEffect, useState } from 'react'
import { BusArivalTime } from './types'
import ArivalSlot from './ArivalSlots'
import { useLocation } from 'react-router-dom'

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

    const house = useLocation().pathname.split('/')[1]

    async function updateArivalTimes(house: string) {
        if (!house) {
            setArivalTimes([])
            setError("No house provided")
            return
        }
        const response = await fetch(`https://us-east1-mutantsand.cloudfunctions.net/house?house=${house}`)
        if (!response.ok) {
            console.error('Failed to fetch arival times')
            setArivalTimes([])
            setError('Failed to fetch arival times for house: ' + house)
            return
        }
        const data = await response.json()
        setError(null)
        setArivalTimes(data)
    }

    useEffect(() => {
        console.log('Clearing arival times')
        setArivalTimes([])
        updateArivalTimes(house)

        const interval = setInterval(() => {
            updateArivalTimes(house)
        }, 10_000)

        return () => { clearInterval(interval) }
    }, [house])

    function updateEtas(arivalTimes: BusArivalTime[]) {
        let newBusEtas: BusETA[] = arivalTimes.map((arival: BusArivalTime) => {
            let predicted_time = new Date(arival.predicted_arival_time)
            let rem = (predicted_time.getTime() - new Date().getTime()) / 1000
            return { stop: arival.stop_name, seconds_remaining: rem, name: arival.bus_name, arival_time: predicted_time }
        })

        setBusEtas(newBusEtas)
    }

    useEffect(() => {
        updateEtas(arivalTimes)
        const interval = setInterval(() => {
            updateEtas(arivalTimes)
        }, 1000)

        return () => { clearInterval(interval) }
    }, [arivalTimes]);

    return (
        <>
            <div className="bus-eta-container">
                {
                    busEtas.map((arival: BusETA, i: number) => {
                        return (
                            <ArivalSlot key={i} {...arival} />
                        )
                    }
                    )
                }
            </div>
            {error && <div className="error">{error}</div>}
        </>
    )
}

export default App
