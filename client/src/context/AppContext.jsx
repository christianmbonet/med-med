import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState('');
  const [medicines, setMedicines] = useState([]);
  //   const [currentFilter, setCurrentFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get(`/api/users/me`, {
          withCredentials: true
        })
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          swal(`Oops!`, error.toString());
        });
    }
  }, [currentUser, user]);
  console.log(currentUser);
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        // loading,
        // setLoading,
        search,
        setSearch,
        medicines,
        setMedicines
        // currentFilter,
        // setCurrentFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
