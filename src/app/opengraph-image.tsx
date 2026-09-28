import { ImageResponse } from "next/og";
import { initials, site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card (WhatsApp, LinkedIn, etc.), generated at build time from site data. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 15%, #1e3a8a 0%, #05060a 55%)",
          color: "#f5f5f6",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#2563eb",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {initials}
          </div>
          <div style={{ fontSize: 26, color: "#a1a1aa" }}>{site.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#60a5fa" }}>{site.role}</div>
          <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 900 }}>{site.pitch}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#2563eb", borderRadius: 3 }} />
      </div>
    ),
    { ...size },
  );
}
