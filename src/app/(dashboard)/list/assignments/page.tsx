import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { role, assignmentsData} from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";


type AssignmentList = Assignment & {lesson:{
  subject: Subject,
  class: Class,
  teacher: Teacher,
}}



const columns = [
  {header:"Subject Name", accessor:"name"},
  {header:"Class", accessor:"class"},
  {header:"Teacher", accessor:"teacher", className:"hidden md:table-cell"},
  {header:"Due Date", accessor:"dueDate", className:"hidden md:table-cell"},
  {header:"Actions", accessor:"action"},

];


const renderRow = (item:AssignmentList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm even:hover:bg-school even:hover:bg-opacity-50 odd:hover:bg-schoolify odd:hover:bg-opacity-50">
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-Us").format(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          /* <button className="w-8 h-8 rounded-full flex items-center justify-center bg-school">
            <Image src="/delete.svg" alt="" width={16} height={16}/>
          </button> */
          <>
            <FormModal table={"assignment"} type={"update"} data={item}/>
            <FormModal table={"assignment"} type={"delete"} id={item.id}/>
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = async ({

  searchParams,
}: {
  searchParams:{[key:string]:string | undefined};
}) => {

  const {page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  /*   URL PARAMS CONDITIONS */

  const query: Prisma.AssignmentWhereInput = {};

  if (queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value !== undefined) {
        switch(key) {
          case "classId":
            query.lesson = {classId : parseInt(value)};
          break;
          case "teacherId":
            query.lesson = {teacherId : value};
          break;
          case "search":
            query.lesson = {
              subject :{
                name: {contains:value, mode: "insensitive"}
              }
            }
          break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson:{
          select:{
            subject: {select: { name: true } },
            teacher: {select: { name: true, surname: true} },
            class: {select: { name: true } },
          }
        }
      },
      take:ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.assignment.count({where:query}),
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
              <FormModal table={"assignment"} type={"create"} />
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data}/>  
      {/* Pagination */}
      <Pagination page={p} count={count}/>
    </div>
  )
}

export default AssignmentListPage;