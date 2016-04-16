// It is unfortunate that ES2015 Sets don't have these built in.  
// These functions are inspired by http://www.2ality.com/2015/01/es6-set-operations.html
// But they are rather ineficient... creating lots of temporary arrays.  /shrug

function union(sets) {
    return [...sets].reduce((result, s) => new Set([...result, ...s]), new Set());
}

function difference(lhs, rhs) {
    return new Set([...lhs].filter(x => !rhs.has(x)));
}

function intersection(lhs, rhs) {
    new Set([...lhs].filter(x => rhs.has(x)))
}

export {union, difference, intersection};