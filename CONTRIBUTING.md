# Contributing Guidelines

Welcome to the project! We're glad you're here. Please read the following guidelines before contributing.

---

## 👥 Core Contributors

| GitHub Handle | Name |
|---|---|
| [@Arjun-57561](https://github.com/Arjun-57561) | Arjun Reddy |
| [@Neil-Cardoz](https://github.com/Neil-Cardoz) | Neil Cardoz |
| [@Amitkumarracha](https://github.com/Amitkumarracha) | Amit Kumar Racha |

---

## 🚀 Getting Started

1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/<org>/<repo-name>.git
   ```
4. **Install dependencies** as described in the `README.md`.

---

## 🌿 Branching Strategy

- `main` — stable, production-ready code. Direct pushes are **not** allowed.
- `dev` — active development branch. All feature branches should be based off this.
- Feature branches should follow the naming convention:
  ```
  feature/<short-description>
  fix/<short-description>
  chore/<short-description>
  ```

---

## 🔄 Workflow

1. Sync your fork with upstream before starting any work:
   ```bash
   git fetch upstream
   git checkout dev
   git merge upstream/dev
   ```
2. Create a new branch from `dev`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes with clear, atomic commits.
4. Push your branch and open a **Pull Request** against `dev`.

---

## ✅ Pull Request Guidelines

- Provide a clear **title** and **description** of what the PR does.
- Link any related issues using `Closes #<issue-number>`.
- Ensure your branch is up to date with `dev` before requesting review.
- At least **one approval** from a core contributor is required before merging.
- Squash commits where appropriate to keep history clean.

---

## 💬 Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(optional scope): <short summary>

Examples:
feat(auth): add login with Google
fix(api): handle null response from endpoint
chore: update dependencies
docs: update README with setup steps
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 🐛 Reporting Issues

- Search existing issues before opening a new one.
- Use the provided issue templates where available.
- Include steps to reproduce, expected vs actual behavior, and environment details.

---

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together.

---

## 📬 Questions?

Reach out to any of the core contributors via GitHub, or open a Discussion in the repository.
