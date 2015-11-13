# remember-me
A simple abstraction of "remember my previous trip".

## Usage

### set
````
var rememberMe = require('rememberMe');
rememberMe.set( ); // sets default data (url)
rememberMe.set( { foo: 'bar' } ); // sets default data and this data
rememberMe.set( { url: 'foo' } ); // overrides default url data

rememberMe.set( { url: 'foo' }, errorCallback ); // calls errorCallback on error

// this will throw an error, don't do this:
rememberMe.set( errorCallback );
```
### get
```
var rememberMe = require('rememberMe');
var data = rememberMe.get( ); // gets our default data
var data = rememberMe.get( errorCallback ); // calls errorCallback on error
```
