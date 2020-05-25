const searchHistoryComponent = {
	template: ` <div>
                    <div class="col" v-for="search in searchHistory">

                            <small @click="houseId(search.id)">
                                 {{ search.name }} | {{ search.date }}
							</small>
							<hr class="bg-white"/>
                    </div>
				</div>`,
	methods: {
		houseId: async function (id) {
			const response = await axios.post(`http://localhost:8000/api/houseId`, {
				id: id,
			})
			houses.returnResult = response.data
			houses.searchBar = false
			houses.searchList = false
		},
	},
	props: ['searchHistory'],
}

const houses = new Vue({
	el: '#houses',
	data: {
		appName: 'Ice and Fire Search House Name App',
		houseInput: '',
		houseResults: [],
		returnResult: {},
		defaultImage: 'https://i.pinimg.com/originals/d6/e8/c5/d6e8c572d73d984fbd2413c494d5a240.png',
		searchHistory: [],
		searchBar: true,
		searchList: true,
	},
	methods: {
		searchHouse: async function () {
			const response = await axios.post(`http://localhost:8000/api/search`, {
				houseName: this.houseInput,
			})
			this.houseResults = response.data
			if (this.totalSearchResults != 0) {
				this.searchBar = false
			}
		},

		houseId: async function (house) {
			const houseid = house.url.slice(house.url.lastIndexOf('/') + 1)

			const response = await axios.post(`http://localhost:8000/api/houseId`, {
				id: houseid,
			})
			this.returnResult = response.data
			this.trackSearchHistory()
			this.searchList = false
		},

		searchAgain: function () {
			this.houseResults = []
			this.houseInput = ''
			this.returnResult = {}
			this.searchBar = true
			this.searchList = true
		},

		trackSearchHistory: function () {
			// create a new date and time string formatted to local time
			const now = new Date().toLocaleDateString('en-US')
			const houseid = this.returnResult.url.slice(this.returnResult.url.lastIndexOf('/') + 1)
			let noDuplicates = true
			this.searchHistory.forEach((history) => {
				if (history.id === houseid) {
					noDuplicates = false
				}
			})
			if (noDuplicates) {
				this.searchHistory.push({
					id: houseid,
					name: this.returnResult.name,
					date: now,
				})
			}
		},
	},

	computed: {
		totalSearchResults: function () {
			if (this.houseResults) {
				return this.houseResults.length
			} else {
				return 0
			}
		},
	},

	components: {
		'search-component': searchHistoryComponent,
	},
})
