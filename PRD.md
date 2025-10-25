# 🤖 Prompt Requirements Document (PRD) - Home Renovation App

A structured framework for AI-assisted development of our home renovation app, defining how to effectively collaborate with AI tools like Cursor throughout the development lifecycle.

## Document Structure & Usage
**File Location:** `/docs/PRD.md` in project root
**Purpose:** Single source of truth for product requirements, architecture decisions, and AI development guidance
**How to Reference in Cursor:**
- Open this file in your workspace
- Use `@PRD.md` in Cursor chat to reference specific sections
- Pin this file during development sessions for consistent AI context

## Project Context

### Problem Statement
Homeowners undertaking renovation projects face a **crisis of confidence and support** that leads many to abandon projects, make costly mistakes, or experience deep discouragement. This crisis manifests across four interconnected dimensions:

**1. Financial Anxiety & Information Gaps**
Homeowners struggle with high-stakes financial decisions without reliable data. They cannot validate whether contractor quotes are reasonable (e.g., "Is £70,000 for 30 windows fair for my area?"), lack baseline budgets for projects, and face complex decisions about whether to start with partial funding or risk inflation by waiting.

**2. Technical Knowledge Barriers**
DIYers face constant uncertainty about how to execute tasks correctly. They cannot diagnose problems from symptoms (cracks, leaks, water damage), lack step-by-step guidance for specific procedures, and make expensive material selection mistakes.

**3. Planning & Scoping Paralysis**
Novice renovators don't know where to start. They cannot visualize spatial layouts to fit desired features within constraints, lack realistic timeline estimates for projects, and struggle to sequence tasks properly.

**4. Emotional Toll & Discouragement**
The most poignant challenge: homeowners express devastating frustration—*"Everything I do just makes my house look cheaper/worse. I am so discouraged I don't want to work on it anymore."*

### Product Vision
Build an AI-powered home renovation planning app that bridges the gap between consumer and professional tools while addressing the core emotional, financial, and technical challenges that cause homeowners to abandon or regret their renovation projects.

### Target Users
1. **Primary**: DIY homeowners managing their own renovation projects
2. **Secondary**: Homeowners working with contractors who need collaboration tools
3. **Future**: Small contractors or landlords / owners of multiple properties

### Success Metrics (MVP)
- User acquisition: 100 users in first 3 months post-launch (July 2026)
- Engagement: 60% weekly active users
- Retention: 40% retention after 30 days
- Revenue: £2,000 MRR by month 6

## Technical Architecture

### Technology Stack
**Frontend:**
- Framework: React (web) / React Native (mobile)
- UI Design: Visily or Banani for mockups
- Styling: TailwindCSS
- State Management: React Context + hooks initially, consider Redux if complexity grows

**Backend & Data:**
- Database: Airtable (MVP prototype) → migrate to PostgreSQL for production
- Authentication: Auth0 or Supabase Auth
- API: RESTful initially, consider GraphQL for complex queries
- File Storage: AWS S3 or Cloudflare R2

**AI Integration:**
- AI Chatbot: OpenAI GPT-4 API for renovation advice
- Budget Forecasting: Custom ML model or GPT-4 with structured outputs
- Receipt/Invoice Parsing: OpenAI Vision API

**Development Tools:**
- IDE: Cursor (primary AI coding assistant)
- Version Control: GitHub
- Hosting: Vercel (web) or AWS Amplify
- CI/CD: GitHub Actions

### Architectural Principles
1. **Mobile-first design**: Optimize for on-the-go usage at hardware stores and job sites
2. **Offline-first**: Core features must work without internet (sync when connected)
3. **API-first**: Design backend to support future integrations and third-party access
4. **Progressive enhancement**: Start simple, add complexity only when needed
5. **AI-augmented, not AI-dependent**: AI features should enhance UX, not be required

### Data Model (Core Entities)
**Projects**
- id, name, address, start_date, target_end_date, status, total_budget, user_id
- Relations: has many Tasks, Expenses, Documents, Photos

**Tasks**
- id, project_id, name, description, status, assigned_to, due_date, dependencies, estimated_cost, actual_cost
- Relations: belongs to Project, has many Subtasks

**Expenses**
- id, project_id, task_id, category, amount, date, vendor, receipt_image_url, payment_method, notes
- Relations: belongs to Project and Task

**Documents**
- id, project_id, name, type, file_url, uploaded_date, tags
- Relations: belongs to Project

**Photos**
- id, project_id, task_id, file_url, caption, taken_date, tags, location
- Relations: belongs to Project, optionally linked to Task

## Design Principles

### User Experience
1. **Clarity over features**: Simple, focused interface beats feature bloat
2. **Quick capture**: Add expenses, photos, notes in < 10 seconds
3. **Visual progress**: Always show budget vs. actual and task completion
4. **Contextual AI**: AI suggestions appear when helpful, not intrusive
5. **Trust through transparency**: Show AI reasoning for budget forecasts

