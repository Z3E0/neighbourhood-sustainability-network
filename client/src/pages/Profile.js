// client/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    neighbourhood: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/user/profile/${id}`);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [id]);

  const { username, email, neighbourhood, bio } = profile;

  const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/profile/${id}`, profile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={username} readOnly />
        <input type="email" name="email" value={email} readOnly />
        <input type="text" name="neighbourhood" value={neighbourhood} onChange={onChange} placeholder="Neighbourhood" />
        <textarea name="bio" value={bio} onChange={onChange} placeholder="Bio"></textarea>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
