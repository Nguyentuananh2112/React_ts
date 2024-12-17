import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setName(userData.name);
      setEmail(userData.email);
      setPassword(userData.password);
    } else {
      // Nếu không có thông tin, chuyển về trang Login
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Cập nhật thông tin trong localStorage
    const updatedUser = { name, email, password };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    alert("Thông tin đã được cập nhật thành công!");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Điều hướng về trang Dashboard
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      {/* Form sửa thông tin */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* Nút Submit và Nút Quay lại */}
        <div className="flex justify-between">
          <Button
            onClick={handleBackToDashboard}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Back to Dashboard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
