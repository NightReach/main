export default function Home() {
  return (
    <main className="text-white">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-black">
        <h1 className="text-6xl font-bold tracking-tight mb-6">
          NightReach Ads Network
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mb-10">
          Smartlinks built for semi-grey traffic. Maximum EPC.  
          Connect publishers with high-payout offers instantly.
        </p>

        <div className="flex gap-4">
          <a
            href="/publisher"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Start as Publisher
          </a>

          <a
            href="/advertiser"
            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Start as Advertiser
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-xl font-semibold mb-3">Smartlink Optimization</h3>
            <p className="text-gray-400">Auto-rotating offers based on EPC, GEO, and device.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Semi-grey Safe</h3>
            <p className="text-gray-400">Designed for gambling, sweepstakes, crypto and adult traffic.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Publisher Fast Approval</h3>
            <p className="text-gray-400">Instant account creation with pre-built smartlinks.</p>
          </div>

        </div>
      </section>

    </main>
  );
}
