"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";



type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Next.js Conference 2025",
    time: "12:00 PM - 02:00 PM",
    description: "A global gathering of Next.js developers sharing insights and innovations.",
  },
  {
    id: 2,
    title: "React Summit",
    time: "13:00 PM - 01:00 PM",
    description: "A must-attend event for React and Next.js enthusiasts, featuring expert talks.",
  },
  {
    id: 3,
    title: "State of JavaScript 2025",
    time: "12:00 PM - 02:00 PM",
    description: "An annual conference discussing the latest trends in JavaScript and Next.js.",
  }
];


const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='bg-white p-4 rounded-md'>
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20}/>
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4" key={event.id}>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600 text-sm">{event.title}</h1>
              <span
                className={`text-xs text-white whitespace-nowrap rounded-md px-2 py-1 ${
                  index % 2 === 0 ? "bg-schoolify" : "bg-school text-black"
                }`}
              >
                {event.time}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar