const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    coordinates: [req.body.latitude, req.body.longitude],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contacts: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact' 
        }
    ]
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

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;