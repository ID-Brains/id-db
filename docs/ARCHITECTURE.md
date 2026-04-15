# System Architecture & Automation

This document outlines the technical design and automated workflows of the **project-hikma**.

## Architecture Overview

The system is designed for **maximum scalability and zero hosting costs**. We use an "Architecture-as-Code" approach where the entire application, from data to logic, is versioned in Git.

### High-Level Flow

1.  **Students (The Input):** Contribute through either the **Web Form (Astro)** or **Direct Pull Requests (Git)**.
2.  **GitHub (The Orchestrator):**
    *   **Repository:** Stores Markdown content, automation scripts, and configuration.
    *   **Actions (CI):** Automates validation, text extraction (from PDFs), and deployment.
    *   **Discussions:** Serves as the threaded comment layer (via **Giscus**).
3.  **The Output (The Live Site):**
    *   **Astro Starlight:** Generates a high-performance static site from Markdown.
    *   **Pagefind:** Provides lightning-fast, offline search.
    *   **GitHub Pages:** Serves the final site globally.

## Component Breakdown

| Component | Technology | Responsibility |
| :--- | :--- | :--- |
| **Static Site** | Astro + Starlight | Renders content, navigation, and core UI. |
| **Content Store** | Git (`/src/content`) | Single source of truth for all notes and summaries. |
| **Schema Engine** | Zod | Build-time validation for YAML frontmatter. |
| **Web Form** | Astro Islands | Simplifies contributions for non-technical users. |
| **Automation** | GitHub Actions | PR validation, text extraction, and site deployment. |
| **Search** | Pagefind | Serverless search index (offline-ready). |
| **Comments** | Giscus | Discussions layer synced to GitHub Discussions. |

## Automation Pipeline

### 1. Validation (`validate.yml`)
Runs on every Pull Request.
- Checks if YAML frontmatter follows the strict **Zod** schema.
- Verifies image sizes and optimizes them (JPEG/PNG).
- Ensures file slugs follow naming conventions (no spaces, no Arabic in paths).

### 2. Text Extraction (`extract.yml`)
Triggered when a PR contains a `.pdf` or `.docx` file 'not a day-0 feature'.
- Uses **textract** to extract text from binary files.
- Automatically commits a `.md` counterpart if successful.
- Notifies the contributor if manual review is needed (e.g., for scanned images).

### 3. Deployment (`deploy.yml`)
Triggered by merges to the `main` branch.
- Runs `astro build`.
- Generates the **Pagefind** search index.
- Pushes the production build (`/dist`) to the `gh-pages` branch.

## References
- [Astro Documentation](https://docs.astro.build/)
- [Pagefind: Static Search Engine](https://pagefind.app/)
- [Giscus: Comments via GitHub Discussions](https://giscus.app/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
