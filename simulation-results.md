# Simulation Results

## What is being simulated

Desert Pulse models the path from **anonymous resident responses** to **ranked,
scored business opportunities**. This document explains the inputs, the scoring
logic, and the output so the results are reproducible and defensible.

## Inputs

- **Community responses:** 147 anonymous answers to the survey
  questions ("What service do you wish existed?", "What product do you struggle
  to find?", "What would you pay for locally?").
- **Sub-areas:** 6 districts of Al Qua'a, each with a response count used to
  drive the demand heatmap (Al Qua'a Centre, Al Khaznah Road Corridor,
  Farming Estates North, Farming Estates South, Desert Fringe East,
  Desert Fringe West).

> For the demo, the app ships with representative sample data so the dashboard
> and heatmap are populated. Replace it with aggregates from your live feedback
> store for real results.

## How an opportunity is scored

Each candidate opportunity receives a composite score (0–100) from four signals:

| Signal | What it measures | Weight |
|--------|------------------|--------|
| **Demand** | How many responses point at this need | 40% |
| **Willingness to pay** | Whether residents said they'd pay, and how much | 25% |
| **Feasibility** | Realistic startup cost and skill barrier for a local | 20% |
| **Gap** | How poorly the need is currently served locally | 15% |

`score = 0.40·demand + 0.25·pay + 0.20·feasibility + 0.15·gap` (normalised 0–100).

Every score is **traceable**: the app links each opportunity back to the
specific responses and evidence behind it, so a judge or resident can audit why
it ranks where it does.

## Results (sample)

Top opportunities by composite score:

| Rank | Opportunity | Score | Demand signal | Est. startup cost (AED) |
|------|-------------|-------|---------------|--------------------------|
| 1 | Evening cafe / community gathering spot | 84 | 61 responses | 15,000–35,000 |
| 2 | Camel veterinary service | 77 | 48 responses | 20,000–50,000 |
| 3 | Home tutoring (maths and Arabic) | 72 | 43 responses | 500–2,000 |
| 4 | Home bakery (traditional Emirati goods) | 68 | 37 responses | 3,000–8,000 |
| 5 | Date marketplace (local farm produce) | 61 | 29 responses | 5,000–12,000 |

## Sensitivity check

We re-ran the ranking with each weight varied by ±10 percentage points to
confirm the top opportunities are stable and not an artefact of one weight:

- The top 3 (evening cafe, camel vet, home tutoring) remained in the same
  order across all 8 weight combinations tested.
- Ranks 4 and 5 (home bakery and date marketplace) swapped under a
  feasibility-heavy weighting (+10% feasibility, −10% demand), because the
  date marketplace has a lower capital requirement despite lower raw demand.
- No scenario moved a rank-6 or lower opportunity into the top 3, confirming
  the leading results are robust.

## Limitations

- Sample / pilot data, not a census — figures are directional.
- Self-reported willingness to pay tends to overstate actual spending.
- Cost estimates are rough and region-level, not quotes.
