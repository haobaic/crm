import axios from "axios";
import router from "@/router";
import {Message} from 'element-ui';
import apiList from './apiList.js'
axios.defaults.timeout = 10000; //接口超时时间
axios.defaults.baseURL = "http://39.101.217.150:8086/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset:UTF-8';

axios.defaults.transformRequest = [function(data) {
	let ret = ''
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return ret
}]
// 接口调取情况(成功根据返回值判断)
const handleStatus = (res) => {
	if (res.data.code == 20000 || res.data.code == 9999 || res.data.msg == '成功') {
		return res.data;
	} else {
		return '请求失败'
	}
};
//失败
const handleError = (error) => {
	if (error.message.includes('timeout')) {
		console.log('请求超时')
	}
	return false;
};

//防止有缓存，接口后加一个时间
axios.interceptors.request.use(config => {
	if (config.data) {
		for (let key of Object.keys(config.data)) {
			if (key && key.indexOf('$') === 0) {
				delete config.data[key]
			}
		}
	}
	// fix ie cache
	if (config.params) {
		config.params['_t'] = new Date().getTime()
	} else {
		config.params = {
			'_t': new Date().getTime()
		}
	}
	//token 要放在我们请求header上面 返回给后端
	if(localStorage.token){
	  config.headers.Authorization=localStorage.token
	}
	return config
}, err => {
	return Promise.reject(err)
})

// http response 拦截器  这儿判断登录拦截
axios.interceptors.response.use(response => {
	// let redirectUrl = localStorage.getItem("redirectUrl");
	// if (response.data.code == '-403') {
	//     window.location.href = redirectUrl
	// }
	return response
}, (error) => {
	let errMsg = errorHandle(error);
	Message.error(errMsg);
	return Promise.reject(errMsg);
})

function errorHandle(err) {
	// 请求失败
	let errMsg = '';
	if (err && err.response.status) {
		switch (err.response.status) {
			case 401:
				errMsg = '登录状态失效，请重新登录';
				location.replace('./login.html');
				break;
			case 403:
				errMsg = '拒绝访问';
				break;

			case 408:
				errMsg = '请求超时';
				break;

			case 500:
				errMsg = '服务器内部错误';
				break;

			case 501:
				errMsg = '服务未实现';
				break;

			case 502:
				errMsg = '网关错误';
				break;

			case 503:
				errMsg = '服务不可用';
				break;

			case 504:
				errMsg = '网关超时';
				break;

			case 505:
				errMsg = 'HTTP版本不受支持';
				break;

			default:
				errMsg = err.response.data.msg;
				break;
		}
	} else {
		errMsg = err;
	}
	return errMsg;
}
const ajaxData = {
	get(url, params, config) {
		let queryString = []
		if (params) {
			Object.keys(params)
				.forEach((key) => params[key] && queryString.push(`${key}=${params[key]}`))
			if (params.dangerClasses === 0) {
				queryString.push('dangerClasses=0')
			}
		}
		if (queryString.length > 0) {
			queryString = queryString.join('&')
			url += `?${queryString}`
		}
		return axios
			.get(url, config)
			.then(handleStatus)
			.catch(handleError)
	},
	post(url, params, config) {
		// config.timeout = 500;
		return axios
			.post(url, params, config)
			.then(handleStatus)
			.catch(handleError)
	}
}

// 以下是封装方法：
var list = {};

for (let item in apiList) {
	list[item] = (params) => {
		let [method, url] = apiList[item];
		let data = (method == 'get') ? params : (method == 'post') ? params : {};		
		return new Promise((resolve, reject) => {
			ajaxData[method](url, data)
				.then(res => {
					if (res) {
						// 在响应拦截器中，设置了code非200不返回数据，res则有可能会是undefined。所以判断res有数据才用resolve送出去。
						resolve(res);
					}
				})
				.catch(err => {
					reject(err);
				})
		})
	}
}

export default list;
