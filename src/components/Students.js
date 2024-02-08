import React, { useEffect, useState } from 'react';
import utils from '../utils'
import UpdateStudent from './UpdateStudent';
import AddStudent from './AddStudent';
function Students(props) {
    const [students, setStudents] = useState([])
    const [studentId, setStudentId] = useState(null)
    const [updateClicked, setUpdateClicked] = useState(false)
    const [addClicked, setAddClicked] = useState(false)
    const [activeComponent, setActiveComponent] = useState(null)
    // useEffect(() => {
    //     const getData = async () => {
    //         const data = await utils.getAll()
    //         console.log(data);
    //         setStudents(data)

    //     }
    //     getData()
    // }, [])

    useEffect(() => {
        const getData = async () => {
            const data = await utils.getAll()
            console.log(data,'activeComp');
            setStudents(data)

        }
        getData()
    }, [activeComponent])




    const handleUpdate = (id) => {
        if (id == studentId && activeComponent == 'update') {
            setActiveComponent(null)
            return
        }
        setStudentId(id)
        setActiveComponent('update')
    }
    //TODO - When pressing delete it doesnt update the state for some reason
    const handleDelete = async (id) => {
        utils.deleteStudent(id)
        setActiveComponent('delete')
    }
    const handleAdd = () => {
        setActiveComponent('add')
    }


    return (
        <div className='mainComp'>
            <h1>Welcome to X School</h1>
            <div className='upd-div add-div' onClick={handleAdd}>Add Student</div>

            <table style={{ border: '2px solid black' }}>
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Faculty</th>
                        <th>Grades</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >

                    {
                        students.map((student, index) => {
                            return (
                                <tr key={index} >
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.faculty}</td>
                                    <td>{student.grades.map((grade, index) => {
                                        return (
                                            <div key={index} style={{ border: '1px solid black', borderStyle: 'dotted' }}>
                                                {grade.profession}:  {grade.score}

                                            </div>
                                        )
                                    })}</td>



                                    <td onClick={() => { handleUpdate(student.id) }} className='upd-div' >Edit</td>
                                    <td onClick={() => { handleDelete(student.id) }} className='del-div'>Delete</td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>


            {activeComponent == 'update' && <UpdateStudent id={studentId} setActiveComponent={setActiveComponent} />}
            {activeComponent == 'add' && <AddStudent freshId={students.length + 1} setActiveComponent={setActiveComponent} />}
        </div>
    );
}

export default Students;