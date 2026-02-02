// Bring in the Pet Model
const Pet = require("../models/pet")
// Set up routing with express
const express = require("express")
const router = express.Router()

/*
    HTTP Method	Controller	Response	URI	Use Case
    POST	create	200	/pets	Create a pet
    GET	index	200	/pets	List pets
    GET	show	200	/pets/:petId	Get a single pet
    PUT	update	200	/pets/:petId	Update a pet
    DELETE	deletePet	204	/pets/:petId	Delete a pet
*/

// POST /pets
router.post('/pets', async (req, res) => {
    try {
        // throw new Error("Danger Bill Robinson!")
        const newPet = await Pet.create(req.body)
        res.status(201).json({
            message: "Successfully Created Pet",
            pet: newPet
        })
    } catch (error) {
       res.status(500).json({err: error.message}) 
    }
})

module.exports = router