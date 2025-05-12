import { Loading } from "@/components/ui/Loading";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./axiosInstance";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();

  const [loading, Setloading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);

  const handleSubmit = async (e: any) => {
    Setloading(true);
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/login/", {
        email: email.toLowerCase(),
        password: password,
      });
      console.log(response);
      // Assuming the token is received in the response data as `token`
      if (response.status == 200) {
        const token = response.data.accessToken;
        console.log("received token: ", token);
        localStorage.setItem("jwtToken", token);
        console.log(
          "You have successfully logged in",
          localStorage.getItem("jwtToken")
        );
        // Now you can navigate to the contact page
        Setloading(false);
        navigate(`/`);
      }
    } catch (error: any) {
      console.error("Error creating user", error.response?.data);
    }
  };

  setTimeout(() => {
    Setloading(false);
  }, 1000);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-row justify-between bg-[#18181a] w-full h-screen">
          <div className="w-[50%] h-screen  hidden sm:block  bg-gradient-to-r from-transparent to-black ">
            <img
              className="w-[100%] h-screen object-cover bg-fixed"
              src="../../public/login/login1.jpg"
              alt="no img"
            />

            <div className="text-4xl m-12 font-sfBold text-neutral-100 ubuntu-medium sm:hidden md:flex  inline-block p-1 bg-clip-text absolute top-0 left-0">
              ContactHub
            </div>
          </div>
          <div className="flex flex-row items-center justify-center sm:w-[50%] w-full h-screen bg-[#09090b]">
            <div className="text-4xl my-5 mr-6 font-sfBold text-neutral-100 absolute p-1 bg-clip-text md:hidden top-1 left-7">
              ContactHub
            </div>
            <div className="flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                  <div className="text-slate-100 font-semi text-4xl ubuntu-medium">
                    Login
                  </div>
                  <p className="text-neutral-400 font-Regular text-xl mt-3">
                    Enter your email below to login to your account
                  </p>
                  <div className="w-full mt-4">
                    <p className="text-slate-100 font-Regular text-xl mb-2">
                      Email
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="w-full bg-[#09090b] text-neutral-400 text-xl font-Regular outline outline-1 outline-neutral-700 p-3 rounded-lg"
                      placeholder="John@example.com"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <p className="text-slate-100 font-Regular text-xl mb-2">
                      Password
                    </p>
                    <div className="relative">
                      {!hide ? (
                        <FaRegEye
                          className="absolute right-4 top-4 text-xl cursor-pointer"
                          onClick={() => setHide(!hide)}
                        />
                      ) : (
                        <FaRegEyeSlash
                          className="absolute right-4 top-4 text-xl cursor-pointer"
                          onClick={() => setHide(!hide)}
                        />
                      )}
                      <input
                        type={hide ? "password" : "text"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="w-full bg-[#09090b] text-neutral-400 text-xl font-Regular outline outline-1 outline-neutral-700 p-3 rounded-lg"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <button
                      type="submit"
                      className="text-[#181E29] bg-slate-100 hover:bg-slate-200 transition-colors duration-150 font-semibold text-xl p-3 w-full rounded-lg ubuntu-medium "
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-full mt-4">
                    <button className="flex flex-row items-center justify-center gap-2 text-neutral-100 font-semi text-xl p-3 w-full rounded-lg outline outline-1 outline-neutral-700">
                      <IoLogoGithub className="w-6 h-6" />
                      GitHub
                    </button>
                  </div>
                  <div className="flex flex-row justify-center w-full mt-4 font-Regular text-xl text-slate-100">
                    <p>
                      Don't have an account?{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
