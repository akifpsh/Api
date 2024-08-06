import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";
import StudentDetails from "./StudentDetails";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStudents();
                console.log('students data:', data);

                if (Array.isArray(data)) {
                    setStudents(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchData();
    }, []);

    const handleDetails = (student) => {
        setSelectedStudent(student);
    };

    const handleClose = () => {
        setSelectedStudent(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            // Öğrenciyi başarılı bir şekilde sildikten sonra listeyi güncelleyin
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    };

    return (
        <div>
            <h2>Studentsssssssss</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                {student.studentCourses && student.studentCourses.map(sc => (
                                    <div key={sc.courseId}>{sc.courseName}</div>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => handleDetails(student)}>Details</button>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(student.studentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedStudent && (
                <StudentDetails student={selectedStudent} onClose={handleClose} />
            )}
        </div>
    );
};

export default StudentList;
