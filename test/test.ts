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

export function compile(filename: string, compilerOptions: ts.CompilerOptions) {
    const program = ts.createProgram([ filename ], compilerOptions);
    const sourceFile = program.getSourceFile(filename);
    const expected = new Map(expectedErrors(sourceFile));

    for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
        if (diagnostic.category !== ts.DiagnosticCategory.Error) {
            continue;
        }

        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        if (expected.has(line)) {
            const { text, code } = expected.get(line);
            chai.assert(diagnostic.code === code,
                `${diagnostic.file.fileName} (line ${line + 1}): Expected TS${code} but got TS${diagnostic.code}: ${text}`);
            expected.delete(line);
            continue;
        }
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        chai.assert(false, `${diagnostic.file.fileName} (${line + 1},${character + 1}) TS${diagnostic.code}: ${message}`);
    }

    for (const [ line, { text, code } ] of expected) {
        chai.assert(false, `${sourceFile.fileName} (line ${line + 1}): Expected code to NOT type-check: ${text}`);
    }
}

function * expectedErrors(sourceFile: ts.SourceFile): Iterable<[ number, { text: string, code: number } ]> {
    const lines = sourceFile.getLineStarts();
    const ss = ts.ScriptSnapshot.fromString(sourceFile.text);

    for (const [ line, start ] of lines.entries()) {
        const end = sourceFile.getLineEndOfPosition(start);
        const text = ss.getText(start, end);
        const matches = text.match(/\/\/\s*EXPECT:?\s*TS(\d+)/);
        if (matches) {
            const code = Number(matches[1]);
            yield [ line, { text, code } ];
        }
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
