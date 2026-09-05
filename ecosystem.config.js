module.exports = {
  apps: [
    {
      name: 'delhifilling',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/delhifilling',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/delhifilling-error.log',
      out_file: '/var/log/pm2/delhifilling-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
