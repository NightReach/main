// app/(public)/page.tsx

export default function LandingPage() {
    return (
      <main className="bg-black text-white min-h-screen">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            The Ad Network Built for High-Intent, Semi-Grey Traffic
          </h1>
  
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Smartlinks, offer rotation, and reliable payouts for gambling, crypto,
            and adult publishers. Built for affiliates who want maximum EPC.
          </p>
  
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/publisher/register"
              className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Publishers: Start Earning
            </a>
  
            <a
              href="/advertiser/register"
              className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition"
            >
              Advertisers: List Your Offer
            </a>
          </div>
        </section>
  
        {/* VALUE PROPS */}
        <section className="py-20 bg-neutral-900 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            <Feature
              title="Smartlink for Semi-Grey Traffic"
              desc="Automatically sends traffic to the highest-EPC offers—no manual testing needed."
            />
            <Feature
              title="Real-Time Click & Conversion Tracking"
              desc="Lightweight JS + server-side event logging for maximum accuracy."
            />
            <Feature
              title="Payouts You Can Trust"
              desc="Weekly payouts, crypto-friendly, transparent reporting."
            />
          </div>
        </section>
  
        {/* HOW IT WORKS */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>
  
          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Sign Up"
              desc="Create a publisher or advertiser account. No complicated approvals."
            />
            <Step
              number="2"
              title="Add Domain or Smartlink"
              desc="Start sending traffic instantly with our streamlined onboarding."
            />
            <Step
              number="3"
              title="Track & Optimize"
              desc="NightReach rotates offers automatically to maximize your EPC."
            />
          </div>
        </section>
  
        {/* PUBLISHER CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Start Monetizing Your Traffic Today
          </h2>
          <p className="text-lg mb-8">
            One link. Maximum earnings. Zero bullshit.
          </p>
          <a
            href="/publisher/register"
            className="px-8 py-4 bg-black text-white rounded-xl hover:bg-neutral-800 transition"
          >
            Get Publisher Smartlink →
          </a>
        </section>
  
        {/* ADVERTISER CTA */}
        <section className="py-20 text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Bring High-Intent Traffic to Your Offers
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Connect with niche publishers ready to scale your campaigns.
          </p>
          <a
            href="/advertiser/register"
            className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition"
          >
            List Your Offer →
          </a>
        </section>
  
        {/* FOOTER */}
        <footer className="py-10 bg-neutral-950 px-6 text-gray-400 mt-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-white font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li>Dashboard</li>
                <li>Smartlinks</li>
                <li>Offers</li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>Terms & Conditions</li>
                <li>Publisher Guidelines</li>
                <li>Disclaimer</li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-white font-semibold mb-3">Contact</h3>
              <p>support@nightreach.io</p>
            </div>
          </div>
  
          <p className="mt-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} NightReach Ads Network. All rights
            reserved.
          </p>
        </footer>
      </main>
    );
  }
  
  // Reusable Feature Component
  function Feature({ title, desc }: { title: string; desc: string }) {
    return (
      <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-gray-300">{desc}</p>
      </div>
    );
  }
  
  // Reusable Step Component
  function Step({
    number,
    title,
    desc,
  }: {
    number: string;
    title: string;
    desc: string;
  }) {
    return (
      <div className="text-center">
        <div className="text-6xl font-black text-blue-600 mb-4">{number}</div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-gray-300">{desc}</p>
      </div>
    );
  }
  