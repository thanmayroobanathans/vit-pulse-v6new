# VIT PULSE V3 — Classification Engine

## Included
- 36 fixed fictional German-named archetypes.
- Jung-inspired continuous axes: Introversion/Extraversion, Thinking/Feeling, Sensation/Intuition.
- Big-Five-inspired quantitative features.
- Browser-first classification: the user's result is calculated locally.
- Ensemble-style similarity: covariance-aware distance + cosine similarity.
- Top-7 archetype ranking.
- Detailed Jung-inspired and Big-Five-inspired statistics.
- Campus signals, including SJT/Amazon crowding as a user-response variable.
- 20+ randomized fun facts.
- Shareable results.
- Optional anonymous aggregation hook.
- Turing-machine-inspired interface and satirical bureaucratic presentation.

## Scientific positioning
Jung is used as an interpretive/archetypal framework, not as a validated diagnostic instrument. Big Five/IPIP-inspired dimensions are used as the quantitative layer. The match percentage is a model similarity score, not the probability that a character is objectively the user's true personality.

## Anonymous aggregation
GitHub Pages is static, so it cannot itself receive POST requests. The frontend contains an `AGGREGATION_ENDPOINT` placeholder. Connect it to a privacy-reviewed serverless endpoint (for example a Cloudflare Worker, or another backend you control). Only enable it after adding an appropriate privacy notice, retention policy and deletion mechanism.

The browser currently sends nothing because the endpoint is intentionally blank.

Suggested aggregate payload:
- model version
- fictional archetype
- rounded match score
- SHA-256 fingerprint of answer choices
- timestamp

Do not add names, email addresses, phone numbers, precise location, or raw free-text responses to the aggregate endpoint unless you redesign the privacy model.

## GitHub Pages
1. Create a public repository.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`.
3. Repository Settings → Pages.
4. Deploy from branch: `main`, folder `/ (root)`.

## Scaling
Classification is local, so 1,000 simultaneous users do not create 1,000 classification requests. Only the optional aggregation endpoint receives traffic. For production, make the endpoint stateless, validate payloads, rate-limit it, and batch/aggregate data rather than storing individual profiles.

## V4 additions
- Subject name entry and display.
- Shareable result links containing only the displayed result payload.
- Native mobile share sheet when supported.
- Copy-link fallback.
- A generated result-card PNG export using Canvas (no external image assets).
- Share-recipient mode: opening the link shows the sender's classification and invites the recipient to run the machine.
- UI artwork is procedural CSS, so there are no stock-image licensing issues.


## V4 visual asset pack
This build contains original procedural artwork: 36 archetype plates, machine plates,
archival backgrounds and texture plates. The artwork is used by the interface and is
not arbitrary binary padding. The PNG masters are intentionally high resolution;
production deployments can create WebP/AVIF derivatives for faster delivery.


## 300MB Working Edition
Contains all 36 high-resolution archetype artworks plus representative machine, archival-background and texture artwork. This is the large asset edition requested by the project owner; it is not artificial zero-filled padding.

## Minimal edition
The V4 classifier and sharing system are unchanged. Large artwork, textures,
and decorative visual assets were removed. The site is intentionally compact,
fast, and low-space while retaining the core interface and matching engine.


## V5
GitHub Pages + Firebase Google authentication + opt-in Firestore research collection. Progress persistence and visible 36-question progress improve completion without fake urgency, forced sharing, or hidden data collection.


## V5.1 retention UX
The 36-question flow now uses visible progress, short question copy, first-instinct guidance, immediate neutral feedback, a completion payoff, and local progress persistence. It intentionally avoids deceptive countdowns, forced sharing, fake scarcity, or hidden collection.
