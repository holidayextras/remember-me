'use strict';
var assert = require('chai').assert;
var sinon = require('sinon');
var rememberMe = require('../src/');

describe( 'rememberMe', function( ) {
  var callback;

  beforeEach( function( ) {
    global.localStorage = {};
    global.location = {
      href: 'foo'
    };
    sinon.stub( JSON, 'stringify' ).returns( 'json' );
    sinon.stub( JSON, 'parse' ).returns( { foo: 'bar' } );
    callback = sinon.spy( );
  } );

  afterEach( function( ) {
    JSON.stringify.restore( );
    JSON.parse.restore( );
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

    describe( 'without an error handler', function( ) {
      it( 'quietly ignores an error from localStorage', function( ) {
        global.localStorage = null;
        assert.doesNotThrow( function( ) {
          rememberMe.set( );
        } );
      } );

      it( 'quietly ignores an error  from JSON', function( ) {
        JSON.stringify.throws( new Error( 'oops' ));
        assert.doesNotThrow( function( ) {
          rememberMe.set( );
        } );
      } );
    } );

    describe( 'with an error handler', function( ) {
      it( 'catches errors from localStorage', function( ) {
        global.localStorage = null;
        rememberMe.set( null, callback );
        sinon.assert.calledOnce( JSON.stringify );
        sinon.assert.calledOnce( callback );
        sinon.assert.calledWith( callback, "failed setting rememberMe; Cannot set property 'rememberMe' of null" );
      } );

      it( 'catches errors from JSON', function( ) {
        JSON.stringify.throws( new Error( 'oops' ));
        rememberMe.set( null, callback );
        sinon.assert.calledOnce( JSON.stringify );
        sinon.assert.calledOnce( callback );
        sinon.assert.calledWith( callback, 'failed setting rememberMe; oops' );
      } );
    } );

    it( 'catches a callback param in the wrong place', function( ) {
      assert.throws( function( ) {
        rememberMe.set( callback );
      } );
    } );

  } );
  describe( 'get', function( ) {

    it( 'retrieves good data', function( ) {
      localStorage.rememberMe = 'json.parse is stubbed';
      assert.deepEqual( rememberMe.get( ), { foo: 'bar' } );
      sinon.assert.calledOnce( JSON.parse );
      sinon.assert.calledWith( JSON.parse, 'json.parse is stubbed' );
    } );

    describe( 'without an error handler', function( ) {
      it( 'ignores errors from localStorage', function( ) {
        global.localStorage = null;
        assert.doesNotThrow( function( ) {
          rememberMe.get( callback );
        } );
      } );

      it( 'ignores errors from JSON', function( ) {
        JSON.parse.throws( new Error( 'oops' ));
        assert.doesNotThrow( function( ) {
          rememberMe.get( );
        } );
      } );
    } );

    describe( 'with an error handler', function( ) {
      it( 'catches errors from localStorage', function( ) {
        global.localStorage = null;
        rememberMe.get( callback );
        sinon.assert.calledOnce( callback );
        sinon.assert.calledWith( callback, "failed getting rememberMe; Cannot read property 'rememberMe' of null" );
      } );

      it( 'catches errors from JSON', function( ) {
        JSON.parse.throws( new Error( 'oops' ));
        rememberMe.get( callback );
        sinon.assert.calledOnce( JSON.parse );
        sinon.assert.calledOnce( callback );
        sinon.assert.calledWith( callback, 'failed getting rememberMe; oops' );
      } );
    } );

  } );

} );
