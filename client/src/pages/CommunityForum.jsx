import React, { useEffect, useState } from 'react';
import { getPosts, addPost, likePost } from '../services/communityService';
import { MessageSquare, ThumbsUp, User } from 'lucide-react';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ author: '', content: '', type: 'General' });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.author || !newPost.content) return;
        try {
            await addPost(newPost);
            setNewPost({ author: '', content: '', type: 'General' });
            loadPosts();
        } catch (error) {
            console.error('Failed to add post');
        }
    };

    const handleLike = async (id) => {
        try {
            await likePost(id);
            loadPosts(); // Refresh to show updated likes
        } catch (error) {
            console.error('Failed to like post');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Community Knowledge Exchange</h1>
                <p style={{ color: 'var(--text-light)' }}>Share experiences, ask questions, and learn from fellow farmers.</p>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* New Post Form */}
                <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#F1F8E9' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Share Something</h3>
                    <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newPost.author}
                                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                                required
                            />
                            <select
                                value={newPost.type}
                                onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                            >
                                <option value="General">General</option>
                                <option value="Question">Question</option>
                                <option value="Success Story">Success Story</option>
                                <option value="Tip">Tip</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="What's on your mind?"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', minHeight: '100px' }}
                            required
                        />
                        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Post</button>
                    </form>
                </div>

                {/* Posts Feed */}
                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading discussions...</p>
                ) : (
                    posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className="card" style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={20} color="#757575" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>{post.author}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                            {new Date(post.createdAt).toLocaleDateString()} •
                                            <span style={{ color: 'var(--primary)', marginLeft: '0.5rem', fontWeight: '500' }}>{post.type}</span>
                                        </span>
                                    </div>
                                </div>
                                <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{post.content}</p>

                                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <button onClick={() => handleLike(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-light)' }}>
                                        <ThumbsUp size={18} /> {post.likes} Likes
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-light)' }}>
                                        <MessageSquare size={18} /> {post.comments.length} Comments
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>No posts yet. Be the first to share!</p>
                    )
                )}
            </div>
        </div>
    );
};

export default CommunityForum;
