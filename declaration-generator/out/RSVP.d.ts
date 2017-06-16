declare namespace Ember {
    class RSVP {
        /*
        `RSVP.rethrow` will rethrow an error on the next turn of the JavaScript event
        loop in order to aid debugging.
        
        Promises A+ specifies that any exceptions that occur with a promise must be
        caught by the promises implementation and bubbled to the last handler. For
        this reason, it is recommended that you always specify a second rejection
        handler function to `then`. However, `RSVP.rethrow` will throw the exception
        outside of the promise, so it bubbles up to your console if in the browser,
        or domain/cause uncaught exception in Node. `rethrow` will also throw the
        error again so the error can be handled by the promise per the spec.
        
        ```javascript
        function throws(){
          throw new Error('Whoops!');
        }
        
        let promise = new RSVP.Promise(function(resolve, reject){
          throws();
        });
        
        promise.catch(RSVP.rethrow).then(function(){
          // Code here doesn't run because the promise became rejected due to an
          // error!
        }, function (err){
          // handle the error here
        });
        ```
        
        The 'Whoops' error will be thrown on the next turn of the event loop
        and you can watch for it in your console. You can also handle it using a
        rejection handler given to `.then` or `.catch` on the returned promise.
        */
        rethrow(reason: Error): any;
        /*
        This is a convenient alias for `RSVP.Promise.all`.
        */
        all(array: Array, label: string): any;
        /*
        This is a convenient alias for `RSVP.Promise.race`.
        */
        race(array: Array, label: string): any;
        /*
        `RSVP.Promise.all` accepts an array of promises, and returns a new promise which
        is fulfilled with an array of fulfillment values for the passed promises, or
        rejected with the reason of the first passed promise to be rejected. It casts all
        elements of the passed iterable to promises as it runs this algorithm.
        
        Example:
        
        ```javascript
        let promise1 = RSVP.resolve(1);
        let promise2 = RSVP.resolve(2);
        let promise3 = RSVP.resolve(3);
        let promises = [ promise1, promise2, promise3 ];
        
        RSVP.Promise.all(promises).then(function(array){
          // The array here would be [ 1, 2, 3 ];
        });
        ```
        
        If any of the `promises` given to `RSVP.all` are rejected, the first promise
        that is rejected will be given as an argument to the returned promises's
        rejection handler. For example:
        
        Example:
        
        ```javascript
        let promise1 = RSVP.resolve(1);
        let promise2 = RSVP.reject(new Error("2"));
        let promise3 = RSVP.reject(new Error("3"));
        let promises = [ promise1, promise2, promise3 ];
        
        RSVP.Promise.all(promises).then(function(array){
          // Code here never runs because there are rejected promises!
        }, function(error) {
          // error.message === "2"
        });
        ```
        */
        all(entries: Array, label: string): Promise;
        /*
        This is a convenient alias for `RSVP.Promise.reject`.
        */
        reject(reason: any, label: string): Promise;
        /*
        This is a convenient alias for `RSVP.Promise.resolve`.
        */
        resolve(value: any, label: string): Promise;
        /*
        `RSVP.defer` returns an object similar to jQuery's `$.Deferred`.
        `RSVP.defer` should be used when porting over code reliant on `$.Deferred`'s
        interface. New code should use the `RSVP.Promise` constructor instead.
        
        The object returned from `RSVP.defer` is a plain object with three properties:
        
        * promise - an `RSVP.Promise`.
        * reject - a function that causes the `promise` property on this object to
          become rejected
        * resolve - a function that causes the `promise` property on this object to
          become fulfilled.
        
        Example:
        
         ```javascript
         let deferred = RSVP.defer();
        
         deferred.resolve("Success!");
        
         deferred.promise.then(function(value){
           // value here is "Success!"
         });
         ```
        */
        defer(label: string): any;
        /*
        `RSVP.hash` is similar to `RSVP.all`, but takes an object instead of an array
        for its `promises` argument.
        
        Returns a promise that is fulfilled when all the given promises have been
        fulfilled, or rejected if any of them become rejected. The returned promise
        is fulfilled with a hash that has the same key names as the `promises` object
        argument. If any of the values in the object are not promises, they will
        simply be copied over to the fulfilled object.
        
        Example:
        
        ```javascript
        let promises = {
          myPromise: RSVP.resolve(1),
          yourPromise: RSVP.resolve(2),
          theirPromise: RSVP.resolve(3),
          notAPromise: 4
        };
        
        RSVP.hash(promises).then(function(hash){
          // hash here is an object that looks like:
          // {
          //   myPromise: 1,
          //   yourPromise: 2,
          //   theirPromise: 3,
          //   notAPromise: 4
          // }
        });
        ````
        
        If any of the `promises` given to `RSVP.hash` are rejected, the first promise
        that is rejected will be given as the reason to the rejection handler.
        
        Example:
        
        ```javascript
        let promises = {
          myPromise: RSVP.resolve(1),
          rejectedPromise: RSVP.reject(new Error('rejectedPromise')),
          anotherRejectedPromise: RSVP.reject(new Error('anotherRejectedPromise')),
        };
        
        RSVP.hash(promises).then(function(hash){
          // Code here never runs because there are rejected promises!
        }, function(reason) {
          // reason.message === 'rejectedPromise'
        });
        ```
        
        An important note: `RSVP.hash` is intended for plain JavaScript objects that
        are just a set of keys and values. `RSVP.hash` will NOT preserve prototype
        chains.
        
        Example:
        
        ```javascript
        function MyConstructor(){
          this.example = RSVP.resolve('Example');
        }
        
        MyConstructor.prototype = {
          protoProperty: RSVP.resolve('Proto Property')
        };
        
        let myObject = new MyConstructor();
        
        RSVP.hash(myObject).then(function(hash){
          // protoProperty will not be present, instead you will just have an
          // object that looks like:
          // {
          //   example: 'Example'
          // }
          //
          // hash.hasOwnProperty('protoProperty'); // false
          // 'undefined' === typeof hash.protoProperty
        });
        ```
        */
        hash(object: any, label: string): Promise;
        /*
        `RSVP.Promise.resolve` returns a promise that will become resolved with the
        passed `value`. It is shorthand for the following:
        
        ```javascript
        let promise = new RSVP.Promise(function(resolve, reject){
          resolve(1);
        });
        
        promise.then(function(value){
          // value === 1
        });
        ```
        
        Instead of writing the above, your code now simply becomes the following:
        
        ```javascript
        let promise = RSVP.Promise.resolve(1);
        
        promise.then(function(value){
          // value === 1
        });
        ```
        */
        resolve(object: any, label: string): Promise;
        /*
        `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
        It is shorthand for the following:
        
        ```javascript
        let promise = new RSVP.Promise(function(resolve, reject){
          reject(new Error('WHOOPS'));
        });
        
        promise.then(function(value){
          // Code here doesn't run because the promise is rejected!
        }, function(reason){
          // reason.message === 'WHOOPS'
        });
        ```
        
        Instead of writing the above, your code now simply becomes the following:
        
        ```javascript
        let promise = RSVP.Promise.reject(new Error('WHOOPS'));
        
        promise.then(function(value){
          // Code here doesn't run because the promise is rejected!
        }, function(reason){
          // reason.message === 'WHOOPS'
        });
        ```
        */
        reject(reason: any, label: string): Promise;
        /*
        `RSVP.map` is similar to JavaScript's native `map` method, except that it
         waits for all promises to become fulfilled before running the `mapFn` on
         each item in given to `promises`. `RSVP.map` returns a promise that will
         become fulfilled with the result of running `mapFn` on the values the promises
         become fulfilled with.
        
         For example:
        
         ```javascript
        
         let promise1 = RSVP.resolve(1);
         let promise2 = RSVP.resolve(2);
         let promise3 = RSVP.resolve(3);
         let promises = [ promise1, promise2, promise3 ];
        
         let mapFn = function(item){
           return item + 1;
         };
        
         RSVP.map(promises, mapFn).then(function(result){
           // result is [ 2, 3, 4 ]
         });
         ```
        
         If any of the `promises` given to `RSVP.map` are rejected, the first promise
         that is rejected will be given as an argument to the returned promise's
         rejection handler. For example:
        
         ```javascript
         let promise1 = RSVP.resolve(1);
         let promise2 = RSVP.reject(new Error('2'));
         let promise3 = RSVP.reject(new Error('3'));
         let promises = [ promise1, promise2, promise3 ];
        
         let mapFn = function(item){
           return item + 1;
         };
        
         RSVP.map(promises, mapFn).then(function(array){
           // Code here never runs because there are rejected promises!
         }, function(reason) {
           // reason.message === '2'
         });
         ```
        
         `RSVP.map` will also wait if a promise is returned from `mapFn`. For example,
         say you want to get all comments from a set of blog posts, but you need
         the blog posts first because they contain a url to those comments.
        
         ```javscript
        
         let mapFn = function(blogPost){
           // getComments does some ajax and returns an RSVP.Promise that is fulfilled
           // with some comments data
           return getComments(blogPost.comments_url);
         };
        
         // getBlogPosts does some ajax and returns an RSVP.Promise that is fulfilled
         // with some blog post data
         RSVP.map(getBlogPosts(), mapFn).then(function(comments){
           // comments is the result of asking the server for the comments
           // of all blog posts returned from getBlogPosts()
         });
         ```
        */
        map(promises: Array, mapFn: Function, label: string): Promise;
        /*
        `RSVP.filter` is similar to JavaScript's native `filter` method, except that it
         waits for all promises to become fulfilled before running the `filterFn` on
         each item in given to `promises`. `RSVP.filter` returns a promise that will
         become fulfilled with the result of running `filterFn` on the values the
         promises become fulfilled with.
        
         For example:
        
         ```javascript
        
         let promise1 = RSVP.resolve(1);
         let promise2 = RSVP.resolve(2);
         let promise3 = RSVP.resolve(3);
        
         let promises = [promise1, promise2, promise3];
        
         let filterFn = function(item){
           return item > 1;
         };
        
         RSVP.filter(promises, filterFn).then(function(result){
           // result is [ 2, 3 ]
         });
         ```
        
         If any of the `promises` given to `RSVP.filter` are rejected, the first promise
         that is rejected will be given as an argument to the returned promise's
         rejection handler. For example:
        
         ```javascript
         let promise1 = RSVP.resolve(1);
         let promise2 = RSVP.reject(new Error('2'));
         let promise3 = RSVP.reject(new Error('3'));
         let promises = [ promise1, promise2, promise3 ];
        
         let filterFn = function(item){
           return item > 1;
         };
        
         RSVP.filter(promises, filterFn).then(function(array){
           // Code here never runs because there are rejected promises!
         }, function(reason) {
           // reason.message === '2'
         });
         ```
        
         `RSVP.filter` will also wait for any promises returned from `filterFn`.
         For instance, you may want to fetch a list of users then return a subset
         of those users based on some asynchronous operation:
        
         ```javascript
        
         let alice = { name: 'alice' };
         let bob   = { name: 'bob' };
         let users = [ alice, bob ];
        
         let promises = users.map(function(user){
           return RSVP.resolve(user);
         });
        
         let filterFn = function(user){
           // Here, Alice has permissions to create a blog post, but Bob does not.
           return getPrivilegesForUser(user).then(function(privs){
             return privs.can_create_blog_post === true;
           });
         };
         RSVP.filter(promises, filterFn).then(function(users){
           // true, because the server told us only Alice can create a blog post.
           users.length === 1;
           // false, because Alice is the only user present in `users`
           users[0] === bob;
         });
         ```
        */
        filter(promises: Array, filterFn: Function, label: string): Promise;
        /*
        `RSVP.Promise.race` returns a new promise which is settled in the same way as the
        first passed promise to settle.
        
        Example:
        
        ```javascript
        let promise1 = new RSVP.Promise(function(resolve, reject){
          setTimeout(function(){
            resolve('promise 1');
          }, 200);
        });
        
        let promise2 = new RSVP.Promise(function(resolve, reject){
          setTimeout(function(){
            resolve('promise 2');
          }, 100);
        });
        
        RSVP.Promise.race([promise1, promise2]).then(function(result){
          // result === 'promise 2' because it was resolved before promise1
          // was resolved.
        });
        ```
        
        `RSVP.Promise.race` is deterministic in that only the state of the first
        settled promise matters. For example, even if other promises given to the
        `promises` array argument are resolved, but the first settled promise has
        become rejected before the other promises became fulfilled, the returned
        promise will become rejected:
        
        ```javascript
        let promise1 = new RSVP.Promise(function(resolve, reject){
          setTimeout(function(){
            resolve('promise 1');
          }, 200);
        });
        
        let promise2 = new RSVP.Promise(function(resolve, reject){
          setTimeout(function(){
            reject(new Error('promise 2'));
          }, 100);
        });
        
        RSVP.Promise.race([promise1, promise2]).then(function(result){
          // Code here never runs
        }, function(reason){
          // reason.message === 'promise 2' because promise 2 became rejected before
          // promise 1 became fulfilled
        });
        ```
        
        An example real-world use case is implementing timeouts:
        
        ```javascript
        RSVP.Promise.race([ajax('foo.json'), timeout(5000)])
        ```
        */
        race(entries: Array, label: string): Promise;
        /*
        `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
        a fail-fast method, it waits until all the promises have returned and
        shows you all the results. This is useful if you want to handle multiple
        promises' failure states together as a set.
        
        Returns a promise that is fulfilled when all the given promises have been
        settled. The return promise is fulfilled with an array of the states of
        the promises passed into the `promises` array argument.
        
        Each state object will either indicate fulfillment or rejection, and
        provide the corresponding value or reason. The states will take one of
        the following formats:
        
        ```javascript
        { state: 'fulfilled', value: value }
          or
        { state: 'rejected', reason: reason }
        ```
        
        Example:
        
        ```javascript
        let promise1 = RSVP.Promise.resolve(1);
        let promise2 = RSVP.Promise.reject(new Error('2'));
        let promise3 = RSVP.Promise.reject(new Error('3'));
        let promises = [ promise1, promise2, promise3 ];
        
        RSVP.allSettled(promises).then(function(array){
          // array == [
          //   { state: 'fulfilled', value: 1 },
          //   { state: 'rejected', reason: Error },
          //   { state: 'rejected', reason: Error }
          // ]
          // Note that for the second item, reason.message will be '2', and for the
          // third item, reason.message will be '3'.
        }, function(error) {
          // Not run. (This block would only be called if allSettled had failed,
          // for instance if passed an incorrect argument type.)
        });
        ```
        */
        allSettled(entries: Array, label: string): Promise;
        /*
        `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
        instead of an array for its `promises` argument.
        
        Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
        but like `RSVP.allSettled`, `hashSettled` waits until all the
        constituent promises have returned and then shows you all the results
        with their states and values/reasons. This is useful if you want to
        handle multiple promises' failure states together as a set.
        
        Returns a promise that is fulfilled when all the given promises have been
        settled, or rejected if the passed parameters are invalid.
        
        The returned promise is fulfilled with a hash that has the same key names as
        the `promises` object argument. If any of the values in the object are not
        promises, they will be copied over to the fulfilled object and marked with state
        'fulfilled'.
        
        Example:
        
        ```javascript
        let promises = {
          myPromise: RSVP.Promise.resolve(1),
          yourPromise: RSVP.Promise.resolve(2),
          theirPromise: RSVP.Promise.resolve(3),
          notAPromise: 4
        };
        
        RSVP.hashSettled(promises).then(function(hash){
          // hash here is an object that looks like:
          // {
          //   myPromise: { state: 'fulfilled', value: 1 },
          //   yourPromise: { state: 'fulfilled', value: 2 },
          //   theirPromise: { state: 'fulfilled', value: 3 },
          //   notAPromise: { state: 'fulfilled', value: 4 }
          // }
        });
        ```
        
        If any of the `promises` given to `RSVP.hash` are rejected, the state will
        be set to 'rejected' and the reason for rejection provided.
        
        Example:
        
        ```javascript
        let promises = {
          myPromise: RSVP.Promise.resolve(1),
          rejectedPromise: RSVP.Promise.reject(new Error('rejection')),
          anotherRejectedPromise: RSVP.Promise.reject(new Error('more rejection')),
        };
        
        RSVP.hashSettled(promises).then(function(hash){
          // hash here is an object that looks like:
          // {
          //   myPromise:              { state: 'fulfilled', value: 1 },
          //   rejectedPromise:        { state: 'rejected', reason: Error },
          //   anotherRejectedPromise: { state: 'rejected', reason: Error },
          // }
          // Note that for rejectedPromise, reason.message == 'rejection',
          // and for anotherRejectedPromise, reason.message == 'more rejection'.
        });
        ```
        
        An important note: `RSVP.hashSettled` is intended for plain JavaScript objects that
        are just a set of keys and values. `RSVP.hashSettled` will NOT preserve prototype
        chains.
        
        Example:
        
        ```javascript
        function MyConstructor(){
          this.example = RSVP.Promise.resolve('Example');
        }
        
        MyConstructor.prototype = {
          protoProperty: RSVP.Promise.resolve('Proto Property')
        };
        
        let myObject = new MyConstructor();
        
        RSVP.hashSettled(myObject).then(function(hash){
          // protoProperty will not be present, instead you will just have an
          // object that looks like:
          // {
          //   example: { state: 'fulfilled', value: 'Example' }
          // }
          //
          // hash.hasOwnProperty('protoProperty'); // false
          // 'undefined' === typeof hash.protoProperty
        });
        ```
        */
        hashSettled(object: any, label: string): Promise;
        /*
        `RSVP.denodeify` takes a 'node-style' function and returns a function that
        will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
        browser when you'd prefer to use promises over using callbacks. For example,
        `denodeify` transforms the following:
        
        ```javascript
        let fs = require('fs');
        
        fs.readFile('myfile.txt', function(err, data){
          if (err) return handleError(err);
          handleData(data);
        });
        ```
        
        into:
        
        ```javascript
        let fs = require('fs');
        let readFile = RSVP.denodeify(fs.readFile);
        
        readFile('myfile.txt').then(handleData, handleError);
        ```
        
        If the node function has multiple success parameters, then `denodeify`
        just returns the first one:
        
        ```javascript
        let request = RSVP.denodeify(require('request'));
        
        request('http://example.com').then(function(res) {
          // ...
        });
        ```
        
        However, if you need all success parameters, setting `denodeify`'s
        second parameter to `true` causes it to return all success parameters
        as an array:
        
        ```javascript
        let request = RSVP.denodeify(require('request'), true);
        
        request('http://example.com').then(function(result) {
          // result[0] -> res
          // result[1] -> body
        });
        ```
        
        Or if you pass it an array with names it returns the parameters as a hash:
        
        ```javascript
        let request = RSVP.denodeify(require('request'), ['res', 'body']);
        
        request('http://example.com').then(function(result) {
          // result.res
          // result.body
        });
        ```
        
        Sometimes you need to retain the `this`:
        
        ```javascript
        let app = require('express')();
        let render = RSVP.denodeify(app.render.bind(app));
        ```
        
        The denodified function inherits from the original function. It works in all
        environments, except IE 10 and below. Consequently all properties of the original
        function are available to you. However, any properties you change on the
        denodeified function won't be changed on the original function. Example:
        
        ```javascript
        let request = RSVP.denodeify(require('request')),
            cookieJar = request.jar(); // <- Inheritance is used here
        
        request('http://example.com', {jar: cookieJar}).then(function(res) {
          // cookieJar.cookies holds now the cookies returned by example.com
        });
        ```
        
        Using `denodeify` makes it easier to compose asynchronous operations instead
        of using callbacks. For example, instead of:
        
        ```javascript
        let fs = require('fs');
        
        fs.readFile('myfile.txt', function(err, data){
          if (err) { ... } // Handle error
          fs.writeFile('myfile2.txt', data, function(err){
            if (err) { ... } // Handle error
            console.log('done')
          });
        });
        ```
        
        you can chain the operations together using `then` from the returned promise:
        
        ```javascript
        let fs = require('fs');
        let readFile = RSVP.denodeify(fs.readFile);
        let writeFile = RSVP.denodeify(fs.writeFile);
        
        readFile('myfile.txt').then(function(data){
          return writeFile('myfile2.txt', data);
        }).then(function(){
          console.log('done')
        }).catch(function(error){
          // Handle error
        });
        ```
        */
        denodeify(nodeFunc: Function, options: boolean | Array): Function;
    }
}
