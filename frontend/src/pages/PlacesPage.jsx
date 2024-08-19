import { Link, useParams } from "react-router-dom"
import {  useEffect, useState } from "react";
import Perks from "../Perks";
import PhotoUpload from "../PhotoUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PlacesList from "../components/placeList";


const PlacesPage = () => {
  const { action } = useParams();

 
  const [title, setTitle] = useState('');
  const [address, setAdress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  const [places, setPlaces] = useState([]);

  const navigate = useNavigate();

  const addNewPlace = async (e) => {
    e.preventDefault();

    try {
      // Ensure `addedPhotos` is a flat array of strings
      const formattedPhotos = addedPhotos.flat(); // Flattening if it's nested

      await axios.post('/api/user/places', {
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn: parseInt(checkIn, 10), // Converts "14:00" to 14
        checkOut: parseInt(checkOut, 10), // Converts "16:00" to 16
        maxGuests,
        photos: formattedPhotos
      });

      toast.success("Place added successfully!"); // Use toast for a better user experience
      navigate('/account/places'); // Navigate to the places page after successful addition
    } catch (error) {
      console.error("Failed to add new place:", error.message);
      toast.error("Failed to add new place."); // Use toast for error notification
    }
  }

  useEffect(() => {
    axios.get('/api/user/get-place')
      .then((res) => {
       setPlaces(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch place:", err.message);
        toast.error("Failed to fetch place."); // Use toast for error notification
      });
  }, []);
 

  if (!places) {
    return <div>Loading...</div>;
  }




  return (
    <>
      <div>
        {action !== 'new' && (
          <>
            <div className=" text-center">
              <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                Add new place
              </Link>
            </div>

            <div className="mt-5">
              <PlacesList places={places}/>
            </div>
          </>


        )}

        {action === 'new' && (
          <form onSubmit={addNewPlace}>
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
            <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos} />


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