#!/bin/bash

# Git Initialization Script for Home Renovation App
# This script initializes Git and prepares the repository for GitHub

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in the right directory
check_project_directory() {
    if [ ! -f "package.json" ]; then
        print_error "Not in the home-renovation-app project directory"
        print_status "Please run this script from the project root"
        exit 1
    fi
}

# Function to initialize Git repository
init_git_repo() {
    if [ -d ".git" ]; then
        print_success "Git repository already initialized"
        return 0
    fi
    
    print_status "Initializing Git repository..."
    git init
    print_success "Git repository initialized"
}

# Function to configure Git user
configure_git_user() {
    print_status "Configuring Git user..."
    
    # Check if user is already configured
    if git config user.name >/dev/null 2>&1 && git config user.email >/dev/null 2>&1; then
        print_success "Git user already configured"
        print_status "Name: $(git config user.name)"
        print_status "Email: $(git config user.email)"
        return 0
    fi
    
    # Set default user (you can change these)
    git config user.name "Toby Rigby"
    git config user.email "toby@example.com"
    
    print_success "Git user configured"
    print_status "Name: $(git config user.name)"
    print_status "Email: $(git config user.email)"
}

# Function to add files to Git
add_files_to_git() {
    print_status "Adding files to Git..."
    
    # Add all files
    git add .
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        print_warning "No changes to commit"
        return 1
    else
        print_success "Files added to Git"
        return 0
    fi
}

# Function to create initial commit
create_initial_commit() {
    print_status "Creating initial commit..."
    
    git commit -m "🚀 Initial commit: Home Renovation App

- Set up Next.js project with TypeScript and TailwindCSS
- Implemented PRD sync system with Notion integration
- Created comprehensive GitHub workflows and templates
- Added security policies and contribution guidelines
- Configured CI/CD pipeline with automated testing
- Set up branch protection and code review process

Features:
- AI-powered home renovation planning
- Mobile-first responsive design
- Offline-first architecture
- Automated PRD synchronization
- Comprehensive testing and security

Tech Stack:
- Next.js 14 with App Router
- React 18 with TypeScript
- TailwindCSS for styling
- Notion API integration
- Airtable for MVP data storage
- GitHub Actions for CI/CD"
    
    print_success "Initial commit created"
}

# Function to display next steps
display_next_steps() {
    print_success "Git repository initialized successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Create a GitHub repository:"
    echo "   - Go to https://github.com/new"
    echo "   - Repository name: home-renovation-app"
    echo "   - Description: AI-powered home renovation planning app"
    echo "   - Make it public"
    echo "   - Don't initialize with README (we already have one)"
    echo ""
    echo "2. Add remote and push:"
    echo "   git remote add origin https://github.com/your-username/home-renovation-app.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "3. Set up environment variables in GitHub Secrets:"
    echo "   - NOTION_API_KEY"
    echo "   - NOTION_PRD_PAGE_ID"
    echo "   - AIRTABLE_API_KEY"
    echo "   - AIRTABLE_BASE_ID"
    echo "   - VERCEL_TOKEN (for deployment)"
    echo ""
    echo "4. Configure branch protection rules:"
    echo "   - Go to Settings > Branches"
    echo "   - Add rule for main branch"
    echo "   - Require pull request reviews"
    echo "   - Require status checks"
    echo ""
    print_status "Repository is ready for GitHub!"
}

# Main execution
main() {
    print_status "Initializing Git repository for Home Renovation App..."
    echo ""
    
    # Check prerequisites
    check_project_directory
    
    # Initialize Git repository
    init_git_repo
    
    # Configure Git user
    configure_git_user
    
    # Add files to Git
    if add_files_to_git; then
        # Create initial commit
        create_initial_commit
    else
        print_warning "No changes to commit, skipping commit creation"
    fi
    
    # Display next steps
    display_next_steps
}

# Run main function
main "$@"
