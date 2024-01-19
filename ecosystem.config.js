// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./package.json');

module.exports = {
  apps: [
    {
      name: 'testsmaker server',
      script: 'dist/src/main.js',
      instance_var: 'INSTANCE_ID',
      env_prod: {
        name: config.name + '-prod',
        NODE_ENV: 'prod',
        merge_logs: true,
        watch: false,
        eco_system: true,
      },
    },
  ],
};
