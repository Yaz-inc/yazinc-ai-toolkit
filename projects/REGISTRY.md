# Public Skill Registry

This registry records the public provenance policy for Yazinc AI Toolkit. It intentionally excludes customer names, unrelated repositories, local paths, private URLs, and historical source commits.

## Provenance policy

All published skills must be generalized, secret-free, independently understandable, and suitable for reuse outside the application that inspired them. Internal source history remains in approved private systems and is not part of this public repository.

## Catalog groups

| Group | Coverage |
|---|---|
| Core operations | Knowledge management, software testing, secure deployment, and reusable extraction |
| Laravel delivery | CRUD, authorization, activity history, AI configuration, maintenance, forms, and deployment workflows |
| Engineering and quality | Architecture, APIs, testing, security, observability, performance, accessibility, and release readiness |
| Product design | UI and UX, design systems, design-to-code, responsive behavior, accessible interaction, and reusable motion effects |
| AI systems | Retrieval, prompting, evaluation, provider integration, governance, and operations |
| Data and analytics | SQL, NoSQL, data quality, cleaning, validation, pipelines, analytics, and governance |
| Internet access and research | Agent internet access, web reading, social media search, platform CLI tools, and health diagnostics |

The canonical list of currently published skills is maintained in [`INDEX.md`](../INDEX.md) and rendered on the public landing page.

## Laravel RAG implementation

`laravel-rag` was added on 2026-11-10 from a generalized local workflow and independently revised against current official OpenAI, OpenAI PHP, and Laravel documentation. The public version removes organization and workstation details, uses neutral synthetic examples, and adds authorization-first retrieval, index lifecycle controls, bounded tool calling, redacted observability, and release evaluation. No third-party source code or private application content is bundled.

## Publication requirements

1. The skill has one clear purpose and valid metadata.
2. Examples use neutral placeholders and synthetic data.
3. No private project or customer is identifiable.
4. No secret, credential, internal address, or workstation path is included.
5. Relevant validation and accessibility checks pass.
6. Required third-party license notices are retained.
