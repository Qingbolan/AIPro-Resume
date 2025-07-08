# Implementation Templates & Conversation Flows

## Overview

This document provides AI agents with specific conversation templates, prompt examples, and implementation patterns for building the personal website system efficiently.

---

## 🎯 Core Conversation Templates

### **Template A: Feature Discovery & Planning**

```
🤖 AI Agent: "I'm ready to help implement [FEATURE_NAME]. Let me first understand the requirements:

**Current Understanding:**
- Feature: [FEATURE_DESCRIPTION]
- Priority: [HIGH/MEDIUM/LOW]
- Dependencies: [LIST_DEPENDENCIES]

**Questions to clarify:**
1. What specific functionality do you need?
2. Are there any existing patterns I should follow?
3. What's the target timeline?
4. Any performance or security requirements?

**My proposed approach:**
[STEP_BY_STEP_PLAN]

Should I proceed with this plan or would you like me to adjust anything?"
```

### **Template B: Technical Implementation**

```
🤖 AI Agent: "I'll implement [FEATURE_NAME] following our established patterns.

**Implementation Plan:**
Phase 1: [CORE_FUNCTIONALITY] (Est: [TIME])
Phase 2: [ENHANCEMENTS] (Est: [TIME])
Phase 3: [TESTING_&_OPTIMIZATION] (Est: [TIME])

**Technical Stack:**
- Frontend: [TECHNOLOGIES]
- Backend: [TECHNOLOGIES]
- Database: [TABLES/CHANGES_NEEDED]
- Testing: [TESTING_APPROACH]

**File Changes:**
📁 New files: [LIST]
📝 Modified files: [LIST]
🗄️ Database changes: [LIST]

**Code Quality Checklist:**
- [ ] TypeScript types defined
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Tests written
- [ ] Documentation updated

Ready to start with Phase 1?"
```

### **Template C: Problem Solving & Debugging**

```
🤖 AI Agent: "I see you're experiencing [ISSUE_DESCRIPTION]. Let me help diagnose and fix this.

**Quick Diagnosis:**
🔍 Likely cause: [HYPOTHESIS]
🎯 Affected components: [LIST]
⚡ Severity: [LOW/MEDIUM/HIGH/CRITICAL]

**Immediate Steps:**
1. [VERIFICATION_STEP]
2. [ISOLATION_STEP]
3. [FIX_IMPLEMENTATION]

**Investigation Questions:**
- When did this issue first appear?
- What was the last change made?
- Are there any error logs?
- Is this affecting all users or specific scenarios?

**Proposed Solution:**
[DETAILED_SOLUTION_STEPS]

**Prevention Measures:**
[FUTURE_PREVENTION_STEPS]

Should I implement the fix immediately or do you want to investigate further?"
```

---

## 🛠️ Specific Implementation Prompts

### **Database Implementation Prompts**

#### **Creating New Tables**

```
Prompt: "Create a MySQL table for [ENTITY_NAME] following our database design patterns"

Expected AI Response Format:
```sql
-- Table: [table_name]
-- Purpose: [description]
-- Relationships: [foreign_keys]

