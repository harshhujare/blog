
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title, titalimg, description, summary, createdby }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleView = () => {
    navigate(`/blog/${id}`);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <article className="group w-80 h-[420px] rounded-3xl overflow-hidden shadow-xl bg-white/10 border border-white/20 backdrop-blur-lg m-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/15 cursor-pointer" onClick={handleView}>
      {/* Image Container */}
      <div className="relative h-44 w-full overflow-hidden rounded-t-3xl flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Loading Skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div>
        )}
        
        {/* Image */}
        <img
          src={titalimg || './assets/image.png'}
          alt={title}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Fallback for image error */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-200 transition-colors duration-200">
          {title}
        </h2>
        
        {/* Summary */}
        <p className="text-blue-100 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
          {summary || 'No summary available'}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-blue-300">
              Posted by: <span className="font-semibold text-blue-200">{createdby || 'Anonymous'}</span>
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {formatDate(new Date())}
            </span>
          </div>
          
          {/* View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView();
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label={`View blog post: ${title}`}
          >
            View Blog
          </button>
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </article>
  );
};

export default Card;