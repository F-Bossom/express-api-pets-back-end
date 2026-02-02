// Bring in the Pet Model
const Pet = require('../models/pet');
// Set up routing with express
const express = require('express');
const router = express.Router();

/*
    HTTP Method	Controller	Response	URI	Use Case
    POST	create	200	/pets	Create a pet
    GET	index	200	/pets	List pets
    GET	show	200	/pets/:petId	Get a single pet
    PUT	update	200	/pets/:petId	Update a pet
    DELETE	deletePet	204	/pets/:petId	Delete a pet
*/

// POST /pets
router.post('/', async (req, res) => {
  try {
    // throw new Error("Danger Bill Robinson!")
    const newPet = await Pet.create(req.body);
    res.status(201).json({
      message: 'Successfully Created Pet',
      pet: newPet,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// GET /pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find(); // ({}) // give me all the pets
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// GET /pets/:petId
router.get('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    // If no pet is found, let's just return our 404 error message
    if (!foundPet) return res.status(404).json({ message: 'Pet Not Found' });

    // Now we know that we have a pet, let's send it back
    res.status(200).json({ foundPet });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// DELETE /pets/:petId
router.delete("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
        res.status(404)
        throw new Error("Pet not Found")
    };

    await foundPet.deleteOne();
    res
      .status(200)
      .json({ message: "Pet Successfully Deleted", pet: foundPet });
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});

router.put('/:petId', async (req, res)=>{
    try {
                // new:true makes sure the pet returned from findByIdAndUpdate is the updated pet with the new values
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {new: true})
     
        if(!updatedPet) return res.status(404).json({ message: "Pet Not Found" });

        res.status(200).json({
            message: "Updated Successfully",
            pet: updatedPet
        })
    } catch (error) {
         res.status(500).json({ err: error.message });
    }
})

module.exports = router;
