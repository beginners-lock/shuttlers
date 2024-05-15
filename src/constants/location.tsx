export const LOCATIONS = [
    'Peter Hall',
    'John Hall',
    'Paul Hall',
    'Joseph Hall',
    'Daniel Hall',
    'Esther Hall',
    'Mary Hall',
    'Lydia Hall',
    'Dorcas Hall',
    'Deborah Hall',
    'Shuttle Stand',
    'CST',
    'Mech. Dept. Building',
    'EIE Dept. Building',
    'Civil Dept. Building',
    'Cafeteria 2'
];

export const PRICES = [
    { location:'Hall(s)', destination:'Dept. Building', price: 200  },
    { location:'Dept. Building', destination:'Hall(s)',  price: 200 },
    { location:'Shuttle Stand', destination:'Dept. Building', price: 150  },
    { location:'Dept. Building', destination:'Shuttle Stand',  price: 150 },
    { location:'Shuttle Stand', destination:'Cafeteria 2', price: 150  },
    { location:'Cafetaria 2', destination:'Shuttle Stand',  price: 150 },
    { location:'Shuttle Stand', destination:'CST', price: 150  },
    { location:'CST', destination:'Shuttle Stand',  price: 150 }
]