"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";



const schema = z.object({
    username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({message:"Invalid email address!"}),
    password:z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName:z.string().min(1, { message: 'First Name is required!' }),
    lastName:z.string().min(1, { message: 'Last Name is required!' }),
    phone:z.string().min(1, { message: 'Phone is required!' }),
    address:z.string().min(1, { message: 'Address is required!' }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
    type,
    data,
}:{
    type:"create" | "update"; 
    data?:any
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(data=>{
        console.log(data);
    })

    return (
        <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new Exam</h1>
            <span className="text-xs text-gray-400 font-medium">Authentification Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
                <InputField label="Email" type="email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
                <InputField label="Password" type="password" name="password" defaultValue={data?.password} register={register} error={errors?.password} />
            </div>
            <span className="text-xs text-gray-400 font-medium">Peronnal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="First Name" type="text" name="firstName" defaultValue={data?.firstName} register={register} error={errors?.firstName} />
                <InputField label="Last Name" type="text" name="lastName" defaultValue={data?.lastName} register={register} error={errors?.lastName} />
                <InputField label="Phone" type="string" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} />
                <InputField label="Address" type="text" name="address" defaultValue={data?.address} register={register} error={errors?.address} />
            </div>
            
            <button className="bg-school text-black p-2 rounded-md ">{type==="create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ExamForm;