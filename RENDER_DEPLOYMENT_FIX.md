# 🚀 Render Deployment Fix Guide

## Current Issues
- ❌ Server Error 500 on `/api/auth/session`
- ❌ NextAuth configuration errors
- ❌ SVG path errors (now fixed)
- ❌ Missing environment variables on Render

## Step-by-Step Solution

### Step 1: Fix Environment Variables on Render

1. **Go to your Render Dashboard**: https://dashboard.render.com/
2. **Find your web service** (Eventra app)
3. **Click on your service**
4. **Go to the "Environment" tab**
5. **Add these environment variables** (click "Add Environment Variable" for each):

```
DATABASE_URL=postgresql://eventra_backend_db_user:RzUNMl80MiW1nWyNWYz3wdFp5uxlE1rR@dpg-d3p1tu2li9vc73cojcqg-a.oregon-postgres.render.com/eventra_backend_db

NEXTAUTH_URL=https://YOUR-APP-NAME.onrender.com

NEXTAUTH_SECRET=your-super-secret-production-key-minimum-32-characters-long

NODE_ENV=production
```

**IMPORTANT**: Replace `YOUR-APP-NAME` with your actual Render app name (found in your service URL)

### Step 2: Generate a Strong NEXTAUTH_SECRET

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

### Step 3: Deploy the Changes

1. **Save environment variables** in Render
2. **Go to "Manual Deploy" tab**
3. **Click "Deploy Latest Commit"**
4. **Wait for deployment to complete** (5-10 minutes)

### Step 4: Initialize Database on Production

After deployment completes:

1. **Go to your Render service logs**
2. **Check if there are any database errors**
3. **If needed, run database migrations** (Render should do this automatically)

### Step 5: Test Your Deployed App

1. **Visit your app**: `https://YOUR-APP-NAME.onrender.com`
2. **Test signup**: Go to `/signup` and create a test account
3. **Test login**: Go to `/login` and login with your test account
4. **Check for errors**: Open browser dev tools and look for any remaining errors

## Common Issues & Solutions

### Issue: "Server configuration error"
**Solution**: Make sure `NEXTAUTH_URL` matches your exact Render domain

### Issue: Database connection errors
**Solution**: Verify `DATABASE_URL` is exactly as provided above

### Issue: Still getting 500 errors
**Solution**: Check Render logs for specific error messages

## Quick Test Commands (Run Locally)

```bash
# Test database connection
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