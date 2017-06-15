
declare namespace Ember {
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
