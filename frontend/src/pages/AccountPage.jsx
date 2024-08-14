import { useContext } from "react"
import { UserContext } from '../UserContext'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from'react-hot-toast'


const AccountPage = () => {
  // grab the user data from the UserContext
  const { user, ready, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { subpage } = useParams();

  const location = useLocation();

  if (!ready) {
    return <div>Loading...</div>
  }

  if (ready && !user) {
    return navigate('/login');
  }

  const isActive = (path) => location.pathname === path ? 'bg-primary text-white py-2 px-6 rounded-full' : 'py-2 px-6';

  const logout = () => {
    axios.post('/api/auth/logout')
    .then(() => {
      setUser(null);
      toast.success('Logged out successfully!');
        navigate('/');
    })
    .catch(() => {
      toast.error('Failed to log out');
      console.error('Error logging out');
    })
  }


  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link to={'/account'} className={`${isActive('/account')}`}>
          My Profile
        </Link>
        <Link to={'/account/bookings'} className={` ${isActive('/account/bookings')}`}>
          My Bookings
        </Link>
        <Link to={'/account/places'} className={` ${isActive('/account/places')}`}>
          My Accommodations
        </Link>
      </nav>

      <div>
        {!subpage || subpage === '' || subpage === 'profile' ? (
          <div className="text-center max-w-lg mx-auto ">
            Logged in as <span className="font-bold">{user.name}</span>  <br/>

            <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
          </div>
        ) : null}
        {subpage === 'bookings' && <div>My bookings</div>}
        {subpage === 'places' && <div>My accommodations</div>}
      </div>
    </div>
  )
}

export default AccountPage