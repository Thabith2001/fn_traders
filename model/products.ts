import mongoose, { Schema, models } from 'mongoose';

const ProductInfoSchema = new Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
        },
        value: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        product_highlight: {
            type: [String],
            default: [],
        },

        products_info: {
            type: [ProductInfoSchema],
            default: [],
        },

        warranty: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        model_no: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        images: {
            type: [String],
            default: [],
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        isLatest: {
            type: Boolean,
            default: false,
        },

        capacity: {
            type: String,
            required: true,
            trim: true,
        },

        currency: {
            type: String,
            default: 'LKR',
            uppercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product =
    models.Product || mongoose.model('Product', ProductSchema);

export default Product;