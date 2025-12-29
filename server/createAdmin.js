require('dotenv').config(); // Load environment variables FIRST
const User = require('./models/User');
const { connectDB } = require('./config/db');

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@codestorm.com';
        const adminPassword = 'adminpassword123';

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log('Admin user already exists. Updating password to ensure access...');
            existingAdmin.password = adminPassword;
            existingAdmin.isAdmin = true;
            await existingAdmin.save();
            console.log('Admin user updated successfully.');
        } else {
            await User.create({
                name: 'System Admin',
                email: adminEmail,
                password: adminPassword,
                isAdmin: true
            });
            console.log('Admin user created successfully!');
        }

        console.log('Credentials:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        process.exit();
    } catch (error) {
        console.error('Error creating/updating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
