import {createContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

  const [user, setUser] = useState(null);

  const [ready , setReady] = useState(false);

  useEffect(() => {
      axios.get('/api/user/profile').then((res)=> {
        setUser(res.data);
        setReady(true);
      })
  },[]);
  
  return (
    <UserContext.Provider value={{user,setUser, ready}}>
      {children}
    </UserContext.Provider>
  )
}


// PropTypes validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};