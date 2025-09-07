import React from 'react';

export default function PostCard({ post, onLike, onComment }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-semibold">
            {post.author?.username?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <div className="font-semibold text-gray-800">{post.author?.username || 'user'}</div>
          <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.text}</p>
      {post.imageUrl && (
        <img 
          src={post.imageUrl} 
          alt="" 
          className="max-w-full h-auto rounded-lg mb-4"
        />
      )}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => onLike(post._id)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Like ({post.likes?.length || 0})
        </button>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2">
          {post.comments?.map(c => (
            <div key={c._id} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-600 font-semibold">
                  {c.author?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-700">{c.author?.username}</div>
                <div className="text-gray-600">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
