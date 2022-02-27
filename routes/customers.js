const { Customer, validate } = require('../models/customer')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

// Getting the list of customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

// Create a new customer
router.post('/', async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body) //result.error
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message)
  }

  // Create a new customer
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  })

  // Add the new customer to the DB
  customer = await customer.save()

  // Return the new customer
  res.send(customer)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  )

  if (!customer)
    return res.status(404).send('The customer with the given ID was not found.')

  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if (!customer)
    return res.status(404).send('The customer with the given ID was not found.')

  res.send(customer)
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer)
    return res.status(404).send('The customer with the given ID was not found.')

  res.send(customer)
})

module.exports = routers
