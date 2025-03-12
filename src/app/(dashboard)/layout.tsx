import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="h-screen flex">
      {/*left*/}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap:2">
        <Image className="block lg:hidden" src="/logosmall.svg" alt="logo" width={32} height={32} />
        <Image className="hidden lg:block" src="/Logo.svg" alt="Logo" width={222} height={132} />
        </Link>
        <Menu/>
      </div>
      {/*right*/}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll flex flex-col">
        <Navbar/>
        {children}
      </div>
    </div>;
  }