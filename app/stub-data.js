
const stubUsers = [
    {id: 1, first: 'Brian', last: 'Genisio'},
    {id: 2, first: 'Cara', last: 'Genisio'},
    {id: 3, first: 'Maia', last: 'Genisio'},
    {id: 4, first: 'Eli', last: 'Genisio'},
    
    {id: 5, first: 'Mona', last: 'Dogg'},
    {id: 6, first: 'Bell', last: 'Dogg'},
];

const stubClasses = [
    {id: 1, instructors: [1], students: [3]},
    {id: 2, instructors: [2], students: [3,4]},
    {id: 3, instructors: [4], students: [5,6]}
];

export { stubUsers, stubClasses };