'use strict';
var _ = { extend: require('lodash.merge') };

var rememberMe = module.exports = {
  key: 'rememberMe'
};

rememberMe.set = function( params, errorCallback ) {
  var defaults = {
    url: location.href
  };
  if ( typeof params === 'function' ) {
    throw new Error( 'usage: set( params, errorCallback )' );
  }
  var data = _.extend( defaults, params );
  try {
    localStorage[rememberMe.key] = JSON.stringify( data );
  } catch( e ) {
    if ( errorCallback ) {
      errorCallback( 'failed setting ' + rememberMe.key + '; ' + e.message );
    }
  }
};

rememberMe.get = function( errorCallback ) {
  try {
    return JSON.parse( localStorage[rememberMe.key] );
  } catch( e ) {
    if ( errorCallback ) {
      errorCallback( 'failed getting ' + rememberMe.key + '; ' + e.message );
    }
    return null;
  }
};
