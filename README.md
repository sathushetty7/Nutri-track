# NutriTrack: Advanced AI-Powered Nutrition Tracking & Smart Meal Planning Platform

NutriTrack is an advanced, full-stack wellness technology web application designed to help individuals understand their eating habits, monitor daily macronutrients, and discover healthy meals using ingredients they already have in their kitchen.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase PostgreSQL with Row Level Security (RLS)**, **Google Gemini Multi-Modal Vision AI**, and **Recharts**.

---

## 🌟 Key Capabilities

1. **AI-Assisted Meal Photo Scanner**
   - Drag & drop image upload or live webcam viewfinder snapshot.
   - Server-side multi-modal food recognition with structured JSON schemas (`/api/analyze-meal`).
   - Architectural separation of vision identification from nutrition calculation.
   - Cross-references a verified local database of Indian and global foods.
   - Fully editable interface: adjust gram portions, change serving sizes, remove items, add missing foods, and recalculate totals before confirming.
   - Transparent badges distinguishing verified database records (`verified_db`) from estimated values (`ai_estimate`).

2. **Personalized Nutrition Dashboard & Analytics**
   - Dynamic greeting and daily progress overview.
   - Real-time SVG circular progress rings for Calories, Protein, Carbohydrates, and Fats.
   - Remaining daily calorie budget indicator.
   - 7-Day Calorie Rhythm bar chart and weekly consistency rating.
   - Macronutrient energy distribution donut chart.
   - Today's Meals timeline broken down by Breakfast, Lunch, Dinner, and Snacks.
   - Contextual supportive suggestions based on remaining nutrient gaps (e.g. protein targets).

3. **Smart Ingredient-Based Recipe Discovery**
   - Enter ingredients currently available at home (e.g., *rice, tomato, onion, paneer, spinach*).
   - Pre-populated pantry staple chips and custom ingredient entry.
   - Match calculation algorithm displaying exact percentage availability and missing ingredients.
   - **Strict Food Allergy Filter**: Automatically and unconditionally excludes recipes containing any of the user's recorded allergies.
   - Dietary filters: High Protein (&ge;16g), Quick (&le;25 mins), Vegetarian, Vegan, Balanced.
   - Detailed recipe modal with full ingredients checklist, step-by-step cooking instructions, and 1-click "Log as Meal" to diary.

4. **Daily Nutrition Goals & Metabolic Calculator**
   - Interactive calorie, protein, carbohydrate, and fat target sliders.
   - Built-in Mifflin-St Jeor BMR & TDEE metabolic estimator based on age, gender, height, weight, activity level, and goal (Maintain Weight, Build Muscle, Balanced Nutrition, Weight Management).
   - Instant reactive synchronization with the main dashboard.
   - Guilt-free, supportive feedback ("You're making steady progress today").

5. **Complete Meal History & Food Diary**
   - Interactive calendar date navigation (previous day, next day, today, custom date picker).
   - Filter by meal category (All, Breakfast, Lunch, Dinner, Snacks) and real-time food search.
   - Daily nutrition totals summary banner.
   - Itemized food breakdown with gram weights and macro badges.
   - Safe meal deletion with immediate reactive updates.

6. **User Profile, Onboarding & Security**
   - 3-step onboarding flow after registration collecting biometrics, dietary lifestyle, and allergies.
   - Profile completion score meter.
   - Supabase Authentication (email/password, session persistence, password reset).
   - Account settings and password management.
   - Dual-engine architecture: Cloud Supabase PostgreSQL + zero-config local storage/demo fallback.

---

## 🏗️ System Architecture

```
Food Photo / Camera
       │
       ▼
Next.js Server API (/api/analyze-meal)
       │
       ├─► Google Gemini Vision API (or Calibrated Heuristic Engine)
       │   └─ Returns structured food labels & estimated portions
       │
       ├─► Verified Nutrition Database Lookup (foodDatabase.ts)
       │   └─ Exact calories, protein, carbs, fat per 100g base
       │
       ├─► Calibrated Portion & Weight Adjustment
       │
       ▼
User Review & Edit Interface (Adjust grams, add/remove foods)
       │
       ▼ (User Confirmation Required)
Supabase PostgreSQL (or Local Storage Engine)
       │
       ▼
Daily Dashboard & 7-Day Analytics Synchronization
```

---

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 with bespoke wellness color palette:
  - Forest Green: `#173F35`
  - Deep Green: `#245B48`
  - Sage: `#A8BFA5`
  - Soft Mint: `#E8F1E8`
  - Warm Cream: `#F8F7F1`
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Database & Auth**: Supabase PostgreSQL + Row Level Security (RLS)
- **AI Vision**: Google Gemini 1.5/2.0 Flash REST API + Calibrated Heuristic Engine

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/nutritrack.git
cd nutritrack
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration details:
```env
# Supabase Configuration (Optional: runs in seamless Demo Mode if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Gemini Vision API Key (For live multi-modal meal photo scanning)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Database Setup (Supabase)
If connecting to Supabase:
1. Open your Supabase Project SQL Editor.
2. Run the SQL script located in `supabase/schema.sql` to create all tables, indexes, triggers, and Row Level Security policies.
3. Run `supabase/seed.sql` to seed the curated recipes catalog.

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Medical Disclaimer

> **IMPORTANT MEDICAL & NUTRITION DISCLAIMER**:
> NutriTrack is an informational technology tool developed for academic, educational, and lifestyle wellness purposes. It is **NOT** medical software and does not provide clinical diagnosis, medical prescriptions, or healthcare treatment.
> Food recognition algorithms, portion weights, and nutritional figures are estimates that can vary based on ingredients and cooking methods. Users must independently review all detected items before saving. Individuals with chronic medical conditions, eating disorders, or pregnancy should consult a qualified physician or registered dietitian before making dietary modifications.
