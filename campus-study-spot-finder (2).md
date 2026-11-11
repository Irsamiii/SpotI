# Campus Study Spot Finder
### A Project Proposal Document

---

## 1. Problem Statement

Every semester, students spend a surprising amount of time and mental energy on a task that has nothing to do with actual learning: **finding a place to study**. This search is especially painful during peak hours and exam periods, when demand for good spaces spikes and the "good" spots are already taken by the time a student arrives.

The core issue isn't a lack of study spaces on campus — it's a lack of **reliable, real-time information** about them. Students currently rely on:

- **Memory and habit** ("I always go to the library 3rd floor"), which breaks down when that spot is full or under renovation.
- **Word of mouth**, which is often outdated or based on someone else's preferences, not theirs.
- **Physically walking around campus** to check multiple locations, which wastes time and adds friction right before a study session even begins.

This creates a mismatch between what a student *needs* in the moment (e.g., silence for an exam review vs. background noise tolerance for a group project) and what they *end up with* (whatever spot happens to be free).

### Why This Matters

| Consequence | Impact on Students |
|---|---|
| Wasted time searching | Less time actually studying; disrupted momentum |
| Wrong-fit environment | Reduced focus, lower retention, more re-reading |
| Crowding at popular spots | Frustration, competition for seats, social stress |
| Unreliable Wi-Fi/outlets | Interrupted work, dead laptops, missed deadlines |
| Exam-period pressure | All of the above intensifies exactly when it matters most |

### Root Causes

1. **No centralized, structured data source** exists that tells students the real-time or typical conditions of a space (noise, crowding, outlets, Wi-Fi).
2. **Preferences are personal and task-dependent** — a spot great for silent reading may be terrible for a group project — but no system currently accounts for *individual context*.
3. **Information decays quickly.** A space that was quiet an hour ago may be full now. Static campus maps or lists of "study rooms" don't capture this.
4. **No feedback loop.** Students who discover great (or terrible) spots have no easy way to share that knowledge with others.

---

## 2. How Might We (HMW) Question

> **How might we help students quickly find and trust an on-campus study spot that fits their current task and preferences (noise, Wi-Fi, outlets, crowding), so they can focus on studying instead of searching?**

This framing highlights three design pillars the solution must address:

1. **Speed** — minimize the time between "I need to study" and "I'm sitting somewhere good."
2. **Trust** — the information shown must be credible, current, and based on real experiences, not guesswork.
3. **Fit** — the recommendation must match the student's *current* task and preferences, not a generic "best spot on campus."

---

## 3. Proposed Solution: Campus Study Spot Finder

A web application that helps students discover, evaluate, and choose study spaces on campus based on the attributes that actually affect study quality: **noise level, Wi-Fi quality, outlet availability, and crowding** — all backed by real student ratings and photos.

### 3.1 Core Value Proposition

Instead of guessing or wandering, a student opens the app, filters by what they need right now ("quiet, has outlets, not crowded"), and gets a ranked list or map of matching spots — with enough social proof (ratings, photos, recent check-ins) to trust the recommendation before they even leave their dorm.

### 3.2 Key Features (MVP)

**a) Interactive Campus Map**
- Built on Google Maps API, showing all registered study spots as pins.
- Color-coded pins by current crowding level (e.g., green = open, yellow = filling up, red = full) where data is available.

**b) Spot Profiles**
Each study spot has a profile page with:
- Name, building, floor/room, and location pin.
- Attribute ratings: Noise level (Silent / Low / Moderate / Loud), Wi-Fi quality, Outlet availability, typical crowding by time of day.
- Photos uploaded by students.
- Written reviews/comments.
- An overall aggregated rating.

**c) Smart Filtering & Search**
- Filter spots by task-based presets, e.g.:
  - "Deep focus / silent" → filters for low noise, available outlets.
  - "Group project" → filters for moderate noise tolerance, larger tables.
  - "Quick laptop session" → filters for Wi-Fi + outlets, regardless of noise.
- Filter by building, distance from current location, or open hours.

**d) Student Ratings & Photos**
- Any logged-in student can rate a spot on the four core dimensions after visiting.
- Photo uploads help others visually verify claims (e.g., "outlets are actually behind the couch, not visible at first glance").
- Optional short text reviews for nuance ("great in the morning, gets loud after 3pm").

