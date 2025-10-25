#!/bin/bash

# GitHub Repository Setup Script
# This script helps set up the GitHub repository for the Home Renovation App

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if we're in the right directory
check_project_directory() {
    if [ ! -f "package.json" ]; then
        print_error "Not in the home-renovation-app project directory"
        print_status "Please run this script from the project root"
        exit 1
    fi
}

# Function to check if git is initialized
check_git_initialized() {
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        print_success "Git repository initialized"
    else
        print_success "Git repository already initialized"
    fi
}

# Function to check if remote exists
check_remote_exists() {
    if git remote get-url origin >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to add files to git
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

# Function to create GitHub repository
create_github_repo() {
    local repo_name="home-renovation-app"
    local description="AI-powered home renovation planning app with Notion integration"
    local visibility="public"
    
    print_status "Creating GitHub repository..."
    print_status "Repository name: $repo_name"
    print_status "Description: $description"
    print_status "Visibility: $visibility"
    
    # Check if gh CLI is installed
    if ! command_exists gh; then
        print_error "GitHub CLI (gh) is not installed"
        print_status "Please install GitHub CLI: https://cli.github.com/"
        print_status "Or create the repository manually on GitHub.com"
        return 1
    fi
    
    # Check if user is authenticated
    if ! gh auth status >/dev/null 2>&1; then
        print_error "Not authenticated with GitHub CLI"
        print_status "Please run: gh auth login"
        return 1
    fi
    
    # Create repository
    gh repo create "$repo_name" \
        --description "$description" \
        --public \
        --source=. \
        --remote=origin \
        --push
    
    print_success "GitHub repository created and pushed"
}

# Function to set up branch protection
setup_branch_protection() {
    print_status "Setting up branch protection rules..."
    
    # Check if gh CLI is available
    if ! command_exists gh; then
        print_warning "GitHub CLI not available, skipping branch protection setup"
        print_status "Please set up branch protection manually on GitHub.com"
        return 0
    fi
    
    # Set up branch protection for main branch
    gh api repos/:owner/:repo/branches/main/protection \
        --method PUT \
        --field required_status_checks='{"strict":true,"contexts":["lint-and-type-check","build-and-test","security-scan"]}' \
        --field enforce_admins=true \
        --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \
        --field restrictions=null
    
    print_success "Branch protection rules configured"
}

# Function to set up repository settings
setup_repository_settings() {
    print_status "Setting up repository settings..."
    
    # Check if gh CLI is available
    if ! command_exists gh; then
        print_warning "GitHub CLI not available, skipping repository settings"
        return 0
    fi
    
    # Enable issues and projects
    gh api repos/:owner/:repo \
        --method PATCH \
        --field has_issues=true \
        --field has_projects=true \
        --field has_wiki=true
    
    print_success "Repository settings configured"
}

# Function to display next steps
display_next_steps() {
    print_success "GitHub repository setup complete!"
    echo ""
    print_status "Next steps:"
    echo "1. Set up environment variables in GitHub Secrets:"
    echo "   - NOTION_API_KEY"
    echo "   - NOTION_PRD_PAGE_ID"
    echo "   - AIRTABLE_API_KEY"
    echo "   - AIRTABLE_BASE_ID"
    echo "   - VERCEL_TOKEN (for deployment)"
    echo ""
    echo "2. Configure branch protection rules:"
    echo "   - Go to Settings > Branches"
    echo "   - Add rule for main branch"
    echo "   - Require pull request reviews"
    echo "   - Require status checks"
    echo ""
    echo "3. Set up Vercel deployment:"
    echo "   - Connect repository to Vercel"
    echo "   - Configure environment variables"
    echo "   - Enable automatic deployments"
    echo ""
    echo "4. Start development:"
    echo "   - Create feature branches"
    echo "   - Make changes"
    echo "   - Create pull requests"
    echo "   - Review and merge"
    echo ""
    print_status "Repository URL: https://github.com/$(gh api user --jq .login)/home-renovation-app"
}

# Main execution
main() {
    print_status "Setting up GitHub repository for Home Renovation App..."
    echo ""
    
    # Check prerequisites
    check_project_directory
    
    # Initialize Git if needed
    check_git_initialized
    
    # Add files to Git
    if add_files_to_git; then
        # Create initial commit
        create_initial_commit
    else
        print_warning "No changes to commit, skipping commit creation"
    fi
    
    # Check if remote exists
    if check_remote_exists; then
        print_success "Remote repository already exists"
        print_status "Pushing to existing repository..."
        git push origin main
    else
        # Create GitHub repository
        if create_github_repo; then
            print_success "GitHub repository created successfully"
        else
            print_warning "Failed to create GitHub repository automatically"
            print_status "Please create the repository manually on GitHub.com"
            print_status "Then run: git remote add origin <repository-url>"
            print_status "And run: git push -u origin main"
        fi
    fi
    
    # Set up repository settings
    setup_repository_settings
    
    # Set up branch protection
    setup_branch_protection
    
    # Display next steps
    display_next_steps
}

# Run main function
main "$@"
