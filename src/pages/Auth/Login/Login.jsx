import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to BloodConnect.",
          timer: 2500,
          showConfirmButton: false,
        });
        navigate(location.state || "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      });
  };

  return (
    <div className="w-full flex flex-col items-center my-10">
      <div className="card bg-base-100 w-full max-w-md shadow-xl px-6 py-8 border border-gray-100">
        <div className="flex justify-center mb-5">
          <div className="h-14 w-16">
            <Logo />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center text-red-600 my-2">
          Welcome Back to BloodConnect
        </h3>

        <p className="text-center text-gray-600 mb-6">
          Together, We Save Lives
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="example@mail.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="label font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-4 text-white">
            Login
          </button>

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-blue-500 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
