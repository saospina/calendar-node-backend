const { response, request } = require('express');
const Event = require('../models/EventSchema')


//Get events
const getEvents = (req, res = response) => {
    res.status(200).json({
        ok: true,
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
const updateEvent = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'update'
    })
};

//Delete events
const deleteEvent = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'delete'
    })
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent }
