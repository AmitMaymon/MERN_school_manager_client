import axios from 'axios'



const url = 'https://mern-project-1-server.onrender.com/students' || 'http://localhost:8000/students'

const getAll = async () => {
    console.log('getall');
    const {data} = await axios.get(url)
    return data.students
}
const getById = async (id) => {
    const {data} = await axios.get(url + '/' + id)
    return data.student[0]
}
const updateStudent = async (id, obj) => {
    const {data} = await axios.put(url + '/' + id, obj)
    return { msg: 'User Updated' }
}

const addStudent = async (obj) => {
    const {data} = await axios.post(url, obj)
    return { msg: 'User Created' }

}

const deleteStudent = async (id) => {
    const {data} = await axios.delete(url + '/' + id)
    return { msg: 'User Deleted' }
}




export default { getAll, getById, updateStudent, addStudent,deleteStudent }