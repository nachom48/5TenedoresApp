import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserGuestScreen from './UserGuestScreen/UserGuestScreen'
import UserLoggedScreen from './UserLoggedScreen/UserLoggedScreen'
import LoadingModal from '../../components/Shared/LoadingModal/LoadingModal'



const AccountScreen = () => {
  const [hasLogged, setHasLogged] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = getAuth();
    //every time that the logged in changed this function executes
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  }, [])

  if (hasLogged === null) {
    return <LoadingModal
              show text={'Loading'} 
            />
  }


  return (
    hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
  )
}

export default AccountScreen
