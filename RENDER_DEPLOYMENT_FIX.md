# 🚀 Render Deployment Fix Guide - PostgreSQL Migration

## ✅ RESOLVED: SQLite to PostgreSQL Migration

### Issue
- ❌ **PrismaClientInitializationError**: Invalid DATABASE_URL for SQLite datasource
- ❌ SQLite is file-based and incompatible with Render's ephemeral filesystem
- ✅ **Solution**: Migrated to PostgreSQL (production-ready database)

## Current Status
- ✅ Prisma schema updated to use PostgreSQL
- ✅ Prisma Client regenerated for PostgreSQL
- ⚠️ Need to configure PostgreSQL database on Render
- ⚠️ Need to run database migrations on Render

## Step-by-Step Deployment Solution

### Step 1: Create PostgreSQL Database on Render

1. **Go to your Render Dashboard**: https://dashboard.render.com/
2. **Click "New +" button** (top right)
3. **Select "PostgreSQL"**
4. **Configure database**:
   - Name: `eventra-database` (or your preferred name)
   - Database: `eventra_db`
   - User: (auto-generated)
   - Region: Same as your web service (e.g., Oregon)
   - Plan: Free or Starter
5. **Click "Create Database"**
6. **Wait for database to provision** (~2-3 minutes)
7. **Copy the "Internal Database URL"** (starts with `postgresql://`)

### Step 2: Update Environment Variables on Render

1. **Go to your Render Dashboard**: https://dashboard.render.com/
2. **Find your web service** (Eventra app)
3. **Click on your service**
4. **Go to the "Environment" tab**
5. **Add/Update these environment variables**:

```env
# Database - Use the Internal Database URL from Step 1
DATABASE_URL=postgresql://eventra_database_user:PASSWORD@dpg-xxxxx.oregon-postgres.render.com/eventra_db

NEXTAUTH_URL=https://YOUR-APP-NAME.onrender.com

NEXTAUTH_SECRET=your-super-secret-production-key-minimum-32-characters-long

NODE_ENV=production
```

**IMPORTANT**: 
- Replace `DATABASE_URL` with your **actual Internal Database URL** from Step 1
- Replace `YOUR-APP-NAME` with your actual Render app name
- Use a strong `NEXTAUTH_SECRET` (see Step 3)

### Step 3: Generate a Strong NEXTAUTH_SECRET

Option A: Use this command locally:
```bash
openssl rand -base64 32
```

Option B: Use this online generator:
https://generate-secret.vercel.app/32

Option C: Use this value (change it for production):
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

### Step 4: Add Build Command to Render

1. **In your Render service settings**
2. **Go to "Settings" tab**
3. **Update "Build Command"**:
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

4. **Update "Start Command"** (should already be set):
```bash
npm start
```

### Step 5: Create Migration Files (Local Setup)

Before deploying, you need to create migration files:

1. **Make sure your local .env has a PostgreSQL URL** (can be a local PostgreSQL):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/eventra_local"
```

2. **Create the initial migration**:
```bash
npx prisma migrate dev --name init
```

This creates migration files in `prisma/migrations/` directory.

3. **Commit the migration files to Git**:
```bash
git add prisma/migrations
git commit -m "Add initial database migration"
git push
```

### Step 6: Deploy to Render

1. **Save all environment variables** in Render
2. **Go to "Manual Deploy" tab**
3. **Click "Deploy Latest Commit"**
4. **Wait for deployment to complete** (5-10 minutes)
5. **Render will automatically run**: `npx prisma migrate deploy` during build

### Step 7: Verify Database Schema

### Step 7: Verify Database Schema

After deployment completes:

1. **Go to your Render Dashboard**
2. **Click on your PostgreSQL database**
3. **Go to "Connect" tab**
4. **Copy the "External Database URL"** (for external access)
5. **Use a database client** (like TablePlus, pgAdmin, or DBeaver) to verify tables were created

### Step 8: Test Your Deployed App

1. **Visit your app**: `https://YOUR-APP-NAME.onrender.com`
2. **Test signup**: Go to `/signup` and create a test account
3. **Test login**: Go to `/login` and login with your test account
4. **Check Render logs** for any database errors
5. **Verify user was created** in the database

## Common Issues & Solutions

### Issue: "PrismaClientInitializationError: Invalid DATABASE_URL"
**Solution**: 
- Verify DATABASE_URL is the **Internal Database URL** from Render PostgreSQL
- Format: `postgresql://user:password@host/database`
- Must NOT start with `file:` (that's SQLite)

### Issue: "Can't reach database server"
**Solution**: 
- Make sure web service and database are in the **same region**
- Use the **Internal Database URL**, not External
- Check database is running (green status in Render dashboard)

### Issue: "Migration failed"
**Solution**: 
- Create migration files locally first (Step 5)
- Commit and push migration files to Git
- Redeploy on Render

### Issue: "Server configuration error"
**Solution**: Make sure `NEXTAUTH_URL` matches your exact Render domain (https://your-app.onrender.com)

### Issue: Tables not created
**Solution**: 
- Check Render build logs for migration errors
- Ensure build command includes: `npx prisma migrate deploy`
- Run migrations manually via Render Shell if needed

## Quick Test Commands (Run Locally with PostgreSQL)

```bash
# Test database connection
npx prisma db push

# View database in browser
npx prisma studio

# Create a migration
npx prisma migrate dev --name your_migration_name

# Apply migrations (production)
npx prisma migrate deploy
```

## Alternative: Use Prisma db push (Not Recommended for Production)

If migrations are causing issues, you can use `db push` as a temporary solution:

1. **Update Build Command** in Render:
```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

⚠️ **Warning**: `db push` doesn't create migration history. Use migrations for production.

## PostgreSQL vs SQLite Changes Summary

### What Changed:
1. ✅ `prisma/schema.prisma`: Changed `provider = "sqlite"` to `provider = "postgresql"`
2. ✅ Prisma Client regenerated for PostgreSQL
3. ✅ DATABASE_URL format: Changed from `file:./dev.db` to `postgresql://...`

### What Stays the Same:
- All model definitions (User, Event, Registration, etc.)
- All API routes and logic
- NextAuth configuration
- Frontend code

### Migration Notes:
- Local development data (SQLite) is **NOT** automatically transferred
- You'll need to re-seed the production database
- Test accounts need to be recreated on production
npx prisma db push

# Test with production environment
NEXTAUTH_URL=https://YOUR-APP-NAME.onrender.com npm run build

# Generate new Prisma client
npx prisma generate
```

## Your App URLs

- **Local**: http://localhost:3000
- **Production**: https://YOUR-APP-NAME.onrender.com
- **Login**: https://YOUR-APP-NAME.onrender.com/login
- **Signup**: https://YOUR-APP-NAME.onrender.com/signup

## Need Help?

If you're still getting errors after following these steps:

1. Check the Render service logs for specific error messages
2. Verify all environment variables are correctly set
3. Make sure your app name in NEXTAUTH_URL is correct
4. Try redeploying after making changes

The main issue is that NextAuth needs the correct production URL to work properly in production!