module.exports = {
    apps: [
      {
        name: 'shop',
        exec_mode: 'fork',
        instances: '1', // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 2670 -H 127.0.0.1',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_dev: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_prod: {
          APP_ENV: 'prod' // APP_ENV=prod
        }
      }
    ]
  }
  
