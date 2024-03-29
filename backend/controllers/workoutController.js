const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'L\'exercice n\'existe pas'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'L\'exercice n\'existe pas'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, sets, reps, rest} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!sets) {
        emptyFields.push('sets')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!rest) {
        emptyFields.push('rest')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Erreur: Veuillez remplir les champs obligatoires', emptyFields})
    }

    // add doc to db
    try {
        const workout = await Workout.create({title, sets, reps, rest})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'L\'exercice n\'existe pas'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'L\'exercice n\'existe pas'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'L\'exercice n\'existe pas'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: 'L\'exercice n\'existe pas'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}