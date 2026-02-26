const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load Models
const User = require('./models/User');
const Equipment = require('./models/Equipment');
const Labour = require('./models/Labour');
const DairyProduct = require('./models/DairyProduct');
const CommunityPost = require('./models/CommunityPost');
const Scheme = require('./models/Scheme');
const TechGuide = require('./models/TechGuide');

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agezy', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
});

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Equipment.deleteMany();
        await Labour.deleteMany();
        await DairyProduct.deleteMany();
        await CommunityPost.deleteMany();
        await Scheme.deleteMany();
        await TechGuide.deleteMany();

        console.log('Data Destroyed...');

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt); // Default password

        const users = await User.insertMany([
            {
                name: 'Ramesh Kumar',
                email: 'ramesh@example.com',
                password: hashedPassword,
                role: 'Farmer',
            },
            {
                name: 'Suresh Singh',
                email: 'suresh@example.com',
                password: hashedPassword,
                role: 'Equipment Owner',
            },
            {
                name: 'Mahesh Yadav',
                email: 'mahesh@example.com',
                password: hashedPassword,
                role: 'Labour',
            },
            {
                name: 'Kamla Devi',
                email: 'kamla@example.com',
                password: hashedPassword,
                role: 'Dairy Farmer',
            },
        ]);

        console.log('Users Added...');

        // 2. Create Equipment (Owned by Suresh)
        await Equipment.insertMany([
            {
                name: 'Mahindra 575 DI',
                type: 'Tractor',
                ownerName: 'Suresh Singh',
                location: 'Punjab',
                pricePerHour: 500,
                description: 'Powerful tractor for all farming needs.',
                available: true,
            },
            {
                name: 'Rotavator 6ft',
                type: 'Rotavator',
                ownerName: 'Suresh Singh',
                location: 'Punjab',
                pricePerHour: 200,
                description: 'Best for soil preparation.',
                available: true,
            },
            {
                name: 'Combine Harvester',
                type: 'Harvester',
                ownerName: 'Suresh Singh',
                location: 'Haryana',
                pricePerHour: 1500,
                description: 'Efficient harvesting for wheat and paddy.',
                available: true,
            },
        ]);

        console.log('Equipment Added...');

        // 3. Create Labour Profiles
        await Labour.insertMany([
            {
                name: 'Mahesh Group',
                type: 'Group',
                groupSize: 10,
                skills: ['Harvesting', 'Threshing'],
                location: 'Bihar',
                contactNumber: '9876543210',
                wagePerDay: 5000, // For group
                status: 'Available',
            },
            {
                name: 'Raju (Skilled)',
                type: 'Individual',
                skills: ['Sowing', 'Pesticide Spraying'],
                location: 'Uttar Pradesh',
                contactNumber: '9123456789',
                wagePerDay: 600,
                status: 'Available',
            },
        ]);

        console.log('Labour Added...');

        // 4. Create Dairy Products (Owned by Kamla)
        await DairyProduct.insertMany([
            {
                name: 'Pure Buffalo Milk',
                farmerName: 'Kamla Devi',
                location: 'Gujarat',
                price: 60,
                unit: 'Litre',
                description: 'Fresh organic milk, morning supply.',
                available: true,
            },
            {
                name: 'Desi Cow Ghee',
                farmerName: 'Kamla Devi',
                location: 'Gujarat',
                price: 1200,
                unit: 'Kg',
                description: 'Homemade pure ghee.',
                available: true,
            },
        ]);

        console.log('Dairy Products Added...');

        // 5. Create Community Posts
        await CommunityPost.insertMany([
            {
                author: 'Ramesh Kumar',
                content: 'What is the best time to sow wheat in Punjab this year?',
                type: 'Question',
                likes: 5,
                comments: [
                    { author: 'Suresh Singh', text: 'Usually first week of November is best.' }
                ]
            },
            {
                author: 'Kamla Devi',
                content: 'Increased my milk yield by 20% using better fodder mix!',
                type: 'Success Story',
                likes: 12,
            },
        ]);

        console.log('Community Posts Added...');

        // 6. Create Schemes
        await Scheme.insertMany([
            {
                title: 'PM Kisan Samman Nidhi',
                description: 'Financial benefit of Rs. 6000/- per year to farmers.',
                eligibility: 'All landholding farmer families.',
                benefits: 'Rs. 6000 per year',
                deadline: new Date('2025-12-31'),
                category: 'Subsidy',
                applicationLink: 'https://pmkisan.gov.in'
            },
            {
                title: 'Kisan Credit Card (KCC)',
                description: 'Credit support to farmers for cultivation and other needs.',
                eligibility: 'Farmers, Tenant Farmers, Share Croppers.',
                benefits: 'Low interest loans',
                deadline: new Date('2025-06-30'),
                category: 'Loan',
            }
        ]);

        console.log('Schemes Added...');

        // 7. Tech Guides
        await TechGuide.insertMany([
            {
                title: 'Modern Drip Irrigation',
                category: 'Irrigation',
                content: 'Drip irrigation saves water and nutrients by allowing water to drip slowly to the roots of plants...',
                videoUrl: 'https://www.youtube.com/watch?v=example',
            },
            {
                title: 'Organic Farming Basics',
                category: 'Farming Method',
                content: 'Organic farming is an agricultural system which originated early in the 20th century...',
            }
        ]);

        console.log('Tech Guides Added...');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
