import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { role, classesData} from "@/lib/data";
import Link from "next/link";


type Class = {
  id:number;
  name:string;
  grade:string;
  capacity:number;
  supervisor:string;
}

const columns = [
  {header:"Class Name", accessor:"name"},
  {header:"Capacity", accessor:"capacity", className:"hidden md:table-cell"},
  {header:"Grade", accessor:"grade", className:"hidden md:table-cell"},
  {header:"Supervisor", accessor:"supervisor", className:"hidden md:table-cell"},
  {header:"Actions", accessor:"action"},

];


const ClassListPage = () => {


  const renderRow = (item:Class) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm even:hover:bg-school even:hover:bg-opacity-50 odd:hover:bg-schoolify odd:hover:bg-opacity-50">
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 rounded-full flex items-center justify-center bg-schoolify">
              <Image src="/edit.png" alt="" width={16} height={16}/>
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-school">
              <Image src="/delete.svg" alt="" width={16} height={16}/>
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-school">
              <Image src="/filter.png" alt="" width={14} height={14}/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-school">
              <Image src="/sort.png" alt="" width={14} height={14}/>
            </button>
            {role === "admin" && (
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-school">
                    <Image src="/plus.png" alt="" width={14} height={14}/>
                </button>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={classesData}/>  
      {/* Pagination */}
      <Pagination/>
    </div>
  )
}

export default ClassListPage;