import React, { useEffect, useState } from 'react';

const UserProfile = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.FB.api('/me', { fields: 'name,picture' }, function(response) {
      setProfile(response);
    });
  }, [accessToken]);

  return (
    <div>
      {profile && (
        <>
          <img src={profile.picture.data.url} alt={profile.name} />
          <h2>{profile.name}</h2>
        </>
      )}
    </div>
  );
};

export default UserProfile;
