const skills = [
  {name:"central-knowledge-base", title:"Central Knowledge Base", category:"Core operations", summary:"Safely maintain shared non-secret knowledge, provenance, canonical pointers, and duplicate resolution."},
  {name:"test-software-app", title:"Test Software App", category:"Core operations", summary:"Run human-centered, evidence-backed application testing through selectable three, four, five, or six-stage audits."},
  {name:"deploy-secrets-zero-exposure", title:"Deploy Secrets Zero Exposure", category:"Core operations", summary:"Apply a strict deployment gate that prevents secrets and sensitive repository files from becoming publicly reachable."},
  {name:"extract-to-toolkit", title:"Extract to Toolkit", category:"Laravel delivery", summary:"Generalize reusable project experience into a focused skill with provenance, validation, catalog, and registry updates."},
  {name:"laravel-datatables-module", title:"Laravel DataTables Module", category:"Laravel delivery", summary:"Build server-side Yajra DataTables modules with reliable CRUD, search, sorting, filtering, and pagination."},
  {name:"laravel-activity-logger", title:"Laravel Activity Logger", category:"Laravel delivery", summary:"Implement a hybrid indexed and JSON activity trail that supports investigation, filtering, and human-readable history."},
  {name:"laravel-deploy-fix-php", title:"Laravel Deploy Fix PHP", category:"Laravel delivery", summary:"Recover Laravel deployments by safely resetting caches and verifying application readiness when shell access is limited."},
  {name:"laravel-dual-repo-push", title:"Laravel Dual Repository Push", category:"Laravel delivery", summary:"Coordinate controlled Git delivery to development and client repositories while preserving traceability."},
  {name:"laravel-rbac-permissions", title:"Laravel RBAC Permissions", category:"Laravel delivery", summary:"Apply module-level read and write authorization with predictable middleware, navigation, and action behavior."},
  {name:"laravel-soft-delete-trash", title:"Laravel Soft Delete and Trash", category:"Laravel delivery", summary:"Provide unified soft deletion, restore, permanent deletion, retention, and scheduled cleanup behavior."},
  {name:"laravel-security-hardening", title:"Laravel Security Hardening", category:"Laravel delivery", summary:"Protect setup routes, ignored operational files, input boundaries, and other Laravel deployment surfaces."},
  {name:"laravel-json-ai-settings", title:"Laravel JSON AI Settings", category:"Laravel delivery", summary:"Store encrypted AI provider settings outside the database with safe validation and operational controls."},
  {name:"laravel-ai-multi-provider", title:"Laravel AI Multi-Provider", category:"Laravel delivery", summary:"Build resilient AI provider selection, fallback behavior, error handling, and user-friendly failure states."},
  {name:"laravel-vision-label-scan", title:"Laravel Vision Label Scan", category:"Laravel delivery", summary:"Convert image analysis into structured JSON, human review, and controlled application updates."},
  {name:"laravel-env-maintenance", title:"Laravel Environment Maintenance", category:"Laravel delivery", summary:"Manage approved environment settings and branded maintenance behavior without exposing secrets."},
  {name:"laravel-form-select2-global", title:"Laravel Form and Select2 Standards", category:"Laravel delivery", summary:"Maintain consistent application-wide form controls and Select2 styling through shared design variables."},
  {name:"mission-control", title:"Mission Control", category:"Laravel delivery", summary:"Coordinate agent APIs, adapters, tasks, and skill synchronization through a central orchestration workflow."},
  {name:"playwright-e2e-testing", title:"Playwright End-to-End Testing", category:"Engineering and quality", summary:"Automate cross-browser user journeys, CRUD regression, traces, authentication, and failure evidence."},
  {name:"api-contract-testing", title:"API Contract Testing", category:"Engineering and quality", summary:"Verify OpenAPI contracts, authorization, malformed inputs, invariants, compatibility, and error behavior."},
  {name:"application-security-review", title:"Application Security Review", category:"Engineering and quality", summary:"Perform evidence-based application, API, authorization, threat, and static security review."},
  {name:"supply-chain-security", title:"Supply Chain Security", category:"Engineering and quality", summary:"Review secrets, dependencies, containers, SBOMs, licenses, maintenance, and vulnerability exposure."},
  {name:"database-reliability-audit", title:"Database Reliability Audit", category:"Engineering and quality", summary:"Assess integrity, transactions, concurrency, backups, restores, recovery objectives, and operational readiness."},
  {name:"ci-cd-release-gates", title:"CI/CD Release Gates", category:"Engineering and quality", summary:"Design tested, least-privilege delivery pipelines with approvals, evidence, rollback, and release controls."},
  {name:"performance-load-testing", title:"Performance and Load Testing", category:"Engineering and quality", summary:"Plan load, stress, spike, soak, capacity, and bottleneck tests against explicit service targets."},
  {name:"frontend-quality-gate", title:"Frontend Quality Gate", category:"Engineering and quality", summary:"Verify responsive behavior, browser quality, runtime errors, performance budgets, and visual regressions."},
  {name:"accessibility-audit", title:"Accessibility Audit", category:"Engineering and quality", summary:"Combine automated and human checks to assess WCAG 2.2 accessibility and practical usability."},
  {name:"observability-incident-response", title:"Observability and Incident Response", category:"Engineering and quality", summary:"Establish useful logs, metrics, traces, alerts, runbooks, recovery evidence, and incident learning."},
  {name:"architecture-decision-records", title:"Architecture Decision Records", category:"Engineering and quality", summary:"Record reversible architecture decisions with context, evidence, alternatives, tradeoffs, and consequences."},
  {name:"ui-ux-product-design", title:"UI/UX Product Design", category:"Product design", summary:"Design user-centered flows, information architecture, wireframes, visual systems, responsive states, accessibility, usability tests, and implementation handoff."},
  {name:"figma-canva-design-workflow", title:"Figma and Canva Design Workflow", category:"Product design", summary:"Coordinate product UI in Figma with campaign, presentation, social, and brand production in Canva."},
  {name:"design-to-code-implementation", title:"Design to Code Implementation", category:"Product design", summary:"Turn approved designs into accessible, responsive, maintainable interfaces verified in the running application."},
  {name:"design-system-engineering", title:"Design System Engineering", category:"Product design", summary:"Create governed tokens, components, variants, documentation, theming, and design-to-code parity."},
  {name:"screen-reader-accessibility-testing", title:"Screen Reader Accessibility Testing", category:"Product design", summary:"Test keyboard and assistive-technology journeys with NVDA, JAWS, VoiceOver, TalkBack, or Narrator."},
  {name:"ai-evaluation-red-team", title:"AI Evaluation and Red Team", category:"AI systems", summary:"Test AI quality, safety, security, cost, latency, abuse resistance, and adversarial behavior."},
  {name:"deepeval-ai-testing", title:"DeepEval AI Testing", category:"AI systems", summary:"Build dataset-driven AI regression suites with trace-aware metrics and actionable failure analysis."},
  {name:"rag-evaluation", title:"RAG Evaluation", category:"AI systems", summary:"Measure retrieval quality, faithfulness, relevance, citations, freshness, and tenant isolation."},
  {name:"ai-observability", title:"AI Observability", category:"AI systems", summary:"Observe models, retrieval, agents, tools, quality, cost, latency, and errors without leaking sensitive content."},
  {name:"vector-database-readiness", title:"Vector Database Readiness", category:"AI systems", summary:"Select and benchmark vector architecture with isolation, recovery, operational, and exit planning."},
  {name:"data-operations-router", title:"Data Operations Router", category:"Data and analytics", summary:"Route data work by objective, scale, sensitivity, mutation risk, platform, and required evidence."},
  {name:"data-profile-clean-validate", title:"Profile, Clean, and Validate Data", category:"Data and analytics", summary:"Create reproducible profiling, cleaning, normalization, validation, and exception reporting workflows."},
  {name:"sql-query-engineering", title:"SQL Query Engineering", category:"Data and analytics", summary:"Develop safe complex SQL with joins, CTEs, windows, recursion, reconciliation, and controlled writes."},
  {name:"sql-performance-optimization", title:"SQL Performance Optimization", category:"Data and analytics", summary:"Use plans, indexes, cardinality, locks, workload evidence, and regression checks to improve SQL performance."},
  {name:"nosql-query-engineering", title:"NoSQL Query Engineering", category:"Data and analytics", summary:"Design document, search, key-value, aggregation, indexing, and consistency behavior for NoSQL workloads."},
  {name:"data-reconciliation-migration", title:"Data Reconciliation and Migration", category:"Data and analytics", summary:"Control source-to-target mappings, batches, parity checks, exceptions, cutover, and rollback."},
  {name:"analytics-engineering", title:"Analytics Engineering", category:"Data and analytics", summary:"Build tested staging models, dimensions, facts, metrics, documentation, and safe backfills."},
  {name:"big-data-analytics", title:"Big Data Analytics", category:"Data and analytics", summary:"Select scale-aware local, parallel, or distributed processing for large analytical workloads."},
  {name:"data-pipeline-orchestration", title:"Data Pipeline Orchestration", category:"Data and analytics", summary:"Create idempotent ETL and ELT schedules with retries, backfills, gates, observability, and recovery."},
  {name:"data-quality-contracts", title:"Data Quality Contracts", category:"Data and analytics", summary:"Define versioned schema, semantic, freshness, volume, ownership, and compatibility agreements."},
  {name:"data-lineage-governance", title:"Data Lineage and Governance", category:"Data and analytics", summary:"Manage lineage, ownership, classification, retention, impact analysis, and metadata quality."},
  {name:"analyst-insight-reporting", title:"Analyst Insight Reporting", category:"Data and analytics", summary:"Produce reproducible analysis, governed metrics, accessible visuals, uncertainty, and decision-ready findings."}
];

