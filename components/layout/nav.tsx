'use client';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">
              <a href="http://localhost:3001/starmap">Sky Map</a>
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
