import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost, likePost, commentPost } from '../api/posts';
import ImageGenerator from '../components/ImageGenerator';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    load();
  }, [page]);

  async function load() {
    const data = await fetchPosts(page);
    setPosts(prev => page === 1 ? data : [...prev, ...data]);
  }

  async function handleCreate() {
    if (!text) return;
    const p = await createPost({ text });
    setPosts(prev => [p, ...prev]);
    setText('');
  }

  async function toggleLike(id) {
    await likePost(id);
    load();
  }

  async function addComment(id, t) {
    if (!t) return;
    await commentPost(id, t);
    load();
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Post</h2>
        <textarea 
          value={text} 
          onChange={e => setText(e.target.value)} 
          rows={3} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="What's on your mind?"
        />
        <div className="mt-4">
          <button 
            onClick={handleCreate}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Image Generator</h2>
        <ImageGenerator />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Feed</h2>
        <div className="space-y-6">
          {posts.map(p => (
            <div key={p._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {p.author?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{p.author?.username || 'unknown'}</div>
                  <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{p.text}</p>
              {p.imageUrl && (
                <img 
                  src={p.imageUrl} 
                  alt="" 
                  className="max-w-full h-auto rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => toggleLike(p._id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Like ({p.likes?.length || 0})
                </button>
              </div>
              <CommentBox post={p} onAdd={addComment} />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button 
            onClick={() => setPage(prev => prev + 1)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentBox({ post, onAdd }) {
  const [t, setT] = useState('');
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex gap-2 mb-4">
        <input 
          value={t} 
          onChange={e => setT(e.target.value)} 
          placeholder="Write a comment..." 
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={() => { onAdd(post._id, t); setT(''); }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Comment
        </button>
      </div>
      <div className="space-y-2">
        {post.comments?.map(c => (
          <div key={c._id} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-gray-600 font-semibold">
                {c.author?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-700">{c.author?.username || 'user'}</div>
              <div className="text-gray-600">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
