import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import {  Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleSave = () => {
    alert('Profile updated!');
  };

  return (
    <div>
      <h2>Profile</h2>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default Profile;
