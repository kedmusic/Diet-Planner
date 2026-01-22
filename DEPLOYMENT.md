# Deployment Guide

## Prerequisites
- Node.js installed on server
- PostgreSQL database accessible
- Edamam API credentials
- Domain name (optional)

## Deployment Options

### Option 1: Deploy to Heroku

#### 1. Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
heroku --version
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
heroku create your-app-name
```

#### 4. Add PostgreSQL Database
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

#### 5. Set Environment Variables
```bash
heroku config:set PORT=3000
heroku config:set EDAMAM_APP_ID=your_app_id
heroku config:set EDAMAM_API_KEY=your_api_key
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

#### 6. Get Database URL
```bash
heroku config:get DATABASE_URL
```
Update your connection code to use this URL.

#### 7. Initialize Remote Database
```bash
heroku run npm run db:init
```

#### 8. Deploy
```bash
git push heroku main
```

#### 9. View Logs
```bash
heroku logs --tail
```

---

### Option 2: Deploy to AWS

#### 1. Setup EC2 Instance
- Launch Ubuntu 20.04 LTS instance
- Configure security group (allow ports 80, 443, 3000)

#### 2. SSH into Server
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### 3. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 4. Install PostgreSQL
```bash
sudo apt-get install -y postgresql postgresql-contrib
```

#### 5. Setup Database
```bash
sudo -u postgres psql
CREATE DATABASE diet_planner;
CREATE USER app_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE diet_planner TO app_user;
\q
```

#### 6. Clone Project
```bash
git clone your-repo-url
cd diet-planner
npm install
```

#### 7. Configure .env
```bash
nano .env
# Edit with your production settings
```

#### 8. Initialize Database
```bash
npm run db:init
```

#### 9. Setup PM2 for Process Management
```bash
sudo npm install -g pm2
pm2 start server/app.js --name "diet-planner"
pm2 startup
pm2 save
```

#### 10. Setup Nginx as Reverse Proxy
```bash
sudo apt-get install -y nginx

sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

#### 11. Setup SSL Certificate (Let's Encrypt)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 3: Deploy to Vercel/Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Deploy

#### Update API URLs in Frontend
In `public/js/main.js` and `public/js/dashboard.js`, update:
```javascript
const API_URL = 'https://your-backend-url/api';
```

#### Backend Deployment (Heroku)
Follow "Option 1: Deploy to Heroku" above

---

### Option 4: Deploy to DigitalOcean App Platform

#### 1. Push code to GitHub

#### 2. Go to DigitalOcean App Platform
- https://cloud.digitalocean.com/apps

#### 3. Create New App
- Select your GitHub repository
- Choose Node.js buildpack

#### 4. Configure Environment Variables
- Click "Environment" tab
- Add all variables from `.env`

#### 5. Add Database
- Click "Add Resource"
- Select PostgreSQL
- Configure size (basic plan for testing)

#### 6. Deploy
- Click "Deploy"
- Monitor progress

#### 7. Access Your App
- DigitalOcean provides a free domain
- Or connect your own domain

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Database backed up
- [ ] HTTPS/SSL enabled
- [ ] JWT secret changed to strong value
- [ ] NODE_ENV set to "production"
- [ ] Error logging enabled
- [ ] Database monitoring setup
- [ ] API rate limiting configured
- [ ] CORS whitelist updated
- [ ] Security headers added

---

## Security Recommendations

### 1. Update CORS Settings
```javascript
const corsOptions = {
  origin: ['https://yourdomain.com'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

### 2. Add Rate Limiting
```bash
npm install express-rate-limit
```

### 3. Add Helmet for Security Headers
```bash
npm install helmet
```

### 4. Setup Environment-Based Configuration
```javascript
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
}
```

---

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs diet-planner
```

### Database Monitoring
```bash
# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql.log
```

### Application Monitoring
Set up with services like:
- DataDog
- New Relic
- Sentry (for error tracking)

---

## Scaling Considerations

### Database Optimization
- Add indexes to frequently queried columns
- Setup automated backups
- Consider read replicas for heavy traffic

### Caching
- Add Redis for session management
- Cache meal plan suggestions
- Cache user profiles

### Load Balancing
- Use multiple server instances
- Setup load balancer (AWS ELB, Nginx)
- Use CDN for static assets

---

## Troubleshooting Deployment

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database Connection Issues
```bash
# Test connection
psql -h your-host -U your-user -d diet_planner
```

### Logs Not Showing
```bash
# Check PM2 logs
pm2 logs diet-planner --lines 100

# Check system logs
journalctl -u nginx -n 50
```

### CORS Errors
- Update frontend API_URL
- Check CORS configuration in backend
- Verify domain whitelist

---

## Rollback Strategy

### If Deployment Fails

#### Heroku:
```bash
heroku releases
heroku rollback v1
```

#### AWS:
```bash
# Stop current app
pm2 stop diet-planner

# Switch to previous version
git checkout previous-version
npm install
npm run db:init

# Restart
pm2 start diet-planner
```

---

## Cost Estimation

| Service | Free Tier | Paid (Monthly) |
|---------|-----------|---|
| Heroku | 550 hours | $7+ |
| AWS EC2 | 750 hours/month | $10+ |
| DigitalOcean | - | $5+ |
| PostgreSQL | Various | $15+ |
| **Total** | **Various** | **$30+** |

---

## Performance Optimization

### Before Deployment

1. Minify frontend assets
2. Enable gzip compression
3. Add caching headers
4. Setup CDN for static files
5. Optimize database queries

### Deployment Command
```bash
# Production build
NODE_ENV=production npm start
```

---

## Continuous Integration/Deployment (CI/CD)

### Setup with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

---

**Deployment Complete! 🚀**

Your Diet Planner app is now live!
