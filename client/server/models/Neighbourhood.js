// client/src/pages/Neighbourhood.js
import React, { useState } from 'react';
import axios from 'axios';

const Neighbourhood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { name, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/neighbourhood', formData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Neighbourhood</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Neighbourhood Name" required />
        <textarea name="description" value={description} onChange={onChange} placeholder="Description"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Neighbourhood;
