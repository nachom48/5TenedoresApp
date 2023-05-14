import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from '@rneui/base'
import InfoUser from '../../../components/Account/InfoUser/InfoUser'
import { styles } from './UserLoggedScreen.styles'
import { getAuth, signOut } from 'firebase/auth'
import LoadingModal from '../../../components/Shared/LoadingModal/LoadingModal'
import AccountOptions from '../../../components/Account/InfoUser/AccountOptions/AccountOptions'


const UserLoggedScreen = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>('')
  const [_, setReload] = useState<boolean>(false)

  const onReload = () => setReload((prevState) => !prevState)

  const closeSession = async () => {
    const auth = getAuth();
    await signOut(auth)
  }

  return (
    <View style={styles.content}>
      <InfoUser
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
      <AccountOptions onReload={onReload} />
      <Button
        title='Close session'
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={closeSession}
      />
      <LoadingModal
        show={loading}
        text={loadingText}
      />

    </View>
  )
}

export default UserLoggedScreen
