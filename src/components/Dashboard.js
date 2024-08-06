import React, { useEffect, useState } from 'react';
import { createStudent, getStudents, deleteStudent, updateStudent } from '../services/studentService';
import { getCourses, createCourse, deleteCourse, updateCourse } from '../services/courseService';
import StudentDetails from './StudentDetails';
import CourseDetails from './CourseDetails';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [editCourse, setEditCourse] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const student = {
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: []
        };

        try {
            await createStudent(student);
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error.response ? error.response.data : error.message);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        const course = {
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };

        try {
            await createCourse(course);
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditStudent = async (e) => {
        e.preventDefault();
        
        if (!editStudent || !editStudent.studentId) {
            console.error('StudentId is missing');
            return;
        }

        const updatedStudent = {
            StudentId: editStudent.studentId,
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: editStudent.StudentCourses || []
        };

        try {
            await updateStudent(updatedStudent.StudentId, updatedStudent);
            fetchStudents();
            setEditStudent(null);
        } catch (error) {
            console.error('Error updating student:', error.response ? error.response.data : error.message);
        }
    };
    
    const handleEditCourse = async (e) => {
        e.preventDefault();
        
        if (!editCourse || !editCourse.courseId) {
            console.error('CourseId is missing');
            return;
        }

        const updatedCourse = {
            CourseId: editCourse.courseId,
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };

        try {
            await updateCourse(updatedCourse.CourseId, updatedCourse);
            fetchCourses();
            setEditCourse(null);
        } catch (error) {
            console.error('Error updating course:', error.response ? error.response.data : error.message);
        }
    };

    const handleStudentDetails = (student) => {
        setSelectedStudent(student);
    };

    const handleCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseStudentDetails = () => {
        setSelectedStudent(null);
    };

    const handleCloseCourseDetails = () => {
        setSelectedCourse(null);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Students</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.studentId}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => handleStudentDetails(student)}>Details</button>
                                    <button onClick={() => setEditStudent(student)}>Edit</button>
                                    <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-footer"></div> {/* Table footer for separation */}
            </div>
    
            {selectedStudent && (
                <StudentDetails student={selectedStudent} onClose={handleCloseStudentDetails} courses={courses} />
            )}
    
            {editStudent && (
                <div>
                    <h2>Edit Student</h2>
                    <form onSubmit={handleEditStudent} className="form-container">
                        <div>
                            <label>Name:</label>
                            <input name="name" defaultValue={editStudent.name} required />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input name="email" defaultValue={editStudent.email} required />
                        </div>
                        <div>
                            <label>Date of Birth:</label>
                            <input
                                name="dateOfBirth"
                                type="date"
                                defaultValue={editStudent.dateOfBirth ? new Date(editStudent.dateOfBirth).toISOString().split('T')[0] : ''}
                                required
                            />
                        </div>
                        <div>
                            <label>Enrollment Date:</label>
                            <input
                                name="enrollmentDate"
                                type="date"
                                defaultValue={editStudent.enrollmentDate ? new Date(editStudent.enrollmentDate).toISOString().split('T')[0] : ''}
                                required
                            />
                        </div>
                        <button type="submit">Update Student</button>
                        <button type="button" onClick={() => setEditStudent(null)}>Cancel</button>
                    </form>
                </div>
            )}

            
            <h2 style={{ textAlign: 'center' }}>Courses</h2>
                        <div className="table-container">
                            <table className="courses-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.courseId}>
                                            <td>{course.name}</td>
                                            <td>{course.description}</td>
                                            <td>
                                                <button onClick={() => handleCourseDetails(course)}>Details</button>
                                                <button onClick={() => setEditCourse(course)}>Edit</button>
                                                <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="table-footer"></div> {/* Table footer for separation */}
                        </div>
    
    
            <div className="add-student-container">
                <h2>Add Student</h2>
                <form onSubmit={handleAddStudent} className="form-container">
                    <div>
                        <label>Name:</label>
                        <input name="name" required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input name="email" required />
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <input name="dateOfBirth" type="date" required />
                    </div>
                    <div>
                        <label>Enrollment Date:</label>
                        <input name="enrollmentDate" type="date" required />
                    </div>
                    <button type="submit">Add Student</button>
                </form>
            </div>

            <div className="add-course-container">
                <h2>Add Course</h2>
                <form onSubmit={handleAddCourse} className="form-container">
                    <div>
                        <label>Name:</label>
                        <input name="name" required />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input name="description" required />
                    </div>
                    <div>
                        <label>Credits:</label>
                        <input name="credits" type="number" required />
                    </div>
                    <button type="submit">Add Course</button>
                </form>
            </div>
    
            {selectedCourse && (
                <CourseDetails course={selectedCourse} onClose={handleCloseCourseDetails} />
            )}
    
            {editCourse && (
                <div>
                    <h2>Edit Course</h2>
                    <form onSubmit={handleEditCourse} className="form-container">
                        <div>
                            <label>Name:</label>
                            <input name="name" defaultValue={editCourse.name} required />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input name="description" defaultValue={editCourse.description} required />
                        </div>
                        <div>
                            <label>Credits:</label>
                            <input name="credits" type="number" defaultValue={editCourse.credits} required />
                        </div>
                        <button type="submit">Update Course</button>
                        <button type="button" onClick={() => setEditCourse(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
