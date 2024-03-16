import React from 'react'
import { useAuth } from './Auth'

const Mobile = () => {
  const {user}=useAuth();
  console.log(user);
  return (
    <div>Mobile,klohhu</div>
  )
}

export default Mobile;