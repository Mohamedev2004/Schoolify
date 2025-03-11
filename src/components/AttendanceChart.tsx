"use client"

import Image from "next/image";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    Present: 40,
    Absent: 50,
  },
  {
    name: 'Tue',
    Present: 55,
    Absent: 60,
  },
  {
    name: 'Wed',
    Present: 20,
    Absent: 90,
  },
  {
    name: 'Thu',
    Present: 80,
    Absent: 20,
  },
  {
    name: 'Fri',
    Present: 100,
    Absent: 15,
  },
  {
    name: 'Sat',
    Present: 70,
    Absent: 40,
  },
];

const AttendanceChart = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>          
        <div className='flex justify-between items-center'>
          <h1 className="text-lg font-semibold">Attendance</h1>
          <Image src="/moreDark.png" alt="" width={20} height={20} /> 
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={500}
            height={300}
            barSize={20}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
            <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
            <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
            <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
            <Legend align="left"  verticalAlign="top" wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}}/>
            <Bar dataKey="Present" fill="#857de3" activeBar={<Rectangle fill="#857de3" stroke="#857de3" />} legendType="circle" radius={[10,10,0,0]} />
            <Bar dataKey="Absent" fill="#FAD22C" activeBar={<Rectangle fill="#FAD22C" stroke="#FAD22C"/>} legendType="circle" radius={[10,10,0,0]} />
          </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart