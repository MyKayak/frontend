"use client"

import { usePathname } from 'next/navigation';

interface Button {
  label: string,
  path: string,
  isActive: boolean
}

interface NavProps {
  isAdmin?: boolean
}

const Nav = ({ isAdmin }: NavProps) => {
  const path = usePathname();

  const buttons: Button[] = [
    {
      "label": "MyKayak",
      "path": "/",
      "isActive": false
    },
    {
      "label": "Gare",
      "path": "/races",
      "isActive": false
    },
    {
      "label": "Atleti",
      "path": "/athletes",
      "isActive": false
    },
    {
      "label": "Società",
      "path": "/teams",
      "isActive": false
    },
    {
      "label": "Medagliere",
      "path": "/medal_table",
      "isActive": false
    },
    {
      "label": "Ranking",
      "path": "/rankings",
      "isActive": false
    },
  ];

  buttons.forEach((button) => {
    if (button.path === path) {
      button.isActive = true;
    }
  });

  return (
    <nav className="fixed top-0 z-20 flex items-center justify-center w-full p-4 font-medium transition-all">
      <div className="flex gap-2 p-2 bg-sky-200/20 w-fit rounded-full backdrop-blur-xl backdropt-brightness-80%">
        {buttons.map((button) => (
          <a key={button.path} className={`p-4 rounded-full hover:bg-sky-200/10 transition-all${button.isActive ? " bg-sky-200/20 cursor-pointer" : ""}`} href={button.path}>
            {button.label}
          </a>
        ))}
        {isAdmin && (
          <a
            href="/dashboard"
            className={`p-4 rounded-full flex items-center gap-2 transition-all font-bold
              ${path === '/dashboard'
                ? 'bg-red-600/30 text-red-300'
                : 'hover:bg-red-600/20 text-red-400 hover:text-red-300'
              }`}
          >
            Dashboard
          </a>
        )}
      </div>
    </nav>
  )
}

export default Nav