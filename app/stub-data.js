
const stubUsers = [
    {id: 1, first: 'Brian', last: 'Genisio'},
    {id: 2, first: 'Cara', last: 'Genisio'},
    {id: 3, first: 'Maia', last: 'Genisio'},
    {id: 4, first: 'Eli', last: 'Genisio'},
    
    {id: 5, first: 'Mona', last: 'Dogg'},
    {id: 6, first: 'Bell', last: 'Dogg'},
    
    {id: 7, first: 'Jack', last: 'Sloffman'},
    {id: 8, first: 'Jenny', last: 'Sloffman'},
    {id: 9, first: 'Julie', last: 'Sloffman'},
    {id: 10, first: 'Johnny', last: 'Sloffman'}
];

const stubClasses = [
    {id: 1, instructors: [1], students: [3]},
    {id: 2, instructors: [2], students: [3,4]},
    {id: 3, instructors: [4], students: [5,6]},
    {id: 4, instructors: [7], students: [8,9,10]}
];

export { stubUsers, stubClasses };