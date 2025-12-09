import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const loaderData = useLoaderData();
  const districtsData = Array.isArray(loaderData) ? loaderData : [];
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [upazilas, setUpazilas] = useState([]);

  const handleRegistration = (data) => {
    const profileImg = data.avatar[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(image_API_Url, formData)
          .then((res) => {
            // console.log("after image upload", res.data.data.url);

            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateUserProfile(userProfile)
              .then(() => {
                // console.log("user profile updated done.");

                const newUser = {
                  name: data.name,
                  email: data.email,
                  avatar: res.data.data.url,
                  bloodGroup: data.bloodGroup,
                  district: data.district,
                  upazila: data.upazila,
                  password: data.password,
                };

                axios.post("http://localhost:3000/users/register", newUser);

                navigate(location.state || "/");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d32f2f",
        });
      });

    Swal.fire({
      title: "Registration Successful!",
      text: "Welcome to the BloodConnect donor community!",
      icon: "success",
      confirmButtonText: "Continue",
      confirmButtonColor: "#d32f2f",
    });
    // console.log(result.user);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const districtObj = districtsData.find(
      (d) => d.district === selectedDistrict
    );
    setUpazilas(
      Array.isArray(districtObj?.upazilas) ? districtObj.upazilas : []
    );
  };

  const passwordValue = watch("password");

  return (
    <div className="w-full flex flex-col items-center mt-10 mb-8">
      <div className="card bg-base-100 w-full max-w-md shadow-xl px-6 py-8 border border-gray-100">
        <div className="flex justify-center mb-3">
          <div className="h-14 w-16 flex items-center justify-center">
            <Logo />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center text-red-600 mt-5 mb-1">
          Create Your BloodConnect Account
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Become a donor today and help save lives.
        </p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <div>
            <label className="label font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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

          <div>
            <label className="label font-medium">Avatar</label>
            <input
              type="file"
              {...register("avatar", { required: "Avatar is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
          </div>

          <div>
            <label className="label font-medium">Blood Group</label>
            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-sm">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          <div>
            <label className="label font-medium">District</label>
            <select
              {...register("district", { required: "District is required" })}
              onChange={handleDistrictChange}
              className="select select-bordered w-full"
            >
              <option value="">Select district</option>
              {districtsData.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district.message}</p>
            )}
          </div>

          <div>
            <label className="label font-medium">Upazila</label>
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="select select-bordered w-full"
              disabled={!upazilas.length}
            >
              <option value="">Select upazila</option>
              {upazilas.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500 text-sm">{errors.upazila.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="label font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message:
                    "Password must be at least 6 characters, include uppercase, lowercase, number, and special character",
                },
              })}
              placeholder="Create password"
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

          <div className="relative">
            <label className="label font-medium">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirm_password", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              placeholder="Confirm password"
              className="input input-bordered w-full pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-4 text-white">
            Register
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-blue-500 underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
