import { useState } from 'react'
import client from '../api/client'

const useFileUpload = (token: string | null) => {
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<any>();
    const [error, setError] = useState(false);
    
    client.setHeader('Authorization', `Bearer ${token}`);
       const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    
    const request = async (e: any) => {
            const file = e.target.files[0];
	const formData = new FormData();
	formData.append('image', file);
		setUploading(true);
		const response = await client.post('https://eshopadminapp.herokuapp.com/api/upload', formData, config);
        setUploading(false);

		if (!response?.ok) {
			console.log(response)
			return setError(true);
		}

		setError(false);
		setImage(response.data);
	};

    return { image, uploading, error, request };
}

    
export default useFileUpload;