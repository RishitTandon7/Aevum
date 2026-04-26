# 🚀 GET YOUR FREE API KEYS FOR REAL TRAVEL DATA

This guide will help you set up **FREE** API keys to get **REAL, LIVE** flight and hotel data instead of mock/estimated data.

---

## 🎯 Quick Setup (5 minutes)

### Option 1: Amadeus API (RECOMMENDED - Best for Flights)
**Free Tier:** 2,000 API calls/month

1. **Sign up:** https://developers.amadeus.com/register
2. **Create an app:**
   - Go to "My Self-Service Workspace"
   - Click "Create New App"
   - Name it anything (e.g., "Travel Search")
3. **Get credentials:**
   - Copy your **API Key**
   - Copy your **API Secret**
4. **Add to `.env` file:**
   ```env
   AMADEUS_API_KEY=your_api_key_here
   AMADEUS_API_SECRET=your_api_secret_here
   ```

**What you get:** Real-time flight prices from 500+ airlines worldwide

---

### Option 2: RapidAPI (Best for Hotels)
**Free Tier:** 500 requests/month on Booking.com API

1. **Sign up:** https://rapidapi.com/auth/sign-up
2. **Subscribe to Booking.com API:**
   - Go to: https://rapidapi.com/apidojo/api/booking-com
   - Click "Subscribe to Test" (FREE plan)
3. **Get your key:**
   - Copy the **X-RapidAPI-Key** from the code snippet
4. **Add to `.env` file:**
   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

**What you get:** Real hotel prices from Booking.com

---

### Option 3: SerpAPI (Backup for Both)
**Free Tier:** 100 searches/month

1. **Sign up:** https://serpapi.com/users/sign_up
2. **Get your key:**
   - Go to Dashboard
   - Copy your **API Key**
3. **Add to `.env` file:**
   ```env
   SERPAPI_KEY=your_serpapi_key_here
   ```

**What you get:** Google Flights + Google Hotels data

---

## 📝 Complete .env File Example

Create a file named `.env` in the `backend` folder:

```env
# Amadeus (Flights)
AMADEUS_API_KEY=AbCdEfGhIjKlMnOp
AMADEUS_API_SECRET=1234567890abcdef

# RapidAPI (Hotels)
RAPIDAPI_KEY=1234567890abcdefghijklmnop

# SerpAPI (Backup)
SERPAPI_KEY=abcdef1234567890

# Server
PORT=3001
```

---

## ✅ Verify Setup

1. **Restart your backend server**
2. **Visit:** http://localhost:3001/health
3. **You should see:**
   ```json
   {
     "status": "Running",
     "apis": {
       "amadeus": "✅ Connected",
       "rapidapi": "✅ Configured",
       "serpapi": "✅ Configured"
     }
   }
   ```

---

## 🎁 What Each API Gives You

| API | Free Limit | Best For | Data Quality |
|-----|-----------|----------|--------------|
| **Amadeus** | 2,000/month | Flights | ⭐⭐⭐⭐⭐ Real airline data |
| **RapidAPI** | 500/month | Hotels | ⭐⭐⭐⭐⭐ Booking.com prices |
| **SerpAPI** | 100/month | Both | ⭐⭐⭐⭐ Google search results |

---

## 💡 Pro Tips

1. **Start with Amadeus** - It's the most generous free tier for flights
2. **Add RapidAPI** - For real hotel prices from Booking.com
3. **Keep SerpAPI as backup** - It works for both flights and hotels
4. **Without any keys** - The app still works with realistic estimated data

---

## 🔧 Troubleshooting

### "Amadeus auth failed"
- Double-check your API Key and Secret
- Make sure there are no extra spaces
- Verify you're using the **Test** environment credentials

### "RapidAPI quota exceeded"
- You've used your 500 free requests
- Wait for next month or upgrade to paid plan

### "SerpAPI error"
- Check if your API key is correct
- Verify you haven't exceeded 100 searches/month

---

## 🚀 Ready to Go!

Once you've added at least ONE API key, your app will fetch **REAL, LIVE** travel data instead of estimates!

**Test it:**
1. Search for flights: Mumbai → Delhi
2. Search for hotels: Goa
3. Try budget search: Mumbai → Goa with ₹15,000 budget

You'll see "Live" or "SerpAPI" in the source tag instead of "Estimated"!
