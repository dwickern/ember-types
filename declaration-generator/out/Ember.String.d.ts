//packages/ember-runtime/lib/system/string.js
declare namespace Ember {
    /*
    Defines string helper methods including string formatting and localization.
    Unless `EmberENV.EXTEND_PROTOTYPES.String` is `false` these methods will also be
    added to the `String.prototype` as well.
    */
    class String {
        /*
        Mark a string as safe for unescaped output with Ember templates. If you
        return HTML from a helper, use this function to
        ensure Ember's rendering layer does not escape the HTML.
        
        ```javascript
        Ember.String.htmlSafe('<div>someString</div>')
        ```
        */
        htmlSafe(): Handlebars.SafeString;
        /*
        Detects if a string was decorated using `Ember.String.htmlSafe`.
        
        ```javascript
        var plainString = 'plain string',
            safeString = Ember.String.htmlSafe('<div>someValue</div>');
        
        Ember.String.isHTMLSafe(plainString); // false
        Ember.String.isHTMLSafe(safeString);  // true
        ```
        */
        isHTMLSafe(): boolean;
        /*
        Apply formatting options to the string. This will look for occurrences
        of "%@" in your string and substitute them with the arguments you pass into
        this method. If you want to control the specific order of replacement,
        you can add a number after the key as well to indicate which argument
        you want to insert.
        
        Ordered insertions are most useful when building loc strings where values
        you need to insert may appear in different orders.
        
        ```javascript
        "Hello %@ %@".fmt('John', 'Doe');     // "Hello John Doe"
        "Hello %@2, %@1".fmt('John', 'Doe');  // "Hello Doe, John"
        ```
        */
        fmt(str: string, formats: Array): string;
        /*
        Formats the passed string, but first looks up the string in the localized
        strings hash. This is a convenient way to localize text. See
        `Ember.String.fmt()` for more information on formatting.
        
        Note that it is traditional but not required to prefix localized string
        keys with an underscore or other character so you can easily identify
        localized strings.
        
        ```javascript
        Ember.STRINGS = {
          '_Hello World': 'Bonjour le monde',
          '_Hello %@ %@': 'Bonjour %@ %@'
        };
        
        Ember.String.loc("_Hello World");  // 'Bonjour le monde';
        Ember.String.loc("_Hello %@ %@", ["John", "Smith"]);  // "Bonjour John Smith";
        ```
        */
        loc(str: string, formats: Array): string;
        /*
        Splits a string into separate units separated by spaces, eliminating any
        empty strings in the process. This is a convenience method for split that
        is mostly useful when applied to the `String.prototype`.
        
        ```javascript
        Ember.String.w("alpha beta gamma").forEach(function(key) {
          console.log(key);
        });
        
        // > alpha
        // > beta
        // > gamma
        ```
        */
        w(str: string): Array;
        /*
        Converts a camelized string into all lower case separated by underscores.
        
        ```javascript
        'innerHTML'.decamelize();           // 'inner_html'
        'action_name'.decamelize();        // 'action_name'
        'css-class-name'.decamelize();     // 'css-class-name'
        'my favorite items'.decamelize();  // 'my favorite items'
        ```
        */
        decamelize(str: string): string;
        /*
        Replaces underscores, spaces, or camelCase with dashes.
        
        ```javascript
        'innerHTML'.dasherize();          // 'inner-html'
        'action_name'.dasherize();        // 'action-name'
        'css-class-name'.dasherize();     // 'css-class-name'
        'my favorite items'.dasherize();  // 'my-favorite-items'
        'privateDocs/ownerInvoice'.dasherize(); // 'private-docs/owner-invoice'
        ```
        */
        dasherize(str: string): string;
        /*
        Returns the lowerCamelCase form of a string.
        
        ```javascript
        'innerHTML'.camelize();          // 'innerHTML'
        'action_name'.camelize();        // 'actionName'
        'css-class-name'.camelize();     // 'cssClassName'
        'my favorite items'.camelize();  // 'myFavoriteItems'
        'My Favorite Items'.camelize();  // 'myFavoriteItems'
        'private-docs/owner-invoice'.camelize(); // 'privateDocs/ownerInvoice'
        ```
        */
        camelize(str: string): string;
        /*
        Returns the UpperCamelCase form of a string.
        
        ```javascript
        'innerHTML'.classify();          // 'InnerHTML'
        'action_name'.classify();        // 'ActionName'
        'css-class-name'.classify();     // 'CssClassName'
        'my favorite items'.classify();  // 'MyFavoriteItems'
        'private-docs/owner-invoice'.classify(); // 'PrivateDocs/OwnerInvoice'
        ```
        */
        classify(str: string): string;
        /*
        More general than decamelize. Returns the lower\_case\_and\_underscored
        form of a string.
        
        ```javascript
        'innerHTML'.underscore();          // 'inner_html'
        'action_name'.underscore();        // 'action_name'
        'css-class-name'.underscore();     // 'css_class_name'
        'my favorite items'.underscore();  // 'my_favorite_items'
        'privateDocs/ownerInvoice'.underscore(); // 'private_docs/owner_invoice'
        ```
        */
        underscore(str: string): string;
        /*
        Returns the Capitalized form of a string
        
        ```javascript
        'innerHTML'.capitalize()         // 'InnerHTML'
        'action_name'.capitalize()       // 'Action_name'
        'css-class-name'.capitalize()    // 'Css-class-name'
        'my favorite items'.capitalize() // 'My favorite items'
        'privateDocs/ownerInvoice'.capitalize(); // 'PrivateDocs/ownerInvoice'
        ```
        */
        capitalize(str: string): string;
    }
}
