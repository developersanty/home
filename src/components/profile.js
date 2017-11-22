import React, { Component } from 'react'
import ImageUpload from './libraries/image_upload.js'
import Avatar from 'react-avatar';


function Profile(props) {
  // return <Avatar googleId="108656455106818502984" round={false}/>
  return <Avatar name="Santhosh Jebamani" round={true}/>
}

export default Profile;