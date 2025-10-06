# Contributing to Graphic Designer Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Feature requests are welcome! Please provide:
- Clear use case and benefit
- Proposed implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m "Add: feature description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Open a Pull Request**

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting (Prettier/ESLint if configured)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

```tsx
// ✅ Good: Clear props, typed, well-documented
interface MyComponentProps {
  title: { en: string; km: string };
  onSave: (data: SomeType) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onSave }) => {
  // Component logic
};
```

### API Endpoints

- Follow RESTful conventions
- Add authentication where needed
- Include error handling
- Log errors for debugging

```javascript
app.post('/api/endpoint', authenticateToken, async (req, res) => {
  try {
    // Implementation
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error description:', error);
    res.status(500).json({ error: 'User-friendly message' });
  }
});
```

### Database Models

- Use clear schema definitions
- Add indexes for performance
- Include timestamps
- Validate required fields

## 🧪 Testing

Before submitting a PR:

```bash
# Test MongoDB connection
npm run test:mongo

# Test API endpoints
npm run test:api

# Build the project
npm run build

# Test the production build
npm run preview
```

## 📚 Project Areas for Contribution

### Frontend Enhancements
- [ ] Image upload functionality
- [ ] Drag-and-drop reordering
- [ ] Dark mode support
- [ ] Analytics dashboard
- [ ] SEO improvements
- [ ] Accessibility (a11y) enhancements

### Backend Improvements
- [ ] Image storage (Cloudinary/AWS S3)
- [ ] Email notifications
- [ ] Contact form API
- [ ] Advanced search/filtering
- [ ] Rate limiting
- [ ] API documentation (Swagger)

### DevOps & Tooling
- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Automated testing
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

### Documentation
- [ ] Video tutorials
- [ ] Deployment guides
- [ ] API documentation
- [ ] Translation guides
- [ ] Best practices

## 🎨 Design Contributions

- UI/UX improvements
- Icon designs
- Color scheme suggestions
- Mobile responsiveness enhancements
- Animation and transitions

## 🌍 Internationalization

Want to add more languages?
1. Update `types.ts` with new language codes
2. Add translations to components
3. Update language selector
4. Test thoroughly with RTL languages if applicable

## 📋 Commit Message Guidelines

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: Add image upload to portfolio admin
fix: Resolve MongoDB connection timeout
docs: Update setup instructions
refactor: Improve API error handling
```

## 🔒 Security

If you discover a security vulnerability:
- **DO NOT** create a public issue
- Email the maintainer directly
- Provide detailed information
- Allow time for a fix before public disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 💬 Questions?

Feel free to:
- Open a discussion
- Comment on existing issues
- Reach out to maintainers

---

**Thank you for making this project better!** 🎉
