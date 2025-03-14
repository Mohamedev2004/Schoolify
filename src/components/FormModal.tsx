"use client"

import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";


const FormModal = ({table,type,data,id}:{
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement" ;
    type: "create" | "update" | "delete";
    data?:any;
    id?:number;
}
    
) => {
    const size = type === "update" ? "w-7 h-7" : "w-8 h-8";
    const color = type === "update" ? "bg-schoolify" : "bg-school";

    const [open, setOpen] = useState(false);


    const Form = ()=>{
        return type === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table}?</span>
                <button className="bg-school text-black py-2 px-4 rouned-md border-none w-max self-center rounded-md">Delete</button>
            </form>
        ) : (
            <TeacherForm type="update" data={data} />
        );
    };

  return (
    <>
        <button className={`${size} flex items-center justify-center rounded-full ${color}`} onClick={() => setOpen(true)}>
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
        </button>
        {open && (
            <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                    <Form/>
                    <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                        <Image src="/close.png" alt="" width={14} height={14}/>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default FormModal;