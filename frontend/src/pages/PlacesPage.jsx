import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Perks from "../Perks";
import axios from 'axios';
import { toast } from 'react-hot-toast'

const PlacesPage = () => {
  const { action } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAdress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);


  const addPhotoByLink = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('/api/upload/upload-by-link', { link: photoLink });
      const { filePath } = response.data; // Extract the file path from the response

      toast.success("Photo uploaded successfully!"); // Show a success message
      setAddedPhotos(prev => [...prev, filePath]); // Update the state with the new photo link
      setPhotoLink(''); // Clear the input field for the photo link
    } catch (error) {
      toast.error("Failed to upload photo", error); // Show an error message
    }
  }





  return (
    <>
      <div>
        {action !== 'new' && (
          <div className=" text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Add new place
            </Link>
          </div>
        )}

        {action === 'new' && (
          <form >
            {/* title */}
            <h2 className="text-xl mt-4 ">Title</h2>
            <p className="text-gray-500 text-sm">Give your place a catchy title that stands out, just like in an advertisement.</p>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="title, for example: My Lovely apartment"
            />

            {/* address */}
            <h2 className="text-xl mt-4 ">Address</h2>
            <p className="text-gray-500 text-sm">Provide the full address for this place.</p>
            <input
              type="text"
              value={address}
              onChange={e => setAdress(e.target.value)}
              placeholder="address"
            />

            {/* photos */}
            <h2 className="text-xl mt-4 ">Photos</h2>
            <p className="text-gray-500 text-sm">The more photos you add, the better! Show off your place from every angle.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={e => setPhotoLink(e.target.value)}
                placeholder="Add photo using a link"
              />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
            </div>
            <div className=" mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
              <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                Upload
              </button>
            </div>


            {/* description */}
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">description of the place</p>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            {/* perks */}
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">select the perks of your  place</p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {/* extra Info */}
            <h2 className="text-2xl mt-4">Extra Info</h2>
            <p className="text-gray-500 text-sm">Add any additional information, such as house rules, check-in instructions, or anything else guests should know.</p>
            <textarea
              placeholder="e.g., No smoking, quiet hours after 10 PM, check-in after 3 PM, etc."
              value={extraInfo}
              onChange={e => setExtraInfo(e.target.value)}
            />

            {/* checkIn and checkOut */}
            <h2 className="text-2xl mt-4">Check-In & Check-Out Times</h2>
            <p className="text-gray-500 text-sm">
              Specify the check-in and check-out times for your guests. Remember to allow some time for cleaning between bookings.
            </p>

            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2 -mb-1">
                <label className="block">Check-In Time</label>
                <input type="text" placeholder="14:00" name="checkIn" className="w-full border p-2 rounded"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                />
              </div>
              <div className="mt-2 -mb-1">
                <label className="block">Check-Out Time</label>
                <input type="text" placeholder="11:00" name="checkOut" className="w-full border p-2 rounded"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                />
              </div>
              <div className="mt-2 -mb-1">
                <label className="block">Max Guests</label>
                <input type="number" placeholder="2" name="maxGuests" className="w-full border p-2 rounded"
                  value={maxGuests}
                  onChange={e => setMaxGuests(e.target.value)}
                />
              </div>
            </div>

            <button className="primary my-4">Save</button>

          </form>
        )}
      </div>
    </>
  )
}

export default PlacesPage