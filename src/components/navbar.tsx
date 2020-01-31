import React from 'react';

export type NavbarProps = {
  children: React.ReactNode;
};

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="bg-blue-600 text-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center py-2 px-4 text-lg">{children}</div>
      </div>
    </nav>
  );
}
