import axios from 'axios';

export const sendFileRequest = (url, file, bodyParams) => {
    const formData = new FormData();
    formData.append('file', file);

    if (bodyParams) {
        formData.append('tagName', bodyParams.tagName);
        formData.append('tagValue', bodyParams.tagValue);
    }

    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}