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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Kiểm tra xem email hay password có rỗng hay không
    if (!email.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ Email và Password!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Lấy thông tin từ localStorage
      const user = localStorage.getItem(email);

      if (user) {
        const parsedUser = JSON.parse(user);

        // Kiểm tra mật khẩu
        if (parsedUser.password === password) {
          // Lưu thông tin hiện tại vào localStorage
          localStorage.setItem("currentUser", JSON.stringify(parsedUser));
          alert("Đăng nhập thành công!");
          navigate("/dashboard"); // Nếu thành công thì đến trang dashboard
        } else {
          setError("Sai mật khẩu!");
          setPassword(""); // Xóa chữ trong phần nhập mật khẩu
        }
      } else {
        setError("Tài khoản không tồn tại! Vui lòng đăng ký trước.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10"
            />
          </div>

          <div className="relative mb-4">
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

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/register")}>
            Đăng ký
          </Button>
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;