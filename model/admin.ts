import mongoose, { models, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
            enum: ['admin'],
            default: 'admin',
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        12
    );
});

const Admin =
    models.Admin ||
    mongoose.model('Admin', adminSchema);

export default Admin;