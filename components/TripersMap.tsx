'use client';

export default function TripersMap() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 to-sand-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <svg
          className="w-16 h-16 mx-auto text-sand-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-gray-600 font-medium">
            Composant carte interactive
          </p>
          <p className="text-sm text-gray-500 mt-2">
            La carte Leaflet / OpenStreetMap sera intégrée ici
          </p>
        </div>
      </div>
    </div>
  );
}
