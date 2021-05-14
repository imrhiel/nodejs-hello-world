
module.exports = {
apps: [
  {
    name: 'hello',
    script: '/home/akeneo/partners-directory/releases/20210512162445/hello.js',
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