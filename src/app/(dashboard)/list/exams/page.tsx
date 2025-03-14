import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { role, examsData} from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";


type Exam = {
  id:number;
  subject:string;
  class:string;
  teacher:number;
  date:string;
}

const columns = [
  {header:"Subject Name", accessor:"name"},
  {header:"Class", accessor:"class"},
  {header:"Teacher", accessor:"teacher", className:"hidden md:table-cell"},
  {header:"Date", accessor:"date", className:"hidden md:table-cell"},
  {header:"Actions", accessor:"action"},

];


const ExamListPage = () => {


  const renderRow = (item:Exam) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm even:hover:bg-school even:hover:bg-opacity-50 odd:hover:bg-schoolify odd:hover:bg-opacity-50">
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            /* <button className="w-8 h-8 rounded-full flex items-center justify-center bg-school">
              <Image src="/delete.svg" alt="" width={16} height={16}/>
            </button> */
            <>
              <FormModal table={"exam"} type={"update"} data={item}/>
              <FormModal table={"exam"} type={"delete"} id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
                /* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-school">
                    <Image src="/plus.png" alt="" width={14} height={14}/>
                </button> */
              <FormModal table={"exam"} type={"create"}/>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={examsData}/>  
      {/* Pagination */}
      <Pagination/>
    </div>
  )
}

export default ExamListPage;