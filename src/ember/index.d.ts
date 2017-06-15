
declare namespace Ember {

    interface EmberClass<T, E = any> {
        new (...args: any[]): T;
        prototype: T;

        extend<Statics, Instance extends CoreObject, Extensions extends E>(
            this: EmberClass<Instance> & Statics,
            args?: Extensions & ThisType<Extensions & Instance>): EmberClass<Extensions & Instance>;

        create<Instance extends Object, Extensions extends E>(
            this: EmberClass<Instance>,
            args?: Extensions & ThisType<Extensions & Instance>): Extensions & Instance;
    }

    interface CoreObjectArguments {
        init?(): void;
        willDestroy?(): void;

        [key: string]: any;
    }

    interface CoreObject {
    }
    const CoreObject: EmberClass<CoreObject, CoreObjectArguments>;

    class Object extends CoreObject {
        _super(...args: any[]): any;

        get<K extends keyof this>(key: K): this[K];
        getProperties<K extends keyof this>(list: K[]): Pick<this, K>
        getProperties<K extends keyof this>(...list: K[]): Pick<this, K>
        set<K extends keyof this>(key: K, value: this[K]): this[K];
        setProperties<K extends keyof this>(hash: Pick<this, K>): Pick<this, K>;
    }

    interface ComponentOptions extends CoreObjectArguments {
        classNames?: string[];
        classNameBindings?: string[];
        didInsertElement?(): void;

        actions?: {
            [key: string]: Function;
        };
    }

    interface Component extends Object {
        element: HTMLElement;
        $: JQueryStatic;
        isDestroyed: boolean;
    }
    const Component: EmberClass<Component, ComponentOptions>;

    class Service extends Object {
    }

    interface NativeArray<T> extends Array<T> {
        pushObject(obj: T): void;
        removeObject(obj: T): void;
        clear(): void;
        // TODO...
    }

    function A<T>(arr?: T[]): NativeArray<T>;
    function get<T, K extends keyof T>(obj: T, key: K): T[K]
    function getProperties<T, K extends keyof T>(obj: T, list: K[]): Pick<T, K>
    function getProperties<T, K extends keyof T>(obj: T, ...list: K[]): Pick<T, K>
    function set<T, K extends keyof T, V extends T[K]>(obj: T, key: K, value: V): V;
    function setProperties<T, K extends keyof T>(obj: T, hash: Pick<T, K>): Pick<T, K>;

    interface EmberComputed {
        <T, R>(f: (this: T) => R): R;
        <T, R>(k1: keyof T, f: (this: T) => R): R;
        <T, R>(k1: keyof T, k2: keyof T, f: (this: T) => R): R;
        <T, R>(k1: keyof T, k2: keyof T, k3: keyof T, f: (this: T) => R): R;
    }
    const computed: EmberComputed;
}

declare module "ember" {
    export default Ember;
}