### Code Quality Standards
1. **Type safety**: Use TypeScript throughout
2. **Component modularity**: Max 200 lines per component
3. **Reusability**: Create design system with shared components
4. **Performance**: Page load < 2s, interactions < 100ms
5. **Accessibility**: WCAG 2.1 AA compliance minimum

### Security & Privacy
1. **Data encryption**: At rest (AES-256) and in transit (TLS 1.3)
2. **Authentication**: Multi-factor authentication optional for users
3. **Authorization**: Role-based access control for shared projects
4. **PII handling**: GDPR compliant, minimal data collection
5. **Backup strategy**: Daily automated backups with 30-day retention

## Visual Design System

### Color Palette
**Primary Colors:**
- Primary: `#3B82F6` - Main brand color for CTAs, key actions
- Primary Dark: `#1E40AF` - Hover states, emphasis
- Primary Light: `#DBEAFE` - Backgrounds, subtle highlights

**Neutral Colors:**
- Gray 900: `#111827` - Primary text
- Gray 700: `#374151` - Secondary text
- Gray 500: `#6B7280` - Placeholder text, disabled states
- Gray 300: `#D1D5DB` - Borders, dividers
- Gray 100: `#F3F4F6` - Background, subtle surfaces
- Gray 50: `#F9FAFB` - Page background
- White: `#FFFFFF`

**Semantic Colors:**
- Success: `#10B981` - Positive actions, completed tasks, budget under target
- Warning: `#F59E0B` - Alerts, approaching budget limits
- Error: `#EF4444` - Errors, budget overruns, failed actions
- Info: `#3B82F6` - Informational messages, tips

### Typography
**Font Family:**
- Primary: `Inter` - Body text, UI elements
- Monospace: `JetBrains Mono` - Budget figures, data display

**Type Scale:**
- Display: `48px` / `3rem` - Hero text (rare use)
- H1: `36px` / `2.25rem` - Page titles
- H2: `30px` / `1.875rem` - Section headings
- H3: `24px` / `1.5rem` - Subsection headings
- Body Large: `18px` / `1.125rem` - Emphasized body text
- Body: `16px` / `1rem` - Default body text
- Body Small: `14px` / `0.875rem` - Secondary text, captions
- Label: `12px` / `0.75rem` - Form labels, UI labels

### Spacing System
Use a consistent 4px/8px base unit system:
- `xs`: 4px - Tight spacing within components
- `sm`: 8px - Component padding, small gaps
- `md`: 16px - Default spacing between elements
- `lg`: 24px - Section spacing
- `xl`: 32px - Major section breaks
- `2xl`: 48px - Page-level spacing
- `3xl`: 64px - Large page sections

### Component Patterns
**Cards:**
- Border radius: `8px`
- Shadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1)` for elevation
- Padding: `md` (16px) on mobile, `lg` (24px) on desktop

**Forms:**
- Input height: 44px minimum (touch-friendly)
- Border radius: `6px`
- Focus state: 2px border in primary color
- Error state: Red border + error message below

**Buttons:**
- Primary: Filled, primary color background
- Secondary: Outlined, transparent background
- Tertiary: Text only, no background or border
- Height: 44px minimum (touch-friendly)
- Border radius: `6px`
- Disabled: 50% opacity

### Key User Flows
**1. Add Expense (< 10 seconds):**
- Single-screen form
- Auto-focus on amount field
- Smart defaults (date = today, category from last entry)
- Camera button prominent for receipt capture
- "Save" button fixed at bottom (always visible)

**2. Create Project:**
- Multi-step wizard (3 steps max)
- Progress indicator at top
- Step 1: Basic info (name, location)
- Step 2: Budget setup
- Step 3: Optional: Add initial tasks

**3. Budget Overview:**
- Dashboard view: Total budget, spent, remaining
- Visual progress bar (green → yellow → red as approaching/exceeding budget)
- Top 3 expense categories
- Quick action: "Add Expense" FAB (floating action button)

**4. Photo Documentation:**
- Native camera integration
- Option to select from gallery
- Auto-tag with current project/task
- Quick caption entry
- Bulk upload support

## Proposed App Development Stages

### Phase 1: MVP (April 2026)
- Basic project & task management
- Expense tracking with receipt capture
- Budget vs. actual reporting
- AI chatbot for renovation advice
- Photo documentation

### Phase 2: Enhanced (Q3 2026)
- Contractor collaboration features
- Calendar/timeline view
- Integration with accounting software
- Advanced AI budget forecasting
- Mobile app (iOS/Android)

### Phase 3: Platform (Q4 2026)
- Marketplace for contractors/suppliers
- AR visualization for design
- Material price tracking
- Sustainability metrics
- API for third-party integrations
