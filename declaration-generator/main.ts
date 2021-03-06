/// <reference path="yui.d.ts"/>
import * as fs from "fs";
import * as ts from "typescript";
import * as path from "path";

if (process.argv.length < 3) {
    console.log(`Usage: node ${__filename} "ember.js/docs/data.json" outdir`);
    process.exit(1);
}

const [ infile, outdir ] = process.argv.slice(2);

generate(infile, outdir);

function generate(inputfile: string, outdir: string) {
    const json = fs.readFileSync(inputfile, "utf8");
    const data: YUI.Data = JSON.parse(json);
    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
        removeComments: false
    });

    if (!fs.existsSync(outdir)) {
        fs.mkdirSync(outdir);
    }

    Object.values(data.classes).forEach(c => {
        const source = toSourceFile(c, data.classitems);
        const text = printer.printFile(source);
        const outfile = path.resolve(outdir, `${path.basename(c.name)}.d.ts`);
        fs.writeFileSync(outfile, text);
    });
}

function toSourceFile(clazz: YUI.Class, items: YUI.ClassItem[]): ts.SourceFile {
    let namespace = ts.createModuleDeclaration(
        /* decorators = */ undefined,
        /* modifiers = */ [ ts.createToken(ts.SyntaxKind.DeclareKeyword) ],
        /* name = */ ts.createIdentifier(clazz.namespace || "Ember"),
        /* body = */  ts.createModuleBlock([
            classDeclaration(clazz, items)
        ]),
        /* flags = */ ts.NodeFlags.Namespace
    );

    if (clazz.file) {
        namespace = ts.addSyntheticLeadingComment(namespace,
            /* kind = */ ts.SyntaxKind.SingleLineCommentTrivia,
            /* text = */ clazz.file,
            /* hasTrailingNewLine = */ true
        );
    }
    
    let sourceFile = ts.createSourceFile(
        /* fileName = */ "",
        /* sourceText = */ "",
        /* languageVersion = */ ts.ScriptTarget.Latest,
        /* setParentNodes = */ false,
        /* scriptKind = */ ts.ScriptKind.TS
    );

    sourceFile = ts.updateSourceFileNode(sourceFile, [ namespace ]);
    return sourceFile;
}

function classDeclaration(c: YUI.Class, items: YUI.ClassItem[]): ts.ClassDeclaration {
    const className = c.name
        .replace(/^.*\./, ''); // remove prefix

    const members = items
        .filter(ci => ci.class === c.name)
        .filter(ci => ci.access !== 'private')
        .sort((a, b) => a.line - b.line)
        .map(classMember)
        .filter((x): x is ts.ClassElement => x !== null);

    let decl = ts.createClassDeclaration(
        /* decorators = */ undefined,
        /* modifiers = */ [ ...modifiers(c.access) ],
        /* name = */ className,
        /* typeParameters = */ undefined,
        /* heritageClauses = */ [],
        /* members = */ members
    );

    decl = addComment(decl, c.description);
    return decl;
}

function classMember(c: YUI.ClassItem): ts.ClassElement | null {
    switch (c.itemtype) {
        case 'method':
        case 'event':
            return method(c);
        case 'property':
            return property(c);
        default:
            console.warn(`Skipping ${c.file}:${c.line}`);
            return null;
    }
}

function method(c: YUI.ClassItem): ts.MethodDeclaration {
    let method = ts.createMethod(
        /* decorators = */ undefined,
        /* modifiers = */ Array.from(modifiers(c.access)),
        /* asteriskToken = */ undefined,
        /* name = */ identifier(c.name),
        /* questionToken = */ undefined,
        /* typeParameters = */ undefined,
        /* parameters = */ (c.params || []).map(param),
        /* returnType = */ returnType(c.return),
        /* body = */ undefined,
    );
    method = addComment(method, c.description);
    return method;
}

function property(c: YUI.ClassItem): ts.PropertyDeclaration {
    let property = ts.createProperty(
        /* decorators = */ undefined,
        /* modifiers = */ Array.from(modifiers(c.access)),
        /* name = */ identifier(c.name),
        /* questionToken = */ undefined,
        /* type = */ type(c.type),
        /* initializer = */ undefined
    );
    property = addComment(property, c.description);
    return property;
}


function identifier(name: string) {
    name = name.replace(/\*$/, ''); // args* => args

    const ValidIdentifierRegex = /^[$A-Z_][0-9A-Z_$]*$/i;
    const ReservedWords = <string[]>[

    ];
    if (!name.match(ValidIdentifierRegex) || ReservedWords.includes(name)) {
        name = `"${name}"`;
    }

    return ts.createIdentifier(name);
}

function * modifiers(access?: YUI.Access): Iterable<ts.Modifier> {
    switch (access) {
        case 'private':
            yield ts.createToken(ts.SyntaxKind.PrivateKeyword);
            break;
        case 'protected':
            yield ts.createToken(ts.SyntaxKind.ProtectedKeyword);
            break;
    }
}

function addComment<T extends ts.Node>(node: T, description?: string): T {
    if (!description) {
        return node;
    }

    // TODO: parameter and return type comments
    return ts.addSyntheticLeadingComment(node,
        /* kind = */ ts.SyntaxKind.MultiLineCommentTrivia,
        /* text = */ `\n${description}\n`,
        /* hasTrailingNewLine = */ true
    );
}

function param(param: YUI.Param): ts.ParameterDeclaration {
    const varargs = param.name.endsWith('*') ||
        (param.type && (param.type.startsWith('...') || param.type.endsWith('...'))) ||
        param.multiple;

    return ts.createParameter(
        /* decorators = */ undefined,
        /* modifiers = */ undefined,
        /* dotDotDotToken = */ varargs ? ts.createToken(ts.SyntaxKind.DotDotDotToken) : undefined,
        /* name = */ identifier(param.name),
        /* questionToken = */ undefined,
        /* type = */ type(param.type, varargs),
        /* initializer = */ undefined
    );
}

function returnType(returnType?: YUI.ReturnType): ts.TypeNode {
    return type(returnType && returnType.type);
}

function type(t?: YUI.TypeName, varargs: boolean = false): ts.TypeNode {
    if (varargs) {
        return ts.createArrayTypeNode(type(t));
    }
    if (!t) {
        return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    }

    const union = t.split(/\s*(?:\||\sor\s)\s*/); // string|number, string or number
    if (union.length > 1) {
        return ts.createUnionTypeNode(union.map(choice => type(choice)));
    }

    t = t.replace(/^\.{3}/, ''); // ...Object => Object
    t = t.replace(/\.{3}$/, ''); // Object... => Object

    switch (t) {
        case 'Object':
        case 'Any':
        case '*':
            return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        case 'Void':
            return ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);
        case 'String':
            return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
        case 'Number':
            return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
        case 'Boolean':
            return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
        case 'Function':
        case 'Error':
        case 'Exception':
        case 'Promise':
        case 'RegExp':
        case 'JQuery':
        case 'DOMElement':
        default:
            return ts.createTypeReferenceNode(t, undefined);
    }
}
