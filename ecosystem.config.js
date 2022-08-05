module.exports = {
  apps: [{
    name: 'react-panel',
    script: 'npm start ./packages/material-kit-react',
    // watch: '.'
  }, {
    name: "blogger-backend",
    script: 'node ./packages/blogger-backend/bin/www',
    watch: ['./packages/blogger-backend/*'],
    ignore_watch: ['./packages/blogger-backend/public/*', './packages/blogger-backend/views/*']
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
