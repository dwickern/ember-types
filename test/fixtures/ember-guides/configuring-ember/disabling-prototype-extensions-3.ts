let islands = ['Oahu', 'Kauai'];
islands.includes('Oahu');
//=> TypeError: Object Oahu,Kauai has no method 'includes'

// Convert `islands` to an array that implements the
// Ember enumerable and array interfaces
Ember.A(islands);

islands.includes('Oahu');
//=> true
