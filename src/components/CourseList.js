import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse } from '../services/courseService';
const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
      try {
          const data = await getCourses();
          console.log('Fetched courses:', data);
          setCourses(data);
      } catch (error) {
          console.error('There was an error fetching the Courses!', error);
      }
  };
  
    const handleDelete = async (id) => {
        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.error('There was an error deleting the Course!', error);
        }
    };

    return (
        <div>
            <h2>Courses</h2> 
            <ul>
                {courses.map((course) => (
                    <li key={course.courseId}>
                        {course.name} - {course.description}
                        <button onClick={() => handleDelete(course.courseId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
