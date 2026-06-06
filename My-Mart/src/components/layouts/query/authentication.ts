import { useMutation, useQuery } from "@tanstack/react-query";
import { checkLogin, chkLogUser, login, loginUser, logOut, signUpUser } from "./loginquery.ts";

export const useUserSign = () => {
  return useMutation({
    mutationFn: (user: signUpUser) => checkLogin(user),
    retry : false
  });
};
export const useUserlogin = () => {
  return useMutation({
    mutationFn: (user: loginUser) => login(user)
  });
};

export const useMeLogin = () =>{
  return useQuery({
    queryKey : ["me"],
    queryFn : chkLogUser,
    retry : false
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn : logOut
  })
}
