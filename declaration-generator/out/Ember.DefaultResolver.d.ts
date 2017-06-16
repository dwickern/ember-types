//packages/ember-application/lib/system/resolver.js
declare namespace Ember {
    /*
    The DefaultResolver defines the default lookup rules to resolve
    container lookups before consulting the container for registered
    items:
    
    * templates are looked up on `Ember.TEMPLATES`
    * other names are looked up on the application after converting
      the name. For example, `controller:post` looks up
      `App.PostController` by default.
    * there are some nuances (see examples below)
    
    ### How Resolving Works
    
    The container calls this object's `resolve` method with the
    `fullName` argument.
    
    It first parses the fullName into an object using `parseName`.
    
    Then it checks for the presence of a type-specific instance
    method of the form `resolve[Type]` and calls it if it exists.
    For example if it was resolving 'template:post', it would call
    the `resolveTemplate` method.
    
    Its last resort is to call the `resolveOther` method.
    
    The methods of this object are designed to be easy to override
    in a subclass. For example, you could enhance how a template
    is resolved like so:
    
    ```javascript
    App = Ember.Application.create({
      Resolver: Ember.DefaultResolver.extend({
        resolveTemplate: function(parsedName) {
          let resolvedTemplate = this._super(parsedName);
          if (resolvedTemplate) { return resolvedTemplate; }
          return Ember.TEMPLATES['not_found'];
        }
      })
    });
    ```
    
    Some examples of how names are resolved:
    
    ```
    'template:post'           //=> Ember.TEMPLATES['post']
    'template:posts/byline'   //=> Ember.TEMPLATES['posts/byline']
    'template:posts.byline'   //=> Ember.TEMPLATES['posts/byline']
    'template:blogPost'       //=> Ember.TEMPLATES['blogPost']
                              //   OR
                              //   Ember.TEMPLATES['blog_post']
    'controller:post'         //=> App.PostController
    'controller:posts.index'  //=> App.PostsIndexController
    'controller:blog/post'    //=> Blog.PostController
    'controller:basic'        //=> Ember.Controller
    'route:post'              //=> App.PostRoute
    'route:posts.index'       //=> App.PostsIndexRoute
    'route:blog/post'         //=> Blog.PostRoute
    'route:basic'             //=> Ember.Route
    'view:post'               //=> App.PostView
    'view:posts.index'        //=> App.PostsIndexView
    'view:blog/post'          //=> Blog.PostView
    'view:basic'              //=> Ember.View
    'foo:post'                //=> App.PostFoo
    'model:post'              //=> App.Post
    ```
    */
    class DefaultResolver {
        /*
        This will be set to the Application instance when it is
        created.
        */
        namespace: any;
        /*
        This method is called via the container's resolver method.
        It parses the provided `fullName` and then looks up and
        returns the appropriate template or class.
        */
        resolve(fullName: string): any;
        /*
        Convert the string name of the form 'type:name' to
        a Javascript object with the parsed aspects of the name
        broken out.
        */
        protected parseName(fullName: string): any;
        /*
        Returns a human-readable description for a fullName. Used by the
        Application namespace in assertions to describe the
        precise name of the class that Ember is looking for, rather than
        container keys.
        */
        protected lookupDescription(fullName: string): any;
        /*
        Given a parseName object (output from `parseName`), apply
        the conventions expected by `Ember.Router`
        */
        protected useRouterNaming(parsedName: any): any;
        /*
        Look up the template in Ember.TEMPLATES
        */
        protected resolveTemplate(parsedName: any): any;
        /*
        Lookup the view using `resolveOther`
        */
        protected resolveView(parsedName: any): any;
        /*
        Lookup the controller using `resolveOther`
        */
        protected resolveController(parsedName: any): any;
        /*
        Lookup the route using `resolveOther`
        */
        protected resolveRoute(parsedName: any): any;
        /*
        Lookup the model on the Application namespace
        */
        protected resolveModel(parsedName: any): any;
        /*
        Look up the specified object (from parsedName) on the appropriate
        namespace (usually on the Application)
        */
        protected resolveHelper(parsedName: any): any;
        /*
        Look up the specified object (from parsedName) on the appropriate
        namespace (usually on the Application)
        */
        protected resolveOther(parsedName: any): any;
    }
}
