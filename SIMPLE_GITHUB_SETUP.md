# Simple GitHub Setup Guide

This guide will help you set up the Home Renovation App with GitHub in a simple, straightforward way.

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
3. Description: `AI-powered home renovation planning app`
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

### **Step 4: Set Up Branch Protection (Optional)**

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable these settings:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 reviewer)
   - ✅ Require status checks to pass before merging

## 🔄 **CI/CD Workflows**

The project includes a simple CI/CD pipeline:

### **CI/CD Pipeline** (`.github/workflows/ci.yml`)
- **Lint and Type Check**: ESLint, TypeScript checking
- **Build and Test**: Next.js build, Jest tests
- **Security Scan**: npm audit, vulnerability scanning
- **Deploy**: Optional Vercel deployment (if configured)

## 📋 **Issue Templates**

The project includes simple issue templates:

### **Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.md`)
- Basic bug reporting template
- Environment information
- Steps to reproduce

### **Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.md`)
- Feature request template
- User stories and acceptance criteria
- Technical considerations

## 🔐 **Security Features**

### **Security Policy** (`.github/SECURITY.md`)
- Vulnerability reporting process
- Supported versions
- Security considerations

### **Code Owners** (`.github/CODEOWNERS`)
- Automatic code review assignments
- PRD and documentation ownership

## 📚 **Documentation**

### **Contributing Guide** (`.github/CONTRIBUTING.md`)
- Development setup instructions
- Coding standards and conventions
- Testing requirements
- Pull request process

### **Pull Request Template** (`.github/pull_request_template.md`)
- Basic PR checklist
- Mobile and accessibility checks
- Security and performance considerations

## 🚀 **Deployment (Optional)**

### **Vercel Integration**
1. Connect repository to Vercel
2. Configure environment variables
3. Enable automatic deployments
4. Set up custom domain (optional)

### **Environment Variables for Production**
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 🔄 **Development Workflow**

### **Branch Strategy**
- `main`: Production-ready code
- `feature/*`: Feature development
- `bugfix/*`: Bug fixes

### **Pull Request Process**
1. Create feature branch
2. Make changes following coding standards
3. Run tests and linting
4. Create pull request using template
5. Address review feedback
6. Merge after approval

## 🧪 **Testing and Quality**

### **Automated Testing**
- **Lint and Type Check**: ESLint, TypeScript
- **Build and Test**: Next.js build, Jest tests
- **Security Scan**: npm audit, vulnerability scanning

### **Quality Gates**
- All tests must pass
- Code coverage requirements
- Security scan must pass

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
4. **Create first feature**: Start building components
5. **Set up Vercel**: Connect for deployment (optional)

## 📞 **Support**

If you encounter issues:
1. Check this guide first
2. Review GitHub Actions logs
3. Check issue templates
4. Create an issue with detailed information

---

**Happy coding! 🏠✨**

*Last updated: January 27, 2025*
