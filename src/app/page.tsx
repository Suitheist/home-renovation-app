'use client';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🏠 Home Renovation App
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Development Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Renovation Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI-powered home renovation planning that bridges the gap between 
              consumer and professional tools while addressing your core challenges.
            </p>
          </div>

          {/* PRD Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📋 PRD Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">PRD Status:</span>
                <span className="text-sm font-medium text-gray-900">Available locally</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Your PRD is available in <code className="bg-gray-100 px-2 py-1 rounded">PRD.md</code></p>
                <p className="mt-2">To sync with Notion, just ask: "Please sync my PRD from Notion"</p>
              </div>
            </div>
          </div>

          {/* Development Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🚀 Development Ready
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Project structure created</li>
                <li>✅ Notion API integration</li>
                <li>✅ Airtable MVP setup</li>
                <li>✅ Design system implemented</li>
                <li>✅ TypeScript types defined</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎯 Next Steps
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>🔧 Install dependencies</li>
                <li>🔑 Set up environment variables</li>
                <li>🗄️ Configure Airtable base</li>
                <li>🎨 Create first components</li>
                <li>🤖 Test AI integration</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Project Metrics
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Target Launch: April 2026</li>
                <li>Target Users: 100 in 3 months</li>
                <li>Revenue Goal: £2,000 MRR</li>
                <li>Tech Stack: React + TypeScript</li>
                <li>Database: Airtable → PostgreSQL</li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🛠️ Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="btn-primary touch-target">
                📝 Create Project
              </button>
              <button className="btn-secondary touch-target">
                💰 Add Expense
              </button>
              <button className="btn-secondary touch-target">
                📸 Take Photo
              </button>
              <button className="btn-secondary touch-target">
                🤖 AI Assistant
              </button>
            </div>
          </div>

          {/* Development Commands */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              💻 Development Commands
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <pre className="text-sm text-gray-800">
{`# Install dependencies
npm install

# Start development server
npm run dev

# Initialize Git repository
npm run init-git

# Set up GitHub repository
npm run setup-github

# Run type checking
npm run type-check

# Run tests
npm run test`}
              </pre>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with ❤️ for homeowners who want to renovate with confidence</p>
            <p className="mt-2">PRD Version: v1.1.0 | Last Updated: 25 October 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
