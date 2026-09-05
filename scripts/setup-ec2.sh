#!/bin/bash
set -e

echo "🚀 Delhi Filing — EC2 Setup Script"
echo "======================================"

# Update system
apt-get update -y && apt-get upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# Install PM2, git, nginx, certbot
npm install -g pm2
apt-get install -y git nginx certbot python3-certbot-nginx

# Create app directory
mkdir -p /var/www/delhifilling
chown -R ubuntu:ubuntu /var/www/delhifilling

# Configure git
git config --global credential.helper store

# Clone repo
cd /var/www
git clone https://skm719805-png:YOUR_GITHUB_TOKEN@github.com/skm719805-png/delhifilling.git
cd delhifilling

# Install dependencies
npm install

# Copy env file (must be uploaded separately)
# cp /home/ubuntu/.env /var/www/delhifilling/.env

# Build
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Configure Nginx
cp /var/www/delhifilling/nginx.conf /etc/nginx/sites-available/delhifilling
ln -sf /etc/nginx/sites-available/delhifilling /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "✅ Setup complete!"
echo "📌 Next: Run certbot for SSL"
echo "   certbot --nginx -d delhifiling.com -d www.delhifiling.com"
