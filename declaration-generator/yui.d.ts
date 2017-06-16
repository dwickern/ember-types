declare namespace YUI {
    interface ConstructorParam {
        name: string;
        description: string;
        type: string;
    }

    type Access = 'private' | 'public' | 'protected';

    interface Class {
        name: string;
        shortname: string;
        classitems: any[];
        plugins: any[];
        extensions: any[];
        plugin_for: any[];
        extension_for: any[];
        module: string;
        file?: string;
        line?: number;
        description?: string;
        is_constructor?: 0 | 1;
        params?: ConstructorParam[];
        access?: Access;
        tagname?: string;
        class?: string;
        namespace?: string;
    }

    type TypeName = string;

    interface Param {
        name: string;
        description: string;
        type?: TypeName;
        optional?: boolean;
        multiple?: boolean;
        props?: Param[];
        optdfault?: string;
    }

    interface ReturnType {
        description?: string;
        type?: string;
    }

    interface ClassItem {
        file: string;
        line: number;
        itemtype?: 'method' | 'property' | 'event';
        name: string;
        description: string;
        type?: string;
        return?: ReturnType,
        params?: Param[];
        access: Access,
        tagname: string;
        class: string;
        module: string;
        submodule: string;
        namespace: string;
    }
    interface Data {
        project: any;
        files: any;
        modules: any;
        classes: {
            [className: string]: Class;
        };
        elements: any;
        classitems: any[];
        warnings: any[];
    }
}