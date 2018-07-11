global.window = global;
global.assert = require('chai').assert;
require('../src/network.js');
require('./network.spec.js');