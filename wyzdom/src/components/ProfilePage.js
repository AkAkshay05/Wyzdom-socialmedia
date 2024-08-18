import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
    const { userId } = useParams();  // Get userId from URL parameters
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, authorization failed');
                }

                const response = await axios.get(`http://localhost:8000/api/profile/${userId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setProfile(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!profile.user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={profile.user.profile_image_url} alt={profile.user.username} className="profile-pic" />
                <div className="profile-info">
                    <h2>{profile.user.username}</h2>
                    <div className="profile-stats">
                        <span>{profile.posts.length} posts</span>
                        <span>{profile.followers_count} followers</span>
                        <span>{profile.following_count} following</span>
                    </div>
                    <p>{profile.user.bio}</p>
                </div>
            </div>
            <div className="profile-posts">
                {profile.posts.map((post) => (
                    <div key={post.id} className="post">
                        <img src={post.image_url} alt={post.title} className="post-image" />
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                {post.media && (
                                    <div class="posts">
                                        {post.media.endsWith('.mp4') ? (
                                            <video controls src={`http://localhost:8000${post.media}`} />
                                        ) : (
                                            // <img src={post.media} alt={post.title} />
                                            <img src={`http://localhost:8000${post.media}`} alt={post.title} />
                                        )}
                                    </div>
                                )}
                        <div className="post-details">
                            <span>{post.likes_count} likes</span>
                            <span>{post.comments_count} comments</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
