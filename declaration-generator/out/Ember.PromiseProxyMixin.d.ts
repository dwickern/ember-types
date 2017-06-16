//packages/ember-runtime/lib/mixins/promise_proxy.js
declare namespace Ember {
    /*
    A low level mixin making ObjectProxy promise-aware.
    
    ```javascript
    let ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
    
    let proxy = ObjectPromiseProxy.create({
      promise: Ember.RSVP.cast($.getJSON('/some/remote/data.json'))
    });
    
    proxy.then(function(json){
       // the json
    }, function(reason) {
       // the reason why you have no json
    });
    ```
    
    the proxy has bindable attributes which
    track the promises life cycle
    
    ```javascript
    proxy.get('isPending')   //=> true
    proxy.get('isSettled')  //=> false
    proxy.get('isRejected')  //=> false
    proxy.get('isFulfilled') //=> false
    ```
    
    When the $.getJSON completes, and the promise is fulfilled
    with json, the life cycle attributes will update accordingly.
    Note that $.getJSON doesn't return an ECMA specified promise,
    it is useful to wrap this with an `RSVP.cast` so that it behaves
    as a spec compliant promise.
    
    ```javascript
    proxy.get('isPending')   //=> false
    proxy.get('isSettled')   //=> true
    proxy.get('isRejected')  //=> false
    proxy.get('isFulfilled') //=> true
    ```
    
    As the proxy is an ObjectProxy, and the json now its content,
    all the json properties will be available directly from the proxy.
    
    ```javascript
    // Assuming the following json:
    {
      firstName: 'Stefan',
      lastName: 'Penner'
    }
    
    // both properties will accessible on the proxy
    proxy.get('firstName') //=> 'Stefan'
    proxy.get('lastName')  //=> 'Penner'
    ```
    */
    class PromiseProxyMixin {
        /*
        If the proxied promise is rejected this will contain the reason
        provided.
        */
        reason: any;
        /*
        Once the proxied promise has settled this will become `false`.
        */
        isPending: any;
        /*
        Once the proxied promise has settled this will become `true`.
        */
        isSettled: any;
        /*
        Will become `true` if the proxied promise is rejected.
        */
        isRejected: any;
        /*
        Will become `true` if the proxied promise is fulfilled.
        */
        isFulfilled: any;
        /*
        The promise whose fulfillment value is being proxied by this object.
        
        This property must be specified upon creation, and should not be
        changed once created.
        
        Example:
        
        ```javascript
        Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
          promise: <thenable>
        });
        ```
        */
        promise: any;
        /*
        An alias to the proxied promise's `then`.
        
        See RSVP.Promise.then.
        */
        then(callback: Function): RSVP.Promise;
        /*
        An alias to the proxied promise's `catch`.
        
        See RSVP.Promise.catch.
        */
        catch(callback: Function): RSVP.Promise;
        /*
        An alias to the proxied promise's `finally`.
        
        See RSVP.Promise.finally.
        */
        finally(callback: Function): RSVP.Promise;
    }
}
