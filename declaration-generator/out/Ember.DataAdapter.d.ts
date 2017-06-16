//packages/ember-extension-support/lib/data_adapter.js
declare namespace Ember {
    /*
    The `DataAdapter` helps a data persistence library
    interface with tools that debug Ember such
    as the [Ember Extension](https://github.com/tildeio/ember-extension)
    for Chrome and Firefox.
    
    This class will be extended by a persistence library
    which will override some of the methods with
    library-specific code.
    
    The methods likely to be overridden are:
    
    * `getFilters`
    * `detect`
    * `columnsForType`
    * `getRecords`
    * `getRecordColumnValues`
    * `getRecordKeywords`
    * `getRecordFilterValues`
    * `getRecordColor`
    * `observeRecord`
    
    The adapter will need to be registered
    in the application's container as `dataAdapter:main`.
    
    Example:
    
    ```javascript
    Application.initializer({
      name: "data-adapter",
    
      initialize: function(application) {
        application.register('data-adapter:main', DS.DataAdapter);
      }
    });
    ```
    */
    class DataAdapter {
        /*
        The container-debug-adapter which is used
        to list all models.
        */
        containerDebugAdapter: any;
        /*
        Ember Data > v1.0.0-beta.18
        requires string model names to be passed
        around instead of the actual factories.
        
        This is a stamp for the Ember Inspector
        to differentiate between the versions
        to be able to support older versions too.
        */
        acceptsModelName: any;
        /*
        Specifies how records can be filtered.
        Records returned will need to have a `filterValues`
        property with a key for every name in the returned array.
        */
        getFilters(): Array;
        /*
        Fetch the model types and observe them for changes.
        */
        watchModelTypes(typesAdded: Function, typesUpdated: Function): Function;
        /*
        Fetch the records of a given type and observe them for changes.
        */
        watchRecords(modelName: string, recordsAdded: Function, recordsUpdated: Function, recordsRemoved: Function): Function;
    }
}
