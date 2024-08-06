import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/students';

// Bütün öğrenci listesini çağırır
export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log('getStudents response:', response.data);

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Unexpected response format:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching students:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Id girilen öğrenci bilgilerini çağırır
export const getStudent = async (student) => {
    try{
        const response = await axios.post(`${API_URL}`, student);
        return response.data;  
    } catch (error){
        console.error('Error creating student:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Yeni bir öğrenci oluşturur
export const createStudent = async (student) => {
    const response = await axios.post(`${API_URL}`, student);
    return response.data;
};

// Id girilen öğrenci bilgilerini günceller
export const updateStudent = async (id, student) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, student);
        return response.data;
    } catch (error) {
        throw error; // Hata yönetimini burada ele alın
    }
};

// Id girilen öğrenciyi siler
export const deleteStudent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        console.log(`Student with id ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting student:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addCourseToStudent = async (studentId, courseId) => {
    try {
        // courseId'yi URL'nin bir parçası olarak gönderir
        const response = await axios.post(`${API_URL}/${studentId}/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding course to student:', error.response ? error.response.data : error.message);
        throw error;
    }
};