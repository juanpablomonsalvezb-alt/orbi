---
name: comprehensive-codebase-audit
description: Deep multi-dimensional audit of the codebase covering static analysis, security, architecture, testing, performance, and deployment readiness. Use when user asks for code audit, security review, pre-production check, or technical debt inventory.
allowed-tools: [Read, Grep, Glob, Agent, Bash, WebSearch]
---

# Comprehensive Codebase Audit Skill

## SKILL METADATA
- **Name**: comprehensive-codebase-audit
- **Version**: 2.0.0
- **Category**: Code Quality & Security
- **Complexity**: High
- **Estimated Time**: 2-4 hours for full audit

## WHEN TO USE THIS SKILL
Trigger this skill when user requests:
- "Audit my codebase"
- "Full security review"
- "Code quality assessment"
- "Performance analysis"
- "Pre-production readiness check"
- "Technical debt inventory"
- "Architecture review"

## PRE-AUDIT DISCOVERY PHASE

### Step 1: Project Identification

**Read and analyze:**
```
✓ package.json - Dependencies, scripts, Node version
✓ README.md - Project description and setup
✓ .env.example - Required configuration
✓ tsconfig.json - Type system config
✓ Directory structure - Architecture pattern
✓ supabase/schema.sql - Database schema
```

## AUDIT DIMENSIONS (12 TOTAL)

Each dimension is independent. If one fails, document it and continue with others.

### DIMENSION 1: STATIC CODE ANALYSIS
- ESLint violations
- TypeScript strict mode compliance
- Dead code detection
- Duplicate code detection
- Function complexity (flag >50 lines)
- Nesting depth (flag >4 levels)
- console.log in production code
- TODO/FIXME comments tracked

### DIMENSION 2: DATA FLOW ANALYSIS
Trace how data moves through the application:
1. User Input → Supabase (SQL injection risk, input validation)
2. External API (Gemini) → Application (response validation, error handling)
3. User Data → Logs (PII leakage risk)
4. Auth tokens → Session management

### DIMENSION 3: DEPENDENCY AUDIT
- Security vulnerabilities (npm audit)
- Outdated packages
- Unused dependencies
- Circular dependencies
- License compliance
- Bundle size impact

### DIMENSION 4: ARCHITECTURE REVIEW
- Module boundaries and coupling
- Layer violations (components accessing DB directly)
- Circular feature dependencies
- Separation of concerns

### DIMENSION 5: TEST COVERAGE & QUALITY
- Coverage by module (critical paths: auth, chat, payments at 95%+)
- Mutation testing
- Flaky test detection

### DIMENSION 6: SECURITY AUDIT (OWASP Top 10)
- A01: Broken Access Control (RLS policies, auth middleware)
- A02: Cryptographic Failures (env vars, no hardcoded keys)
- A03: Injection (parameterized queries via Supabase)
- A05: Security Misconfiguration (headers, error messages)
- A06: Vulnerable Components (npm audit)
- A07: Auth Failures (Supabase Auth config)
- Secret scanning (API keys in source code)

### DIMENSION 7: PERFORMANCE AUDIT
**Frontend**: Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1), bundle size
**Backend**: API response times, Supabase query optimization, Gemini call latency
**Database**: Missing indexes, N+1 queries, RLS performance

### DIMENSION 8: TYPE SAFETY
- TypeScript strict mode compliance
- `any` usage audit
- API response typing
- Supabase typed client

### DIMENSION 9: DATA LAYER
- Supabase schema validation
- RLS policy completeness
- Migration history
- Raw queries vs typed client

### DIMENSION 10: BUILD & DEPLOYMENT
- Build reproducibility
- Environment variables documented
- Health check endpoint
- Vercel deployment config
- Zero-downtime deployment

### DIMENSION 11: DOCUMENTATION
- README completeness
- API documentation
- Architecture diagrams

### DIMENSION 12: FRONTEND
- Accessibility (alt text, aria-labels, heading hierarchy)
- SEO (meta tags, structured data)
- Responsive design
- Framer Motion performance

## REPORT FORMAT

```markdown
# Codebase Audit Report — ORBBI

**Date**: [Date]

## Overall Health Score: [X]/100

### Dimension Scores
| Dimension | Score | Status |
|-----------|-------|--------|
| Static Analysis | X | ✅/⚠️/❌ |
| Data Flow | X | ✅/⚠️/❌ |
| Dependencies | X | ✅/⚠️/❌ |
| Architecture | X | ✅/⚠️/❌ |
| Testing | X | ✅/⚠️/❌ |
| Security | X | ✅/⚠️/❌ |
| Performance | X | ✅/⚠️/❌ |
| Type Safety | X | ✅/⚠️/❌ |
| Data Layer | X | ✅/⚠️/❌ |
| Build/Deploy | X | ✅/⚠️/❌ |
| Documentation | X | ✅/⚠️/❌ |
| Frontend | X | ✅/⚠️/❌ |

### CRITICAL (requiere fix inmediato)
- [ ] Descripción — archivo:línea

### WARNING (debería corregirse)
- [ ] Descripción — archivo:línea

### INFO (menor, opcional)
- [ ] Descripción — archivo:línea
```

After the report, auto-fix all CRITICAL and WARNING issues that can be resolved without ambiguity. For those requiring user decision, list the specific question.
