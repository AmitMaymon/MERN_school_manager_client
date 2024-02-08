import React, { useEffect, useRef, useState } from 'react';
import utils from '../utils';

function UpdateStudent(props) {
    const [student, setStudent] = useState({
        id: 0, name: '', faculty: '', grades: []
    })
    const [originalStudent, setOriginalStudent] = useState({})
    const [message, setMessage] = useState('')
    useEffect(() => {
        const getStudent = async () => {
            const stu = await utils.getById(props.id)
            setOriginalStudent(stu)
            setStudent(stu)
        }
        getStudent()
    }, [props.id])

    const messageRef = useRef()


    const HandleChange = (e, index) => {
        const { name, value } = e.target
        if (name == 'grade') {

            setStudent(prevStudent => {

                const updatedGrades = [...prevStudent.grades];

                const { id } = e.target;
                updatedGrades[index] = { ...updatedGrades[index], [id]: value };

                // Return the updated student object
                return { ...prevStudent, grades: updatedGrades };
            });

        }



        setStudent(prevStudent => ({ ...prevStudent, [name]: value }))


    }

    function handleAdd() {
        setStudent({ ...student, grades: [...student.grades, { profession: '', score: 0 }] })
    }


    function handleRemove(index) {
        setStudent(prevStudent => {

            const updatedGrades = [...prevStudent.grades];

            updatedGrades.splice(index, 1)

            // Return the updated student object
            return { ...prevStudent, grades: updatedGrades };
        });
    }

    async function handleUpdate() {
        if (student == originalStudent) {
            setMessage('No Changes Made');
            messageRef.current.style.color = 'red'
            return
        }
        const filteredGrades = student.grades.filter(grade => grade.profession.trim() !== '');

        // Check if filtering changed the number of grades
        if (student.grades.length !== filteredGrades.length) {
            setMessage('Student Updated,empty grades were removed');
            messageRef.current.style.color = 'black'
            // Update student grades
            const updatedStudent = { ...student, grades: filteredGrades };

            // Proceed to update the student
            const response = await utils.updateStudent(props.id, updatedStudent);
            console.log(response);
            setTimeout(() => {
                props.setActiveComponent(null)
            }, 1500);
        } else {
            const response = await utils.updateStudent(props.id, student)
            console.log(response);
            messageRef.current.style.color = 'green'
            setMessage('Student Updated')
            setTimeout(() => {
                props.setActiveComponent(null)
            }, 1500);
        }

    }



    return (
        <div style={{ marginTop: '5px' }} className='mainComp'>
            <table>
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Faculty</th>
                        <th>Grades</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input disabled name='id' type="text" value={student.id} onChange={HandleChange} /></td>
                        <td><input name='name' type="text" value={student.name} onChange={HandleChange} /></td>
                        <td><input name='faculty' type="text" value={student.faculty} onChange={HandleChange} /></td>
                        <td>{student.grades.map((grade, index) => {
                            return (
                                < div key={index} style={{ border: '1px solid black', borderStyle: 'dotted' }}>
                                    <input onChange={(e) => { HandleChange(e, index) }} name='grade' id='profession' className='grade-input' type="text" value={grade.profession} />{ }: <input onChange={(e) => { HandleChange(e, index) }} name='grade' id='score' className='grade-input' type="number" min={0} max={100} value={grade.score} />
                                    <button onClick={() => { handleRemove(index) }}>-</button>
                                </div>
                            )

                        })}
                            <button onClick={handleAdd}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleUpdate} style={{ marginTop: '5px' }} className='upd-div add-div'>Update!</button>
            <h3 ref={messageRef} style={{ float: 'left', marginTop: '5px' }} >{message}</h3>

        </div >
    );
}

export default UpdateStudent;