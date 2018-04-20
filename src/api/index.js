import request from './request'

export default {
	getJsonpData () {
		return request.jsonp({url: '/api/getJsonpData'})
	},
	getSererData (params) {
		return request.get({url: '/api/getSettingData', params})		
	},
	submitData (data) {
		return request.post({
			url: '/api/saveBaseData', 
			method: "post",
			data
		})
	}

}

