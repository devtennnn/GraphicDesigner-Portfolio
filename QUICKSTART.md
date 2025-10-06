# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 1️⃣ Clone & Install

```bash
# Navigate to your project directory
cd graphic-designer-portfolio

# Install all dependencies
npm install
```

## 2️⃣ Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Then edit `.env` with your MongoDB Atlas credentials:

```env
MONGODB_URI=mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=bdd30768b76b78e5c4e739b933472cd2
NODE_ENV=development
```

## 3️⃣ Initialize Database

```bash
# Populate MongoDB with starter content
npm run seed
```

You should see:
```
✅ Connected to MongoDB Atlas
✅ Database initialized successfully!
📊 Added 2 service categories
📊 Added 1 portfolio projects
📊 Added 1 developer projects
📊 Added 3 social links
```

## 4️⃣ Start Development Servers

```bash
# Run both frontend and backend together
npm run dev:full
```

This will start:
- **Backend API** on `http://localhost:5000`
- **Frontend** on `http://localhost:3000` (or next available port)

## 5️⃣ Access Your Portfolio

### Public Site
Open your browser to the URL shown in terminal (usually `http://localhost:3000`)

### Admin Dashboard
1. Navigate to `http://localhost:3000#!/admin`
2. Login with:
   - **Username**: `admin`
   - **Password**: `Kiminato855`

## ✅ Verify Everything Works

Run the diagnostic tests:

```bash
# Test MongoDB connection
npm run test:mongo

# Test API endpoints
npm run test:api
```

Both should show success messages ✅

## 🎨 Start Customizing

Now you can:
- Add your own portfolio projects
- Update service categories
- Configure social media links
- Change branding and colors
- Upload your own images

All through the admin dashboard at `#!/admin`!

## 🆘 Troubleshooting

### MongoDB Connection Failed
- Check `MONGODB_URI` in `.env`
- Verify MongoDB Atlas IP whitelist (see `MONGODB_SETUP.md`)
- Ensure database user credentials are correct

### Port Already in Use
- Vite will automatically try the next available port
- Check terminal output for the actual URL

### API Returns Empty Data
- Run `npm run seed` to populate the database
- Check server logs for errors

---

**Need more help?** See the full [README.md](./README.md) or [MONGODB_SETUP.md](./MONGODB_SETUP.md)
