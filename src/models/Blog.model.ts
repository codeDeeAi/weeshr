import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publicationDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
