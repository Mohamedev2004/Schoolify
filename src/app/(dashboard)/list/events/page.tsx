import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";

import Image from "next/image";
import { role, eventsData} from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Class, Event, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";



type EventList = Event & { class: Class};

const columns = [
  {header:"Title", accessor:"title"},
  {header:"Class", accessor:"class"},
  {header:"Date", accessor:"date", className:"hidden md:table-cell"},
  {header:"Start Time", accessor:"startTime", className:"hidden md:table-cell"},
  {header:"End Time", accessor:"endTime", className:"hidden md:table-cell"},
  {header:"Action", accessor:"action"},


];

const renderRow = (item:EventList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm even:hover:bg-school even:hover:bg-opacity-50 odd:hover:bg-schoolify odd:hover:bg-opacity-50">
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-Us").format(item.startTime)}</td>
    <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("en-Us",
        {hour:"2-digit",
        minute:"2-digit",
        hour12: false,}
      )}
    </td>
    <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("en-Us",
        {hour:"2-digit",
        minute:"2-digit",
        hour12: false,}
      )}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          /* <button className="w-8 h-8 rounded-full flex items-center justify-center bg-school">
            <Image src="/delete.svg" alt="" width={16} height={16}/>
          </button> */
          <>
            <FormModal table={"event"} type={"update"} data={item}/>
            <FormModal table={"event"} type={"delete"} id={item.id}/>
          </>
        )}
      </div>
    </td>
  </tr>
);


const EventListPage = async ({
  searchParams,
}: {
  searchParams:{[key:string]:string | undefined};
}) => {

  const {page, ...queryParams} = searchParams

  const p = page ? parseInt(page) : 1;

  /*   URL PARAMS CONDITIONS */

  const query: Prisma.EventWhereInput = {}

  if (queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value !== undefined) {
        switch(key){
            case "search":
              query.title = {contains:value, mode:"insensitive"};
              break;
            default:
              break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class:true
      },
      take:ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.event.count({where:query}),
  ]);


  

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
              <FormModal table={"event"} type={"create"}/>

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

export default EventListPage;