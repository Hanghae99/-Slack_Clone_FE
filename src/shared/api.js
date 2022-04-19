import axios from 'axios';
// import comment from '../redux/modules/comment';
// axios.defaults.withCredentials = true;

const token = sessionStorage.getItem('token');
const api = axios.create({
    baseURL: 'http://3.35.52.88',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
		  accept: 'application/json,',
      token: token,
      // "Authorization": `Bearer ${sessionStorage.getItem('token')}`, 
    },
});

api.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`;
	return config;
});

export const apis={
    //user
    // login: 
    // signup: 
    // lgout: 
    
    //channel

    //dm
    getDm : () => api.get('/api/dm'),
    addDm: (dm) => api.post('/api/dm',{
      dm: dm,
    }),
    delDm: (dmId)=> api.delete(`api/dm/${dmId}`),

    //chat
    
  
}