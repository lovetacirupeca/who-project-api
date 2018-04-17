const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    image: {
        type: String,
        default: 'http://res.cloudinary.com/lovetacirupeca/raw/upload/v1523989640/contact-avatars/wi-contact.png'
    },
    notes: {
        type: [String],
        default: []
    },
    job: {
        type: String
    },
    rate: {
        type: Number
    },
    categories: {
        type: [String],
        default: []
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;