var ts = require('typescript');
var tt = require('typescript-definition-tester');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

function readCompilerOptions() {
    var filename = path.resolve(__dirname, 'tsconfig.json');
    var jsonText = fs.readFileSync(filename, 'utf8');
    return ts.parseConfigFileTextToJson(filename, jsonText).config.compilerOptions;
}

var compilerOptions = readCompilerOptions();

describe('Ember guides tests', function() {
    glob.sync(__dirname + '/guides/**/*.ts').forEach(function (source) {
        it('should compile ' + path.relative(__dirname, source), function (done) {
            tt.compile([ source ], compilerOptions, function () {
                done();
            })
        });
    });
});
