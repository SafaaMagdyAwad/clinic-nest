import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRole, UserSchema } from './../modules/users/schemas/user.schema';
import * as dotenv from 'dotenv';
dotenv.config();

const UserModel = mongoose.model('User', UserSchema);

async function seedAdmin() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in .env');
        }

        await mongoose.connect(mongoUri);
        //console.log('Connected to MongoDB');

        const existing = await UserModel.findOne({ email: 'adminsafaa@example.com' });
        if (existing) {
            //console.log('Admin already exists');
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('Admin@123', 10);

        const admin = new UserModel({
            name: 'Admin Safaa',
            email: 'adminsafaa@example.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
        });

        await admin.save();
        //console.log('Admin created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();


//ts-node src/database/seed-admin.ts
