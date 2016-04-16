var BuildControl = require('build-control').BuildControl;

console.log(BuildControl);

var bc = new BuildControl({
    branch: 'master',
    remote: {
        branch: 'gh-pages'
    }
})

bc.npm.bump()
bc.prepublishCheck()
bc.run()
//bc.npm.publish()
