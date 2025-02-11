'use client';

import { useEffect, useRef, useState } from "react";

export default function CodePreview() {
  const iframeRef = useRef(null);
  const [code, setCode] = useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
      </style>
    </head>
    <body class="bg-gray-50">
      <div id="root"></div>
      <script type="text/babel">
        const { useState } = React;
        
        function Home({ navigate }) {
          return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
              <header className="w-full bg-blue-600 text-white py-6 shadow-md">
                <h1 className="text-4xl font-bold">AI Tools Startup</h1>
              </header>
              <main className="p-8 max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">Revolutionizing AI for Businesses</h2>
                <p className="mt-4 text-lg text-gray-600">Our cutting-edge AI solutions help automate tasks, improve efficiency, and drive innovation.</p>
                <button 
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('about')}
                >
                  Learn More
                </button>
              </main>
              <footer className="w-full py-4 bg-gray-800 text-white text-sm">
                <p>&copy; 2025 AI Tools Startup. All rights reserved.</p>
              </footer>
            </div>
          );
        }

        function About({ navigate }) {
          return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
              <header className="w-full bg-blue-600 text-white py-6 shadow-md">
                <h1 className="text-4xl font-bold">About Us</h1>
              </header>
              <main className="p-8 max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
                <p className="mt-4 text-lg text-gray-600">We are a team of AI enthusiasts dedicated to building intelligent solutions for businesses worldwide.</p>
                <button 
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('home')}
                >
                  Back to Home
                </button>
              </main>
              <footer className="w-full py-4 bg-gray-800 text-white text-sm">
                <p>&copy; 2025 AI Tools Startup. All rights reserved.</p>
              </footer>
            </div>
          );
        }

        function App() {
          const [page, setPage] = useState('home');
          
          const navigate = (newPage) => setPage(newPage);
          
          return (
            <div>
              {page === 'home' && <Home navigate={navigate} />}
              {page === 'about' && <About navigate={navigate} />}
            </div>
          );
        }
        
        ReactDOM.render(<App />, document.getElementById("root"));
      </script>
    </body>
    </html>
  `);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
  }, [code]);

  return (
    <div className="flex h-screen">
      <textarea
        className="w-1/2 h-full p-4 border-r border-gray-300 text-sm font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="w-1/2 h-full border-l border-gray-300">
        <iframe ref={iframeRef} className="w-full h-full" />
      </div>
    </div>
  );
}
