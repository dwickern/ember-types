Person = Ember.Object.extend({
  fullName: 'Tony Stark',

  isIronManLongWay: Ember.computed('fullName', function() {
    return this.get('fullName') === 'Tony Stark';
  }),

  isIronManShortWay: Ember.computed.equal('fullName', 'Tony Stark')
});
