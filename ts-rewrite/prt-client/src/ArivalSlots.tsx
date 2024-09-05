import { BusETA } from './App';




const ArivalSlot: React.FC<BusETA> = ({stop, seconds_remaining, name}) => {

    function format_seconds(seconds: number): string {
        if (seconds < 0) {
            return '0:00'
        }
        seconds = Math.floor(seconds)

        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${Math.floor(seconds / 60)}:${formattedSeconds}`
    }

    return (
        <>
            <div className='bus-tile'>
                <span className="time">{format_seconds(seconds_remaining)}</span>
                <span className="bus-name">{name}</span>
                <span className="stop-name">{stop}</span>
            </div> 
        </>
    )
}

export default ArivalSlot;
