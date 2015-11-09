'use strict';
var _ = { extend: require('lodash.merge') };
var tracker = require('tracker');

var rememberMe = module.exports = {
  key: 'rememberMe'
};

rememberMe.set = function( params ) {
  var defaults = {
    url: location.href
  };
  var data = _.extend( { }, params, defaults );
  try {
    localStorage[rememberMe.key] = JSON.stringify( data );
  } catch( e ) {
    tracker.error( 'failed setting ' + rememberMe.key + '; ' + e.message );
  }
};

rememberMe.get = function( ) {
  try {
    return JSON.parse( localStorage[rememberMe.key] );
  } catch( e ) {
    tracker.error( 'failed getting ' + rememberMe.key + '; ' + e.message );
    return null;
  }
};
