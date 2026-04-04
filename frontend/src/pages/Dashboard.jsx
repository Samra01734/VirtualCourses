import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
          <p className="text-gray-300">Here is an overview of your activity and progress.</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
              <img 
                src={userData?.photoUrl || "https://ui-avatars.com/api/?name=" + (userData?.name || "User") + "&background=random"} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{userData?.name}</h2>
              <p className="text-gray-500">{userData?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                {userData?.role || 'Student'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Card 1 */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-blue-800 font-medium mb-1">Enrolled Courses</h3>
              <p className="text-3xl font-bold text-blue-900">12</p>
            </div>
            
            {/* Stats Card 2 */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-green-800 font-medium mb-1">Completed</h3>
              <p className="text-3xl font-bold text-green-900">4</p>
            </div>
            
            {/* Stats Card 3 */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-purple-800 font-medium mb-1">Certificates</h3>
              <p className="text-3xl font-bold text-purple-900">2</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link 
              to="/profile" 
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md font-medium"
            >
              View Profile
            </Link>
            <Link 
              to="/editprofile" 
              className="px-6 py-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-colors shadow-sm font-medium"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;