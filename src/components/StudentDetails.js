import React, { useState } from "react";
import { addCourseToStudent } from "../services/studentService";

const StudentDetails = ({ student, onClose, courses }) => {
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const handleAddCourse = async () => {
        if (selectedCourseId) {
            try {
                await addCourseToStudent(student.studentId, selectedCourseId);
                alert("Course added successfully!");
            } catch (error) {
                console.error("Error adding course:", error);
                alert("Failed to add course.");
            }
        } else {
            alert("Please select a course.");
        }
    };

    if (!student) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{student.name}'s Details</h2>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Enrollment Date:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</p>
                <h3>Courses:</h3>
                <ul>
                    {student.studentCourses && student.studentCourses.length > 0 ? (
                        student.studentCourses.map(sc => (
                            sc.courseName ? <li key={sc.courseId}>{sc.courseName}</li> : <li key={sc.courseId}>Course information not available</li>
                        ))
                    ) : (
                        <li>No courses available</li>
                    )}
                </ul>
                <h3>Add Course</h3>
                <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                    <option value="">Select a course</option>
                    {courses.map(course => (
                        <option key={course.courseId} value={course.courseId}>{course.name}</option>
                    ))}
                </select>
                <button onClick={handleAddCourse}>Add Course</button>
            </div>
        </div>
    );
    
    
};

export default StudentDetails;
