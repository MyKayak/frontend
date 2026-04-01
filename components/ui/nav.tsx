"use client"
import { CircleUserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Button {
  label:string,
  path:string,
  isActive:boolean
}

const Nav = () => {
  const path = usePathname();

  const buttons:Button[] = [
    {
      "label":"MyKayak",
      "path":"/",
      "isActive":false
    },
    {
      "label":"Gare",
      "path":"/races",
      "isActive":false
    },
    {
      "label":"Atleti",
      "path":"/athletes",
      "isActive":false
    },
    {
      "label":"Società",
      "path":"/teams",
      "isActive":false
    },
  ];

  buttons.forEach((button)=>{
    if(button.path === path) {
      button.isActive = true;
    }
  });

  return (
    <nav className="fixed top-0 z-20 flex items-center justify-center w-full p-4 font-medium transition-all">
        <div className="flex gap-2 p-2 bg-sky-200/20 w-fit rounded-full backdrop-blur-xl backdropt-brightness-80%">
          {buttons.map((button)=>(
            <a key={button.path} className={`p-4 rounded-full hover:bg-sky-200/10 transition-all${button.isActive ? " bg-sky-200/20 cursor-pointer" : ""}`} href={button.path}>
              {button.label}
            </a>
          ))}
        </div>
        <a className="p-4 rounded-full bg-sky-200/20 flex items-center justify-center fixed top-2 right-2 cursor-pointer hover:bg-sky-200/30 backdrop-blur-xl" href="/dashboard">
          <CircleUserRound height="40" width="40" />
        </a>
    </nav>
  )
}

export default Nav