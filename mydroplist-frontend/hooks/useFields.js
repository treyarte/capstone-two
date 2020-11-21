import {useState} from 'react';

const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (value, name) => {
        
        setFormData((fData) => ({
            ...fData,
            [name]: value
        }));
    };

    const resetFormData = () => {
        setFormData(initialState);
    };

    return [formData, handleChange, resetFormData]
}

export default useFields