const grid = document.querySelector("#skills-grid");
const search = document.querySelector("#skill-search");
const filters = document.querySelector("#skill-filters");
const count = document.querySelector("#catalog-count");
const clear = document.querySelector("#clear-filters");
const empty = document.querySelector("#empty-state");
const categories = ["All", ...new Set(skills.map(skill => skill.category))];
let activeCategory = "All";

function initials(title) {
  return title.split(/\s+/).filter(word => word.length > 2).slice(0, 2).map(word => word[0]).join("").toUpperCase() || "SK";
}

function renderFilters() {
  filters.innerHTML = categories.map(category => `<button class="filter-button${category === activeCategory ? " active" : ""}" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${category}</button>`).join("");
}

function renderSkills() {
  const term = search.value.trim().toLowerCase();
  const visible = skills.filter(skill => {
    const categoryMatch = activeCategory === "All" || skill.category === activeCategory;
    const textMatch = !term || `${skill.name} ${skill.title} ${skill.category} ${skill.summary}`.toLowerCase().includes(term);
    return categoryMatch && textMatch;
  });

  grid.innerHTML = visible.map(skill => `
    <article class="skill-card" data-category="${skill.category}">
      <div class="skill-card-head">
        <span class="skill-glyph" aria-hidden="true">${initials(skill.title)}</span>
        <span class="skill-category">${skill.category}</span>
      </div>
      <h3>${skill.title}</h3>
      <span class="skill-name">${skill.name}</span>
      <p>${skill.summary}</p>
      <a class="skill-link" href="skills/${skill.name}/SKILL.md">Read skill instructions</a>
    </article>`).join("");

  count.textContent = visible.length === skills.length ? `Showing all ${skills.length} skills` : `Showing ${visible.length} of ${skills.length} skills`;
  empty.hidden = visible.length !== 0;
  clear.hidden = activeCategory === "All" && !term;
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderSkills();
});

search.addEventListener("input", renderSkills);
clear.addEventListener("click", () => {
  activeCategory = "All";
  search.value = "";
  renderFilters();
  renderSkills();
  search.focus();
});

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", event => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const toast = document.querySelector("#copy-toast");
let toastTimer;
document.addEventListener("click", async event => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    toast.textContent = "Copied to clipboard";
  } catch {
    toast.textContent = "Select the command and copy it manually";
  }
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
});

renderFilters();
renderSkills();
