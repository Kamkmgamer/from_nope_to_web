# Software Requirements Specification (SRS)

## 1. Introduction

The "From Nope To Web" platform aims to provide a guided learning path for web development, specifically targeting the transition from basic web technologies to the modern T3 stack. Key differentiators include full bilingual support (Arabic/English) and AI-assisted learning.

## 2. Functional Requirements

### 2.1 User Authentication

- Users must be able to sign up/login via Email, Google, or GitHub.
- Users must be able to manage their profile (name, avatar, preferred language).
- **Tool:** Clerk.

### 2.2 Course Management

- System must support modular courses (Foundations, React, Next.js, Backend).
- Each module must support text, code snippets, and video/interactive content.
- System must track user progress (completed lessons, quizzes).

### 2.3 Interactive Coding Environment

- Lessons must include an embedded code editor (Monaco or similar).
- Editor must support syntax highlighting for HTML, CSS, JS, TS.
- Users can run code (sandboxed execution where possible, or server-side execution for Node.js).
- **Constraint:** Sandboxing must be secure.

### 2.4 AI Tutor

- Chat interface available on every lesson.
- Context-aware: The AI knows the current lesson content and user's code.
- Powered by Cerebras API for high inference speed.

### 2.5 Internationalization

- Full LTR and RTL layout support.
- Content must be localized.
- User can toggle language preference, persisting across sessions.

## 3. Non-Functional Requirements

- **Performance:** Page loads < 2s.
- **Accessibility:** WCAG 2.1 AA compliance (critical for educational platforms).
- **Scalability:** DB design must support tracking millions of user progress records.
- **Security:** Secure code execution environment.
