import { BusETA } from './App';




const ArivalSlot: React.FC<BusETA> = ({stop, seconds_remaining, name, arival_time }) => {

    function format_seconds(seconds: number): string {
        if (seconds < 0) {
            return '0:00'
        }
        seconds = Math.floor(seconds)

        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${Math.floor(seconds / 60)}:${formattedSeconds}`
    }

    function format_time(date: Date): string {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    return (
        <>
            <div className='bus-tile'>
                <div className="left"> {format_time(arival_time)} | {format_seconds(seconds_remaining)} | {name}</div>
                <div className="right">{stop}</div>
            </div> 
        </>
    )
}

export default ArivalSlot;
