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
      servers: '-p 2323 akeneo@partners-directory-staging.ip.akeneo.com'
    }
  });

  const path = require('path');
  const ecosystemFilePath = path.join(
    shipit.config.deployTo,
    'shared',
    'ecosystem.config.js'
  );

  // Listeners and tasks
  shipit.on('updated', () => {
    shipit.start('npm-install', 'copy-config');
  });

  shipit.on('published', () => {
    shipit.start('pm2-server');
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

shipit.blTask('pm2-server', async () => {
  await shipit.remote(`pm2 delete -s ${appName} || :`);
  await shipit.remote(
    `pm2 start ${ecosystemFilePath} --env staging --watch true`
  );
});

};
