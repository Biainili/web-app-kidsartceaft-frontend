import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import OrderImg from "../assets/img/order-img.png";
import { Link } from "react-router-dom";
import { MyOrders } from "../components/order-commponents/MyOrders";

export const ProfilePage: React.FC = () => {
  const { user, loading, fetchUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const isFirstRender = useRef(true);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    location: user?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (user && !isEditing && isFirstRender.current) {
      setFormData({
        username: user.username,
        phone: user.phone,
        location: user.location,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      isFirstRender.current = false;
    }
  }, [user, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    // Check if the new passwords match
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authorized");
        return;
      }

      // Send a request to the server
      const response = await fetch(
        "http://localhost:5000/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Добавляем "Bearer"
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            phone: formData.phone,
            location: formData.location,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Profile updated successfully!");
      setIsEditing(false);
      fetchUserData(); // Update user data in context
    } catch (error: any) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="main-profile">
      <div className="order-container-profile">
        <h2 className="order-title">
          Turn Your Child's Drawing into a Plush Toy!
        </h2>

        <div className="order-card">
          {/* Фото детского рисунка */}
          <img src={OrderImg} alt="Kids Drawing" className="order-image" />

          {/* Описание */}
          <div className="order-details">
            <p className="order-description">
              We bring children's imagination to life! Upload a drawing, and
              we'll craft a one-of-a-kind plush toy.
            </p>

            {/* Кнопка перехода на страницу заказа */}
            <Link to="/order" className="order-button">
              Create Your Toy
            </Link>
          </div>
        </div>
      </div>
      <div className="containerProfileOrder">
        <div className="profile-container">
          <h2 className="profile-title">👤 Profile</h2>

          <div className="profile-info">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phone}
            </p>
            <p>
              <strong>Location:</strong> {user.location}
            </p>
          </div>

          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>

          {isEditing && (
            <div className="edit-container">
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>

              <label>
                Current Password:
                <div className="password-container">
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    className="eye-icon"
                  >
                    {showPasswords.currentPassword ? "👁" : "🙈"}
                  </span>
                </div>
              </label>

              <label>
                New Password:
                <div className="password-container">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="eye-icon"
                  >
                    {showPasswords.newPassword ? "👁" : "🙈"}
                  </span>
                </div>
              </label>

              <label>
                Confirm New Password:
                <div className="password-container">
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="eye-icon"
                  >
                    {showPasswords.confirmPassword ? "👁" : "🙈"}
                  </span>
                </div>
              </label>

              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
        <MyOrders userId={user.id} />
      </div>
    </div>
  );
};
