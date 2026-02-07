import { useEffect, useState } from "react";
import UserSidebar from "../sidebar/UserSidebar";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

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

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData), // ✅ use form data
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.msg || "Failed to update profile");
        return;
      }

      // ✅ Update UI immediately
      setUser((prev) => ({
        ...prev,
        ...result.data,
      }));

      // ✅ Close modal
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    }
  };

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
            <button
              onClick={() => {
                setFormData({ name: user.name, email: user.email });
                setIsEditing(true);
              }}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateProfile}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
