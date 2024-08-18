// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './PostManagement.css';

// const PostManagement = () => {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState(null);

//     // Function to fetch posts from the backend
//     const fetchPosts = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Retrieve the token from localStorage
//             const tokens = localStorage.getItem('authToken');
//             // axios.defaults.headers.common['Authorization'] = `Bearer ${tokens}`;
//             // Check if token exists
//             if (!token) {
//                 throw new Error('No token found, authorization failed');
//             }

//             const response = await axios.get('http://localhost:8000/api/posts/', {
//                 headers: {
//                     'Authorization': `Bearer ${tokens}`, // Include the token in the Authorization header
//                 },
//             });

//             setPosts(response.data); // Set the retrieved posts to the state
//         } catch (error) {
//             setError(error);
//             console.error('Error fetching posts:', error);
//         }
//     };

//     // useEffect to fetch posts when the component is mounted
//     useEffect(() => {
//         fetchPosts(); // Call the fetchPosts function
//     }, []);

//     if (error) {
//         return <div>Error fetching posts: {error.message}</div>;
//     }

//     return (
//       <div class="post-card">
//           <h1>Posts</h1>
//           <ul>
//               {posts.map((post) => (
//                   <li key={post.id}>
//                       <h2>{post.title}</h2>
//                       <p>{post.content}</p>
//                       {post.media && (
//                           <div>
//                               {post.media.endsWith('.mp4') ? (
//                                   <video controls src={`http://localhost:8000${post.media}`} />
//                               ) : (
//                                 // <img src={`${post.media}`} alt={post.title} />
//                                 // <img src={`http://localhost:8000/media/${post.media}`} alt={post.title} />
//                                 <img src={post.media} alt={post.title} />


//                                   // <img src={`media${post.media}`} alt={post.title} />
//                               )}

//                           </div>
//                       )}
//                   </li>
//               ))}
//           </ul>
//       </div>
//     );
// };

// export default PostManagement;
/////////////////////////




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PostManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch posts from the backend
    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No token found, authorization failed');
            }

            const response = await axios.get('http://localhost:8000/api/posts/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setPosts(response.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching posts:', error);
        }
    };

    // Function to handle liking a post
    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found, authorization failed');
            }

            await axios.post(`http://localhost:8000/api/likes/create/`, 
                { post: postId }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            fetchPosts(); // Refresh posts to update the like count
        } catch (error) {
            setError(error);
            console.error('Error liking the post:', error);
        }
    };

    // useEffect to fetch posts when the component is mounted
    useEffect(() => {
        fetchPosts();
    }, []);

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    return (
      <div className="post-card">
          <h1>Posts</h1>
          <ul>
              {posts.map((post) => (
                  <li key={post.id}>
                      <h2>{post.title}</h2>
                      <p>{post.content}</p>
                      {post.media && (
                          <div>
                              {post.media.endsWith('.mp4') ? (
                                  <video controls src={`http://localhost:8000${post.media}`} />
                              ) : (
                                  <img src={post.media} alt={post.title} />
                              )}
                          </div>
                      )}
                      <div className="like-section">
                          <FontAwesomeIcon 
                              icon={post.likes && post.likes.some(like => like.user === localStorage.getItem('userId')) ? solidHeart : regularHeart} 
                              onClick={() => handleLike(post.id)} 
                              style={{ cursor: 'pointer', color: post.likes && post.likes.some(like => like.user === localStorage.getItem('userId')) ? 'red' : 'black' }}
                          />
                          <span>
                              {Array.isArray(post.likes) ? post.likes.length : 0} {Array.isArray(post.likes) && post.likes.length === 1 ? 'Like' : 'Likes'}
                          </span>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
    );
};

export default PostManagement;

