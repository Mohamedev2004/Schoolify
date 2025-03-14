const Pagination = () => {
  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
        <button disabled className="py-2 px-4 rounded-md bg-school text-xs font-semibold disable:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className="flex items-center gp-2 text-sm">
            <button className="px-2 rounded-sm bg-school">1</button>
            <button className="px-2 rounded-sm">2</button>
            <button className="px-2 rounded-sm">3</button>
            ...
            <button className="px-2 rounded-sm">10</button>
        </div>
        <button  className="py-2 px-4 rounded-md bg-school text-xs font-semibold disable:opacity-50 disabled:cursor-not-allowed">Next</button>

    </div>
  )
}

export default Pagination;