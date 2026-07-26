# ============================================================
#  RankQuest Platform — Professional GitHub Push Script
#  Run this from the project root directory
#  BEFORE RUNNING: create an empty repo on GitHub and paste
#  the SSH or HTTPS URL into $GITHUB_REMOTE_URL below
# ============================================================

$GITHUB_REMOTE_URL = "https://github.com/BhupeshPatil5130/RankQuest-Platform-DSA.git"
$BRANCH = "main"
$ROOT = $PSScriptRoot   # automatically = folder where this script lives

Set-Location $ROOT

# ── Safety check ────────────────────────────────────────────
if ($GITHUB_REMOTE_URL -like "*YOUR_USERNAME*") {
    Write-Host ""
    Write-Host "❌  ERROR: Please set your GitHub remote URL in this script first." -ForegroundColor Red
    Write-Host "    Open push_to_github.ps1 and replace YOUR_USERNAME on line 9." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  RankQuest Platform — GitHub Push Script" -ForegroundColor Cyan
Write-Host "══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Remove old git history & start fresh ────────────
Write-Host "► Removing old git history..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

git init
git checkout -b $BRANCH

# ── Step 2: Configure git author (uses global config) ───────
Write-Host "► Using git global config for author..." -ForegroundColor Yellow
git config --get user.name | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠  No global git user set. Setting temporary values..." -ForegroundColor Yellow
    git config user.name "RankQuest Dev"
    git config user.email "dev@rankquest.com"
}

# ── Delete junk files before committing ─────────────────────
$junkFiles = @(
    "Frontend\src\pages\Profile_broken.jsx",
    "Frontend\src\pages\Profile_new.jsx"
)
foreach ($f in $junkFiles) {
    if (Test-Path $f) {
        Remove-Item -Force $f
        Write-Host "  Deleted $f" -ForegroundColor DarkGray
    }
}

# ────────────────────────────────────────────────────────────
# COMMIT 1 — Project root scaffold
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 1/10: Project root scaffold ──" -ForegroundColor Green
git add ".gitignore"
git add "README.md"
git add "render.yaml"
git commit -m "chore: initialize project root with gitignore, README, and Render config

- Add root .gitignore covering node_modules, dist, target, .env, IDE files
- Add comprehensive README with tech stack, setup guide, and deployment docs
- Add render.yaml blueprint for Docker-based Render deployment
- Configure all required environment variable slots in render.yaml"

# ────────────────────────────────────────────────────────────
# COMMIT 2 — Spring Boot project foundation
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 2/10: Spring Boot project foundation ──" -ForegroundColor Green
git add "Backend/pom.xml"
git add "Backend/mvnw"
git add "Backend/mvnw.cmd"
git add "Backend/.mvn/"
git add "Backend/Dockerfile"
git add "Backend/system.properties"
git add "Backend/.gitignore"
git add "Backend/.env.example"
git add "Backend/.gitattributes"
git commit -m "feat(backend): add Spring Boot 3.5 project foundation

- Java 21 + Spring Boot 3.5 with Maven wrapper
- Dependencies: Spring Security, JPA, Validation, JWT (jjwt 0.12.6)
- Dual database support: H2 (dev) + PostgreSQL (production)
- Multi-stage Dockerfile: maven:3.9 builder + eclipse-temurin:21-jre-alpine runner
- system.properties for Java version hint on cloud platforms
- Lombok for boilerplate reduction"

# ────────────────────────────────────────────────────────────
# COMMIT 3 — JPA data models
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 3/10: JPA data models ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/RankquestApplication.java"
git add "Backend/src/main/java/com/rankquest/model/"
git commit -m "feat(backend): add JPA entity models

- User: email, username, password (BCrypt), college, branch, year, bio, role
- Problem: title, difficulty, topics, constraints, examples, sheet mappings
- Sheet: slug, name, description, curated problem list
- Submission: user-problem mapping, language, verdict, timestamps
- ActivityLog: daily solve count for GitHub-style activity heatmap
- Role enum: ADMIN / USER"

