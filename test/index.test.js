'use strict';
var assert = require('chai').assert;
var sinon = require('sinon');
var tracker = require('tracker');
var rememberMe = require('../src/');

describe( 'rememberMe', function( ) {

  beforeEach( function( ) {
    global.localStorage = {};
    global.location = {
      href: 'foo'
    };
    sinon.stub( JSON, 'stringify' ).returns( 'json' );
    sinon.stub( JSON, 'parse' ).returns( { foo: 'bar' } );
    sinon.stub( tracker, 'error' );
  } );

  afterEach( function( ) {
    JSON.stringify.restore( );
    JSON.parse.restore( );
    tracker.error.restore( );
  } );

  describe( 'set', function( ) {
    it( 'sets url by default', function( ) {
      rememberMe.set( );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledWith( JSON.stringify, { url: 'foo' } );
    } );

    it( 'extends with data', function( ) {
      rememberMe.set( { foo: 'bar' } );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledWith( JSON.stringify, { url: 'foo', foo: 'bar' } );
    } );

    it( 'will let us overwrite the defaults', function( ) {
      rememberMe.set( { url: 'bar' } );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledWith( JSON.stringify, { url: 'bar' } );
    } );

    it( 'is ok with falsy data', function( ) {
      rememberMe.set( null );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledWith( JSON.stringify, { url: 'foo' } );
    } );

    it( 'catches and tracks errors from localStorage', function( ) {
      global.localStorage = null;
      rememberMe.set( );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledOnce( tracker.error );
      sinon.assert.calledWith( tracker.error, "failed setting rememberMe; Cannot set property 'rememberMe' of null" );
    } );

    it( 'catches and tracks errors from JSON', function( ) {
      JSON.stringify.throws( new Error( 'oops' ));
      rememberMe.set( );
      sinon.assert.calledOnce( JSON.stringify );
      sinon.assert.calledOnce( tracker.error );
      sinon.assert.calledWith( tracker.error, 'failed setting rememberMe; oops' );
    } );

  } );
  describe( 'get', function( ) {

    it( 'retrieves good data', function( ) {
      localStorage.rememberMe = 'json.parse is stubbed';
      assert.deepEqual( rememberMe.get( ), { foo: 'bar' } );
      sinon.assert.calledOnce( JSON.parse );
      sinon.assert.calledWith( JSON.parse, 'json.parse is stubbed' );
    } );

    it( 'catches and tracks errors from localStorage', function( ) {
      global.localStorage = null;
      rememberMe.get( );
      sinon.assert.calledOnce( tracker.error );
      sinon.assert.calledWith( tracker.error, "failed getting rememberMe; Cannot read property 'rememberMe' of null" );
    } );

    it( 'catches and tracks errors from JSON', function( ) {
      JSON.parse.throws( new Error( 'oops' ));
      rememberMe.get( );
      sinon.assert.calledOnce( JSON.parse );
      sinon.assert.calledOnce( tracker.error );
      sinon.assert.calledWith( tracker.error, 'failed getting rememberMe; oops' );
    } );

  } );

} );
