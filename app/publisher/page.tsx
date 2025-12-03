// app/publisher/page.tsx
import Link from "next/link";
import { getPublisherStats } from "@/lib/publisher";

export default async function PublisherPage() {
  // TODO: replace with real logged-in user's publisherId
  const publisherId = 1;

  const { totalClicks, todayClicks, domains } = await getPublisherStats(publisherId);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Publisher Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">Clicks (today)</div>
          <div className="text-2xl font-semibold">{todayClicks}</div>
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">Clicks (all time)</div>
          <div className="text-2xl font-semibold">{totalClicks}</div>
        </div>
      </div>

      <Link href="/publisher/domains/new" className="inline-block px-4 py-2 bg-black text-white rounded">
        Add domain
      </Link>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Your domains</h2>

        <div className="space-y-4 mt-4">
          {domains.length === 0 && <div className="text-sm text-gray-500">No domains yet.</div>}

          {domains.map((d) => (
            <div key={d.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{d.url}</div>
                  <div className="text-sm text-gray-500">Added: {new Date(d.createdAt).toLocaleString()}</div>
                </div>

                <div>
                  {d.verified ? (
                    <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-sm">Verified</span>
                  ) : (
                    <form action="/api/publisher/verify/route" method="post" className="flex gap-2">
                      <input type="hidden" name="domainId" value={d.id} />
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Check verification</button>
                    </form>
                  )}
                </div>
              </div>

              {!d.verified && (
                <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                  <div className="mb-2">Verification options (choose one):</div>

                  <div className="mb-2">
                    <div className="text-xs text-gray-500">File method</div>
                    <pre className="bg-white p-2 rounded text-sm">
{`https://${d.url}/nightreach-verification.txt`}
                    </pre>
                    <div className="text-xs text-gray-600 mt-1">File content (exact):</div>
                    <pre className="bg-white p-2 rounded text-sm">{d.verifyToken}</pre>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">Meta tag method</div>
                    <pre className="bg-white p-2 rounded text-sm">
{`<meta name="nightreach-verification" content="${d.verifyToken}" />`}
                    </pre>
                  </div>
                </div>
              )}

              {d.verified && (
                <div className="mt-3 text-sm">
                  <div className="mb-2">Install pixel:</div>
                  <pre className="bg-black text-white p-2 rounded text-sm">
{`<script src="https://yourdomain.com/pixel.js" data-domain="${d.url}" data-publisher="${d.publisherId}"></script>`}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
