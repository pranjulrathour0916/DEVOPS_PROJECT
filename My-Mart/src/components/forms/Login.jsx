import { easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { useUserlogin, useUserSign } from "../layouts/query/authentication.ts";
import { loginSchema, signUPSchema } from "../validators/authScehma.ts";
import toast, { Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import Loader from "../layouts/resuable/Loader.jsx";


//SignUp for structure
const Login = () => {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  //Login form Structure
  const loginInitialForm = {
    phone: "",
    password: "",
  };

  const [flip, setFlip] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [loginformData, setLoginFormData] = useState(loginInitialForm);
  const [errors, setErrors] = useState();
  const notify = (msg) => toast.success(msg);
  const navigate = useNavigate()

  //Importing React query for SignUP fucntion
  const { mutate, isPending } = useUserSign();

  //Importing React query for login fucntion
  const { mutate: login } = useUserlogin();

  //Handling SignUp input data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    //Handling Login input data
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   if(isPending)
   {
    <Loader/>
   }
  const handleSumbit = () => {
    console.log(formData);
    const result = signUPSchema.safeParse(formData);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      console.log(messages);
      setErrors(messages);
      return;
    }
   mutate(formData,{
    onSuccess : (data)=>{
         notify(data.message)
    setTimeout(() => {
      setLoginFormData(loginInitialForm)
      setFormData(initialForm)
      setFlip((prev) => !prev);

    }, 1000);
    }
   });
 
   
  };
  const handleLoginSumbit = () => {
    console.log(loginformData);
    const result = loginSchema.safeParse(loginformData);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      console.log(messages);
      setErrors(messages);
      return;
    }
    login(loginformData, {
      onSuccess: (data) => {
        notify(data.message);
        console.log("this is response", data);
        setTimeout(()=>{
          navigate('/')
        },1500)
        
      },
      onError : (error) => {
        setErrors([error.message])
      }
    });
  };
  const handleFlip = () => {
    setFlip((prev) => !prev);
    setFormData(initialForm);
    setErrors('')
    setLoginFormData(loginInitialForm)
  };
  return (
    <div className="">
      <Toaster />
      <div className="outer [perspective:1000px] relative">
        <motion.div
          animate={{ rotateY: flip ? 0 : 180 }}
          transition={{ duration: 1, ease: easeInOut }}
          className="inner absolute inset-0 [transform-style:preserve-3d]"
        >
          <div className="front absolute inset-0 [backface-visibility:hidden] ">
            <form
              className="text-white pt-10  flex mt-28  flex-col justify-center items-center"
              action=""
            >
              <div className="flex flex-col gap-2 border w-1/3 break-all bg-black rounded-xl shadow-lg shadow-zinc-300 p-9 text-2xl">
                <div className="flex flex-row items-center gap-2 ">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="tracking-widest">Fullname</label>
                    <input
                      className="rounded text-black px-2"
                      type="text"
                      name="name"
                      id="firstname"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <label>Email</label>
                <input
                  className="rounded text-black px-2"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Phone Number</label>
                <input
                  className="rounded text-black px-2"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label>Password</label>
                <input
                  className="rounded text-black px-2"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  className="bg-gray-200 mt-2 rounded-xl p-1 font-semibold text-black"
                  type="button"
                  onClick={handleSumbit}
                >
                  SignUp
                </button>
                <p className="text-base text-center mt-2">
                  Already have an Account?{" "}
                  <span
                    onClick={handleFlip}
                    className="text-green-300 underline"
                  >
                    SignIn
                  </span>
                </p>
                {errors &&
                  errors.map((item) => (
                    <li style={{ color: "red", fontSize: "12px" }}>{item}</li>
                  ))}
              </div>
            </form>
          </div>
          <div className="back absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ">
            <form
              className="text-white pt-10  flex mt-28  flex-col justify-center items-center"
              action=""
            >
              <div className="flex flex-col gap-2 border w-1/3 break-all bg-black rounded-xl shadow-lg shadow-zinc-300 p-9 text-2xl">
                <label>Phone Number</label>
                <input
                  className="rounded-xl text-black px-2"
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={handleChange}
                  value={loginformData.phone}
                />
                <label>Password</label>
                <input
                  className="rounded-xl text-black px-2"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={loginformData.password}
                />
                <button
                  className="bg-gray-200 mt-2 rounded-xl p-1 font-semibold text-black"
                  type="button"
                  onClick={handleLoginSumbit}
                >
                  SignIn
                </button>
                <p className="text-base text-center mt-2">
                  Don't have an Account?{" "}
                  <span
                    onClick={handleFlip}
                    className="text-green-300 underline"
                  >
                    SignUp
                  </span>
                </p>
                {errors &&
                  errors.map((item) => (
                    <li style={{ color: "red", fontSize: "12px" }}>{item}</li>
                  ))}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
