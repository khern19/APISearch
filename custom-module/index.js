const superagent = require('superagent')

const config = require('./config.json')

exports.searchHouse = async (houseName) => {
	const searchHouseUrl = `${config.url}`

	try {
		const searchHouseResponse = await superagent.get(searchHouseUrl)
		const searchHouseResponseFilter = searchHouseResponse.body.filter((house) => {
			return house.name.toLowerCase().includes(houseName.toLowerCase())
		})
		return searchHouseResponseFilter
		// }
	} catch (error) {
		return error
	}
}

exports.fetchHouseId = async (houseid) => {
	const fetchHouseIdUrl = `${config.url}/${houseid}`
	try {
		const fetchHouseIdResponse = await superagent.get(fetchHouseIdUrl)
		return fetchHouseIdResponse.body
	} catch (error) {
		return error
	}
}
