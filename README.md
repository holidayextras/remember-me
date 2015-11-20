# remember-me
For saving structured data to local storage, and retrieving it again. Based on the "remember my previous trip" functionality in the wizard and extracted from there.

## Installation

Add it to your package.json direct from the repo and npm install
```
{
  "dependencies": {
    "remember-me": "git+ssh://git@github.com:holidayextras/remember-me.git#1.0.0"
  }
}

```

## Usage

### set
```
var rememberMe = require('rememberMe');
rememberMe.set( ); // sets default data (url)
rememberMe.set( { foo: 'bar' } ); // sets default data and this data
rememberMe.set( { url: 'foo' } ); // overrides default url data

rememberMe.set( { url: 'foo' }, errorCallback ); // calls errorCallback on error

// this will throw an error, callback must be the second param
rememberMe.set( errorCallback );
```

### get
```
var rememberMe = require('rememberMe');
var data = rememberMe.get( ); // gets our default data
var data = rememberMe.get( errorCallback ); // calls errorCallback on error
```

## Testing
```
npm test
```

### coverage
```
npm run coverage
```

This repo uses Travis for CI and expects 100% tests coverage to pass. Current status ![Travis build status](https://travis-ci.org/holidayextras/remember-me.svg)

## linting
```
npm run lint
```

This repo is linted with https://github.com/holidayextras/make-up