**e) User Accounts**
- Simple auth (school email/SSO ideally) so ratings are tied to real students, improving trust and reducing spam/fake reviews.

### 3.3 Suggested Additional Features (Post-MVP / Stretch Goals)

These aren't required for launch but would meaningfully strengthen the product:

| Feature | Why It Helps |
|---|---|
| **Real-time crowd check-ins** | Students tap "I'm here" / "Just left" to give live occupancy signals, far more useful than static ratings alone. |
| **Time-of-day heatmaps** | Show historical crowding patterns per spot ("usually empty before 10am, packed 2–5pm") so students can plan ahead, not just react. |
| **Personalized recommendations** | Learn a student's preferences over time (e.g., always picks silent+outlets) and surface matching spots first. |
| **Favorites & study streak tracking** | Let students save go-to spots and lightly gamify consistent studying. |
| **Booking/reservation for study rooms** | For bookable rooms (as opposed to open seating), integrate reservation status directly. |
| **Push notifications** | "Your favorite spot just opened up" or "Library 3rd floor usually clears out in 20 min." |
| **Noise/Wi-Fi verification via sensors or crowdsourced check-ins** | Adds objectivity beyond subjective ratings. |
| **Accessibility filters** | Wheelchair access, elevator proximity, height-adjustable desks, etc. |
| **Integration with class schedule** | Suggest a nearby spot automatically based on gaps between classes. |
| **Moderation/reporting tools** | Flag outdated or fake reviews to keep data trustworthy over time. |

### 3.4 Proposed Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | **Next.js** | Server-side rendering for fast initial loads; good SEO if a public spot directory is desired; API routes simplify backend logic. |
| Maps | **Google Maps API** | Pin placement, directions, distance-based filtering. |
| Database | **PostgreSQL** | Relational structure fits well: Users, Spots, Ratings, Photos, Check-ins as related tables. |
| Auth | School SSO (e.g., OAuth via institution) or NextAuth.js | Ties reviews to verified students, reduces fake data. |
| Image storage | Cloud storage (e.g., S3-compatible bucket) | Store user-uploaded photos, referenced by URL in PostgreSQL. |
| Hosting | Vercel (pairs naturally with Next.js) | Simple CI/CD, fast global delivery. |

### 3.5 Suggested Data Model (High-Level)

- **Users**: id, name, school email, preferences (optional saved filters)
- **Spots**: id, name, building, floor, coordinates (lat/lng), hours, capacity
- **Ratings**: id, spot_id, user_id, noise_level, wifi_quality, outlet_availability, crowding_at_time, comment, timestamp
- **Photos**: id, spot_id, user_id, image_url, timestamp
- **CheckIns** *(stretch goal)*: id, spot_id, user_id, timestamp, status (arrived/left)

### 3.6 Returning Student Flow

1. Student opens the app (web or mobile browser).
2. Selects a task-based filter or sets custom preferences (noise, Wi-Fi, outlets).
3. Views ranked list or map of matching spots, with ratings/photos visible at a glance.
4. Picks a spot, optionally gets directions via Google Maps.
5. After studying, optionally rates the spot / uploads a photo — feeding the system for future students.

This creates a **self-reinforcing feedback loop**: the more students use it, the more accurate and trustworthy the data becomes, which drives more usage.

### 3.7 New Student Sign-Up Flow

1. Student lands on the app and taps **"Get Started."**
2. Selects their school from a list, or it's auto-detected from their email domain (e.g., `@university.edu`).
3. Signs up using their school email or campus SSO — this is what ties their account (and future reviews) to a verified student identity.
4. Confirms their email or completes SSO login.
5. Optional quick preference setup: usual study tasks (deep focus, group work, etc.) and general noise/outlet needs — this personalizes their very first Home screen instead of showing generic results.
6. Lands on the Home/Discover screen, already populated with their specific campus's study spots.

If their school hasn't been onboarded yet (see 3.8 below), the student is shown a short **"Request your school"** prompt instead of an empty state — this captures demand signal even before a campus is live.

### 3.8 School / Institution Onboarding Flow

For the app to have any data at all, a school first needs to be set up on the platform. This is a separate, admin-facing flow:

