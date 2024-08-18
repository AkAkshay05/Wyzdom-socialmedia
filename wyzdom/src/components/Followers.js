import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Followers.css';
import { jwtDecode } from 'jwt-decode';

const Followers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, authorization failed');
                }

                // const userId = getUserIdFromToken(token);

                // Fetch all users
                const usersResponse = await axios.get('http://localhost:8000/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Fetch followed users
                const followedResponse = await axios.get(`http://localhost:8000/api/users/not-followed/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Extract followed user IDs
                const followedUserIds = followedResponse.data.map(f => f.followed);

                // Filter out followed users from the users list
                const filteredUsers = usersResponse.data.filter(user => !followedUserIds.includes(user.id));

                setUsers(filteredUsers);
            } catch (error) {
                setError(error);
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const getUserIdFromToken = (token) => {
        try {
            // Decode the token to get the payload
            const decodedToken = jwtDecode(token);
    
            // Assuming the user ID is stored in the `user_id` field of the token
            return decodedToken.user_id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleFollow = async (followedUserId) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No token found, authorization failed');
            }
    
            const followerUserId = getUserIdFromToken(token);
    
            if (!followerUserId) {
                throw new Error('Failed to extract user ID from token');
            }
    
            const response = await axios.post(
                'http://localhost:8000/api/followers/create/', 
                {
                    followed: followedUserId,
                    follower: followerUserId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log('Follow successful:', response.data);

            // Remove the followed user from the users list
            setUsers(users.filter(user => user.id !== followedUserId));
        } catch (error) {
            console.error('Error following user:', error);
            setError(error.response ? error.response.data : 'Unknown error');
        }
    };
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="followers-container">
            <h2>Suggested for you</h2>
            <ul className="followers-list">
                {users.map((user) => (
                    <li key={user.id}>
                        <img src={user.profile_image_url} alt={user.username} />
                        <div className="user-info">
                            <span>{user.username}</span>
                            <span>{user.display_name}</span>
                            <span>Suggested for you</span>
                        </div>
                        <button
                            onClick={() => handleFollow(user.id)}
                            className="follow-button"
                        >
                            Follow
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;