# ────────────────────────────────────────────────────────────
# COMMIT 4 — Repositories
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 4/10: Spring Data JPA repositories ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/repository/"
git commit -m "feat(backend): add Spring Data JPA repositories

- UserRepository: find by email, username; existence checks
- ProblemRepository: filter by difficulty, topic, sheet slug
- SheetRepository: find by slug for canonical sheet URLs
- SubmissionRepository: solved IDs per user, verdict counts
- ActivityLogRepository: heatmap queries with date range support"

# ────────────────────────────────────────────────────────────
# COMMIT 5 — DTOs
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 5/10: Request/Response DTOs ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/dto/"
git commit -m "feat(backend): add request and response DTOs

- SignUpRequest / LoginRequest with Bean Validation annotations
- LoginResponse: JWT token + user info envelope
- GoogleTokenRequest: Google OAuth ID token receiver
- UserProfileResponse: public profile projection (no password)
- UpdateProfileRequest: partial profile update payload
- RankingEntry: leaderboard row (rank, username, solve counts)
- ActivityResponse: heatmap data point (date + count)
- ApiResponse<T>: generic success/error wrapper for all endpoints"

# ────────────────────────────────────────────────────────────
# COMMIT 6 — Service layer
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 6/10: Business logic service layer ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/service/"
git commit -m "feat(backend): add service layer with full business logic

- AuthService: signup, login, Google OAuth via tokeninfo endpoint
- UserService: profile read/update, college lookup for rankings
- SubmissionService: verdict tracking, idempotent solve recording
- SheetService: sheet + problem list resolution by slug
- RankingService: global and per-college leaderboard computation
- ActivityService: 365-day heatmap aggregation from ActivityLog"

# ────────────────────────────────────────────────────────────
# COMMIT 7 — REST controllers + exception handling
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 7/10: REST controllers and exception handler ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/controller/"
git add "Backend/src/main/java/com/rankquest/exception/"
git commit -m "feat(backend): add REST controllers and global exception handler

- AuthController: signup, login, Google OAuth, /me endpoint
- ProblemController: list all problems, get by ID
- SheetController: list sheets, get problems by sheet slug
- SubmissionController: submit solution, get solved problem IDs
- UserController: get and update user profile by email
- RankingController: global and college-scoped leaderboards
- ActivityController: 365-day activity heatmap endpoint
- GlobalExceptionHandler: unified @ControllerAdvice with typed error responses"

# ────────────────────────────────────────────────────────────
# COMMIT 8 — Security, JWT, CORS, data seeder
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 8/10: Security, JWT, CORS, and data seeder ──" -ForegroundColor Green
git add "Backend/src/main/java/com/rankquest/config/"
git add "Backend/src/main/java/com/rankquest/util/"
git add "Backend/src/main/resources/"
git commit -m "feat(backend): add security, JWT, CORS config, and data seeder

- SecurityConfig: stateless JWT, public vs protected endpoint rules
- JwtAuthFilter: OncePerRequestFilter with Bearer token extraction
- JwtUtil: HS256 token generation and validation (configurable expiry)
- WebConfig: env-var-driven CORS (CORS_ORIGIN supports multiple origins)
- application.properties: fully env-var-driven
  * H2 in-memory for zero-setup local dev
  * Auto-switches to PostgreSQL when DATABASE_URL is set
- DataInitializer: seeds 6 curated sheets with 450+ problems on startup
  * Striver SDE, Love Babbar 450, NeetCode 150, Blind 75,
    GFG Must Do, Apna College DSA Sheet"

