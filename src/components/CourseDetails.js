import React from 'react';

const CourseDetails = ({ course, onClose }) => {
    if (!course) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{course.name} Details</h2>
                <p>Description: {course.description}</p>
                <p>Credits: {course.credits}</p>
            </div>
        </div>
    );
};

export default CourseDetails;