1. A school representative (library staff, student affairs, IT department, or even a motivated student group) submits a **"Register your school"** request through a dedicated form.
2. They provide institution details: school name, official email domain (used later to verify student sign-ups), campus buildings/locations, and optional branding (logo, colors).
3. The platform team reviews the request — confirming it's a legitimate institution and that basic data-use terms are agreed to.
4. Once approved, the school gets its own dedicated space in the platform. Students with a matching email domain can now sign up under that school (see 3.7).
5. **Initial data seeding** (critical for avoiding a cold start): the school admin or library staff can bulk-add known study spots — building names, floors, hours, capacity — so the app isn't empty on day one.
6. The school can optionally assign a **moderator/admin role** to a staff member, who can verify spot info, respond to flagged reviews, or mark official facilities data (e.g., confirmed outlet counts) as "verified by [University]" for extra trust.
7. With the campus live and pre-seeded, the school promotes the app to its own students (via library website, orientation, student government, or campus email) to drive initial adoption.

This flow matters because it directly addresses two risks flagged earlier in this document (Section 8): **cold start** and **institutional overlap** — by giving schools a stake in seeding good data and officially endorsing the platform, rather than treating them as passive user bases.

---

## 4. Competitive Landscape & Positioning

**Direct competitors:**

- **Waitz** — real-time library busyness estimates, but only tells you *how busy*, not *how suitable*.
- **Affluences** — occupancy + room booking, but built as a library-management tool, not a student review/discovery platform.
- **University Spacefinder-style portals** — official campus data (hours, facilities), but static and generic, not preference-based.
- **QuietCorner** — closest match: live occupancy plus student reporting, but limited to crowding alone.
- **OpenRoom / sensor-based systems** — accurate occupancy via hardware, but costly and slow to deploy.

**Our competitive advantage:**

1. **Task-based recommendations** — suggest the right spot for *what you're doing* (focus work, group project, quick laptop session), not just an open seat.
2. **Multi-dimensional data** — noise, Wi-Fi, outlets, and crowding together, since an empty room isn't automatically a good one.
3. **Verified student reviews** — school-based authentication builds trust and keeps info current.
4. **Campus-specific depth** — going deep on one campus beats a generic multi-campus tool.
5. **Low-cost, crowdsourced launch** — no sensors or hardware needed to start.

**Positioning statement:** *"Find the right study space, not just an available one."*

---

## 5. UI Pages & Structure

Based on the features defined in Section 3, the app breaks down into the following core screens. Each is scoped to keep the MVP lean while leaving room for the stretch features to slot in later.

### 5.1 Onboarding / Login
**Purpose:** Verify the user is a real student and get them into the app fast.
**Content:**
- School email / SSO login (or sign-up).
- One-line value prop ("Find the right study spot, not just an available one").
- Optional: quick preference setup (default noise tolerance, usual task type) to personalize results from the first session.

### 5.2 Home / Discover (⭐ Main Feature Screen)
**Purpose:** The core screen — where a student states what they need and instantly sees matching spots. This is where the product's central value (task-based matching) must be front and center, not buried in a menu.
**Content:**
- Prominent **task-based filter bar** at the top: quick-select chips like "Deep Focus," "Group Project," "Quick Laptop Session," "Online Meeting" — tapping one instantly re-ranks results.
- Secondary filters (collapsible, not competing for attention): noise, Wi-Fi, outlets, crowding, distance, building, hours.
- Map view (Google Maps) with color-coded pins for crowding level, toggle to switch to list view.
- Each visible spot shows a compact card: name, distance, 2–3 key attribute icons (e.g., 🔇 quiet, 🔌 outlets, 📶 strong Wi-Fi), and current crowding indicator.

### 5.3 Search Results / List View
**Purpose:** Alternate to the map for scanning/comparing spots quickly.
**Content:**
- Ranked list, sorted by best match to selected task/filters.
- Same compact info per spot as the map cards, but easier to compare several at a glance.
- Sort options: best match, closest, highest rated, least crowded.

### 5.4 Spot Detail Page
**Purpose:** Give a student enough confidence in one spot to commit to walking there.
**Content:**
- Name, building/floor, hours, and a small location map/pin.
- Full attribute breakdown: noise level, Wi-Fi quality, outlet availability, typical crowding by time of day (mini chart if available).
- Photo gallery (student-uploaded).
- Reviews/comments list with timestamps ("last verified 2 days ago").
- Overall rating + rating count.
- Primary CTA: "Get Directions" (Google Maps deep link).
- Secondary CTA: "Rate this spot" / "Add a photo."

