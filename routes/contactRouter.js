const express = require('express')
const contactModel = require('../models/contactSchema')

//Create a Router
const router = express.Router()

// Get Contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await contactModel.find()
        res.status(200).json(contacts)
    } catch (error) {
        console.log(error);
    }
})

//Create Contacs
router.post('/', async (req, res) => {
    const contactData = req.body  // Gets the data
    console.log(contactData);
    try {
        const contacts = await contactModel.create(contactData)  //create
        res.status(201).json(contacts) 
    } catch (error) {
        res.status(400).json('Info Not Valid')
    }
})
    //Create contac by id
    router.get('/:id', async (req, res) => {
        const contactId = req.params.id
        console.log(contactId)
        try {
            const contacts = await contactModel.findById(contactId)
            res.status(200).json(contacts)
        } catch (error) {
            console.log(error);
            res.status(400).json('Contact Not Found!')
        }
    })

// Update contact by id
router.put('/:id', async (req, res) => {
    const contactId = req.params.id
    const newContactData = req.body
    try {
        // Finds the contact by Id
        const contact = await contactModel.findByIdAndUpdate(contactId, newContactData, {new: true})
        res.status(202).json(contact)
    } catch (error) {
        console.log(error)
    }
})

//!Delete a contact
router.delete('/:id', async (req, res) => {
    const contactId  = req.params.id

    try {
        const contact = await contactModel.findByIdAndDelete(contactId)
        res.status(200).json({msg: 'Contact was deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router