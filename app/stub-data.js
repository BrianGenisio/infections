
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
    {id: 10, first: 'Johnny', last: 'Sloffman'},
    
    {id: 11, first: 'Albus', last: 'Dumbledore'},
    {id: 12, first: 'Severus', last: 'Snape'},
    {id: 13, first: 'Minerva', last: 'McGonagall'},
    {id: 14, first: 'Rubeus', last: 'Hagrid'},
    {id: 15, first: 'Pomona', last: 'Sprout'},
    {id: 16, first: 'Quirinus', last: 'Quirrell'},
    {id: 17, first: 'Gilderoy', last: 'Lockhart'},
    {id: 18, first: 'Remus', last: 'Lupin'},
    {id: 19, first: 'Cuthbert', last: 'Binns'},
    
    {id: 20, first: 'Harry', last: 'Potter'},
    {id: 21, first: 'Hermione', last: 'Granger'},
    {id: 22, first: 'Ron', last: 'Weasley'},
    {id: 23, first: 'Fred', last: 'Weasley'},
    {id: 24, first: 'George', last: 'Weasley'},
    {id: 25, first: 'Neville', last: 'Longbottom'},
];

const stubClasses = [
    {id: 1, instructors: [1], students: [3]},
    {id: 2, instructors: [2], students: [3,4]},
    {id: 3, instructors: [4], students: [5,6]},
    {id: 4, instructors: [7], students: [8,9,10]},
    
    {id: 5, instructors: [11], students: [12, 13, 14, 15, 16, 17, 18, 19]},
    {id: 6, instructors: [12], students: [13]},
    {id: 7, instructors: [13], students: [12]},
    {id: 8, instructors: [13], students: [20, 21, 22, 23, 24, 25]},
    {id: 9, instructors: [14], students: [20, 21, 24, 25]},
    {id: 10, instructors: [20, 21], students: [22, 23, 24, 25]}
];

export { stubUsers, stubClasses };