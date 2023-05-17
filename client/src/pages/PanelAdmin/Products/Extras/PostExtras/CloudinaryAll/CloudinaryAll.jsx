import React, { useState } from 'react';
import styles from './CloudinaryAll.module.css';
import axios from 'axios';


export default function CloudinaryAll() {
    const [imagesSelected, setImagesSelected] = useState([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleFileChange = (event) => {
        setImagesSelected(Array.from(event.target.files));
    };

    const uploadImages = () => {
        if (imagesSelected.length) {
            const formDataArray = [];
            imagesSelected.forEach((image) => {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'images');
                formDataArray.push(formData);
            });
    
            Promise.all(
                formDataArray.map((formData) =>
                    axios.post('https://api.cloudinary.com/v1_1/dmkklptzi/image/upload', formData)
                )
            ).then((responses) => {
                const imageUrls = responses.map((response) => response.data.secure_url);
                setImagesSelected([]);
                setIsImageUploaded(true);
                setTimeout(() => {
                    setIsImageUploaded(false);
                }, 5000);
            });
            setImagesSelected([]);
        }
    };
    
    
    return (
        <div className={`${styles.cloudinary} centerColumn`}>
            <h1>CLOUDINARY</h1>
            <input className={`${styles.cloudinaryInput} `} type="file" onChange={handleFileChange} multiple />
            {imagesSelected.length > 0 ? (
                <div className={`${styles.imagePreviewContainer} center`}>
                    {imagesSelected.map((image, index) => (
                        <div key={index} className={`${styles.imagePreview}`}>
                            <img className={`${styles.imagenes} `} src={URL.createObjectURL(image)} alt={`Preview of ${image.name}`} />
                            <p>{image.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Selecciona una imagen</p>
            )}
            <button className={`${styles.cloudinaryButton} `} onClick={uploadImages}>Subir</button>
            {isImageUploaded && (<p className={`${styles.imageUploadedMessage}`}>Imagen enviada</p>)}
            <p>Recuerda que las imágenes una vez redimencianadas, deben de tener 340px de ancho por 200px de alto.</p>
        </div>
    );
}