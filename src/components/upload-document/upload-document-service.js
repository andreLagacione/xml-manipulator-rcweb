import axios from 'axios';

export const sendFileRequest = (url, file) => {
    const formData = new FormData();

    formData.append('file', file)

    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}