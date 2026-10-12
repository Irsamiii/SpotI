"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

type Spot = { id: string; name: string; building: string };

export default function TestPage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test@school.edu");
  const [password, setPassword] = useState("testpass123");
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotId, setSpotId] = useState("");
  const [log, setLog] = useState("Results will appear here.");

  useEffect(() => {
    fetch("/api/spots")
      .then((r) => r.json())
      .then((d) => {
        setSpots(d.spots ?? []);
        if (d.spots?.[0]) setSpotId(d.spots[0].id);
      });
  }, []);

  const show = (label: string, value: unknown) =>
    setLog(`${label}\n\n${JSON.stringify(value, null, 2)}`);

  async function call(label: string, url: string, init?: RequestInit) {
    const res = await fetch(url, init);
    const body = await res.json().catch(() => null);
    show(`${label} -> HTTP ${res.status}`, body);
  }

  const json = (method: string, body: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "sans-serif", padding: "0 1rem" }}>
      <h1>Backend test page</h1>

      <section>
        <h2>Auth</h2>
        <p>
          {isPending
            ? "Checking session..."
            : session
            ? `Signed in as ${session.user.email}`
            : "Not signed in"}
        </p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />{" "}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button onClick={async () => show("sign-up", await authClient.signUp.email({ email, password, name }))}>
            Sign up
          </button>
          <button onClick={async () => show("sign-in", await authClient.signIn.email({ email, password }))}>
            Sign in
          </button>
          <button onClick={async () => show("sign-out", await authClient.signOut())}>Sign out</button>
        </div>
      </section>

      <section>
        <h2>Spots</h2>
        <select value={spotId} onChange={(e) => setSpotId(e.target.value)}>
          {spots.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.building})
            </option>
          ))}
        </select>
        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => call("GET spot detail", `/api/spots/${spotId}`)}>Spot detail</button>
          <button onClick={() => call("GET deepFocus preset", "/api/spots?preset=deepFocus")}>Preset: deepFocus</button>
          <button onClick={() => call("GET videoCall preset", "/api/spots?preset=videoCall")}>Preset: videoCall</button>
        </div>
      </section>

      <section>
        <h2>Requires sign-in</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() =>
              call(
                "POST rating",
                `/api/spots/${spotId}/ratings`,
                json("POST", {
                  noiseLevel: "LOW",
                  wifiQuality: "GOOD",
                  outletAvailability: "FEW",
                  crowdingAtTime: "OPEN",
                  comment: "Test rating",
                })
              )
            }
          >
            Submit rating
          </button>
          <button onClick={() => call("POST favorite", "/api/favorites", json("POST", { spotId }))}>Favorite</button>
          <button onClick={() => call("DELETE favorite", "/api/favorites", json("DELETE", { spotId }))}>Unfavorite</button>
          <button onClick={() => call("GET favorites", "/api/favorites")}>List favorites</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const fd = new FormData();
              fd.append("photo", file);
              await call("POST photo", `/api/spots/${spotId}/photos`, { method: "POST", body: fd });
            }}
          />
        </div>
      </section>

      <pre style={{ background: "#111", color: "#0f0", padding: 12, marginTop: 16, overflow: "auto" }}>{log}</pre>
    </main>
  );
}