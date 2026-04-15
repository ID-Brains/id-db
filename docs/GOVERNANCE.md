# Moderation & Governance

This document outlines how the **project-hikma** community is managed and governed.

## Team Structure

| Role | Responsibilities | GitHub Permission |
| :--- | :--- | :--- |
| **Maintainer** | Merge PRs, manage labels, resolve disputes, and maintain infrastructure. | `Write` |
| **Subject Lead** | Review content accuracy for specific subjects or courses. | `Triage` |
| **Contributor** | Submit notes, summaries, and corrections via PR or web form. | Fork / `Read` |

### Subject Leads
Subject Leads are student volunteers who ensure that content for a given course is accurate and useful. At least one Subject Lead's review is required before a Maintainer can merge a PR touching their subject.

## Policies & Procedures

### 1. Merge Policy
- All PRs require:
    *   **CI Validation:** All automated schema and build checks must pass.
    *   **Human Approval:** At least one review from a Subject Lead or Maintainer.
- No direct pushes to the `main` branch are permitted.

### 2. Content Removal Policy
If a student wishes to have their contribution removed:
1.  Open an Issue with the label `content-removal-request`.
2.  A Maintainer will verify the requester's identity (matching the `contributor` field).
3.  Content will be removed via PR within 5 business days.

### 3. Moderation of Discussions
Discussions and comments are hosted via **GitHub Discussions** and are subject to the [Contributor Covenant](https://www.contributor-covenant.org/). Maintainers have the authority to hide, lock, or delete comments that violate our community standards.

## Code Owners
We use a `CODEOWNERS` file to automatically request reviews from the correct Subject Leads.

```text
# Example CODEOWNERS
/src/content/docs/level-3/term-1/microprocessors/  @subject-lead-microprocessors
/src/content/docs/level-2/term-2/algorithms/       @subject-lead-algorithms
```

## References
- [Contributor Covenant: Code of Conduct](https://www.contributor-covenant.org/)
- [GitHub: About Code Owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Discussions: Managing Discussions](https://docs.github.com/en/discussions/managing-discussions-for-your-community)
