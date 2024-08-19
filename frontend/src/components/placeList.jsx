import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PlacesList = ({ places }) => {
  
  return (
    <div className="space-y-4">
      {places.length > 0 ? (
        places.map(place => (
          <div key={place._id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/account/places/${place._id}`} className="block">
              {/* Title and Address */}
              <h3 className="text-xl font-bold text-blue-600 hover:underline">{place.title}</h3>
              <p className="text-gray-500 text-sm">{place.address}</p>
              
              {/* Description */}
              <p className="mt-2 text-gray-700">{place.description}</p>

              {/* Photos */}
              {place.photos.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {place.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5001/uploads/${photo}`}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {/* Extra Info */}
              {place.extraInfo && (
                <p className="mt-2 text-gray-600 italic">Extra Info: {place.extraInfo}</p>
              )}

              {/* Check-In & Check-Out Times */}
              <p className="mt-2 text-gray-600">Check-In: {place.checkIn}</p>
              <p className="text-gray-600">Check-Out: {place.checkOut}</p>

              {/* Max Guests */}
              <p className="mt-2 text-gray-600">Max Guests: {place.maxGuests}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>No places found.</p>
      )}
    </div>
  );
}

// PropTypes validation
PlacesList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
      extraInfo: PropTypes.string,
      checkIn: PropTypes.number.isRequired,
      checkOut: PropTypes.number.isRequired,
      maxGuests: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default PlacesList;
