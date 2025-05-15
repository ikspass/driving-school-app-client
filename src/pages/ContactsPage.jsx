import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '..';

const ContactsPage = observer(() => {

  const {userStore} = useContext(Context)

  return (
    <div>{userStore.user.fullName}</div>
  )
})

export default ContactsPage;
