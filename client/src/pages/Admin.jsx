import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  // State Form Inputs
  const [stateName, setStateName] = useState('');
  const [stateImg, setStateImg] = useState('');
  const [stateDesc, setStateDesc] = useState('');

  // Place Form Inputs
  const [placeName, setPlaceName] = useState('');
  const [city, setCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [placeImg, setPlaceImg] = useState('');
  const [placeDesc, setPlaceDesc] = useState('');
  const [category, setCategory] = useState('Heritage');
  const [bestTime, setBestTime] = useState('');
  const [timings, setTimings] = useState('');
  const [fees, setFees] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [attractions, setAttractions] = useState('');

  // Data Lists for Management
  const [statesList, setStatesList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  // 🔄 1. Fetch States (LOCAL CONFIG HATAYA)
  const fetchStates = async () => {
    try {
      const response = await axios.get('/api/users/states');
      if (response.data.success) setStatesList(response.data.data);
    } catch (err) {
      console.error("Error loading states:", err);
    }
  };

  // 🔄 2. Fetch All Places Safely (LOCAL CONFIG HATAYA)
  const fetchAllPlaces = async () => {
    try {
      const response = await axios.get('/api/users/states');
      if (response.data.success) {
        let allPlaces = [];
        for (let st of response.data.data) {
          try {
            const resPlaces = await axios.get(`/api/users/places/${st._id}`);
            if (resPlaces.data.success && Array.isArray(resPlaces.data.data)) {
              allPlaces = [...allPlaces, ...resPlaces.data.data];
            }
          } catch (placeErr) {
            console.error(`Error fetching places for state ${st.name}:`, placeErr);
          }
        }
        setPlacesList(allPlaces);
      }
    } catch (err) {
      console.error("Error loading places list:", err);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchAllPlaces();
  }, []);

  // 🛠️ Handler: Add State (LOCAL CONFIG HATAYA)
  const handleStateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/add-state', {
        name: stateName, 
        image: stateImg, 
        description: stateDesc
      });
      if (response.data.success) {
        setMessage({ text: `🎉 State "${stateName}" add ho gayi!`, type: 'success' });
        setStateName(''); setStateImg(''); setStateDesc('');
        fetchStates();
      }
    } catch (err) {
      setMessage({ text: '❌ State add nahi ho payi.', type: 'error' });
    }
  };

  // 🛠️ Handler: Add Place (LOCAL CONFIG HATAYA)
  const handlePlaceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedState) return alert("Please state select karein!");

    const attractionsArray = attractions 
      ? attractions.split(',').map(item => item.trim()).filter(item => item !== "") 
      : [];

    const payload = {
      name: placeName,
      city: city,
      state: selectedState,
      image: placeImg,
      description: placeDesc,
      category: category,
      bestTimeToVisit: bestTime || "October to March",
      timings: timings || "Open 24/7",
      entryFees: fees || "Free Entry",
      mapLink: mapLink || "",
      nearbyAttractions: attractionsArray
    };

    try {
      const response = await axios.post('/api/admin/add-place', payload);
      if (response.data.success) {
        setMessage({ text: `🎉 Place "${placeName}" add ho gaya!`, type: 'success' });
        setPlaceName(''); setCity(''); setPlaceImg(''); setPlaceDesc('');
        setBestTime(''); setTimings(''); setFees(''); setMapLink(''); setAttractions('');
        fetchAllPlaces();
      }
    } catch (err) {
      console.error("Error response data:", err.response?.data);
      setMessage({ 
        text: `❌ Place add nahi ho payi: ${err.response?.data?.message || 'Server Error'}`, 
        type: 'error' 
      });
    }
  };

  // 🗑️ CRITICAL DELETE FUNCTIONALITIES (LOCAL CONFIG HATAYA)
  const deleteState = async (id, name) => {
    if (window.confirm(`⚠️ Kya aap sach mein State "${name}" ko delete karna chahte hain? Isse andar ke saare places bhi hat sakte hain!`)) {
      try {
        const response = await axios.delete(`/api/admin/state/${id}`);
        if (response.data.success) {
          setMessage({ text: `🗑️ State "${name}" database se permanent delete ho gayi!`, type: 'success' });
          fetchStates();
          fetchAllPlaces();
        }
      } catch (err) {
        setMessage({ text: '❌ Delete API hit nahi ho payi. Route check karein.', type: 'error' });
      }
    }
  };

  const deletePlace = async (id, name) => {
    if (window.confirm(`⚠️ Kya aap "${name}" tourist destination ko hatana chahte hain?`)) {
      try {
        const response = await axios.delete(`/api/admin/place/${id}`);
        if (response.data.success) {
          setMessage({ text: `🗑️ Place "${name}" successfully remove ho gaya!`, type: 'success' });
          fetchAllPlaces();
        }
      } catch (err) {
        setMessage({ text: '❌ Place delete karne mein dikkat aayi.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 space-y-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Admin Dashboard 🛠️</h1>
            <p className="text-slate-500 text-sm">Add aur Delete operations ek hi jagah se handle karein</p>
          </div>
          <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all shadow-md">
            🏠 Go To Live Site
          </Link>
        </div>

        {/* Global Banner Messages */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl font-bold text-center border transition-all ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* --- FORMS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Add State */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-extrabold text-slate-800 mb-4 border-b pb-2 text-orange-600">➕ Add New State</h2>
            <form onSubmit={handleStateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">State Name</label>
                <input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-orange-500" placeholder="e.g. Goa" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Image URL</label>
                <input type="url" value={stateImg} onChange={(e) => setStateImg(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-orange-500" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Description</label>
                <textarea value={stateDesc} onChange={(e) => setStateDesc(e.target.value)} required rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-orange-500" placeholder="State info..."></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-sm transition-colors">Save State</button>
            </form>
          </div>

          {/* Add Place */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-extrabold text-slate-800 mb-4 border-b pb-2 text-amber-600">🏛️ Add Destination Place</h2>
            <form onSubmit={handlePlaceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Select State *</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500">
                  <option value="">-- Choose State --</option>
                  {statesList.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Place Name *</label>
                <input type="text" value={placeName} onChange={(e) => setPlaceName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. Calangute Beach" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">City *</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. North Goa" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Category *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500">
                  <option value="Heritage">Heritage</option>
                  <option value="Nature">Nature</option>
                  <option value="Religious">Religious</option>
                  <option value="Modern">Modern</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 block mb-1">Image URL *</label>
                <input type="url" value={placeImg} onChange={(e) => setPlaceImg(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 block mb-1">Description *</label>
                <textarea value={placeDesc} onChange={(e) => setPlaceDesc(e.target.value)} required rows="2" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="Enter full details about destination..."></textarea>
              </div>
              
              {/* Optional Advanced Specifications Fields */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Best Time To Visit (Optional)</label>
                <input type="text" value={bestTime} onChange={(e) => setBestTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. November to February" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Timings (Optional)</label>
                <input type="text" value={timings} onChange={(e) => setTimings(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. 9:00 AM - 6:00 PM" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Entry Fees (Optional)</label>
                <input type="text" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. Free Entry" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Nearby Attractions (Comma Separated)</label>
                <input type="text" value={attractions} onChange={(e) => setAttractions(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-orange-500" placeholder="e.g. Baga Beach, Aguada Fort" />
              </div>

              <button type="submit" className="md:col-span-2 bg-amber-500 hover:bg-amber-600 text-white font-black py-3 rounded-xl text-xs tracking-widest uppercase transition-colors mt-2 shadow-md">
                Upload Destination
              </button>
            </form>
          </div>
        </div>

        {/* --- 🗑️ CRUD MANAGEMENT SECTION (DELETE PANELS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* States Control List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-md font-black text-slate-800 border-b pb-3 mb-4 flex justify-between items-center">
              <span>🗺️ Active States ({statesList.length})</span>
              <span className="text-xs text-slate-400">Database Entry</span>
            </h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {statesList.map(st => (
                <div key={st._id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={st.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                    <span className="font-bold text-slate-700 text-sm">{st.name}</span>
                  </div>
                  <button onClick={() => deleteState(st._id, st.name)} className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-xl transition-all text-xs font-bold shadow-sm" title="Delete State">
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Places Control List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-md font-black text-slate-800 border-b pb-3 mb-4 flex justify-between items-center">
              <span>🏛️ Active Destinations ({placesList.length})</span>
              <span className="text-xs text-slate-400">Database Entry</span>
            </h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {placesList.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">Manage karne ke liye koi place available nahi hai.</p>
              ) : (
                placesList.map(pl => (
                  <div key={pl._id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3 max-w-[70%]">
                      <img src={pl.image} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                      <div className="truncate">
                        <h4 className="font-bold text-slate-700 text-xs truncate">{pl.name}</h4>
                        <p className="text-[10px] text-slate-400">📍 {typeof pl.city === 'string' ? pl.city : 'Location Specified'}</p>
                      </div>
                    </div>
                    <button onClick={() => deletePlace(pl._id, pl.name)} className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-xl transition-all text-xs font-bold shadow-sm" title="Delete Place">
                      🗑️ Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Admin;