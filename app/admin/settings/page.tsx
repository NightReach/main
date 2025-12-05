"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    }
    load();
  }, []);

  async function updateSetting(key: string, value: string) {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      body: JSON.stringify({ key, value })
    });
    setSaving(false);
  }

  if (!settings.loaded) return "Loading...";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <div className="space-y-6">
        
        {/* Network Name */}
        <div>
          <label className="font-semibold">Network Name</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.networkName}
            onBlur={(e) => updateSetting("networkName", e.target.value)}
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="font-semibold">Support Email</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.supportEmail}
            onBlur={(e) => updateSetting("supportEmail", e.target.value)}
          />
        </div>

        {/* Smartlink Fallback URL */}
        <div>
          <label className="font-semibold">Default Smartlink Fallback URL</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.fallbackUrl}
            onBlur={(e) => updateSetting("fallbackUrl", e.target.value)}
          />
        </div>

        {/* Min Payout Threshold */}
        <div>
          <label className="font-semibold">Minimum Payout Threshold</label>
          <input
            className="border p-2 w-full mt-1"
            type="number"
            defaultValue={settings.minPayout}
            onBlur={(e) => updateSetting("minPayout", e.target.value)}
          />
        </div>

      </div>

      {saving && <p className="mt-4 text-blue-600">Saving…</p>}
    </div>
  );
}
E

cat << 'EOF' > app/admin/settings/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    }
    load();
  }, []);

  async function updateSetting(key: string, value: string) {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      body: JSON.stringify({ key, value })
    });
    setSaving(false);
  }

  if (!settings.loaded) return "Loading...";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <div className="space-y-6">
        
        {/* Network Name */}
        <div>
          <label className="font-semibold">Network Name</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.networkName}
            onBlur={(e) => updateSetting("networkName", e.target.value)}
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="font-semibold">Support Email</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.supportEmail}
            onBlur={(e) => updateSetting("supportEmail", e.target.value)}
          />
        </div>

        {/* Smartlink Fallback URL */}
        <div>
          <label className="font-semibold">Default Smartlink Fallback URL</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.fallbackUrl}
            onBlur={(e) => updateSetting("fallbackUrl", e.target.value)}
          />
        </div>

        {/* Min Payout Threshold */}
        <div>
          <label className="font-semibold">Minimum Payout Threshold</label>
          <input
            className="border p-2 w-full mt-1"
            type="number"
            defaultValue={settings.minPayout}
            onBlur={(e) => updateSetting("minPayout", e.target.value)}
          />
        </div>

      </div>

      {saving && <p className="mt-4 text-blue-600">Saving…</p>}
    </div>
  );
}
E

cat << 'EOF' > app/admin/settings/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    }
    load();
  }, []);

  async function updateSetting(key: string, value: string) {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      body: JSON.stringify({ key, value })
    });
    setSaving(false);
  }

  if (!settings.loaded) return "Loading...";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <div className="space-y-6">
        
        {/* Network Name */}
        <div>
          <label className="font-semibold">Network Name</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.networkName}
            onBlur={(e) => updateSetting("networkName", e.target.value)}
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="font-semibold">Support Email</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.supportEmail}
            onBlur={(e) => updateSetting("supportEmail", e.target.value)}
          />
        </div>

        {/* Smartlink Fallback URL */}
        <div>
          <label className="font-semibold">Default Smartlink Fallback URL</label>
          <input
            className="border p-2 w-full mt-1"
            defaultValue={settings.fallbackUrl}
            onBlur={(e) => updateSetting("fallbackUrl", e.target.value)}
          />
        </div>

        {/* Min Payout Threshold */}
        <div>
          <label className="font-semibold">Minimum Payout Threshold</label>
          <input
            className="border p-2 w-full mt-1"
            type="number"
            defaultValue={settings.minPayout}
            onBlur={(e) => updateSetting("minPayout", e.target.value)}
          />
        </div>

      </div>

      {saving && <p className="mt-4 text-blue-600">Saving…</p>}
    </div>
  );
}
