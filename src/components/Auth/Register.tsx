import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State xem mật khẩu

  const navigate = useNavigate();

  const handleRegister = () => {
    // kiem tra tai khoan
    if (!email.includes("@gmail.com")) {
      alert("Email phải chứa '@gmail.com' để đăng ký!");
      return;
    }

    // kiem tra tai khoan co ton tai k
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("Tài khoản đã tồn tại!");
      return;
    }

    // Luu thong tin user
    const newUser = { name, email, password };
    localStorage.setItem(email, JSON.stringify(newUser));
    alert("Đăng ký thành công!");
    navigate("/login");
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleRegister();                           
      }
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                onKeyDown={handleKeyPress}
              />
              <div
                className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Nút quay lại Login */}
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Login
          </Button>
          {/* Nút đăng ký */}
          <Button
            onClick={handleRegister}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
