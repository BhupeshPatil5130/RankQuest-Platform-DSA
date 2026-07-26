# 🏆 RankQuest Platform — DSA Problem Tracker

A full-stack DSA problem tracking platform with curated problem sheets, streak tracking, GitHub-style activity heatmaps, and global leaderboards.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 21, Spring Boot 3.5, Spring Security, JPA/Hibernate, H2 (dev) / PostgreSQL (prod) |
| **Auth** | JWT (jjwt) + Google OAuth 2.0, BCrypt password hashing |
| **Frontend** | React 18, Vite, TailwindCSS, Monaco Editor |
| **Deployment** | Render (backend Docker), Vercel (frontend) — **100% Free** |

## 📁 Project Structure

```
RankQuest-Platform-DSA/
├── Backend/
│   ├── Dockerfile               # Multi-stage Docker build
│   ├── .env.example             # Required backend env vars
│   └── src/main/java/com/rankquest/
│       ├── config/              # Security, CORS, JWT filter
│       ├── controller/          # REST endpoints
│       ├── dto/                 # Request/Response DTOs
│       ├── exception/           # Global exception handling
│       ├── model/               # JPA entities
│       ├── repository/          # Spring Data JPA repos
│       ├── service/             # Business logic
│       └── util/                # JWT utility, data seeder
├── Frontend/
│   ├── .env.example             # Required frontend env vars
│   ├── vercel.json              # Vercel SPA routing config
│   └── src/
│       ├── components/          # Reusable UI components
│       ├── contexts/            # AuthContext, ThemeContext
│       ├── pages/               # All page components
│       └── services/            # API service layer
└── render.yaml                  # Render deployment blueprint
```

## 🚀 Local Development

### Prerequisites
- Java 21 (JDK)
- Node.js 18+
- Maven (or use the included `./mvnw` wrapper)

### 1. Clone & Configure Environment

```bash
git clone https://github.com/your-username/RankQuest-Platform-DSA.git
cd RankQuest-Platform-DSA
```

**Frontend:**
```bash
cd Frontend
cp .env.example .env
# Edit .env and fill in your values (see table below)
```

**Backend:**
```bash
cd Backend
cp .env.example .env
# Edit .env and fill in your values (see table below)
# For local dev, the defaults work — no DB setup needed (uses H2 in-memory)
```

### 2. Run the Backend
```bash
cd Backend
./mvnw spring-boot:run
# Windows: mvnw.cmd spring-boot:run
```
Backend starts at `http://localhost:8080`. Uses H2 in-memory database by default.

### 3. Run the Frontend
```bash
cd Frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:3000`.

### Default Admin Account
- **Email:** `admin@rankquest.com`
- **Password:** `admin123`

---

## 🔐 Environment Variables

### Frontend (`Frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ | Backend API base URL (e.g. `http://localhost:8080/api`) |
| `VITE_GOOGLE_CLIENT_ID` | ✅ | Google OAuth 2.0 Client ID |
| `VITE_JUDGE0_API_KEY` | ✅ | RapidAPI Judge0 key for code execution |

### Backend (environment variables or `Backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | ✅ | `8080` | Server port |
| `JWT_SECRET` | ✅ | (dev default) | Secret key for signing JWTs — use 64+ random chars in prod |
| `JWT_EXPIRATION` | ❌ | `86400000` | Token lifetime in ms (24h) |
| `DATABASE_URL` | Prod only | H2 in-memory | PostgreSQL JDBC URL |
| `DATABASE_USERNAME` | Prod only | `sa` | DB username |
| `DATABASE_PASSWORD` | Prod only | _(empty)_ | DB password |
| `GOOGLE_CLIENT_ID` | ✅ | _(empty)_ | Google OAuth Client ID |
| `CORS_ORIGIN` | ✅ | `localhost:3000` | Comma-separated allowed frontend origins |

---

## 🌐 Deployment

### Backend → Render (Docker)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` — click **Apply**
5. In the Render dashboard, set these environment variables:
   - `DATABASE_URL` — PostgreSQL URL (create a free Render PostgreSQL DB first)
   - `DATABASE_USERNAME` — DB username
   - `DATABASE_PASSWORD` — DB password
   - `GOOGLE_CLIENT_ID` — your Google OAuth Client ID
   - `CORS_ORIGIN` — your Vercel frontend URL (e.g. `https://rankquest.vercel.app`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Import Project**
2. Connect your GitHub repo
3. Set **Root Directory** to `Frontend`
4. Set **Framework Preset** to **Vite**
5. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` — your Render backend URL + `/api`
   - `VITE_GOOGLE_CLIENT_ID` — your Google OAuth Client ID
   - `VITE_JUDGE0_API_KEY` — your RapidAPI Judge0 key

---

## ✨ Features

- 📊 **6 Curated Problem Sheets** — Striver SDE, Love Babbar 450, NeetCode 150, Blind 75, GFG Must Do, Apna College
- 🟢 **GitHub-Style Activity Heatmap** — 365-day contribution graph on Profile & Dashboard
- 🔥 **Streak Tracking** — Current streak, max streak, fire animations
- 📈 **Donut Chart** — Easy/Medium/Hard problem distribution visualization
- 🏆 **Global & College Rankings** — Leaderboard from real solve data
- 🔐 **JWT + Google OAuth** — Secure token-based auth
- 👤 **Rich Profiles** — College, branch, year, bio, roll number
- 🏅 **Dynamic Achievements** — Unlock badges based on progress
- 💻 **Code Playground** — In-browser code editor with Judge0 execution

## 📝 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login & get JWT |
| POST | `/api/auth/google` | ❌ | Google OAuth sign-in |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/problems` | ❌ | List all problems |
| GET | `/api/problems/{id}` | ❌ | Get problem details |
| GET | `/api/users/profile-by-email` | ✅ | Get user profile |
| PUT | `/api/users/profile` | ✅ | Update profile |
| POST | `/api/submissions/{id}` | ✅ | Submit solution |
| GET | `/api/submissions/my-solved` | ✅ | Get solved problem IDs |
| GET | `/api/rankings/global` | ❌ | Global leaderboard |
| GET | `/api/rankings/college` | ❌ | College leaderboard |
| GET | `/api/activity/heatmap` | ✅ | Activity heatmap data |

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
