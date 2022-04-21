import axios from 'axios';
// import comment from '../redux/modules/comment';
// axios.defaults.withCredentials = true;

const token = sessionStorage.getItem('token');
const username = sessionStorage.getItem('user_id');

const api = axios.create({
    baseURL: 'http://121.141.140.148:8088',
    headers: { 
      "content-type": "applicaton/json;charset=UTF-8", 
      "accept": "application/json", 
      "Authorization": token, 
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
    getUser: () => api.get('/userinfo', {
      headers: { 
        "content-type": "applicaton/json;charset=UTF-8", 
        "accept": "application/json", 
        "Authorization": token, 
      },
      // {
      //   // Authorization: `Bearer ${localStorage.getItem('token')}`
      // },
    }),
    getUserList: () => api.get('/invite/userList', {
      headers: { 
        "content-type": "applicaton/json;charset=UTF-8", 
        "accept": "application/json", 
        "Authorization": token, 
      },
    }),
    editUser: (formData) => api.put('/api/userImage', formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }),
    
    //channel

    //dm
    getDm: () => api.get('/api/dm'),
    addDm: (dm) => api.post('/api/dm',{
      dm: dm,
    }),
    delDm: (dmId)=> api.delete(`api/dm/${dmId}`),

    //chat
    
  
}