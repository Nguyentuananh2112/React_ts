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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // kiem tra xem email hay password co rong hay k
    if (!email.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ Name và Password!");
      return;
    }

    // lay thogn tin tu local
    const user = localStorage.getItem(email);

    if (user) {
      const parsedUser = JSON.parse(user);

      // kiem tra mk
      if (parsedUser.password === password) {
        // Lưu thông tin user hiện tại vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(parsedUser));
        alert("Đăng nhập thành công!");
        navigate("/dashboard"); // neu thanh cong thi den trang dashboard
      } else {
        alert("Sai mật khẩu!");
      }
    } else {
      alert("Tài khoản không tồn tại! Vui lòng đăng ký trước.");
    }
  };

  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin(); // Gọi hàm đăng nhập khi nhấn Enter
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Input cho Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="email"
                placeholder="Your name or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>

            {/* Input cho Password */}
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
          <Button variant="outline" onClick={() => navigate("/register")}>
            Create new account
          </Button>
          <Button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white"
            // onKeyDown={hande}
          >
            Deploy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
