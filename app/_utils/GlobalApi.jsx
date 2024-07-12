const { default: axios } = require("axios")

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosCLient = axios.create({
    baseURL: 'https://doctor-booking-admin-bystrapi.onrender.com/admin/api',
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
})

const getCategory = () => axiosCLient.get('/categories?populate=*');
const getDoctorList = () => axiosCLient.get('/doctors?populate=*');
const getDoctorByCategory = (category) => axiosCLient.get('/doctors?filters[categories][Name][$in]=' + category + '&populate=*')
const getDoctorById = (id) => axiosCLient.get('/doctors/' + id + '?populate=*');
const bookAppointment = (data) => axiosCLient.post(`/appointments`, data);
const deleteBooking = (id) => axiosCLient.delete(`/appointments/` + id);
const getUserBooking = (userEmail) => axiosCLient.get(`/appointments?filters[Email][$eq]=` + userEmail + '&populate[doctor][populate][Images][populate][0]=url&populate=*');
const sendEmail = (data) => axios.post('/api/sendEmail', data);

export default {
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment,
    deleteBooking,
    getUserBooking,
    sendEmail
}