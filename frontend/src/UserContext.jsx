import {createContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

  const [user, setUser] = useState(null);

  useEffect(() => {
      axios.get('/api/user/profile').then((res)=> {
        setUser(res.data);
      })
  },[user]);
  
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}


// PropTypes validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};