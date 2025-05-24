const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock data for demonstration
const mockBusinesses = [
    {
        id: 1,
        name: "Addis Red Sea Restaurant",
        address: "933 Bonifant St, Silver Spring, MD 20910",
        category: "Restaurant",
        phone: "(301) 587-5721",
        description: "Authentic Ethiopian cuisine with traditional coffee ceremony",
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        name: "Zion Market",
        address: "8407 Ramsey Ave, Silver Spring, MD 20910",
        category: "Grocery Store",
        phone: "(301) 588-2018",  
        description: "Ethiopian grocery store with spices, injera, and traditional foods",
        created_at: new Date().toISOString()
    },
    {
        id: 3,
        name: "Ethiopian Orthodox Church",
        address: "1234 Georgia Ave, Silver Spring, MD 20910",
        category: "Church",
        phone: "(301) 565-4000",
        description: "Traditional Orthodox services in Amharic and English",
        created_at: new Date().toISOString()
    }
];

let businessesStorage = [...mockBusinesses];

// API Endpoints

// GET endpoint - Retrieve businesses from database
app.get('/api/businesses', async (req, res) => {
    try {
        // Try to get from Supabase first, fall back to mock data
        if (supabaseUrl !== 'https://your-project.supabase.co') {
            const { data, error } = await supabase
                .from('ethiopian_businesses')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                return res.json({
                    success: true,
                    data: data,
                    count: data.length
                });
            }
        }

        // Use mock data
        res.json({
            success: true,
            data: businessesStorage,
            count: businessesStorage.length
        });
    } catch (error) {
        console.log('Using mock data due to database connection issue');
        res.json({
            success: true,
            data: businessesStorage,
            count: businessesStorage.length
        });
    }
});

// POST endpoint - Add new business to database
app.post('/api/businesses', async (req, res) => {
    try {
        const { name, address, category, phone, description } = req.body;

        if (!name || !address || !category) {
            return res.status(400).json({
                success: false,
                error: 'Name, address, and category are required'
            });
        }

        const newBusiness = {
            id: businessesStorage.length + 1,
            name,
            address,
            category,
            phone: phone || '',
            description: description || '',
            created_at: new Date().toISOString()
        };

        // Try to add to Supabase first, fall back to mock storage
        if (supabaseUrl !== 'https://your-project.supabase.co') {
            try {
                const { data, error } = await supabase
                    .from('ethiopian_businesses')
                    .insert([newBusiness])
                    .select();

                if (!error && data) {
                    return res.status(201).json({
                        success: true,
                        data: data[0],
                        message: 'Business added successfully'
                    });
                }
            } catch (dbError) {
                console.log('Database unavailable, using local storage');
            }
        }

        // Add to mock storage
        businessesStorage.push(newBusiness);

        res.status(201).json({
            success: true,
            data: newBusiness,
            message: 'Business added successfully'
        });
    } catch (error) {
        console.error('Error adding business:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add business'
        });
    }
});

// External API endpoint - Get news (mock data for demonstration)
app.get('/api/news', async (req, res) => {
    try {
        // Mock news data for demonstration
        const mockNews = [
            {
                title: "Ethiopian Community Center Opens in Silver Spring",
                link: "https://example.com/news1",
                pubDate: new Date().toISOString(),
                description: "New community center provides services for Ethiopian immigrants"
            },
            {
                title: "Ethiopian Restaurant Week Celebrates Local Businesses",
                link: "https://example.com/news2", 
                pubDate: new Date(Date.now() - 86400000).toISOString(),
                description: "Local Ethiopian restaurants showcase traditional cuisine"
            },
            {
                title: "Cultural Festival Brings Ethiopian Heritage to DC Metro",
                link: "https://example.com/news3",
                pubDate: new Date(Date.now() - 172800000).toISOString(),
                description: "Annual festival celebrates Ethiopian culture and community"
            }
        ];

        res.json({
            success: true,
            data: mockNews,
            message: 'News fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news',
            data: []
        });
    }
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/public/search.html');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Visit http://localhost:${PORT} to view the application`);
});