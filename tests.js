(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Infections = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sets = require('../utility/sets');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function directConnections(id, classStore) {
    var classes = classStore.classesForUser(id);
    return (0, _sets.union)(classes.map(function (c) {
        return c.allUsers;
    }));
}

function connections(ids, classStore) {
    var sets = Array.from(ids).map(function (id) {
        return directConnections(id, classStore);
    });
    return (0, _sets.union)(sets);
}

var Infections = exports.Infections = function () {
    function Infections(classStore) {
        _classCallCheck(this, Infections);

        this.classStore = classStore;
    }

    _createClass(Infections, [{
        key: 'fromUser',
        value: function fromUser(id) {
            return this.fromUsers([id]);
        }
    }, {
        key: 'fromUsers',
        value: function fromUsers(ids) {
            var currentGeneration = new Set(ids);
            var nextGeneration = connections(currentGeneration, this.classStore);

            while (nextGeneration.size > currentGeneration.size) {
                var newItems = (0, _sets.difference)(nextGeneration, currentGeneration);
                currentGeneration = nextGeneration;
                nextGeneration = (0, _sets.union)([currentGeneration, connections(newItems, this.classStore)]);
            }

            return currentGeneration;
        }
    }]);

    return Infections;
}();

},{"../utility/sets":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Class = exports.Class = function () {
    function Class(name, instructors, students) {
        _classCallCheck(this, Class);

        this.name = name;
        this.instructors = instructors;
        this.students = students;
    }

    _createClass(Class, [{
        key: "hasUser",
        value: function hasUser(id) {
            return this.allUsers.has(id);
        }
    }, {
        key: "allUsers",
        get: function get() {
            return new Set(this.instructors.concat(this.students));
        }
    }], [{
        key: "fromJson",
        value: function fromJson(data) {
            return new Class(data.name, data.instructors, data.students);
        }
    }]);

    return Class;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
    function User(id, first, last, version) {
        _classCallCheck(this, User);

        this.id = id;
        this.first = first;
        this.last = last;
        this.version = version;
    }

    _createClass(User, null, [{
        key: "fromJson",
        value: function fromJson(data) {
            return new User(data.id, data.first, data.last, data.version);
        }
    }]);

    return User;
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClassStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sets = require('../utility/sets');

var _class = require('../models/class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassStore = exports.ClassStore = function () {
    function ClassStore(primingData) {
        _classCallCheck(this, ClassStore);

        if (primingData) {
            this._classes = primingData.map(_class.Class.fromJson);
        }
    }

    _createClass(ClassStore, [{
        key: 'fetch',
        value: function fetch() {
            return this.classes;
        }
    }, {
        key: 'classesForUser',
        value: function classesForUser(id) {
            return this.classes.filter(function (c) {
                return c.hasUser(id);
            });
        }
    }, {
        key: 'classesForUsers',
        value: function classesForUsers(ids) {
            var _this = this;

            return (0, _sets.union)(ids.map(function (id) {
                return _this.classesForUser(id);
            }));
        }
    }, {
        key: 'classes',
        get: function get() {
            return this._classes || [];
        }
    }]);

    return ClassStore;
}();

;

},{"../models/class":2,"../utility/sets":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserStore = exports.UserStore = function () {
    function UserStore(primingData) {
        _classCallCheck(this, UserStore);

        if (primingData) {
            this._users = primingData.map(_user.User.fromJson);
        }
    }

    _createClass(UserStore, [{
        key: 'fetch',
        value: function fetch() {
            return this.users;
        }
    }, {
        key: 'fetchUser',
        value: function fetchUser(id) {
            return this.users.find(function (u) {
                return u.id === id;
            });
        }
    }, {
        key: 'fetchUsers',
        value: function fetchUsers(ids) {
            var _this = this;

            return ids.map(function (id) {
                return _this.fetchUser(id);
            });
        }
    }, {
        key: 'users',
        get: function get() {
            return this._users || [];
        }
    }]);

    return UserStore;
}();

;

},{"../models/user":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// It is unfortunate that ES2015 Sets don't have these built in. 
// These functions are inspired by http://www.2ality.com/2015/01/es6-set-operations.html
// But they are rather ineficient... creating lots of temporary arrays.  /shrug

function union(sets) {
    return [].concat(_toConsumableArray(sets)).reduce(function (result, s) {
        return new Set([].concat(_toConsumableArray(result), _toConsumableArray(s)));
    }, new Set());
}

function difference(lhs, rhs) {
    return new Set([].concat(_toConsumableArray(lhs)).filter(function (x) {
        return !rhs.has(x);
    }));
}

function intersection(lhs, rhs) {
    new Set([].concat(_toConsumableArray(lhs)).filter(function (x) {
        return rhs.has(x);
    }));
}

exports.union = union;
exports.difference = difference;
exports.intersection = intersection;

},{}],7:[function(require,module,exports){
'use strict';

var _infections = require('../../app/engine/infections');

var _classStore = require('../../app/stores/class-store');

var _class = require('../../app/models/class');

describe('Infections', function () {
    describe('coach with single class', function () {
        it('gets all users', function () {
            var classStore = new _classStore.ClassStore([{ instructors: [1], students: [2, 3, 4] }]);
            var infections = new _infections.Infections(classStore);

            var allUsers = infections.fromUser(1);

            expect(Array.from(allUsers)).toEqual([1, 2, 3, 4]);
        });
    });

    describe('coach with two classes', function () {
        it('gets users from both classes', function () {
            var classStore = new _classStore.ClassStore([{ instructors: [1], students: [2, 3, 4] }, { instructors: [1], students: [4, 5, 6] }]);
            var infections = new _infections.Infections(classStore);

            var allUsers = infections.fromUser(1);

            expect(Array.from(allUsers)).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe('coach tree two deep', function () {
        it('traverses the tree', function () {
            var classStore = new _classStore.ClassStore([{ instructors: [1], students: [2, 3, 4] }, { instructors: [2], students: [10, 11] }]);
            var infections = new _infections.Infections(classStore);

            var allUsers = infections.fromUser(1);

            expect(Array.from(allUsers)).toEqual([1, 2, 3, 4, 10, 11]);
        });
    });

    describe('coach tree three deep', function () {
        it('traverses the tree', function () {
            var classStore = new _classStore.ClassStore([{ instructors: [1], students: [2, 3, 4] }, { instructors: [2], students: [10, 11] }, { instructors: [10], students: [100] }, { instructors: [11], students: [200] }]);
            var infections = new _infections.Infections(classStore);

            var allUsers = infections.fromUser(1);

            expect(Array.from(allUsers)).toEqual([1, 2, 3, 4, 10, 11, 100, 200]);
        });
    });

    describe('coach tree four deep', function () {
        it('traverses the tree', function () {
            var classStore = new _classStore.ClassStore([{ instructors: [1], students: [2, 3, 4] }, { instructors: [2], students: [10, 11] }, { instructors: [10], students: [100] }, { instructors: [11], students: [200] }, { instructors: [200], students: [1000] }]);
            var infections = new _infections.Infections(classStore);

            var allUsers = infections.fromUser(1);

            expect(Array.from(allUsers)).toEqual([1, 2, 3, 4, 10, 11, 100, 200, 1000]);
        });
    });
});

},{"../../app/engine/infections":1,"../../app/models/class":2,"../../app/stores/class-store":4}],8:[function(require,module,exports){
'use strict';

var _class = require('../../app/models/class');

describe('Class', function () {
    var test = {};

    beforeEach(function () {
        test.subject = new _class.Class('Math 101', [1], [2, 3, 4]);
    });

    describe('Constructor', function () {
        it('sets properties', function () {
            expect(test.subject.name).toBe('Math 101');
            expect(test.subject.instructors).toEqual([1]);
            expect(test.subject.students).toEqual([2, 3, 4]);
        });
    });

    describe("#allUsers", function () {
        it('gets set of instructors and students', function () {
            var allUsers = Array.from(test.subject.allUsers);
            expect(allUsers).toEqual([1, 2, 3, 4]);
        });
    });

    describe("#hasUser", function () {
        it('is true when a class includes an instructor', function () {
            expect(test.subject.hasUser(1)).toBeTruthy();
        });

        it('is true when a class includes a student', function () {
            expect(test.subject.hasUser(2)).toBeTruthy();
        });

        it('is false when a class doesnt have a user', function () {
            expect(test.subject.hasUser(5)).toBeFalsy();
        });
    });
});

},{"../../app/models/class":2}],9:[function(require,module,exports){
'use strict';

var _user = require('../../app/models/user');

describe('User', function () {
    describe('Constructor', function () {
        it('sets properties', function () {
            var subject = new _user.User(1, 'Brian', 'Genisio', 42);

            expect(subject.id).toBe(1);
            expect(subject.first).toBe('Brian');
            expect(subject.last).toBe('Genisio');
            expect(subject.version).toBe(42);
        });
    });
});

},{"../../app/models/user":3}],10:[function(require,module,exports){
'use strict';

var _class = require('../../app/models/class');

var _classStore = require('../../app/stores/class-store');

describe('ClassStore', function () {
    describe('fetch', function () {
        it('fetches classes', function () {
            var subject = new _classStore.ClassStore([{ "name": "my class" }]);

            var classes = subject.fetch();

            expect(classes[0].name).toBe('my class');
            expect(classes[0] instanceof _class.Class).toBeTruthy();
        });
    });

    describe('#classesForUser', function () {
        var test = {};

        beforeEach(function () {
            test.subject = new _classStore.ClassStore([{ name: 'math', instructors: [1], students: [2, 3, 4] }, { name: 'science', instructors: [5], students: [2, 3, 4] }]);
        });

        it('finds class where users are is instructor', function () {
            var classes = test.subject.classesForUser(1);

            expect(classes.length).toBe(1);
            expect(classes[0].name).toBe('math');
        });
    });
});

},{"../../app/models/class":2,"../../app/stores/class-store":4}],11:[function(require,module,exports){
'use strict';

var _user = require('../../app/models/user');

var _userStore = require('../../app/stores/user-store');

describe('UserStore', function () {
    describe('fetch', function () {
        it('fetches users', function () {
            var subject = new _userStore.UserStore([{ first: "brian", last: "genisio", version: 42 }]);

            var users = subject.fetch();

            expect(users[0].first).toBe('brian');
            expect(users[0].last).toBe('genisio');
            expect(users[0].version).toBe(42);
            expect(users[0] instanceof _user.User).toBeTruthy();
        });
    });
});

},{"../../app/models/user":3,"../../app/stores/user-store":5}]},{},[7,8,9,10,11]);
