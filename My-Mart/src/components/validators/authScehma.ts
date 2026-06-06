import {z} from "zod"

export const signUPSchema = z.object({
    name : z.string().min(3, "Name must be atleast 3 characters"),
    phone : z.string().length(10, "Number must be of 10 digits only"),
    email : z.email("Invalid email"),
    password : z.string().min(5,"Password must be of atlead 5 charactes/digits")
})

export const loginSchema = z.object({
   phone : z.string().length(10, "Number must be of 10 digits only"),
password : z.string().min(5,"Password must be of atlead 5 charactes/digits")
})