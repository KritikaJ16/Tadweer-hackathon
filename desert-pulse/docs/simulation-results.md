# Simulation Results

> **Template — replace `[bracketed]` figures with your real numbers.** The model
> description matches how the app turns raw feedback into ranked opportunities.

## What is being simulated

Desert Pulse models the path from **anonymous resident responses** to **ranked,
scored business opportunities**. This document explains the inputs, the scoring
logic, and the output so the results are reproducible and defensible.

## Inputs

- **Community responses:** `[total count]` anonymous answers to the survey
  questions ("What service do you wish existed?", "What product do you struggle
  to find?", "What would you pay for locally?").
- **Sub-areas:** `[N]` districts of Al Qua'a, each with a response count used to
  drive the demand heatmap.

> For the demo, the app ships with representative sample data so the dashboard
> and heatmap are populated. Replace it with aggregates from your live feedback
> store for real results.

## How an opportunity is scored

Each candidate opportunity receives a composite score (0–100) from four signals:

| Signal | What it measures | Weight |
|--------|------------------|--------|
| **Demand** | How many responses point at this need | `[40%]` |
| **Willingness to pay** | Whether residents said they'd pay, and how much | `[25%]` |
| **Feasibility** | Realistic startup cost and skill barrier for a local | `[20%]` |
| **Gap** | How poorly the need is currently served locally | `[15%]` |

`score = 0.40·demand + 0.25·pay + 0.20·feasibility + 0.15·gap` (normalised 0–100).

Every score is **traceable**: the app links each opportunity back to the
specific responses and evidence behind it, so a judge or resident can audit why
it ranks where it does.

## Results (sample)

Top opportunities by composite score:

| Rank | Opportunity | Score | Demand signal | Est. startup cost (AED) |
|------|-------------|-------|---------------|--------------------------|
| 1 | `[Evening cafe]` | `[__]` | `[__ responses]` | `[15,000–35,000]` |
| 2 | `[Camel veterinary service]` | `[__]` | `[__ responses]` | `[20,000–50,000]` |
| 3 | `[Home tutoring]` | `[__]` | `[__ responses]` | `[500–2,000]` |
| 4 | `[Home bakery]` | `[__]` | `[__ responses]` | `[3,000–8,000]` |
| 5 | `[Date marketplace]` | `[__]` | `[__ responses]` | `[5,000–12,000]` |

## Sensitivity check

We re-ran the ranking with the weights varied by ±10% to confirm the top
opportunities are stable and not an artefact of one weight:

- `[Result — e.g. "The top 3 stayed the same across all variations; ranks 4–5
  swapped under a feasibility-heavy weighting."]`

## Limitations

- Sample / pilot data, not a census — figures are directional.
- Self-reported willingness to pay tends to overstate actual spending.
- Cost estimates are rough and region-level, not quotes.
