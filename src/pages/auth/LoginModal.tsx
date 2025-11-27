// components/LoginModal.tsx
"use client";

import { useState } from "react";
import { X, Copy } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const credentials = [
  { role: "Admin", email: "admin@gmail.com", password: "asdfAa!1" },
  { role: "Rider", email: "rider@gmail.com", password: "asdfAa!1" },
  { role: "Driver", email: "driver@gmail.com", password: "asdfAa!1" },
];

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>("Admin");

  if (!isOpen) return null;

  const selectedCredential = credentials.find(
    (cred) => cred.role === selectedRole
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Quick Login</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Choose a role to login instantly. Perfect for testing!
        </p>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Role</label>
          <div className="grid grid-cols-3 gap-2">
            {credentials.map((cred) => (
              <button
                key={cred.role}
                onClick={() => setSelectedRole(cred.role)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  selectedRole === cred.role
                    ? "bg-purple-100 border-purple-500 text-purple-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {cred.role}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Display */}
        {selectedCredential && (
          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedCredential.email}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded bg-gray-50 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(selectedCredential.email)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedCredential.password}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded bg-gray-50 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(selectedCredential.password)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedCredential) {
                onLogin(selectedCredential.email, selectedCredential.password);
              }
            }}
            className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Login as {selectedRole}
          </button>
        </div>
      </div>
    </div>
  );
}
