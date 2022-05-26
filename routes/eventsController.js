const express = require('express')
const router = express.Router()

const { EventModel } = require('../models/event')

router.get('/', (req, res) => {
    EventModel.find((err, docs) => {
        if (err) res.status(400).send(err)
        else res.status(200).send(docs)
    })
})

router.get('/:_id', (req, res) => {
    EventModel.findById(req.params._id, (err, docs) => {
        if (err) res.status(400).send(err)
        else res.status(200).send(docs)
    })
})

router.post('/', (req, res) => {
    const occurences = [];
    for(i=0; i<req.body.occurences.length; i++) {

        const startDate = req.body.occurences[i].startDate
        const endDate = req.body.occurences[i].endDate

        const addressLine = req.body.occurences[i].location.addressLine
        const postalCode = req.body.occurences[i].location.postalCode
        const city = req.body.occurences[i].location.city
        const country = req.body.occurences[i].location.country
        
        const location = {
            addressLine,
            postalCode,
            city,
            country
        }

        const newOccurence = {
            startDate,
            endDate,
            location
        }

        occurences.push(newOccurence)
    }

    const tags = [];
    for(i=0; i<req.body.tags.length; i++) {
        const newTag = req.body.tags[i]
        tags.push(newTag)
    }

    const newRecord = new EventModel({
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        occurences: occurences,
        maximumAttendeeCapacity: req.body.maximumAttendeeCapacity,
        remainingAttendeeCapacity: req.body.remainingAttendeeCapacity,
        author: req.body.author,
        imageurl: req.body.imageurl,
        tags: tags
    })

    newRecord.save((err, docs) => {
        if (!err) res.status(200).send(docs)
        else res.status(400).send(err)
    })
})

router.put('/:_id', (req, res) => {
    const occurences = [];
    for(i=0; i<req.body.occurences.length; i++) {
        const startDate = req.body.occurences[i].startDate
        const endDate = req.body.occurences[i].endDate

        const addressLine = req.body.occurences[i].location.addressLine
        const postalCode = req.body.occurences[i].location.postalCode
        const city = req.body.occurences[i].location.city
        const country = req.body.occurences[i].location.country
        
        const location = {
            addressLine,
            postalCode,
            city,
            country
        }

        const newOccurence = {
            startDate,
            endDate,
            location
        }

        occurences.push(newOccurence)
    }

    const tags = [];
    for(i=0; i<req.body.tags.length; i++) {
        const newTag = req.body.tags[i]
        tags.push(newTag)
    }

    const updateRecord = new EventModel({
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        occurences: occurences,
        maximumAttendeeCapacity: req.body.maximumAttendeeCapacity,
        remainingAttendeeCapacity: req.body.remainingAttendeeCapacity,
        author: req.body.author,
        imageurl: req.body.imageurl,
        tags: tags
    })

    EventModel.findByIdAndUpdate(
        req.params._id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs)
            else res.status(400).send(err)
        }
    )
})

router.delete('/:_id', (req, res) => {
    EventModel.findByIdAndRemove(
        req.params._id,
        (err, docs) => {
            if (!err) res.send(docs)
            else res.status(400).send(err)
        }
    )
})

module.exports = router