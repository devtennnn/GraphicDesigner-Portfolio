# MongoDB Atlas Setup Guide

Follow these steps to fix the database connection for your portfolio website.

## 🔧 Step-by-Step MongoDB Atlas Configuration

### 1. **Login to MongoDB Atlas**
- Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
- Login with your account

### 2. **Create/Check Database User**
1. In your Atlas dashboard, click **"Database Access"** (left sidebar)
2. Look for a user named `portfolio`
   
   **If user doesn't exist:**
   - Click **"Add New Database User"**
   - **Authentication Method**: Password
   - **Username**: `portfolio`
   - **Password**: `admin855867`
   - **Database User Privileges**: 
     - Select **"Read and write to any database"**
     - OR create custom role for specific database
   - Click **"Add User"**

   **If user exists:**
   - Click **"Edit"** next to the `portfolio` user
   - Verify password is `admin855867`
   - Ensure privileges include read/write access

### 3. **Configure Network Access**
1. Click **"Network Access"** (left sidebar)
2. Check if your IP is listed
   
   **Add IP Address:**
   - Click **"Add IP Address"**
   - For testing: Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - For production: Add your specific IP address
   - Click **"Confirm"**

### 4. **Get Connection String**
1. Go to **"Database"** → **"Connect"** 
2. Click **"Connect your application"**
3. Select **"Node.js"** and version **"4.1 or later"**
4. Copy the connection string - it should look like:
   ```
   mongodb+srv://portfolio:<password>@tenten.ykgllhj.mongodb.net/<database>
   ```
5. Replace `<password>` with `admin855867`
6. Replace `<database>` with `portfolio`

   **Final string should be:**
   ```
   mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio
   ```

### 5. **Create Database (if needed)**
1. In **"Database"** section, click **"Browse Collections"**
2. If no `portfolio` database exists:
   - Click **"Create Database"**
   - **Database name**: `portfolio`
   - **Collection name**: `services` (any name works)
   - Click **"Create"**

### 6. **Test Connection**
After making these changes:
1. Wait 1-2 minutes for changes to take effect
2. In your project, run:
   ```bash
   node test-mongo.js
   ```
3. You should see: ✅ **Successfully connected to MongoDB Atlas!**

## 🚨 Common Issues & Solutions

### Issue: "Authentication failed"
- **Solution**: Double-check username/password in Database Access
- **Wait**: Changes can take 1-2 minutes to propagate

### Issue: "Network timeout" 
- **Solution**: Check Network Access whitelist
- **Quick fix**: Add 0.0.0.0/0 for testing

### Issue: "Database not found"
- **Solution**: Create the `portfolio` database manually
- **Or**: Let the application create it automatically

### Issue: "User not authorized"
- **Solution**: Ensure user has "Read and write to any database" privileges

## 🎯 After Successful Connection

Once the test passes:
1. Restart your server: `node server.js`
2. You should see: **"Connected to MongoDB Atlas"**
3. Your data will persist between sessions
4. Admin changes will be saved to the cloud database

## 📞 Need Help?

If you're still having issues:
1. Take a screenshot of your Database Access page
2. Take a screenshot of your Network Access page  
3. Copy the exact error message from `node test-mongo.js`

Your application works perfectly with localStorage backup - the database is just for persistence!