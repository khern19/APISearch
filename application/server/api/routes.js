const express = require('express')
const router = express.Router()

const custommodule = require('custom-module')

router.post('/search', async (req, res) => {
	try {
		const searchHouseResponse = await custommodule.searchHouse(req.body.houseName)
		res.json(searchHouseResponse)
	} catch (err) {
		res.json({ err })
	}
})

router.post('/houseId', async (req, res) => {
	try {
		const fetchHouse = await custommodule.fetchHouseId(req.body.id)
		res.json(fetchHouse)
	} catch (err) {
		res.json({ err })
	}
})

module.exports = router
