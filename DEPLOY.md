# Deploy to Vercel (Easiest Way)

## Step 1: Push to GitHub

1. If you don't have a GitHub account, create one at github.com

2. Create a new repository on GitHub:
   - Go to github.com → Click "+" → "New repository"
   - Name it something like "randomforest-website"
   - Don't initialize with README
   - Click "Create repository"

3. Copy the repository URL (it will look like: `https://github.com/yourusername/randomforest-website.git`)

4. Run these commands in your terminal (from this directory):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - RandomForest website"
   git branch -M main
   git remote add origin YOUR_REPO_URL_HERE
   git push -u origin main
   ```
   (Replace YOUR_REPO_URL_HERE with the URL from step 3)

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Click "Add New Project"
5. Find your repository in the list and click "Import"
6. Vercel will auto-detect everything! Just click "Deploy"
7. Wait 1-2 minutes for deployment
8. Your site will be live at a URL like: `randomforest-website.vercel.app`

## Share the URL!

Anyone can now visit your site - no installation needed! 🎉

