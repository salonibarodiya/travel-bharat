import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function StatePlaces() {
  const { stateId } = useParams(); // URL se dynamic stateId pakadne ke liye
  const [places, setPlaces] = useState([]);
  const [stateName, setStateName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // Filter state
  const [loading, setLoading] = useState(true);

  // PRD Requirement Categories
  const categories = ["All", "Heritage", "Nature", "Religious", "Modern"];

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        // LOCALHOST NIKAL DIYA - Ab relative path live serve hoga
        let url = `/api/users/places/${stateId}`;
        if (selectedCategory && selectedCategory !== "All") {
          url += `?category=${selectedCategory}`;
        }

        const response = await axios.get(url);
        if (response.data.success) {
          setPlaces(response.data.data);
          if (response.data.data.length > 0 && response.data.data[0].state) {
            setStateName(response.data.data[0].state.name);
          }
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [stateId, selectedCategory]); // Category badalne par auto API hit hogi

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Navigation & Header */}
        <div className="mb-8">
          <Link to="/" className="text-orange-600 font-semibold hover:underline text-sm inline-flex items-center gap-1 mb-2">
            ← Back to All States
          </Link>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Explore {stateName || "Destinations"}
          </h1>
          <p className="text-slate-500 mt-1">Discover incredible places to visit inside the state.</p>
        </div>

        {/* 🎛️ Category Filter Buttons Dashboard */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ⏳ Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
          </div>
        )}

        {/* 🏙️ Dynamic Places Listing Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100 p-6">
                <p className="text-slate-500 font-medium">Is category me abhi koi jagah nahi mila database mein.</p>
              </div>
            ) : (
              places.map((place) => (
                <div key={place._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col justify-between">
                  <div>
                    {/* Top Image & Badge */}
                    <div className="h-48 overflow-hidden relative">
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                        {place.category}
                      </span>
                    </div>
                    {/* Title & Description */}
                    <div className="p-5">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{place.name}</h3>
                      <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed">{place.description}</p>
                    </div>
                  </div>
                  
                  {/* Bottom Strip with Action Link */}
                  <div className="p-5 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">⏳ {place.bestTimeToVisit || "October to March"}</span>
                    <Link 
                      to={`/place/${place._id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default StatePlaces;