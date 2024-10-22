import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreationItem {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
}

const sampleCreations: CreationItem[] = [
  { id: '1', title: 'Digital Art 1', creator: 'Artist A', imageUrl: '/api/placeholder/100/100' },
  { id: '2', title: 'Digital Art 2', creator: 'Artist B', imageUrl: '/api/placeholder/100/100' },
  { id: '3', title: 'Digital Art 3', creator: 'Artist C', imageUrl: '/api/placeholder/100/100' },
  { id: '4', title: 'Digital Art 4', creator: 'Artist D', imageUrl: '/api/placeholder/100/100' },
  { id: '5', title: 'Digital Art 4', creator: 'Artist E', imageUrl: '/api/placeholder/100/100' },
  { id: '6', title: 'Digital Art 4', creator: 'Artist F', imageUrl: '/api/placeholder/100/100' },
 
];

const DigitalCreationsGallery: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Discover and collect unique digital creations</h1>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for creators, collections, and more..."
          className="w-full p-3 pr-10 rounded-lg border border-gray-300"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>
      
      <div className="flex space-x-4 mb-6">
        <Link to={`/art`} className="px-4 py-2 bg-blue-500 text-white rounded-full">Art</Link>
        <Link to={`/collectibles`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">Collectibles</Link>
        <Link to={`/virtual_worlds`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">Virtual Worlds</Link>
        <Link to={`/music`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">Music</Link>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Featured</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sampleCreations.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.creator}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center space-x-2">
        <button className="px-3 py-1 bg-gray-200 rounded">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded">2</button>
        <button className="px-3 py-1 bg-gray-200 rounded">3</button>
        <button className="px-3 py-1 bg-gray-200 rounded">4</button>
        <button className="px-3 py-1 bg-gray-200 rounded">5</button>
      </div>
    </div>
  );
};

export default DigitalCreationsGallery;