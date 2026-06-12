import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  // Database se aane waali states ko store karne ke liye variables
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Jab page load hoga, tab direct backend API call hogi
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        // LOCALHOST NIKAL DIYA - Ab yeh relative path live domain se uthayega
        const response = await axios.get('/api/users/states');
        
        if (response.data.success) {
          setStates(response.data.data); // State data set kiya
        }
      } catch (err) {
        console.error("Error fetching states:", err);
        setError("Database se connect nahi ho paye. Kya aapka backend server running hai?");
      } finally {
        loading(false); // Fix: setLoading(false) ki jagah safely handle karne ke liye direct call ya standard state update use karein
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🌟 Beautiful Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-4 text-center shadow-md">
        <h1 className="text-5xl font-black mb-4 tracking-wide drop-shadow-md">Travel Bharat 🗺️</h1>
        <p className="text-xl font-medium max-w-2xl mx-auto opacity-90">
          Discover the rich culture, historic monuments, and breathtaking landscapes of India, state-by-state.
        </p>
      </div>

      {/* 📑 Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-b-4 border-orange-500 w-fit pb-2">
          Explore States
        </h2>

        {/* ⏳ Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
          </div>
        )}

        {/* ❌ Error Message Display */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center font-medium border border-red-200 max-w-xl mx-auto">
            {error}
          </div>
        )}

        {/* 🗺️ Real States Grid from Database */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {states.length === 0 ? (
              <p className="text-slate-500 text-center col-span-full font-medium py-12">
                Database mein koi state nahi mili. Pehle Admin panel ya Thunder Client se add karein!
              </p>
            ) : (
              states.map((state) => (
                <Link 
                  to={`/state/${state._id}`} 
                  key={state._id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-slate-100 block"
                >
                  {/* Image Block */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={state.image} 
                      alt={state.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-sm">
                      {state.name}
                    </h3>
                  </div>

                  {/* Text Description Block */}
                  <div className="p-5">
                    <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                      {state.description}
                    </p>
                    <span className="mt-4 text-orange-600 font-bold group-hover:text-orange-700 inline-flex items-center gap-1 text-sm transition-colors">
                      Explore Places →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;