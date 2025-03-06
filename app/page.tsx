export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/sky-map4.jpg')",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Contenu */}
      <div className="relative z-10 text-center max-w-2xl p-8">
        <h1 className="text-5xl font-bold mb-4 text-white">Carte du Ciel</h1>
        <p className="text-lg text-gray-300 mb-6">
          Explorez l univers et découvrez les étoiles, les constellations et les planètes visibles depuis la Terre.
        </p>
        <a
          className="inline-block px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-700 transition rounded-full"
          href="/starmap"
        >
          Explorer le ciel
        </a>
      </div>
    </div>
  );
}
