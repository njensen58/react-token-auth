import React from 'react';

const Profile = props => {
    const { username } = props.user
    return (
        <div>
            <h3>Welcome {username[0].toUpperCase() + username.slice(1)}!</h3>
        </div>
    );
};

export default Profile;