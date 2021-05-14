
module.exports = {
apps: [
  {
    name: 'hello',
    script: '/home/akeneo/partners-directory/releases/20210514154157/hello.js',
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
};