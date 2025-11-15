# Home Renovation App

This is the MVP for an AI-powered home renovation planning app, built with Next.js, React, TypeScript, and TailwindCSS. It integrates with Notion (for PRD/documentation) and Airtable (for MVP data storage).

## 🚀 Features

- **Automatic PRD Sync**: Automatically checks for updates from your Notion PRD on startup
- **AI-Powered**: OpenAI GPT-4 integration for budget forecasting and receipt parsing
- **Mobile-First**: Responsive design optimized for mobile devices
- **Offline-First**: Core features work without internet connection
- **Real-Time Updates**: Live sync with Notion and Airtable
- **Usage Tracking**: Monitor API usage and limits for all integrated services

## 📁 Project Structure

```
home-renovation-app/
├── .cursor/             # Cursor-specific configuration and rules
│   └── rules            # AI development guidelines
├── public/              # Static assets
├── scripts/             # Utility scripts
│   ├── sync-prd.js      # PRD sync from Notion
│   └── startup-check.js # Startup PRD check
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── api/         # API routes
│   │   │   ├── sync-prd/ # PRD sync endpoints
│   │   │   └── check-prd/ # PRD check endpoints
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/             # Utility functions
│   │   ├── notion.ts    # Notion API client
│   │   ├── airtable.ts  # Airtable API client
│   │   └── prd-sync.ts  # PRD sync system
│   └── types/           # TypeScript type definitions
│       └── index.ts
├── .env.local           # Environment variables (local)
├── env.example          # Example environment variables
├── package.json         # Project dependencies and scripts
├── PRD.md               # Product Requirements Document (from Notion)
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # TailwindCSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project README
```

## 🛠️ Setup

### 1. **Clone the repository:**
```bash
git clone [repository-url]
cd home-renovation-app
```

### 2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

### 3. **Configure Environment Variables:**
Create a `.env.local` file in the project root based on `env.example`:

```bash
# Notion Configuration
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here
NOTION_PRD_PAGE_ID=0cede93e-2ae8-4b3b-b6b7-f48664145beb

# Airtable Configuration (MVP)
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# OpenAI Configuration (AI features)
OPENAI_API_KEY=your_openai_api_key_here

# PRD Sync Configuration
PRD_SYNC_ENABLED=true
PRD_AUTO_SYNC=false
```

**Getting API Keys:**
- **Notion API Key**: Get this from your Notion integration settings
- **Notion Database ID**: The ID of your Notion database for projects/tasks
- **Airtable API Key**: Your personal Airtable API key
- **Airtable Base ID**: The ID of your Airtable base
- **OpenAI API Key**: Get this from OpenAI's platform

### 4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

### 5. **Open your browser:**
Navigate to `http://localhost:3000`

## 📋 PRD Management

The app includes a simple PRD management system:

- **Local PRD**: Your PRD is available in `PRD.md` for AI context
- **Notion Sync**: Ask me to sync from Notion when you make changes
- **AI Integration**: Use `@PRD.md` in Cursor for AI assistance

### **How It Works:**

1. **Local Access**: PRD is available locally in `PRD.md`
2. **AI Context**: Use `@PRD.md` in Cursor for AI assistance
3. **Manual Sync**: Ask me to sync from Notion when needed
4. **Simple Workflow**: No complex automation, just direct control

## 🎯 Development Guidelines

Refer to the `PRD.md` and `.cursor/rules` files for detailed development guidelines, architectural decisions, and AI interaction patterns.

### **Key Principles:**
- **Mobile-First**: All components must be mobile-responsive
- **Offline-First**: Core features work without internet
- **AI-Augmented**: Provide loading states and fallbacks for AI features
- **Type Safety**: Use TypeScript strict mode
- **Performance**: Lazy load routes and optimize images

## 📊 Checking API Usage

To check your remaining API usage for OpenAI, Airtable, and Notion:

```bash
npm run check-usage
```

This will show you:
- Which services are configured
- Rate limits for each service
- Links to usage dashboards
- Configuration status

See [USAGE_TRACKING.md](USAGE_TRACKING.md) for detailed information about API limits and costs.

## 🚀 Next Steps

1. **Install dependencies** and set up environment variables
2. **Configure Airtable base** with the required tables
3. **Test Notion integration** with your PRD page
4. **Build core components** based on the design system
5. **Implement AI features** with OpenAI integration
6. **Add offline support** with service workers

## 📊 Project Metrics

- **Target Launch**: April 2026
- **Target Users**: 100 in 3 months
- **Revenue Goal**: £2,000 MRR
- **Tech Stack**: React + TypeScript + TailwindCSS
- **Database**: Airtable (MVP) → PostgreSQL (production)

## 🔧 Troubleshooting

### **Environment Issues:**
- Ensure all required environment variables are set in `.env.local`
- Check that API keys are valid and have proper permissions
- Verify database IDs are correct

### **Development Issues:**
- Run `npm run type-check` to check TypeScript errors
- Run `npm run lint` to check code quality
- Check the browser console for runtime errors

### **PRD Sync Issues:**
- Your PRD is available locally in `PRD.md`
- To sync from Notion, just ask me: "Please sync my PRD from Notion"
- No complex setup required - I handle it directly

## 📚 Resources

- **PRD**: `PRD.md` - Complete product requirements
- **Cursor Rules**: `.cursor/rules` - AI development guidelines
- **Design System**: `src/app/globals.css` - Visual design system
- **API Documentation**: `src/lib/` - Integration utilities

---

**Built with ❤️ for homeowners who want to renovate with confidence**