"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import axios from "@/utils/api";

export default function Profile() {
  const { user, setProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      setIsOrdersLoading(true);
      try {
        const response = await axios.get("/orders/my");
        setOrders(response.data.orders || response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setIsOrdersLoading(false);
      }
    };

    // Update form when user data is loaded
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      contact: user.contact || "",
    });

    fetchOrders();
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put("/auth/update-profile", editForm);
      setProfile(res.data.user);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.contact || "",
    });
    setIsEditing(false);
    setError("");
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    try {
      await axios.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
      alert("Password changed successfully");
    } catch (err) {
      setError("Failed to change password");
    }
  };

  const toggleEmailNotifications = async () => {
    try {
      await axios.put("/auth/settings", {
        emailNotifications: !emailNotifications,
      });
      setEmailNotifications(!emailNotifications);
    } catch (err) {
      setError("Failed to update settings");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-10">
            <div className="flex items-center">
              {/* Large Profile Icon */}
              <div className="w-24 h-24 relative">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full stroke-current text-white stroke-2 fill-none"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20 C4 17 8 14 12 14 C16 14 20 17 20 20" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-white">
                  {user?.name || "User Profile"}
                </h2>
                <p className="text-blue-100 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          {user ? (
            <div className="px-8 py-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              {/* Profile Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>
                  <div className="mt-4 space-y-4">
                    {isEditing ? (
                      // Edit Form
                      <>
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Full Name"
                          />
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            value={editForm.contact}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                contact: e.target.value,
                              })
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact"
                          />
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button
                            onClick={handleSaveProfile}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      // Display Information
                      <>
                        <div className="flex items-center">
                          <span className="w-32 text-sm font-medium text-gray-500">
                            Full Name
                          </span>
                          <span className="text-sm text-gray-900">
                            {user.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 text-sm font-medium text-gray-500">
                            Email
                          </span>
                          <span className="text-sm text-gray-900">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 text-sm font-medium text-gray-500">
                            Contact
                          </span>
                          <span className="text-sm text-gray-900">
                            {user.contact}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex gap-4">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() =>
                      (
                        document.getElementById(
                          "changePasswordModal",
                        ) as HTMLDialogElement
                      )?.showModal()
                    }
                  >
                    Change Password
                  </button>
                </div>

                {/* Account Settings */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Account Settings
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Email Notifications
                        </span>
                      </div>
                      <button
                        onClick={toggleEmailNotifications}
                        aria-label={`Email notifications ${emailNotifications ? "on" : "off"}`}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${emailNotifications ? "bg-blue-600" : "bg-gray-200"}`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${emailNotifications ? "translate-x-5" : "translate-x-0"}`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Orders Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Order History
                  </h3>
                  <div className="mt-4 space-y-4">
                    {isOrdersLoading ? (
                      <p className="text-sm text-gray-500">Loading orders...</p>
                    ) : orders.length === 0 ? (
                      <p className="text-sm text-gray-500">No orders found yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {orders.map((order: any) => (
                          <div key={order._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  Order #{order._id?.slice(-8)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Placed: {new Date(order.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                {order.status || "pending"}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <p>
                                Payment status: <strong>{order.payment?.status || "pending"}</strong>
                              </p>
                              <p>
                                Shipping: <strong>{order.shipping?.status || "pending"}</strong>
                              </p>
                              <p className="mt-1">
                                Address: {order.shipping?.address}, {order.shipping?.city}, {order.shipping?.state} - {order.shipping?.pincode}
                              </p>
                              <p className="mt-1">
                                Total: <strong>₹{order.total?.toFixed(2)}</strong>
                              </p>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-800">Items</p>
                              <ul className="mt-1 space-y-1 text-sm text-gray-700">
                                {order.items?.map((item: any) => (
                                  <li key={item.productId || item.name} className="flex justify-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-8 py-6">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      <dialog
        id="changePasswordModal"
        className="modal p-6 rounded-lg shadow-xl bg-white"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Current Password"
          />
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="New Password"
          />
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm New Password"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleChangePassword}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Change Password
          </button>
          <button
            onClick={() =>
              (
                document.getElementById(
                  "changePasswordModal",
                ) as HTMLDialogElement
              )?.close()
            }
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}
