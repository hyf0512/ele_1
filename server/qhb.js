var cookie = require('./cookie');
var querystring = require('querystring');
var axios = require('axios');

const baseurl = 'https://h5.ele.me';
axios.create({
	baseURL: baseurl,
	headers:{
		'origin':baseurl,
		'referer':`${baseurl}/hongbao/`,
		'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; PRO 6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043221 Safari/537.36 V1_AND_SQ_7.0.0_676_YYB_D QQ/7.0.0.3135 NetType/WIFI WebP/0.3.0 Pixel/1080',
  
	}
	
});
module.exports = async (url,mobile)=>{
	let hbshu = 0;
	const query = querystring.parse(url);
	tomax();
	async function tomax(phone){
		phone = phone || `138${String(Math.random() * 10).slice(-8)}`;
		console.log(phone);
		await axios.put(`https://h5.ele.me/restapi/v1/weixin/${cookie[hbshu].openid}/phone`,{
			phone,
			sign:cookie[hbshu].eleme_key
		});
		const response = await axios.post(`https://h5.ele.me/restapi/marketing/promotion/weixin/${cookie[hbshu].openid}`,{
			device_id: '',
		     group_sn: query.sn,
		     hardware_id: '',
		     method: 'phone',
		     phone,
		     platform: query.platform,
		     sign: cookie[hbshu].eleme_key,
		     track_id: '',
		     unionid: 'fuck',
		     weixin_avatar: '',
		     weixin_username: '',
		})
		console.log(response.data.promotion_records.length);
		let num = query.lucky_number - response.data.promotion_records.length;
		if(num < 1){
			return;
		}
		hbshu++;
		await tomax(num==1?mobile:null);
	}
};