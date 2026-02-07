import UserSidebar from "../sidebar/UserSidebar";
import { useState } from "react";

function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [tripReminder, setTripReminder] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">Settings</h2>

        <div className="space-y-6 max-w-2xl">
          {/* Account Settings */}
          <Section title="Account">
            <SettingItem
              title="Edit Profile"
              description="Update your name and email"
              action={() => (window.location.href = "/profile")}
              actionLabel="Edit"
            />

            <SettingItem
              title="Change Password"
              description="Update your account password"
              disabled
              actionLabel="Coming soon"
            />
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <ToggleItem
              title="Email Notifications"
              description="Receive updates and trip suggestions"
              enabled={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />

            <ToggleItem
              title="Trip Reminders"
              description="Get reminders before your trip"
              enabled={tripReminder}
              onChange={() => setTripReminder(!tripReminder)}
            />
          </Section>

          {/* Security */}
          <Section title="Security">
            <SettingItem
              title="Logout"
              description="Sign out from your account"
              danger
              action={handleLogout}
              actionLabel="Logout"
            />
          </Section>

          {/* App Info */}
          <Section title="About">
            <div className="text-sm text-gray-500">
              AI Trip Planner v1.0
              <br />
              Need help?{" "}
              <span className="text-orange-500 cursor-pointer">
                Contact support
              </span>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SettingItem({
  title,
  description,
  action,
  actionLabel,
  danger = false,
  disabled = false,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={action}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            danger
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }
          ${disabled && "opacity-50 cursor-not-allowed"}
        `}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function ToggleItem({ title, description, enabled, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;
