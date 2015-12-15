Package.describe({
  name: 'librato-logger',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('mongo');
  api.use('http');
  api.use('underscore');
  api.use('percolate:synced-cron@1.3.0');
  api.addFiles('logger.js', 'server');
  api.export('LibratoLogger', 'server');
});
