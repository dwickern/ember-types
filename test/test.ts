import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import * as mocha from "mocha";
import * as chai from "chai";
import * as glob from "glob";

export function readCompilerOptions(rootDir: string) {
    const filename = path.resolve(rootDir, 'tsconfig.json');
    const jsonText = fs.readFileSync(filename, 'utf8');
    return ts.parseConfigFileTextToJson(filename, jsonText).config.compilerOptions;
}

export function compile(sourceFile: string, compilerOptions: ts.CompilerOptions) {
    const program = ts.createProgram([ sourceFile ], compilerOptions);

    for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
        if (diagnostic.category !== ts.DiagnosticCategory.Error) {
            continue;
        }

        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        chai.assert(false, `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    }
}

const fixtures = path.join(__dirname, 'fixtures');
const compilerOptions = readCompilerOptions(fixtures);

describe('Compile tests', function() {
    const guides = glob.sync(path.join(fixtures, '**/*.ts'), { nodir: true });
    guides.forEach(function (sourceFile) {
        it('should compile ' + path.relative(__dirname, sourceFile), function () {
            compile(sourceFile, compilerOptions);
        });
    });
});
