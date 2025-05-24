YeneHabeshaHub Ethiopian Community Hub

Project Description

My final project for INST 377! This web app helps the Ethiopian community in Silver Spring find local businesses and stay connected. 

What it does:
- Interactive map with Ethiopian restaurants, grocery stores, churches
- Community can add new businesses 
- Shows Ethiopian news
- Mobile-friendly design

Why I built this:
Growing up, my family had trouble finding Ethiopian businesses when we moved to the area. Most people just know places through word of mouth, but there's no central place online to find everything. This app solves that problem for our community.

Target Browsers

Desktop:
- Chrome (recommended)
- Firefox 
- Safari
- Edge

Mobile:
- iOS Safari
- Chrome on Android
- Samsung Internet

Note: JavaScript must be enabled*

Developer Manual

Technical setup info below ⬇️

---

Developer Manual

Quick Setup

What you need:**
- Node.js installed
- Code editor (I used VS Code)
- Terminal/command line

Steps:
1. Clone the repo
2. `npm install`
3. Create `.env` file (see below)
4. `npm start`
5. Go to http://localhost:3000

Environment Setup

Getting API keys:**
- Supabase: Sign up at supabase.com, create project
- NewsData: Get free key at newsdata.io (optional)

Database Setup (Supabase)

Option 1: Use Supabase (recommended)**
1. Make account on supabase.com
2. Create new project 
3. Go to SQL Editor
4. Run this code:


Option 2: Skip database**
- App will use fake data automatically
- Good for testing/development

How to Run

Development mode:**
  ' ' 'bash

- Auto-restarts when you change files
- Good for coding

API Endpoints

GET /api/businesses**
- Returns all businesses in database
- No parameters needed

POST /api/businesses** 
- Adds new business
- Required: name, address, category
- Optional: phone, description

GET /api/news
- Gets Ethiopian news articles
- Falls back to fake news if no API key

Example API call:
```bash
curl http://localhost:3000/api/businesses
```

Testing

No automated tests** (didn't have time to set up Jest)

Manual testing checklist:
- [ ] Homepage loads businesses
- [ ] Map shows up and has markers
- [ ] Can add new business through form
- [ ] About page loads
- [ ] Works on phone browser
- [ ] News section displays something

Libraries Used

Frontend:
- Bootstrap 5 - styling and layout
- Leaflet.js - interactive maps  
- Chart.js - business category chart

Backend:
- Express - web server
- Supabase - database
- CORS - API access

Known Issues

Current problems:
- Map markers aren't exact locations (just random spots around Silver Spring)
- News API sometimes doesn't work without key
- No user accounts or login
- Can't upload photos for businesses
- No way to edit/delete businesses once added

Why these exist:
- Time constraints for final project
- Some APIs cost money for exact features
- Focused on core functionality first

Future Features

If I continue working on this:**

Next semester:
- [ ] User login system
- [ ] Better map with real addresses
- [ ] Business reviews/ratings
- [ ] Photo uploads
- [ ] Search and filter options

Long term ideas:
- [ ] Mobile app version
- [ ] Amharic/Tigrinya translation
- [ ] Event calendar for community
- [ ] Email notifications for new businesses

Deployment

For Vercel:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables in Vercel settings
4. Deploy

For other platforms:
- Should work on Heroku, Railway, etc.
- Make sure to set environment variables
- Port is set automatically for most platforms

Problems I Ran Into

Database connection:
- Took forever to figure out Supabase setup
- Environment variables were confusing at first
- Solution: Added fallback to mock data

Map integration:
- Leaflet documentation was overwhelming 
- Couldn't get exact coordinates for addresses
- Solution: Used approximate locations for demo

API limits:
- News API has daily limits
- Solution: Added mock news as backup

Credits

- Built by Newell Mulugeta for INST 377
- Ethiopian flag colors used in design
- Thanks to Silver Spring Ethiopian community for inspiration
- Shoutout to Professor [Name] and TAs for help with debugging