### 5.5 Add Review / Rate a Spot
**Purpose:** Capture the feedback loop that keeps data fresh and trustworthy.
**Content:**
- Simple rating inputs for the four core dimensions (noise, Wi-Fi, outlets, crowding).
- Optional photo upload.
- Optional short text comment.
- Can be a modal/step launched from the Spot Detail page rather than a full separate page, to reduce friction.

### 5.6 Favorites / Saved Spots
**Purpose:** Let repeat users skip search entirely for their go-to spots.
**Content:**
- List of saved spots with current status (open/crowded) shown inline.
- Quick access to directions from here.

### 5.7 Profile / Settings
**Purpose:** Manage account and preferences.
**Content:**
- Basic account info.
- Saved default preferences (so "Deep Focus" filter can auto-apply the student's personal noise/outlet thresholds).
- Review history (spots rated, photos uploaded).

### 5.8 (Stretch) Notifications
**Purpose:** Bring students back proactively once real-time data exists.
**Content:** Alerts like "Your favorite spot just opened up" or "Library 3rd floor usually clears out in 20 min."

---

## 6. Emphasizing the Main Feature in the UI

The single feature that should dominate the interface is **task-based smart matching** — it's what separates this product from a plain map or occupancy tracker (see Section 4). Everything else (map, ratings, photos) exists to *support* that core action: *tell us what you need, get the right spot.*

**How to keep it front and center:**

1. **Make it the first thing a user sees.** The task-selector chips ("Deep Focus," "Group Project," "Quick Session," "Online Meeting") should sit at the very top of the Home screen — above the map, not tucked into a filter drawer.
2. **Use one-tap interaction, not a form.** Selecting a task chip should instantly re-rank/re-filter results with no extra "Apply" step — speed reinforces the "search less, study more" promise.
3. **Reflect the match visibly on each spot card.** Instead of just showing raw attributes, show a short match reason: *"Matches your Deep Focus search — quiet, outlets available."* This makes the recommendation feel intentional, not just a filtered list.
4. **Keep secondary filters secondary.** Noise/Wi-Fi/outlets/crowding sliders should be available but visually smaller and collapsible — they support the main feature, they shouldn't compete with it.
5. **Carry it through onboarding.** Ask about typical study tasks/preferences at sign-up so the very first Home screen a student sees is already personalized, not generic.
6. **Reinforce it in copy, not just layout.** Button/header text like *"Find my spot"* rather than a generic *"Search"* keeps the task-matching promise visible in the language of the UI, not just its structure.

---

## 7. Success Metrics

To know if this solution actually solves the problem, track:

- **Time-to-decision**: average time from opening the app to selecting a spot (should trend down vs. baseline "wandering" behavior).
- **Rating volume & freshness**: number of new ratings/photos per week, especially during peak/exam periods.
- **Repeat usage**: percentage of students who return to the app across multiple study sessions.
- **User-reported satisfaction**: post-session survey ("Did this spot match what you needed?").
- **Spot coverage**: percentage of major campus buildings/floors represented in the database.

---

## 8. Risks & Open Questions

- **Cold start problem**: The app is only useful once enough spots have ratings. Consider seeding initial data (staff walkthrough survey of major buildings) before public launch.
- **Data staleness**: Ratings can go stale (renovations, semester schedule changes). Consider prompting re-verification after a certain time window.
- **Fake or biased reviews**: Requiring school-email verification and rate-limiting reviews per user/spot/day can help.
- **Privacy**: If check-ins or location tracking are added later, be clear about what's collected and why.
- **Adoption**: Value only appears at scale — an early marketing/onboarding push (e.g., partnering with student government, RAs, or the library itself) may be necessary to seed enough usage.

---

## 9. Suggested Next Steps

1. Validate the problem further with a short student survey (confirm noise/Wi-Fi/outlets/crowding are indeed the top pain points, and see if others emerge, e.g., temperature, food/drink policy).
2. Define MVP scope precisely (likely: map + spot profiles + manual ratings, without real-time check-ins).
3. Seed the database with an initial set of well-documented spots (library floors, dining hall corners, department lounges, etc.).
4. Build and test with a small pilot group before campus-wide rollout.
5. Iterate based on the success metrics above, prioritizing stretch features (real-time check-ins, heatmaps) based on what students actually request.

---

*This document frames the problem, the reasoning behind the proposed solution, and a roadmap for building it — intended as a starting point for design, technical planning, or a pitch deck.*
