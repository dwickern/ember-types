this.transitionTo('post', object, { queryParams: { showDetails: true }});
this.transitionTo('posts', { queryParams: { sort: 'title' }});

// if you want to transition the query parameters without changing the route
this.transitionTo({ queryParams: { direction: 'asc' }});
