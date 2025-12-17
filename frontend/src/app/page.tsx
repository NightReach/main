export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6">
      <section className="max-w-5xl mx-auto py-24">
        <h1 className="text-4xl font-bold mb-6">
          NightReach
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          A private performance network for high-risk traffic.
        </p>

        <p className="mt-6 text-gray-500 max-w-3xl">
          We connect vetted publishers with affiliate and direct offers in gambling,
          crypto, adult, and sweepstakes verticals. Traffic is monitored,
          campaigns are reviewed, and payouts are manual.
        </p>

        <div className="mt-10 flex gap-6">
          <a
            href="https://t.me/nightreach_support"
            className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Telegram
          </a>
          <a
            href="mailto:contact@nightreach.io"
            className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Email
          </a>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600">
        <a href="/terms" className="mr-4 hover:text-white">Terms</a>
        <a href="/privacy" className="hover:text-white">Privacy</a>
      </footer>
    </main>
  );
}
