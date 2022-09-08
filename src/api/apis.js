import axios from 'axios'

// 设置服务器IP
export var SERVER_IP = 'http://127.0.0.1:3333'

// 设置服务器的默认ip
axios.defaults.baseURL = SERVER_IP


// 登录API
export var api_login = (params) => axios.post('/login',params)

// 获取热映、上映列表API
export var api_searchMovieList = (params) => axios.get('/searchMovieList',{params})

// 获取电影详情
export var api_getMovieInfo = (params) => axios.get('/getmovieinfo',{params})

// 获取影院详情
export var api_cinemaList = () => axios.get('/celimaList')

// 获取影院排片列表
export var api_cinemaInfo = (params) => axios.get('/celimainfo',{params})

// 获取影院排片信息
export var api_cinemaMovieInfo = (params) => axios.get('/celimamovieinfo',{params})

// 获取放映厅信息
export var api_getScreenRoomInfo = (params) => axios.get('/getscreenroominfo',{params})

// 获取购票信息
export var api_getBuyTicket = (params) => axios.get('/butticket',{params})