# User Testing

## Goal

Confirm that residents of Al Qua'a can give feedback without friction, and that
entrepreneurs can move from "an opportunity" to "a concrete first step" without
help.

## Method

- **Participants:** 8 people — 5 residents (potential survey responders)
  and 3 aspiring entrepreneurs. Recruited via community WhatsApp group and
  family network in Al Qua'a.
- **Format:** In person, ~15 minutes each, one facilitator and one note-taker.
- **Devices:** Mix of phone (iPhone and Android) and laptop — important because
  most residents will use the site on a phone.
- **Languages:** Sessions were run in both English and Arabic to test the
  language toggle and RTL layout with native Arabic readers.

## Tasks

Each participant was asked to complete these unaided, thinking aloud:

1. Switch the site to Arabic and back.
2. Submit one anonymous response to the survey.
3. Find the opportunity most relevant to them.
4. Generate a business plan / 30-day roadmap for that opportunity.
5. Ask the Pulse AI coach one question about starting their business.
6. Turn on high-contrast mode and increase the text size.

We recorded: task completion (yes / with difficulty / no), time on task, and
any point where the participant hesitated or asked for help.

## Results

| Task | Completed unaided | Avg. time | Notes |
|------|-------------------|-----------|-------|
| Switch language | 88% | 6s | One user looked for the toggle in the top-left; it is top-right |
| Submit a response | 100% | 42s | All users found the survey form intuitive; no drop-offs |
| Find relevant opportunity | 75% | 58s | Two users did not immediately notice the category filter |
| Generate a roadmap | 100% | 35s | "Generate roadmap" button was clear; output loaded quickly |
| Ask the AI coach | 88% | 28s | One user typed in Arabic and received an English reply first; fixed |
| Use accessibility settings | 75% | 22s | Two users did not connect the gear icon to accessibility options |

**System Usability Scale:** 79 / 100 across 8 participants (above the 68-point industry average).

## What we learned

- Arabic readers expected the language toggle on the left side of the header
  (consistent with RTL reading direction); we added a mirrored position so
  it appears on the left in Arabic mode.
- Two users did not realise the settings (gear) icon opened accessibility
  options; we added a visible "Accessibility" text label that appears on first
  visit and collapses after interaction.
- One participant using a mid-range Android phone found the Arabic TTS voice
  defaulted to an English voice; we added a fallback that explicitly requests
  an `ar-AE` voice and displays a silent warning if none is available on the
  device.

## Changes we made in response

- **Language toggle mirroring:** In Arabic mode the toggle now sits on the
  left side of the header so it falls naturally under the eye when reading RTL.
- **Accessibility label on first visit:** A short "Accessibility settings" text
  label appears next to the gear icon on first load and fades out after the
  user opens the panel once (stored in `localStorage`).
- **Arabic TTS voice selection:** The Web Speech API call now passes
  `lang: 'ar-AE'` and filters available voices for an Arabic match before
  falling back to the default; if no Arabic voice is found, the narration
  button shows a tooltip explaining the limitation.
- **Category filter visibility:** The filter row above the opportunity cards
  now has a subtle animated pulse on first load to draw attention.

## Still open / next round

- Test with older residents (55 +) who may have lower digital literacy — the
  current cohort skewed toward younger adults.
- Validate Arabic TTS on iOS Safari, where voice availability differs from
  Chrome and Android.
- Measure whether the animated category-filter pulse actually increases
  discovery, or whether a permanent visible label would serve better.
