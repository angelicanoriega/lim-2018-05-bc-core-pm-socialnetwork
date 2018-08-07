global.window = global;
global.assert = require('chai').assert;
global.jestExpect = global.expect;
require('../src/network.js');
require('./network.spec.js');