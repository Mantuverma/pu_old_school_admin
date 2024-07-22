import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton, CImage } from '@coreui/react';
import axios from 'axios';

export default function AddNotice() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [shortDes, setShortDes] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('shortDes', shortDes);
      formData.append('image', image);

      console.log('Title:', title);
      console.log('Short Description:', shortDes);
      console.log('Image:', image);


      const response = await axios.post(
        'https://puoldschool-be.onrender.com/api/notice/creationnotice',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Notice Created Successfully:', response.data);
    } catch (error) {
      console.error('Error Creating Notice', error);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="sub-header" style={{ textAlign: 'center', width: '80vw' }}>
        Update Notices
      </h1>
      <CForm onSubmit={handleCreateNotice}>
        <div className="mb-3">
          <CFormLabel className="form-label">
            <h5>Title :</h5>
          </CFormLabel>
          <CFormInput
            className="form-control internalPadding"
            type="text"
            placeholder="Enter Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <CFormLabel className="form-label">
            <h5>Short Desc. :</h5>
          </CFormLabel>
          <CFormInput
            className="form-control"
            type="text"
            placeholder="Short Description"
            value={shortDes}
            onChange={(e) => setShortDes(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CFormLabel className="form-label">
            <h5>Upload Image</h5>
          </CFormLabel>
          <CFormInput type="file" accept="image/*" onChange={handleImageChange} />
          {image && (
            <div>
              <h3>Preview:</h3>
              <CImage src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
        <CButton className="btn btn-primary" type="submit">
          Submit
        </CButton>
      </CForm>
    </div>
  );
}
