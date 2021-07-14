import React, { useState } from "react";

import { BiImageAdd } from 'react-icons/bi';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

const SaveImgLocal = () => {
    const [img, setImg] = useState();
    const [enteredTitle, setEnteredTitle] = useState();

    const imageUpload = (e) => {
        const file = e.target.files[0];
        if (file.length === 0) {
            alert('Please Upload a File!')
        }
        getBase64(file).then(base64 => {
            localStorage["image"] = base64;
            console.debug("file stored", base64);
            console.log(file);
        });
    };


    return (
        <>
            <div className='flex justify-center border border-black rounded-md mt-4 w-full h-48 items-center'>
                <div className='flex'>
                    <BiImageAdd className='w-10 h-10' />
                </div>
                <input
                    type="file"
                    id="imageFile"
                    name='imageFile'
                    onChange={imageUpload}
                />;
            </div>
        </>
    );
}

export default SaveImgLocal;