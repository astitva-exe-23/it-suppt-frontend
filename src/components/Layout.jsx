import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-start py-10 px-4">
      <header className="mb-10">
        <div className="text-white text-2xl font-bold tracking-widest">🛠 IT Support System</div>
        {/* You can place your logo here */}
      </header>
      <main className="w-full max-w-4xl glass-card p-8 rounded-xl shadow-xl">
        {children}
      </main>
    </div>
  );
}
