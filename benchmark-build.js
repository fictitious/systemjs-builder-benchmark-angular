
var Benchmark = require('benchmark');

\var Builder_0_15_23 = require('systemjs-builder-0.15.23');
var Builder_0_15_31 = require('systemjs-builder-0.15.31');


var suite = new Benchmark.Suite;

suite
.add('builder 0.15.23', function(deferred) {
  build(Builder_0_15_23, 'out_0_15_23.js').then(function() { deferred.resolve() });
}, {defer:true})
.add('builder 0.15.31', function(deferred) {
  build(Builder_0_15_31, 'out_0_15_31.js').then(function() { deferred.resolve() });
}, {defer:true})
.on('cycle', function(event) {
    console.log('cycle ' + event.target);
})
.run({async: true});


function build(Builder, out) {
  var builder = new Builder
  return builder.loadConfig('systemjs.config.js').then(function() {

            return builder.buildStatic("app/main.js", out, {
              minify: false,
              mangle: false,
              sourceMaps: false,
              runtime: true
          })

  });
}