# ────────────────────────────────────────────────────────────
# COMMIT 9 — Frontend foundation
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 9/10: React + Vite frontend foundation ──" -ForegroundColor Green
git add "Frontend/package.json"
git add "Frontend/package-lock.json"
git add "Frontend/vite.config.js"
git add "Frontend/index.html"
git add "Frontend/tailwind.config.js"
git add "Frontend/postcss.config.js"
git add "Frontend/vercel.json"
git add "Frontend/.gitignore"
git add "Frontend/.env.example"
git add "Frontend/src/main.jsx"
git add "Frontend/src/index.css"
git add "Frontend/src/App.jsx"
git add "Frontend/src/lib/"
git add "Frontend/src/contexts/"
git add "Frontend/src/hooks/"
git add "Frontend/src/data/"
git add "Frontend/src/components/"
git add "Frontend/src/services/"
git commit -m "feat(frontend): add React 18 + Vite project foundation

- Vite 7 + React 18 with TailwindCSS 3 design system
- Path alias @ -> src/ for clean absolute imports
- Custom dark-mode color tokens in index.css
- AuthContext: JWT storage, login/logout/Google OAuth state management
- ThemeContext: dark/light theme toggle with localStorage persistence
- ProtectedRoute: redirect-to-login guard for authenticated pages
- apiService.js: centralized fetch helper with JWT injection and error handling
  * All secrets read from environment variables only (no hardcoded values)
- App.jsx: React Router v6 with public and protected route tree
- vercel.json: SPA wildcard rewrite for client-side routing on Vercel
- UI components: Button, Card, Badge, Input, Toast, CodeEditor
- Feature components: ActivityHeatmap, StreakDisplay, StatsDonutChart
- Layout: responsive Navbar with auth state and theme toggle"

# ────────────────────────────────────────────────────────────
# COMMIT 10 — All application pages
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Commit 10/10: All application pages ──" -ForegroundColor Green
git add "Frontend/src/pages/Login.jsx"
git add "Frontend/src/pages/Register.jsx"
git add "Frontend/src/pages/Dashboard.jsx"
git add "Frontend/src/pages/Sheets.jsx"
git add "Frontend/src/pages/SheetDetail.jsx"
git add "Frontend/src/pages/ProblemSolver.jsx"
git add "Frontend/src/pages/Rankings.jsx"
git add "Frontend/src/pages/Profile.jsx"
git add "Frontend/src/pages/Settings.jsx"
git add "Frontend/src/pages/Resources.jsx"
git add "Frontend/src/pages/CodePlayground.jsx"
git add "Frontend/src/pages/Home.jsx"
git add "Frontend/src/docs/"
git commit -m "feat(frontend): add all application pages

- Login / Register: JWT auth + Google OAuth one-click sign-in
- Dashboard: activity heatmap, streak display, donut chart, recent solves
- Sheets: browse all 6 curated DSA sheets with completion progress bars
- SheetDetail: filterable problem list with difficulty badges, solve toggling
- ProblemSolver: Monaco editor, Judge0 code execution, submission recording
- CodePlayground: standalone editor supporting 10+ languages via Judge0
- Rankings: global and per-college leaderboard with real-time solve counts
- Profile: public profile with heatmap, achievements, and stats overview
- Settings: profile editing (college, branch, year, bio, roll number)
- Resources: curated DSA learning resources organized by topic"

# ────────────────────────────────────────────────────────────
# PUSH TO GITHUB
# ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "── Pushing to GitHub ────────────────────────────────" -ForegroundColor Cyan
git remote add origin $GITHUB_REMOTE_URL
git push -u origin $BRANCH

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅  All 10 commits pushed successfully!" -ForegroundColor Green
    Write-Host "    $GITHUB_REMOTE_URL" -ForegroundColor Cyan
} else {
    Write-Host "❌  Push failed. Check your remote URL and GitHub credentials." -ForegroundColor Red
    Write-Host ""
    Write-Host "  If using HTTPS, use a Personal Access Token as your password." -ForegroundColor Yellow
    Write-Host "  Create one at: https://github.com/settings/tokens" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  If using SSH, make sure your SSH key is added to GitHub:" -ForegroundColor Yellow
    Write-Host "  https://github.com/settings/keys" -ForegroundColor Yellow
}
Write-Host ""
