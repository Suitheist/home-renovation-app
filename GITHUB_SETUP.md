# GitHub Setup Guide

This guide will help you set up the Home Renovation App with GitHub, including repository creation, CI/CD workflows, and branch protection.

## 🚀 **Quick Start**

### **Option 1: Automated Setup (Recommended)**
```bash
# Initialize Git repository
npm run init-git

# Set up GitHub repository (requires GitHub CLI)
npm run setup-github
```

### **Option 2: Manual Setup**
Follow the step-by-step instructions below.

## 📋 **Prerequisites**

### **Required Tools**
- [Git](https://git-scm.com/) installed
- [GitHub CLI](https://cli.github.com/) (for automated setup)
- [Node.js 18+](https://nodejs.org/) and npm
- GitHub account

### **Environment Variables**
You'll need these API keys:
- `NOTION_API_KEY` - Your Notion integration token
- `NOTION_PRD_PAGE_ID` - Your PRD page ID
- `AIRTABLE_API_KEY` - Your Airtable API key
- `AIRTABLE_BASE_ID` - Your Airtable base ID
- `VERCEL_TOKEN` - For deployment (optional)

## 🔧 **Step-by-Step Setup**

### **Step 1: Initialize Git Repository**

```bash
# Navigate to project directory
cd home-renovation-app

# Initialize Git repository
npm run init-git
```

This will:
- Initialize Git repository
- Configure Git user
- Add all files to Git
- Create initial commit

### **Step 2: Create GitHub Repository**

#### **Option A: Using GitHub CLI (Automated)**
```bash
# Authenticate with GitHub CLI
gh auth login

# Create repository and push code
npm run setup-github
```

#### **Option B: Manual Creation**
1. Go to [GitHub.com](https://github.com/new)
2. Repository name: `home-renovation-app`
3. Description: `AI-powered home renovation planning app with Notion integration`
4. Make it **public**
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### **Step 3: Connect Local Repository to GitHub**

```bash
# Add remote origin
git remote add origin https://github.com/your-username/home-renovation-app.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### **Step 4: Configure GitHub Secrets**

Go to your repository → Settings → Secrets and variables → Actions

Add these secrets:
- `NOTION_API_KEY` - Your Notion integration token
- `NOTION_PRD_PAGE_ID` - Your PRD page ID (e.g., `0cede93e-2ae8-4b3b-b6b7-f48664145beb`)
- `AIRTABLE_API_KEY` - Your Airtable API key
- `AIRTABLE_BASE_ID` - Your Airtable base ID
- `VERCEL_TOKEN` - For deployment (optional)
- `VERCEL_ORG_ID` - For deployment (optional)
- `VERCEL_PROJECT_ID` - For deployment (optional)

### **Step 5: Set Up Branch Protection**

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable these settings:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 reviewer)
   - ✅ Dismiss stale reviews
   - ✅ Require review from code owners
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
   - ✅ Restrict pushes that create files

### **Step 6: Configure Repository Settings**

1. Go to Settings → General
2. Enable these features:
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki
   - ✅ Discussions

## 🔄 **CI/CD Workflows**

The project includes several GitHub Actions workflows:

### **CI/CD Pipeline** (`.github/workflows/ci.yml`)
- **Lint and Type Check**: ESLint, TypeScript, PRD sync check
- **Build and Test**: Next.js build, Jest tests, artifact upload
- **Security Scan**: npm audit, vulnerability scanning
- **Deploy**: Automatic deployment to Vercel (main branch only)

### **PRD Sync Workflow** (`.github/workflows/prd-sync.yml`)
- **Scheduled Sync**: Checks for PRD updates every 6 hours
- **Manual Sync**: Triggered via workflow_dispatch
- **Auto-PR Creation**: Creates PR when updates are available

## 📋 **Issue Templates**

The project includes comprehensive issue templates:

### **Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.md`)
- Detailed bug reporting template
- Environment information
- Steps to reproduce
- Screenshots and console errors

### **Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.md`)
- Feature request template
- PRD alignment check
- User stories and acceptance criteria
- Technical considerations

### **PRD Sync Issue** (`.github/ISSUE_TEMPLATE/prd_sync_issue.md`)
- Specialized template for PRD sync issues
- Sync status and error messages
- Environment and API configuration

## 🔐 **Security Features**

### **Security Policy** (`.github/SECURITY.md`)
- Vulnerability reporting process
- Supported versions
- Security considerations
- Incident response procedures

### **Code Owners** (`.github/CODEOWNERS`)
- Automatic code review assignments
- PRD and documentation ownership
- Core application file ownership

## 📚 **Documentation**

### **Contributing Guide** (`.github/CONTRIBUTING.md`)
- Development setup instructions
- Coding standards and conventions
- Testing requirements
- Pull request process

### **Pull Request Template** (`.github/pull_request_template.md`)
- Comprehensive PR checklist
- Mobile and accessibility checks
- Security and performance considerations
- PRD sync status verification

## 🚀 **Deployment**

### **Vercel Integration**
1. Connect repository to Vercel
2. Configure environment variables
3. Enable automatic deployments
4. Set up custom domain (optional)

### **Environment Variables for Production**
- `NOTION_API_KEY`
- `NOTION_PRD_PAGE_ID`
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 🔄 **Development Workflow**

### **Branch Strategy**
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes

### **Pull Request Process**
1. Create feature branch
2. Make changes following coding standards
3. Run tests and linting
4. Create pull request using template
5. Address review feedback
6. Merge after approval

### **PRD Sync Workflow**
1. **Startup**: Automatically checks for updates
2. **Development**: Use `@PRD.md` in Cursor for AI context
3. **Updates**: Sync when you make changes in Notion
4. **CI/CD**: Automated PRD sync checks in GitHub Actions

## 🧪 **Testing and Quality**

### **Automated Testing**
- **Lint and Type Check**: ESLint, TypeScript, PRD sync
- **Build and Test**: Next.js build, Jest tests
- **Security Scan**: npm audit, vulnerability scanning
- **Performance**: Lighthouse audits, bundle size monitoring

### **Quality Gates**
- All tests must pass
- Code coverage requirements
- Security scan must pass
- Performance benchmarks met
- Accessibility compliance

## 📊 **Monitoring and Analytics**

### **GitHub Insights**
- Code frequency
- Contributor activity
- Issue and PR metrics
- Security alerts

### **CI/CD Metrics**
- Build success rates
- Deployment frequency
- Test coverage trends
- Security scan results

## 🔧 **Troubleshooting**

### **Common Issues**

#### **GitHub CLI Not Found**
```bash
# Install GitHub CLI
brew install gh  # macOS
# or
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
```

#### **Authentication Issues**
```bash
# Re-authenticate with GitHub CLI
gh auth login
```

#### **Permission Issues**
- Ensure you have write access to the repository
- Check if you're a collaborator or owner
- Verify branch protection rules

#### **CI/CD Failures**
- Check GitHub Secrets are set correctly
- Verify environment variables
- Review workflow logs for specific errors

### **Getting Help**
- Check GitHub Actions logs
- Review issue templates
- Check contributing guide
- Contact repository maintainers

## 🎯 **Next Steps**

After setting up GitHub:

1. **Install dependencies**: `npm install`
2. **Set up environment variables**: Copy `env.example` to `.env.local`
3. **Start development**: `npm run dev`
4. **Test PRD sync**: `npm run check-prd`
5. **Create first feature**: Start building components
6. **Set up Vercel**: Connect for deployment
7. **Configure monitoring**: Set up analytics and alerts

## 📞 **Support**

If you encounter issues:
1. Check this guide first
2. Review GitHub Actions logs
3. Check issue templates
4. Create an issue with detailed information
5. Contact the development team

---

**Happy coding! 🏠✨**

*Last updated: January 27, 2025*
