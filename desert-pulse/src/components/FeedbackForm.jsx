import React, { useState } from "react";
import { Send, CheckCircle2, FileBarChart } from "lucide-react";

/**
 * FeedbackForm — standalone version of Desert Pulse's anonymous survey.
 *
 * This is a self-contained, reusable implementation of the feedback feature
 * that lives integrated (and bilingual) inside App.jsx. It is kept here as an
 * isolated module so the feature can be embedded, tested, or demoed on its own.
 *
 * Props:
 *   onSubmit?: (answers: Record<string, string>) => void
 *      Called with the non-empty answers when the resident submits.
 *
 * Privacy: responses are held in component state for the current session only.
 * Nothing is sent to a server unless you wire onSubmit to a backend.
 */

const T = {
  sand: "#FBF6EC",
  ink: "#2B2118",
  oasis: "#1F7A6C",
  dune: "#C98A4B",
  line: "rgba(43,33,24,0.12)",
};

const QUESTIONS = [
  "What service do you wish existed?",
  "What product do you struggle to find?",
  "What would you pay for locally?",
];

export default function FeedbackForm({ onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [responses, setResponses] = useState([]); // session-only history
  const [done, setDone] = useState(false);

  const update = (i, v) => setAnswers((a) => ({ ...a, [i]: v }));

  const submit = () => {
    const entries = Object.entries(answers).filter(([, v]) => v && v.trim());
    if (!entries.length) return;
    const record = { id: Date.now(), answers: Object.fromEntries(entries) };
    setResponses((r) => [record, ...r]);
    setDone(true);
    if (onSubmit) onSubmit(record.answers);
  };

  const reset = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <section style={S.wrap}>
      <div style={S.eyebrow}>100% anonymous · takes 90 seconds</div>
      <h2 style={S.h2}>Tell us what Al Qua'a needs</h2>
      <p style={S.sub}>Answer as many as you like — even one response helps.</p>

      {done ? (
        <div style={S.doneCard}>
          <CheckCircle2 size={40} color={T.oasis} />
          <h3 style={S.doneTitle}>Thank you — your voice just moved the needle.</h3>
          <p style={S.sub}>
            Your anonymous response was added to this session's community signal.
          </p>
          <button style={S.btnGhost} onClick={reset}>
            Submit another
          </button>
        </div>
      ) : (
        <div style={S.card}>
          {QUESTIONS.map((q, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={S.label}>{q}</label>
              <textarea
                style={S.input}
                placeholder="Type your answer…"
                value={answers[i] || ""}
                onChange={(e) => update(i, e.target.value)}
              />
            </div>
          ))}
          <button style={S.btn} onClick={submit}>
            Submit anonymously <Send size={16} />
          </button>
        </div>
      )}

      {responses.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div style={S.histHead}>
            <FileBarChart size={16} />
            Your responses this session
            <span style={S.count}>{responses.length}</span>
          </div>
          <p style={S.note}>
            Kept only in your browser for this visit. This prototype has no server,
            so nothing is saved permanently — refreshing clears it.
          </p>
          {responses.map((r, idx) => (
            <div key={r.id} style={S.histItem}>
              <div style={S.histMeta}>Response #{responses.length - idx}</div>
              {Object.entries(r.answers).map(([qi, val]) => (
                <div key={qi} style={{ marginBottom: 8 }}>
                  <div style={S.histQ}>{QUESTIONS[Number(qi)]}</div>
                  <div style={S.histA}>{val}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const S = {
  wrap: { maxWidth: 640, margin: "0 auto", padding: "40px 20px", color: T.ink },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: T.dune,
    marginBottom: 8,
  },
  h2: { fontFamily: "'Fraunces', serif", fontSize: "1.9rem", margin: "0 0 6px" },
  sub: { color: "rgba(43,33,24,0.62)", lineHeight: 1.55, margin: "0 0 24px" },
  card: {
    background: "rgba(255,255,255,0.62)",
    border: `1px solid ${T.line}`,
    borderRadius: 20,
    padding: 24,
  },
  label: { display: "block", fontWeight: 600, fontSize: "0.95rem", marginBottom: 8 },
  input: {
    width: "100%",
    minHeight: 64,
    border: `1.5px solid ${T.line}`,
    borderRadius: 12,
    padding: "11px 14px",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    resize: "vertical",
    outline: "none",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${T.dune}, #E3A857)`,
    color: T.ink,
    fontWeight: 600,
    border: "none",
    borderRadius: 999,
    padding: "13px 22px",
    cursor: "pointer",
  },
  btnGhost: {
    marginTop: 16,
    background: "transparent",
    border: "1.5px solid rgba(43,33,24,0.22)",
    color: T.ink,
    fontWeight: 600,
    borderRadius: 999,
    padding: "11px 20px",
    cursor: "pointer",
  },
  doneCard: { textAlign: "center", padding: "30px 10px" },
  doneTitle: { fontFamily: "'Fraunces', serif", fontSize: "1.4rem", margin: "14px 0 6px" },
  histHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: "1.05rem",
  },
  count: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 22,
    height: 22,
    padding: "0 7px",
    borderRadius: 999,
    background: T.oasis,
    color: "#fff",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.75rem",
  },
  note: { fontSize: "0.82rem", color: "rgba(43,33,24,0.6)", lineHeight: 1.5, margin: "8px 0 16px" },
  histItem: {
    background: "rgba(255,255,255,0.62)",
    border: `1px solid ${T.line}`,
    borderRadius: 16,
    padding: "14px 16px",
    marginBottom: 12,
  },
  histMeta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    color: T.dune,
    marginBottom: 10,
  },
  histQ: { fontSize: "0.8rem", color: "rgba(43,33,24,0.6)", marginBottom: 2 },
  histA: { fontSize: "0.94rem", fontWeight: 500 },
};
