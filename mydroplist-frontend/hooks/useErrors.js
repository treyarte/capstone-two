import React, {useState} from 'react';

const useErrors = (initialState) => {
    const [errors, setErrors] = useState(initialState);

    const handleErrors = (errors) => {
        setErrors( e => [...errors]);
    }

    const resetErrors = (initialState) => {
        setErrors(initialState);
    }

    return [errors, handleErrors, resetErrors];
 }

export default useErrors;