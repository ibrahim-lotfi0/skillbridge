![SkillBridge Banner](file:///C:/Users/ASUS/.gemini/antigravity/brain/81980c40-d921-4180-b241-f27f47dbdea0/skillbridge_banner_1778931289976.png)

# 🚀 SkillBridge AI: Empowering the Workforce of Tomorrow

**SkillBridge** is a cutting-edge AI-powered career ecosystem designed to combat unemployment by bridging the gap between skills and opportunities. It leverages advanced Generative AI to provide personalized career guidance, interview preparation, and real-time skill analysis.

---

## 🌟 Key Features

### 1. 🤖 AI-Powered Job Matching
Our smart algorithm doesn't just match keywords; it understands context. It analyzes your resume, skills, and aspirations to find opportunities that truly align with your potential.

### 2. 🎤 Interview Lab (Simulator)
Practice makes perfect. Our AI Interview Simulator provides:
- **Real-time Voice/Text Interaction**: Conduct realistic mock interviews.
- **Instant Feedback**: Get scores on clarity, technical accuracy, and soft skills.
- **Tailored Questions**: Questions adapt based on the specific job role and your seniority.

### 3. 🗺️ Personalized Learning Roadmap
Identify your "Skill Gaps" instantly. SkillBridge analyzes your target job and creates a step-by-step learning path, recommending specific courses and projects to make you "job-ready."

### 4. 💼 Micro-Gigs Marketplace
Start earning while you learn. A specialized marketplace for short-term projects that help users build their portfolio and gain real-world experience.

### 5. 📊 Real-time Salary Insights
Stay informed with data-driven salary benchmarks based on your location, experience level, and specific skill set.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Framer Motion (for premium animations).
- **Styling**: Tailwind CSS 4 with custom design tokens.
- **Backend/AI**: Node.js, Google Gemini AI (Generative AI Integration).
- **Database**: Prisma ORM with PostgreSQL.
- **Internationalization**: `next-intl` (Full support for Arabic and English).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL instance (or use mock data mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillBridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="postgresql://..."
   GEMINI_API_KEY="your_api_key_here"
   NEXTAUTH_SECRET="your_secret"
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the platform.

---

## 🏗️ Architecture

The project follows a modern, modular architecture:
- `src/components/shared`: Reusable UI components (Navbar, Footer, etc.)
- `src/components/seeker`: Features specific to job seekers.
- `src/components/employer`: Tools for recruiters and companies.
- `src/app/actions`: Server Actions for secure, fast data handling.
- `src/lib`: Core logic including AI prompts and database utilities.

---

## 🌍 Language Support
SkillBridge is built with a global mindset, offering full RTL support and seamless switching between:
- 🇸🇦 **Arabic**
- 🇺🇸 **English**

---

Developed with ❤️ for the future of work.
