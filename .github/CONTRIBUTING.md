# Contributing to Home Renovation App

Thank you for your interest in contributing to the Home Renovation App! 🏠

## 🎯 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm
- Git
- A GitHub account
- Basic knowledge of React, TypeScript, and Next.js

### **Development Setup**
1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/home-renovation-app.git
   cd home-renovation-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔄 **PRD Sync System**

### **Understanding PRD Sync**
- The app automatically syncs with your Notion PRD
- Changes in Notion trigger sync prompts
- Local PRD.md is kept up-to-date for AI context

### **Sync Commands**
```bash
# Check for PRD updates
npm run check-prd

# Sync PRD from Notion
npm run sync-prd

# Manual startup check
npm run startup-check
```

### **Sync Workflow**
1. **Startup**: Automatically checks for updates
2. **Development**: Use `@PRD.md` in Cursor for AI context
3. **Updates**: Sync when you make changes in Notion

## 🛠️ **Development Workflow**

### **Branch Strategy**
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes

### **Commit Convention**
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### **Pull Request Process**
1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Follow coding standards
3. **Test changes**: Run tests and linting
4. **Commit changes**: Use conventional commits
5. **Push branch**: `git push origin feature/your-feature`
6. **Create PR**: Use the PR template
7. **Review**: Address feedback
8. **Merge**: After approval

## 📋 **Coding Standards**

### **TypeScript**
- Use strict mode
- Define proper types
- Avoid `any` type
- Use interfaces for objects

### **React**
- Functional components only
- Use hooks for state management
- Props destructuring
- Conditional rendering

### **Styling**
- TailwindCSS for styling
- Mobile-first approach
- Consistent spacing
- Accessible design

### **File Structure**
```
src/
├── app/           # Next.js app directory
├── components/     # Reusable components
├── hooks/         # Custom hooks
├── lib/           # Utility functions
└── types/         # TypeScript types
```

## 🧪 **Testing**

### **Test Types**
- **Unit tests**: Component logic
- **Integration tests**: API calls
- **E2E tests**: User flows
- **Accessibility tests**: A11y compliance

### **Running Tests**
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **Test Requirements**
- 80%+ code coverage
- Test critical user flows
- Test error scenarios
- Test accessibility

## 🎨 **Design System**

### **Components**
- Use existing design system components
- Follow established patterns
- Maintain consistency
- Document new components

### **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast
- Touch targets (44x44px minimum)

## 🤖 **AI Integration**

### **AI Features**
- Provide loading states
- Handle AI failures gracefully
- Allow user editing of AI suggestions
- Explain AI reasoning when relevant

### **AI Best Practices**
- Always provide fallbacks
- Show progress indicators
- Validate AI outputs
- Maintain user control

## 📱 **Mobile & Offline**

### **Mobile-First**
- Responsive design
- Touch-friendly interactions
- Performance optimization
- Offline functionality

### **Offline Support**
- Core features work offline
- Service worker implementation
- Data synchronization
- Offline indicators

## 🔍 **Code Review**

### **Review Checklist**
- [ ] Code follows standards
- [ ] Tests are included
- [ ] Documentation updated
- [ ] Performance considered
- [ ] Security reviewed
- [ ] Accessibility checked

### **Review Process**
1. **Self-review**: Check your own code first
2. **Peer review**: Get team feedback
3. **Address feedback**: Make requested changes
4. **Final approval**: Merge after approval

## 📚 **Documentation**

### **Code Documentation**
- Comment complex logic
- Document API functions
- Explain business rules
- Update README when needed

### **User Documentation**
- Clear user instructions
- Screenshots and videos
- Troubleshooting guides
- FAQ sections

## 🚨 **Bug Reports**

### **Reporting Bugs**
1. **Search existing issues**: Check if already reported
2. **Use bug template**: Fill out the bug report template
3. **Provide details**: Include steps to reproduce
4. **Test environment**: Specify your setup
5. **Screenshots**: Include visual evidence

### **Bug Report Template**
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots/videos

## 🚀 **Feature Requests**

### **Requesting Features**
1. **Check PRD alignment**: Ensure feature supports goals
2. **Use feature template**: Fill out the feature request template
3. **Provide context**: Explain the problem and solution
4. **Consider impact**: Think about implementation complexity

### **Feature Request Template**
- Problem statement
- Proposed solution
- User stories
- Acceptance criteria
- Mockups/wireframes

## 🔐 **Security**

### **Security Considerations**
- No hardcoded secrets
- Input validation
- Authentication checks
- Error handling
- Data protection

### **Reporting Security Issues**
- **Do NOT create public issues**
- **Email**: security@home-renovation-app.com
- **Include**: Detailed description and impact
- **Response**: We'll respond within 24 hours

## 📊 **Performance**

### **Performance Standards**
- Core Web Vitals compliance
- < 3s page load time
- < 100ms interaction response
- Optimized images and assets

### **Performance Testing**
- Lighthouse audits
- Bundle size monitoring
- Runtime performance
- Mobile performance

## 🔄 **Release Process**

### **Release Cycle**
- **Major releases**: Quarterly
- **Minor releases**: Monthly
- **Patch releases**: As needed
- **Hotfixes**: Critical issues only

### **Release Checklist**
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared

## 📞 **Getting Help**

### **Support Channels**
- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Email**: support@home-renovation-app.com
- **Documentation**: Check README and PRD

### **Community Guidelines**
- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and experience
- Follow the code of conduct

## 🎉 **Recognition**

### **Contributor Recognition**
- Contributors listed in README
- Special recognition for significant contributions
- Community highlights
- Annual contributor awards

### **Types of Contributions**
- Code contributions
- Documentation improvements
- Bug reports and fixes
- Feature suggestions
- Community support

## 📋 **Checklist for Contributors**

### **Before Contributing**
- [ ] Read this contributing guide
- [ ] Understand the project goals
- [ ] Set up development environment
- [ ] Review existing issues and PRs

### **During Development**
- [ ] Follow coding standards
- [ ] Write tests for new features
- [ ] Update documentation
- [ ] Test on multiple devices

### **Before Submitting**
- [ ] Run all tests
- [ ] Check linting
- [ ] Update documentation
- [ ] Test your changes
- [ ] Create clear PR description

---

**Thank you for contributing to the Home Renovation App! 🏠✨**

*Last updated: January 27, 2025*
