"use strict";

/**
 * Module dependencies.
 */
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import resources from './resources';
import functions from './functions';
import metadata from './metadata';

let createService = (db, prefix) => {
  let app = express();
  initExpress(app);

  let server = {};
  initServer(app, server);

  config.set('app', app);
  config.set('db', db);
  config.set('prefix', prefix);

  return server;
}

var initExpress = (app) => {
  app.use(express.bodyParser());
  app.use(express.query());
  app.use(express.methodOverride());

  // remove express info.
  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
  });
}

var initServer = (app, server) => {
  // expose resources
  server.resources = resources;

  // expose functions
  server.functions = functions;
  ['get', 'put', 'del', 'post'].map((method) => {
    server[method] = (url, handle, auth) => {
      functions.register({
        url: url,
        method: method,
        handle: handle,
        auth: auth,
      });
    }
  });

  // expose listen.
  server.listen = (...args) => {
    app.listen.apply(app, args);
  }

  //expose use
  server.use = (...args) => {
    app.use.apply(app, args);
  }

  // expose config
  server.config = {
    get : config.get,
    set : config.set,
  };

  // expose privite object for special situation.
  server._app = app;
  server._mongoose = mongoose;
}

/**
 * Expose `createService()`.
 */
module.exports = createService;

/**
 * Expose `express` and `mongoose` for special situation.
 */
module.exports.express = express;
module.exports.mongoose = mongoose;