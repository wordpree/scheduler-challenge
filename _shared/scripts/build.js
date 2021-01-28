/**
 * Script to install and build required framework demo dependencies from app.config.json
 */
const action = process.argv[2] || 'build';

if (action === 'build') {
    const
        path          = require('path'),
        fs            = require('fs'),
        appConfigFile = path.resolve('app.config.json'),
        appConfig     = fs.existsSync(appConfigFile) && JSON.parse(fs.readFileSync(appConfigFile)),
        { spawnSync } = require('child_process'),
        rmdirSync     = (pathToRemove) => {
            if (fs.existsSync(pathToRemove)) {
                fs.readdirSync(pathToRemove).forEach(file => {
                    const curPath = path.join(pathToRemove, file);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        rmdirSync(curPath, false);
                    }
                    else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(pathToRemove);
            }
        },
        npm           = (folder, options) => {
            spawnSync('npm', options, { cwd : folder, shell : true, stdio : 'inherit' });
        },
        colorOk       = '\x1b[32m%s\x1b[0m';

    if (appConfig && appConfig.dependencies && appConfig.dependencies.length > 0) {
        appConfig.dependencies.forEach(({ src, out }) => {
            const
                folder      = path.resolve(src),
                outFolder   = out && path.resolve(out),
                packageJson = path.join(folder, 'package.json');

            if (fs.existsSync(packageJson) && outFolder) {
                console.log(colorOk, `Building dependency "${folder}"`);
                // Fix for angular build
                rmdirSync(path.join(folder, 'node_modules', '@angular'));
                npm(folder, ['install']);
                npm(folder, ['rebuild', 'node-sass']);
                npm(folder, ['run', 'build']);
            }
        });
    }
}

// Indicates an error and refers the user to our integration guide
if (action === 'guide') {
    // constants for message
    const
        project    = process.argv[3] || 'schedulerpro',
        framework  = process.argv[4] || 'react',
        guideLink  = `https://bryntum.com/docs/${project}/#guides/integration/${framework}.md`,
        message    = `An error was detected. Please consult the integration guide at`,
        colorError = '\x1b[31;1m%s\x1b[0m', // bold red
        colorLink  = '\x1b[40;33;1m%s\x1b[0m'; // bold yellow on black background

    console.log(colorError, message);
    console.log(colorLink, guideLink);
    console.log('\n');

    // let also the calling process know about the error
    process.exit(1);
}
