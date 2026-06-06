
import axios, { AxiosError } from "axios";


export interface signUpUser  {
    name : string,
    phone : number,
    email : string,
    password : string
}
export interface loginUser  {
    phone : number,
    password : string
}

export const checkLogin = async(user : signUpUser) =>{
    try {
        console.log(user)
        const {data} = await axios.post("http://localhost:5001/signUp", user)
        return data;
    } catch (error) {
        console.error({error : error})
    }
}

export const login = async(user : loginUser) => {
       try {
         console.log("this login work", user)
        const {data} = await axios.post("http://localhost:5001/login", user,{
            withCredentials : true
        })
        console.log("this is data",data.message)
        return data;
       } catch (err) {
    const axiosError = err as AxiosError<any>;
    throw new Error(
      axiosError.response?.data?.message || "Login failed"
    );
  }
    
}

export const chkLogUser = async()=>{
    try {
        console.log("check log user")
        const {data} = await axios.get("http://localhost:5001/me",
            {
                withCredentials : true
            }
        )
        console.log("me route ",data)
        return data
        
    } catch (err) {
    const axiosError = err as AxiosError<any>;
    throw new Error(
      axiosError.response?.data?.message || "Login failed"
    );
  }
}

export const logOut = async()=>{
    try {
        console.log("logout")
        const {data} = await axios.post("http://localhost:5001/logout",{},{
            withCredentials : true
        })
        console.log("logged out", data)
        return data;
    } catch (err) {
    const axiosError = err as AxiosError<any>;
    throw new Error(
      axiosError.response?.data?.message || "Internal Server Error"
    );
  }
}
