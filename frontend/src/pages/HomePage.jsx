import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/user/home-place') // Make sure this endpoint is correct
      .then(response => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch places.');
        setLoading(false);
        console.error('Error fetching places:', error);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 ? (
        places.map(place => (
          <Link key={place._id} to={`/place/${place._id}`} className="block">
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square w-full h-full"
                  src={place.photos[0]}
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <div>No places available.</div>
      )}
    </div>
  );
}

export default HomePage;
