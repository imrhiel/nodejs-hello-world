module.exports = shipit => {
  require('shipit-deploy')(shipit);

  const appName = 'hello';

  shipit.initConfig({
    default: {
      deployTo: '/home/akeneo/partners-directory',
      repositoryUrl: 'https://github.com/imrhiel/nodejs-hello-world.git',
      keepReleases: 5,
      shared: {
        overwrite: true,
        dirs: ['node_modules']
      }
    },
    staging: {
      servers: 'akeneo@partners-directory-staging.ip.akeneo.com:2323'
    }
  });

  const path = require('path');
  const ecosystemFilePath = path.join(
    shipit.config.deployTo,
    'ecosystem.config.js'
  );

  // Listeners and tasks
  shipit.on('updated', () => {
    shipit.start('npm-install', 'copy-config');
  });

shipit.blTask('copy-config', async () => {

const fs = require('fs');

const ecosystem = `
module.exports = {
apps: [
  {
    name: '${appName}',
    script: '${shipit.releasePath}/hello.js',
    watch: true,
    autorestart: true,
    restart_delay: 1000,
    env: {
      NODE_ENV: 'development'
    },
    env_staging: {
      NODE_ENV: 'staging'
    }
  }
]
};`;

  fs.writeFileSync('ecosystem.config.js', ecosystem, function(err) {
    if (err) throw err;
    console.log('File created successfully.');
  });

  await shipit.copyToRemote('ecosystem.config.js', ecosystemFilePath);
});

shipit.blTask('npm-install', async () => {
  shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
});

};
