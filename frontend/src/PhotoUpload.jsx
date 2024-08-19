import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from "prop-types";

const PhotoUpload = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoByLink = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('/api/upload/upload-by-link', { link: photoLink });
      const { filePath } = response.data; // Extract the file path from the response

      toast.success("Photo uploaded successfully!"); // Show a success message
      if (typeof filePath === 'string') {
        onChange(prev => [...prev, filePath]); // Flat array of strings
      }// Update the state with the new photo link
      setPhotoLink(''); // Clear the input field for the photo link
    } catch (error) {
      toast.error("Failed to upload photo", error); // Show an error message
    }
  }

  const uploadPhoto = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const files = e.target.files; // Get the selected files
    const data = new FormData();
  
    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]); // 'photos' matches the form field name in the backend
    }
  
    try {
      const res = await axios.post('/api/upload/upload-by-file', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const { filePath } = res.data; // Adjusted to match the backend response
      onChange(prev => [...prev, filePath]); // Update state with the new photo path
  
    } catch (error) {
      console.error('Error uploading the file:', error.message);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={e => setPhotoLink(e.target.value)}
          placeholder="Add photo using a link"
        />
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 ? (
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {addedPhotos.map((link, index) => (
              <div key={index} className="relative">
                <img
                  src={`http://localhost:5001/uploads/${link}`}
                  alt={`Uploaded photo ${index}`}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No photos uploaded yet.</p>
        )}
        <label className="h-32 flex cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-3 text-gray-500">
          <input
            type="file"
            name="photos"
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}

// PropTypes validation
PhotoUpload.propTypes = {
  addedPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhotoUpload;
