import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './card'

const Hero = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("http://localhost:8000/blog/getblog");
      setBlogs(res.data.blogs);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f2027] relative overflow-hidden flex flex-col">
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" style={{ filter: "blur(120px)", left: "-10%", top: "-10%" }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10" style={{ filter: "blur(120px)", right: "-10%", bottom: "-10%" }}></div>
      {/* Hero Header */}
      <header className="w-full max-w-5xl mx-auto pt-16 pb-8 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fade-in">Welcome to Blogiflex</h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-6 animate-fade-in-slow">Discover, read, and share amazing stories from our community.</p>
        <div className="flex justify-center gap-4 animate-fade-in-slow">
          <a href="/Add" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200">Write a Blog</a>
        </div>
      </header>
      {/* Blog Cards Grid */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center animate-fade-in-slow">
          {blogs.length === 0 ? (
            <div className="col-span-full text-white text-xl mt-12">No blogs found.</div>
          ) : (
            blogs.map((blog, idx) => (
              <div key={blog._id} style={{ animationDelay: `${idx * 80}ms` }} className="animate-fade-in-up">
                <Card id={blog._id} title={blog.title} titalimg={`http://localhost:8000/${blog.titalimg}`} createdby={blog.createdby} summary={blog.summary} />
              </div>
            ))
          )}
        </div>
      </main>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-slow { animation: fadeIn 1.5s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}

export default Hero