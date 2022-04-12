import React, { useState } from 'react';
import './App.css';
import ImageUpload from './ui/imge-upload/ImageUpload';
import axios from 'axios';
 
const App = () => {
  const [files, setFiles] = useState<File[]>([]);
 
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
 
  const upload = () => {
    const uploadURL = 'https://api.cloudinary.com/v1_1/wromo-studio/image/upload/v1647147204/samples/';
    const uploadPreset = 'ml_140284_wromox';
 
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      axios({
        url: uploadURL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: formData
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    })
  }
 
  return (
    <div className="App">
      <ImageUpload files={files} onDrop={onDrop}/>
      <button onClick={() => upload()}>Upload</button>
    </div>
  );
}
 
export default App;

