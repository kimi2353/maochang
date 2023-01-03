function request(url, data ={}, method = "GET") {
	return new Promise((resolve, reject) => {
		let header = {
			// 'Content-Type': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		};//自定义请求头
		let userHua = uni.getStorageSync('user');
		let token = userHua.token;
		// let token = userHua.userinfo.token;
		if (token) {
		  header['token'] =  token;
		}
		uni.request({
			url:url,
			data:data,
			method:method,
			header:header,
			success:res => {
				// console.log(res,'resresresres')
				// 判断状态码
        if (res.statusCode == 401) {
          uni.reLaunch({
            url: "/pages/login/login",
          });
          return
        }
				if(res.data.code == 1){
					if(res.data.code == 1){
						resolve(res);
					} else if(res.data.code == 4001 || res.data.code == 4005){
            // console.log(res.data.code, 333333)
						reject(res)
					} else {
            // console.log(res.data.code, 11111)
						reject(res)
					}
				} else {
					reject(res)
				}
			}
		})
	})
}

module.exports = {
	request:request
}