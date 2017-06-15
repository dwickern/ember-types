
declare namespace Ember {

    interface EmberClass<T> {
        new (...args: any[]): T;
        prototype: T;

        extend<Statics, Instance extends CoreObject, Extensions>(
            this: EmberClass<Instance> & Statics,
            args?: Extensions & ThisType<Extensions & Instance>): EmberClass<Extensions & Instance>;

        create<Instance extends Object, Extensions>(
            this: EmberClass<Instance>,
            args?: Extensions & ThisType<Extensions & Instance>): Extensions & Instance;
    }

    interface CoreObject {
    }
    const CoreObject: EmberClass<CoreObject>;

    class Object extends CoreObject {
        get<K extends keyof this>(key: K): this[K];
        set<T, K extends keyof T, V extends T[K]>(this: T, key: K, value: V): V;
    }
    class Component extends Object {
    }
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
    function set<T, K extends keyof T, V extends T[K]>(obj: T, key: K, value: V): V;
}

declare module "ember" {
    export default Ember;
}
