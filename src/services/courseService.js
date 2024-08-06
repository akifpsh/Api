import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/courses';

//Bütün dersleri çağırır
export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Id girilen dersi çağırır
export const getCourse = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCourse = async (course) => {
  try {
    // `course` verisini `StudentCourses` ile birlikte gönderin
    const courseData = { ...course, StudentCourses: [] };
    const response = await axios.post(`${API_URL}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//Id girilen ders bilgilerini günceller
export const updateCourse = async (id, course) => {
  const response = await axios.put(`${API_URL}/${id}`, course);
  return response.data;
};

//Id girilen dersi siler
export const deleteCourse = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addCourseToStudent = async (studentId, courseId) => {
  await axios.post(`${API_URL}/${studentId}/courses/${courseId}`);
};
