const { response, request } = require('express');
const Event = require('../models/EventSchema')


//Get events
const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name')
    res.status(200).json({
        ok: true,
        events,
        msg: 'something'
    })
};

//Create events
const createEvent = async (req = request, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        await event.save();
        res.status(200).json({
            isCreated: true,
            event: event,
            msg: 'Event has been created succesfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isCreated: false,
            msg: 'An error occurred, please contact your administrator'
        })
    }
};

//Update events
const updateEvent = async (req = request, res = response) => {

    const { uid, body } = req;
    const eventId = req.params.id

    try {

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                isUpdated: false,
                msg: 'Event does not exist by id'
            })
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                isUpdated: false,
                msg: 'Forbidden! you do not have permission to access this resource'
            })
        };

        const newEvent = {
            ...body,
            user: uid
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });
        res.status(201).json({
            isUpdated: true,
            event: eventUpdated,
            msg: 'The event has been updated'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isUpdated: false,
            error: error.str,
            msg: 'An error occurred, please contact your administrator'
        })
    }

};

//Delete events
const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id
    const { uid } = req;

    try {

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                isUpdated: false,
                msg: 'Event does not exist by id'
            })
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                isUpdated: false,
                msg: 'Forbidden! you do not have permission to access this resource'
            })
        };

        const eventDeleted = await Event.findByIdAndDelete(eventId)
        res.status(201).json({
            isDeleted: true,
            eventDeleted,
            msg: 'The event has been deleted'

        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            isDeleted: false,
            msg: 'An error occurred, please contact your administrator'
        })
    }

};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent }
