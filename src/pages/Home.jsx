import { Button } from '@/components/ui/button';
import React from 'react';

export default function Home() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', img: '' },
    { name: 'Jane Smith', role: 'CTO', img: '' },
    { name: 'Alex Johnson', role: 'Lead Developer', img: '' },
  ];


  return (
    <div className="flex flex-col items-center justify-center  text-white fade-in-up mt-10 ">
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
        Welcome to Our Awesome Website!
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-200">
        Where innovation meets excellence.
      </p>
      

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center bg-gradient-to-r from-teal-500 to-cyan-600 p-6 rounded-lg shadow-lg">
            <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-200">{member.role}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
}
