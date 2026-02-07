import { useEffect, useState } from "react";
import UserSidebar from "../sidebar/UserSidebar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setUser(result.data);
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">My Profile</h2>
          <p className="text-gray-500 mt-1">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Top Section */}
          <div className="flex items-center gap-6 border-b pb-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-semibold text-orange-600">
              {user.name?.charAt(0)}
            </div>

            {/* Name & Email */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InfoItem label="Full Name" value={user.name} />
            <InfoItem label="Email Address" value={user.email} />
            <InfoItem
              label="Account Created"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <InfoItem label="Total Trips" value={user.tripCount} />
          </div>

          {/* Action */}
          <div className="mt-8">
            <button className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default Profile;
