export enum House {
    Island = 'island',
    DRC = 'drc',
}

const house_map: { [key: string]: House } = {
    'island': House.Island,
    'drc': House.DRC,
}

export function getHouse(house: string | undefined): House | null {
    if (!house) {
        return null;
    }
    house = house.toLowerCase();
    if (!(house in house_map)) {
        return null;
    }
    return house_map[house];
}

export function getHouseStops(house: House): string[] {
    switch (house) {
        case House.Island:
            return ['7097'];
        case House.DRC:
            return ['7097', '7647'];
        default:
            throw new Error(`Invalid house: ${house}`);
    }
}
