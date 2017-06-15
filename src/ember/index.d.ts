
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
}

declare module "ember" {
    export default Ember;
}
