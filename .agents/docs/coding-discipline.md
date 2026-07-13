# Coding Discipline

Use this reference when deciding scope boundaries or making structural changes.

## Scope Discipline

- Do only the requested slice.
- No opportunistic broad refactors.
- No unrelated feature work.
- If a needed design decision is missing, stop and ask rather than inventing a broader architecture.

## Architecture Direction

- Assume `.NET 10`, `ASP.NET Core`, `React`, `TypeScript`, and `Vite` as the long-term stack.
- Keep the repository simple and easy to navigate.
- Avoid DDD, CQRS, event sourcing, microservices, and other speculative abstractions unless a future requirement clearly justifies them.
- Prefer a single maintainable application over a large layer cake with empty projects.

## Working Style

- Preserve established patterns once they exist.
- Make the smallest change that supports the current goal.
- When a surface gets bulky, extract the pure helper or focused file instead of letting it grow into a catch-all.
- Keep Wild Bunch separate; it is a portfolio subject, not the portfolio site itself.
