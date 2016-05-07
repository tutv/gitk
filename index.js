var Git = require('gity');

var git = Git()
    .add('*.js')
    .commit('-m "added js files"')
    .run();