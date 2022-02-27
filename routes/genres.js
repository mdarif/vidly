const { Genre, validate } = require('../models/genres')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

// Make the genres array object available to the app
/* const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Comedy' }
] */

// API Endpoint http://localhost:5000/api/genres

// Getting the list of genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

// Create a new genres
router.post('/', async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body) //result.error
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message)
  }

  // Create a new genre
  let genre = new Genre({
    name: req.body.name
  })

  // Add the new genre to the DB
  genre = await genre.save()

  // Return the new genre
  res.send(genre)
})

// Update the genres
router.put('/:id', async (req, res) => {
  // Validate genres before updating the DB
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body) //result.error
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  )

  // Look up the genre
  // If it does not exist, return 404
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
    // If genre is not found
    return res.status(400).send('The genre with the given id was not found')

  // Return the updated genre to the client
  res.send(genre)
})

// /api/genres/1
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  // res.send(req.params) // Send the requested id of the course to the client
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id)) // for Array only
  if (!genre)
    // If course is not found
    return res.status(400).send('The genre with the given id was not found')

  res.send(genre)
})

// Delete the genres
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  // Look up the genre
  // If it does not exist, return 404
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre)
    // If genre is not found
    return res.status(400).send('The genre with the given id was not found')

  // Delete the genre for Array only
  // const index = genres.indexOf(genre)
  // genres.splice(index, 1)

  // Return the same genre
  res.send(genre)
})

module.exports = router
