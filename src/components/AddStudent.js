import React, { useEffect, useRef, useState } from 'react';
import utils from '../utils';

function AddStudent(props) {
    const [student, setStudent] = useState({
        id: 0, name: '', faculty: '', grades: []
    })
    const [message, setMessage] = useState('')

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
    function handleRemove(index) {
        setStudent(prevStudent => {

            const updatedGrades = [...prevStudent.grades];

            updatedGrades.splice(index, 1)

            // Return the updated student object
            return { ...prevStudent, grades: updatedGrades };
        });
    }
    function handleAdd() {
        setStudent({ ...student, grades: [...student.grades, { profession: '', score: 0 }] })
    }
    async function handleSubmit() {

        const filteredGrades = student.grades.filter(grade => grade.profession.trim() !== '');

        // Check if filtering changed the number of grades
        if (student.grades.length !== filteredGrades.length) {
            setMessage('Student Added,empty grades were removed');
            messageRef.current.style.color = 'black'
            // Update student grades
            const updatedStudent = { ...student, grades: filteredGrades };

            // Proceed to update the student
            const response = await utils.addStudent(updatedStudent);
            console.log(response);
            setTimeout(() => {
                props.setActiveComponent(null)
            }, 1500);
        } else {
            const response = await utils.addStudent(student)
            console.log(response);
            messageRef.current.style.color = 'green'
            setMessage('Student Added')
            setTimeout(() => {
                props.setActiveComponent(null)
            }, 1500);
        }
    }


    useEffect(() => {
        setStudent((prevStudent) => ({ ...prevStudent, id: props.freshId }))

    }, [])



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
                        <td><input name='id' type="text" value={student.id} onChange={HandleChange} /></td>
                        <td><input name='name' type="text" onChange={HandleChange} /></td>
                        <td><input name='faculty' type="text" onChange={HandleChange} /></td>

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
            <button onClick={handleSubmit} style={{ marginTop: '5px' }} className='upd-div add-div'>Add User!</button>
            <h3 ref={messageRef} style={{ float: 'left', marginTop: '5px' }} >{message}</h3>

        </div >
    );
}

export default AddStudent;