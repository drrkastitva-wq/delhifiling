# Delhi Filing

Professional Legal, Corporate, Compliance & Government Filing Services

## Stack
- Next.js 15 (App Router)
- Payload CMS v3 (Admin Panel)
- PostgreSQL on AWS RDS
- Tailwind CSS v4
- Framer Motion
- AWS EC2 + Nginx + PM2
- AWS SES (Email)
- AWS S3 (Media)

## AWS Infrastructure
- EC2: `35.154.164.127` (m7i-flex.large, Mumbai)
- RDS: `delhifilling-db.c54e0qeqy4tq.ap-south-1.rds.amazonaws.com`
- Domain: `delhifiling.com`

## Local Development
```bash
npm install
cp .env.example .env
# Fill in .env values
npm run dev
```

## Seed Database
```bash
npx tsx src/seed/index.ts
```

## Admin Panel
```
https://delhifiling.com/admin
Email: admin@delhifiling.com
Password: ChangeMe@2025
```

## Deploy
Push to `main` branch → GitHub Actions auto-deploys to EC2.

## EC2 First-Time Setup
```bash
ssh -i delhifilling-key.pem ubuntu@35.154.164.127
curl -fsSL https://raw.githubusercontent.com/skm719805-png/delhifilling/main/scripts/setup-ec2.sh | bash
```
