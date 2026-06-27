import React, { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Heatmap — standalone version of Desert Pulse's community-demand heatmap.
 *
 * Renders a grid of Al Qua'a sub-areas shaded by demand intensity (the number
 * of resident responses pointing at an unmet need). Hovering/selecting a cell
 * reveals the top requested service and its response count.
 *
 * This mirrors the integrated map inside App.jsx but is self-contained with
 * its own sample data so it can be embedded or demoed on its own. Replace
 * AREAS with live aggregates from your feedback store when wiring to a backend.
 */

const T = {
  ink: "#2B2118",
  oasis: "#1F7A6C",
  dune: "#C98A4B",
  line: "rgba(43,33,24,0.12)",
};

// Sample aggregate data. `intensity` is 0..1 (share of max demand).
const AREAS = [
  { name: "Al Qua'a Central", intensity: 1.0, responses: 312, topService: "Evening cafe" },
  { name: "North Farms", intensity: 0.82, responses: 256, topService: "Camel veterinary service" },
  { name: "School District", intensity: 0.74, responses: 231, topService: "Home tutoring" },
  { name: "East Residential", intensity: 0.61, responses: 190, topService: "Home bakery" },
  { name: "Market Quarter", intensity: 0.55, responses: 172, topService: "Date marketplace" },
  { name: "Desert Edge", intensity: 0.48, responses: 150, topService: "Stargazing tourism" },
  { name: "West Plots", intensity: 0.39, responses: 121, topService: "Equipment rental" },
  { name: "Outer Ring", intensity: 0.27, responses: 84, topService: "Food delivery" },
];

// Sand -> dune -> oasis ramp for the chosen intensity.
function shade(t) {
  const lerp = (a, b) => Math.round(a + (b - a) * t);
  const from = [251, 246, 236]; // sand
  const to = [31, 122, 108]; // oasis
  const r = lerp(from[0], to[0]);
  const g = lerp(from[1], to[1]);
  const b = lerp(from[2], to[2]);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Heatmap() {
  const [active, setActive] = useState(AREAS[0]);

  return (
    <section style={S.wrap}>
      <div style={S.eyebrow}>Live community signal</div>
      <h2 style={S.h2}>Where demand is concentrated</h2>
      <p style={S.sub}>
        Each tile is a sub-area of Al Qua'a, shaded by how many residents flagged
        an unmet need. Select a tile to see the most-requested service.
      </p>

      <div style={S.grid}>
        {AREAS.map((a) => {
          const isActive = active && active.name === a.name;
          const bg = shade(a.intensity);
          const light = a.intensity > 0.55;
          return (
            <button
              key={a.name}
              style={{
                ...S.cell,
                background: bg,
                color: light ? "#fff" : T.ink,
                outline: isActive ? `3px solid ${T.dune}` : "none",
                outlineOffset: 2,
              }}
              onClick={() => setActive(a)}
              onMouseEnter={() => setActive(a)}
            >
              <span style={S.cellName}>{a.name}</span>
              <span style={S.cellVal}>{a.responses}</span>
            </button>
          );
        })}
      </div>

      <div style={S.legend}>
        <span style={S.legendLabel}>Low</span>
        <div style={S.ramp} />
        <span style={S.legendLabel}>High</span>
      </div>

      {active && (
        <div style={S.detail}>
          <MapPin size={18} color={T.oasis} />
          <div>
            <div style={S.detailName}>{active.name}</div>
            <div style={S.detailMeta}>
              {active.responses} responses · top request:{" "}
              <strong>{active.topService}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const S = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "40px 20px", color: T.ink },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: T.dune,
    marginBottom: 8,
  },
  h2: { fontFamily: "'Fraunces', serif", fontSize: "1.9rem", margin: "0 0 6px" },
  sub: { color: "rgba(43,33,24,0.62)", lineHeight: 1.55, margin: "0 0 24px", maxWidth: 560 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 10,
  },
  cell: {
    border: `1px solid ${T.line}`,
    borderRadius: 14,
    padding: "18px 14px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minHeight: 84,
  },
  cellName: { fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.2 },
  cellVal: { fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 600 },
  legend: { display: "flex", alignItems: "center", gap: 10, margin: "18px 0 6px" },
  legendLabel: { fontSize: "0.75rem", color: "rgba(43,33,24,0.6)" },
  ramp: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    background: `linear-gradient(90deg, ${shade(0)}, ${shade(0.5)}, ${shade(1)})`,
    border: `1px solid ${T.line}`,
  },
  detail: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    background: "rgba(255,255,255,0.62)",
    border: `1px solid ${T.line}`,
    borderRadius: 16,
    padding: "14px 16px",
  },
  detailName: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.05rem" },
  detailMeta: { fontSize: "0.88rem", color: "rgba(43,33,24,0.7)" },
};
