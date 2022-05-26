const mongoose = require('mongoose')

const generateId = () => {
    let result = 'event:'
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    const n = 10
    for (let i = 0; i < n; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const EventModel = mongoose.model(
    "Events",
    {
        _id: {
            type: String,
            default: generateId
        },
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        occurences: [
            {
                startDate: {
                    type: Date,
                    required: true
                },
                endDate: {
                    type: Date,
                    required: true
                },
                location: {
                    addressLine: {
                        type: String,
                        required: true
                    },
                    postalCode: {
                        type: String,
                        required: true
                    },
                    city: {
                        type: String,
                        required: true
                    },
                    country: {
                        type: String,
                        required: true
                    }
                }
            }
        ],
        maximumAttendeeCapacity: {
            type: Number,
            required: true
        },
        remainingAttendeeCapacity: {
            type: Number,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        imageurl: {
            type: String,
            required: true
        },
        tags: [
            {
                type: String
            }
        ]
    },
    "events"
)

module.exports = { EventModel }