# 🎮 AcadXP — Turn Your Degree into a Game

Transform your academic journey into an engaging, gamified experience! Track your progress, visualize your skills, and level up through your degree with this comprehensive academic progress tracker.

## 🎯 Core Concepts

### 🎮 Gamification

Turn your degree into an RPG-style adventure where **you're the main character** and your goal is to **level up**:

- **XP (Experience Points):** Earn points for academic achievements
  - Completing a course: +1000 XP
  - Finishing a project: +300 XP
  - Getting an A on an exam: +150 XP
  - Learning a new programming language: +500 XP
- **Levels:** Progress through levels based on accumulated XP with a dynamic leveling formula

### 📊 Data Visualization

See your academic progress at a glance through powerful visualizations:

- **Line Charts:** Track XP and progress over time
- **Radar Charts:** Visualize skill balance across different domains
- **Bar Charts:** Monitor discrete goals and completion ratios

## ✨ Key Features

### 🏠 Dashboard (Main View)

- **XP Timeline:** Interactive line graph showing total XP earned throughout your degree
- **Current Level Display:** Prominent level indicator with progress to next level
- **Skills Radar:** Multi-dimensional skill visualization across categories:
  - Programming Languages
  - Web Frameworks
  - Databases
  - Theory & Concepts
- **Course Overview:** Current semester courses with status and grades
- **Upcoming Deadlines:** Quick view of assignments and exams

### 🗺️ Academic Timeline & Roadmap

- **Visual Degree Progression:** Complete 3-4 year degree roadmap
- **Color-coded Course Status:**
  - 🟢 **Completed** - Finished courses
  - 🟡 **In Progress** - Current courses
  - ⚪ **Not Started** - Future courses
- **Interactive Course Details:** Click any course for detailed information

### 📚 Detailed Course Pages

Each course includes:

- Course description & syllabus
- Final grade and performance metrics
- Projects and assignments list
- Skills gained/improved
- Personal notes and key takeaways

### 💼 Project Portfolio

Showcase your academic work:

- Project descriptions with screenshots
- Technologies and skills utilized
- GitHub repository links
- XP earned per project

### 📝 Data Management

Easy-to-use forms for:

- Adding new courses to semesters
- Logging completed projects with XP assignment
- Updating course grades
- Tracking skill development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Lil-Code30/academic-xp-tracker_frontend.git
cd academic-xp-tracker_frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** TanStack Query + Axios
- **Form Handling:** React Hook Form + Zod

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── charts/           # Data visualization components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── store/                # State management
└── styles/               # Global styles and themes
```

## 🎨 Design Philosophy

This application follows the principles of:

- **Gamification:** Making academic progress engaging and rewarding
- **Data-Driven Insights:** Transforming academic data into actionable visualizations
- **User-Centric Design:** Intuitive interfaces that motivate continued use
- **Progress Transparency:** Clear visibility into academic growth and skill development

## 🔄 Development Roadmap

### Phase 1: Core Dashboard

- [ ] XP system implementation
- [ ] Level calculation algorithm
- [ ] Basic dashboard layout
- [ ] Course management

### Phase 2: Visualizations

- [ ] XP timeline charts
- [ ] Skills radar implementation
- [ ] Progress tracking charts
- [ ] Interactive data displays

### Phase 3: Advanced Features

- [ ] Project portfolio
- [ ] Detailed course pages
- [ ] Academic timeline
- [ ] Data export/import

### Phase 4: Polish & Optimization

- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by RPG progression systems and academic achievement tracking
- Built with modern React and Next.js ecosystem
- Designed to make academic progress engaging and measurable

---

**Ready to level up your academic journey?** 🚀 Start tracking your XP today!