CREATE TABLE [table_name] (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    [field_definitions],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
    -- Indexes
    INDEX idx_[field] ([field]),
    FULLTEXT idx_search_[table] ([searchable_fields]),
  
    -- Foreign keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Translation table (if needed)
CREATE TABLE [table_name]_translations (
    [translation_structure]
);
```

Explanation:

- Why this structure was chosen
- Performance considerations
- Relationship implications

```

#### **Database Migrations**
```

Prompt: "Create a database migration for [CHANGE_DESCRIPTION]"

Expected AI Response:

```js
// Migration: [timestamp]_[description].js
exports.up = function(knex) {
    return knex.schema.[operation]('[table_name]', function(table) {
        // Migration steps
    });
};

exports.down = function(knex) {
    return knex.schema.[reverse_operation]('[table_name]');
};
```

Plus:

- Rollback safety considerations
- Data preservation steps
- Index management

```

### **API Development Prompts**

#### **REST API Endpoints**
```

Prompt: "Create REST API endpoints for [RESOURCE_NAME] with full CRUD operations"

Expected AI Response Structure:

1. **Route Definition:**

```js
// routes/[resource].js
const express = require('express');
const router = express.Router();
const [Resource]Controller = require('../controllers/[resource]Controller');
const { validate } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// GET /api/[resource] - List with pagination, filtering
router.get('/', [Resource]Controller.list);

// GET /api/[resource]/:id - Get single item
router.get('/:id', [Resource]Controller.get);

// POST /api/[resource] - Create new
router.post('/', authenticate, validate([Resource]Schema), [Resource]Controller.create);

// PUT /api/[resource]/:id - Update existing
router.put('/:id', authenticate, validate([Resource]Schema), [Resource]Controller.update);

// DELETE /api/[resource]/:id - Delete
router.delete('/:id', authenticate, [Resource]Controller.delete);

module.exports = router;
```

2. **Controller Implementation:**

```js
// controllers/[resource]Controller.js
class [Resource]Controller {
    async list(req, res) {
        // Pagination, filtering, sorting logic
    }
  
    async get(req, res) {
        // Single item retrieval with error handling
    }
  
    // ... other methods
}
```

3. **Validation Schema:**

```js
// schemas/[resource]Schema.js
const Joi = require('joi');

const [resource]Schema = Joi.object({
    // Field validations
});
```

```

#### **GraphQL Implementation**
```

Prompt: "Create GraphQL schema and resolvers for [RESOURCE_NAME]"

Expected AI Response:

1. **Schema Definition:**

```graphql
# schema/[resource].graphql
type [Resource] {
    id: ID!
    [field_definitions]
    createdAt: DateTime!
    updatedAt: DateTime!
}

type [Resource]Connection {
    edges: [[Resource]Edge!]!
    pageInfo: PageInfo!
    totalCount: Int!
}

extend type Query {
    [resource](id: ID!): [Resource]
    [resources](
        filter: [Resource]Filter
        sort: [Resource]Sort
        pagination: PaginationInput
    ): [Resource]Connection!
}

extend type Mutation {
    create[Resource](input: Create[Resource]Input!): [Resource]!
    update[Resource](id: ID!, input: Update[Resource]Input!): [Resource]!
    delete[Resource](id: ID!): Boolean!
}
```

2. **Resolvers:**

```js
// resolvers/[resource]Resolvers.js
const [resource]Resolvers = {
    Query: {
        [resource]: async (parent, { id }, context) => {
            // Single item resolver
        },
        [resources]: async (parent, { filter, sort, pagination }, context) => {
            // List resolver with connection pattern
        }
    },
  
    Mutation: {
        create[Resource]: async (parent, { input }, context) => {
            // Create resolver with validation
        }
        // ... other mutations
    }
};
```

```

### **Frontend Component Prompts**

#### **React Component Creation**
```

Prompt: "Create a React component for [COMPONENT_NAME] that displays [DATA_TYPE]"

Expected AI Response:

1. **Component Structure:**

```tsx
// components/[ComponentName]/[ComponentName].tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { [DataType] } from '../../types';
import styles from './[ComponentName].module.css';

interface [ComponentName]Props {
    [prop_definitions]
    className?: string;
    onAction?: (data: [DataType]) => void;
}

const [ComponentName]: React.FC<[ComponentName]Props> = ({
    [props],
    className = '',
    onAction
}) => {
    const [state, setState] = useState<[StateType]>([initial_state]);
  
    useEffect(() => {
        // Component logic
    }, [dependencies]);
  
    const handleAction = (data: [DataType]) => {
        // Event handling
        onAction?.(data);
    };
  
    return (
        <motion.div
            className={`${styles.container} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Component JSX */}
        </motion.div>
    );
};

export default [ComponentName];
```

2. **Styling:**

```css
/* components/[ComponentName]/[ComponentName].module.css */
.container {
    /* Base styles */
}

.container:hover {
    /* Hover effects */
}

@media (max-width: 768px) {
    .container {
        /* Mobile responsive */
    }
}
```

3. **Types:**

```ts
// types/[componentName].ts
export interface [ComponentName]Props {
    [interface_definition]
}

export interface [ComponentName]State {
    [state_interface]
}
```

4. **Tests:**

```tsx
// components/[ComponentName]/__tests__/[ComponentName].test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import [ComponentName] from '../[ComponentName]';

describe('[ComponentName]', () => {
    test('renders correctly', () => {
        render(<[ComponentName] {...mockProps} />);
        expect(screen.getByText('[expected_text]')).toBeInTheDocument();
    });
  
    test('handles interactions', () => {
        const mockAction = jest.fn();
        render(<[ComponentName] onAction={mockAction} {...mockProps} />);
      
        fireEvent.click(screen.getByRole('button'));
        expect(mockAction).toHaveBeenCalledWith([expected_data]);
    });
});
```

```

---

## 🔄 Implementation Flow Examples

### **Flow 1: Adding a New Content Type**

```

Step 1: Planning Discussion
User: "I want to add a new content type called 'tutorials' with step-by-step instructions."

AI Agent: "I'll help you add a tutorials content type. Let me plan this implementation:

**Content Structure Analysis:**

- Tutorials will have: title, description, steps, difficulty level, duration, tags
- Each step: title, content, code examples, images
- Needs multi-language support like other content types
- Should integrate with existing search and analytics

**Implementation Plan:**

1. Database: Create tutorials and tutorial_steps tables
2. Content: Add tutorials/ folder to content structure
3. API: Add REST and GraphQL endpoints
4. Frontend: Create tutorial display and step navigation
5. Admin: Add tutorial editing interface

**Files to Create/Modify:**
📁 content/tutorials/
📝 Database migration for tutorials
📝 API endpoints and controllers
📝 React components for tutorial display
📝 Admin interface updates

Should I start with the database schema?"

Step 2: Database Implementation
AI Agent: "Creating the database schema for tutorials:

```sql
-- Tutorials table
CREATE TABLE tutorials (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    estimated_duration_minutes INT UNSIGNED,
    is_published BOOLEAN DEFAULT FALSE,
    view_count INT UNSIGNED DEFAULT 0,
    completion_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_slug (slug),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_published (is_published),
    FULLTEXT idx_search_tutorials (title, description)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tutorial steps table
CREATE TABLE tutorial_steps (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    tutorial_id CHAR(36) NOT NULL,
    step_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    code_example TEXT,
    image_url VARCHAR(500),
    estimated_time_minutes INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
    FOREIGN KEY (tutorial_id) REFERENCES tutorials(id) ON DELETE CASCADE,
    INDEX idx_tutorial_id (tutorial_id),
    INDEX idx_step_number (step_number),
    UNIQUE KEY uk_tutorial_step (tutorial_id, step_number)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

The schema includes:
✅ Multi-language support via translation tables
✅ Step-by-step structure with ordering
✅ Analytics tracking (views, completions)
✅ Difficulty levels and time estimates
✅ Full-text search capability

Next: Should I create the API endpoints or the content file structure?"

Step 3: Content Structure
AI Agent: "Setting up the content structure for tutorials:

```
content/
└── tutorials/
    ├── getting-started-react.md
    ├── advanced-typescript.md
    └── series/
        └── web-development-fundamentals/
            ├── series.md
            ├── 01-html-basics.md
            ├── 02-css-fundamentals.md
            └── 03-javascript-introduction.md
```

**Tutorial Markdown Format:**

```markdown
---
title: "Getting Started with React"
slug: "getting-started-react"
description: "A comprehensive tutorial for React beginners"
difficulty: "beginner"
estimatedDuration: 45
tags: ["react", "javascript", "frontend"]
isPublished: true
steps:
  - title: "Setup Development Environment"
    estimatedTime: 10
  - title: "Create First Component"
    estimatedTime: 15
  - title: "Add State Management"
    estimatedTime: 20
languages:
  zh:
    title: "React入门指南"
    description: "面向初学者的React综合教程"
---

# Getting Started with React

## Step 1: Setup Development Environment

First, let's set up your development environment...

```bash
npx create-react-app my-tutorial-app
cd my-tutorial-app
npm start
```

## Step 2: Create First Component

Now we'll create your first React component...

```

This structure allows:
✅ Individual tutorial files
✅ Tutorial series organization
✅ Multi-language support
✅ Step-based content structure
✅ Metadata for filtering and search

Ready for the API implementation?"

[Continue with API, Frontend, and Testing phases...]
```

### **Flow 2: Performance Optimization Task**

```
User: "The website is loading slowly. Can you help optimize performance?"

AI Agent: "I'll help optimize the website performance. Let me analyze the system and create an optimization plan.

**Performance Audit Checklist:**
🔍 Frontend Analysis:
- [ ] Bundle size analysis
- [ ] Image optimization check
- [ ] Code splitting evaluation
- [ ] Caching strategy review

🔍 Backend Analysis:  
- [ ] Database query performance
- [ ] API response times
- [ ] Caching effectiveness
- [ ] Memory usage patterns

🔍 Infrastructure Analysis:
- [ ] Server response times
- [ ] CDN configuration
- [ ] Database connection pooling
- [ ] Redis cache hit rates

**Let me start with a quick diagnosis:**

1. **Frontend Performance:**
```bash
# Bundle analyzer
npm run analyze
```

2. **Backend Performance:**

```sql
-- Check slow queries
SELECT query_time, sql_text 
FROM mysql.slow_log 
WHERE start_time >= DATE_SUB(NOW(), INTERVAL 1 DAY)
ORDER BY query_time DESC LIMIT 10;
```

3. **Cache Analysis:**

```bash
# Redis cache stats
redis-cli info stats
```

**Immediate Optimizations I can implement:**

**Phase 1: Quick Wins (2-4 hours)**

- [ ] Enable gzip compression
- [ ] Add browser caching headers
- [ ] Optimize database indexes
- [ ] Implement API response caching

**Phase 2: Code Optimization (1-2 days)**

- [ ] Implement code splitting
- [ ] Add lazy loading for images
- [ ] Optimize bundle size
- [ ] Database query optimization

**Phase 3: Infrastructure (2-3 days)**

- [ ] CDN setup for static assets
- [ ] Database read replicas
- [ ] Advanced caching strategies
- [ ] Performance monitoring

Should I start with Phase 1 quick wins or do you want me to run the performance audit first?"

User: "Start with the quick wins."

AI Agent: "Perfect! I'll implement the quick performance wins:

**1. Enable Compression (Express.js):**

```js
// server.js
const compression = require('compression');
app.use(compression());
```

**2. Browser Caching Headers:**

```js
// Static assets caching
app.use('/static', express.static('public', {
    maxAge: '1y',
    etag: false
}));

// API caching headers
app.use('/api', (req, res, next) => {
    if (req.method === 'GET') {
        res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    }
    next();
});
```

**3. Database Index Optimization:**

```sql
-- Add missing indexes based on query analysis
ALTER TABLE page_views ADD INDEX idx_created_at_type (created_at, page_type);
ALTER TABLE content_metrics_daily ADD INDEX idx_date_type (metric_date, content_type);
```

**4. API Response Caching:**

```js
// Redis caching middleware
const cache = require('./middleware/cache');

// Cache popular content for 5 minutes
app.get('/api/projects', cache(300), projectController.list);
app.get('/api/blog/posts', cache(300), blogController.list);
```

**Performance Impact Expected:**

- 🚀 30-40% faster page loads (compression)
- 🚀 50% reduction in repeat request times (caching)
- 🚀 20-30% faster database queries (indexes)

**Implementation Status:**
✅ Compression enabled
✅ Caching headers added
✅ Database indexes optimized
✅ API caching implemented

**Next Steps:**

- Monitor performance for 24 hours
- Gather metrics on improvement
- Move to Phase 2 optimizations

Would you like me to proceed with Phase 2 or shall we monitor these changes first?"

```

---

## 📝 Quick Reference Prompts

### **Database Operations**
```

"Add a new field [FIELD_NAME] to table [TABLE_NAME] with type [TYPE] and constraints [CONSTRAINTS]"

"Create a database query to find [CRITERIA] with pagination and sorting"

"Optimize this query for better performance: [QUERY]"

"Create a migration to [CHANGE_DESCRIPTION]"

```

### **API Development**
```

"Create API endpoint for [ACTION] on [RESOURCE] with [REQUIREMENTS]"

"Add validation for [FIELDS] in [ENDPOINT]"

"Implement caching for [API_ENDPOINT] with [TTL] duration"

"Create GraphQL resolver for [OPERATION] with [REQUIREMENTS]"

```

### **Frontend Development**
```

"Create a React component that [FUNCTIONALITY] with props [PROPS]"

"Add responsive design for [COMPONENT] to work on mobile devices"

"Implement loading states and error handling for [COMPONENT]"

"Create a form for [PURPOSE] with validation for [FIELDS]"

```

### **Testing & Quality**
```

"Write unit tests for [FUNCTION/COMPONENT] covering [SCENARIOS]"

"Create integration tests for [API_ENDPOINT] with [TEST_CASES]"

"Add error handling and logging for [FEATURE]"

"Implement input validation for [FORM/API] with [RULES]"

```

### **Performance & Optimization**
```

"Analyze and optimize [COMPONENT/FUNCTION] for better performance"

"Implement caching strategy for [FEATURE] with [REQUIREMENTS]"

"Add lazy loading for [IMAGES/COMPONENTS]"

"Optimize database queries for [OPERATION]"

```

---

## ✅ Quality Assurance Templates

### **Code Review Checklist**
```

🤖 AI Agent Code Review Format:

**Functionality Review:**
✅ Feature works as specified
✅ Edge cases handled
✅ Error scenarios covered
⚠️ Areas needing attention: [LIST]

**Code Quality Review:**
✅ TypeScript types properly defined
✅ Consistent with existing patterns
✅ Proper error handling
✅ Input validation implemented
⚠️ Improvements needed: [LIST]

**Performance Review:**
✅ No performance bottlenecks
✅ Proper caching where needed
✅ Database queries optimized
⚠️ Performance concerns: [LIST]

**Security Review:**
✅ Input sanitization
✅ Authentication/authorization
✅ No security vulnerabilities
⚠️ Security issues: [LIST]

**Testing Review:**
✅ Unit tests written
✅ Integration tests included
✅ Edge cases tested
⚠️ Missing tests: [LIST]

**Overall Score: [X/10]**
**Recommendation: [APPROVE/NEEDS_CHANGES/MAJOR_REVISION]**

```

### **Testing Strategy Template**
```

🤖 AI Agent Testing Plan:

**Unit Tests:**

- [ ] Core function logic
- [ ] Edge case handling
- [ ] Error scenarios
- [ ] Input validation

**Integration Tests:**

- [ ] API endpoint functionality
- [ ] Database operations
- [ ] External service integrations
- [ ] Authentication flows

**End-to-End Tests:**

- [ ] User workflows
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Performance under load

**Test Data:**

- [ ] Valid input scenarios
- [ ] Invalid input scenarios
- [ ] Edge case data
- [ ] Large dataset testing

**Coverage Goals:**

- Unit tests: >90%
- Integration tests: >80%
- E2E tests: Critical paths covered

```

This comprehensive guide enables AI agents to implement the personal website system efficiently through structured conversations and proven templates.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Create comprehensive project introduction documentation", "status": "completed", "priority": "high"}, {"id": "2", "content": "Design AI agent-friendly todo lists and prompts", "status": "completed", "priority": "high"}, {"id": "3", "content": "Create step-by-step implementation guides", "status": "completed", "priority": "high"}, {"id": "4", "content": "Write AI agent conversation examples and templates", "status": "completed", "priority": "high"}]
```
