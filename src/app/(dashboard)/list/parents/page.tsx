import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { role, parentsData} from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Parent, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";


type ParentList = Parent & {students:Student[]};

const columns = [
  {header:"info", accessor:"info"},
  {header:"Student Name", accessor:"students", className:"hidden md:table-cell"},
  {header:"Phone", accessor:"phone", className:"hidden lg:table-cell"},
  {header:"Address", accessor:"address", className:"hidden lg:table-cell"},
  {header:"Actions", accessor:"action"},

];


const renderRow = (item:ParentList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm even:hover:bg-school even:hover:bg-opacity-50 odd:hover:bg-schoolify odd:hover:bg-opacity-50">
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.students.map(student=>student.name).join(",")}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          /* <button className="w-8 h-8 rounded-full flex items-center justify-center bg-school">
            <Image src="/delete.svg" alt="" width={16} height={16}/>
          </button> */
          <>
            <FormModal table={"parent"} type={"update"} data={item}/>
            <FormModal table={"parent"} type={"delete"} id={item.id}/>
          </>
        )}
      </div>
    </td>
  </tr>
);

const ParentListPage = async ({

  searchParams,
}: {
  searchParams:{[key:string]:string | undefined};
}) => {

  const {page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  /*   URL PARAMS CONDITIONS */

  const query: Prisma.ParentWhereInput = {};

  if (queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value !== undefined) {
        switch(key) {
          case "search":
            query.name = {contains: value, mode:"insensitive"};
          break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students:true,
      },
      take:ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.parent.count({where:query}),
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                <FormModal table={"parent"} type={"create"} />
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

export default ParentListPage;