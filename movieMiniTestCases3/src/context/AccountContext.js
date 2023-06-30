import React from 'react'

const AccountContext = React.createContext({
  userName: '',
  password: '',
  setUserName: () => {},
  setPassword: () => {},
})

export default AccountContext
