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
  {name:"animated-glow-border", title:"Animated Glow Border", category:"Product design", summary:"Add accessible, theme-aware rotating borders with normal or reverse motion and graceful static fallbacks."},
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

const skillIcons = {
  "central-knowledge-base": "library-big",
  "test-software-app": "clipboard-check",
  "deploy-secrets-zero-exposure": "shield-check",
  "extract-to-toolkit": "package-open",
  "laravel-datatables-module": "table-properties",
  "laravel-activity-logger": "scroll-text",
  "laravel-deploy-fix-php": "wrench",
  "laravel-dual-repo-push": "git-branch-plus",
  "laravel-rbac-permissions": "key-round",
  "laravel-soft-delete-trash": "trash-2",
  "laravel-security-hardening": "shield",
  "laravel-json-ai-settings": "braces",
  "laravel-ai-multi-provider": "network",
  "laravel-vision-label-scan": "scan-eye",
  "laravel-env-maintenance": "settings-2",
  "laravel-form-select2-global": "list-checks",
  "mission-control": "radar",
  "playwright-e2e-testing": "panels-top-left",
  "api-contract-testing": "plug-zap",
  "application-security-review": "shield-alert",
  "supply-chain-security": "boxes",
  "database-reliability-audit": "database-backup",
  "ci-cd-release-gates": "workflow",
  "performance-load-testing": "gauge",
  "frontend-quality-gate": "monitor-check",
  "accessibility-audit": "accessibility",
  "observability-incident-response": "chart-no-axes-combined",
  "architecture-decision-records": "file-text",
  "ui-ux-product-design": "palette",
  "animated-glow-border": "palette",
  "figma-canva-design-workflow": "palette",
  "design-to-code-implementation": "code-xml",
  "design-system-engineering": "component",
  "screen-reader-accessibility-testing": "audio-lines",
  "ai-evaluation-red-team": "shield-alert",
  "deepeval-ai-testing": "brain-circuit",
  "rag-evaluation": "search-code",
  "ai-observability": "scan-search",
  "vector-database-readiness": "database-zap",
  "data-operations-router": "route",
  "data-profile-clean-validate": "list-check",
  "sql-query-engineering": "database",
  "sql-performance-optimization": "database-zap",
  "nosql-query-engineering": "file-json",
  "data-reconciliation-migration": "refresh-cw",
  "analytics-engineering": "chart-network",
  "big-data-analytics": "server-cog",
  "data-pipeline-orchestration": "git-merge",
  "data-quality-contracts": "file-check-2",
  "data-lineage-governance": "network",
  "analyst-insight-reporting": "chart-spline"
};

const grid = document.querySelector("#skills-grid");
const search = document.querySelector("#skill-search");
const filters = document.querySelector("#skill-filters");
const count = document.querySelector("#catalog-count");
const clear = document.querySelector("#clear-filters");
const empty = document.querySelector("#empty-state");
const modal = document.querySelector("#skill-modal");
const modalPanel = modal.querySelector(".skill-modal-panel");
const modalTitle = modal.querySelector("#skill-modal-title");
const modalIntro = modal.querySelector("#skill-modal-intro");
const modalInvocation = modal.querySelector("#skill-modal-invocation");
const modalPrompt = modal.querySelector("#skill-modal-prompt");
const modalRead = modal.querySelector("#skill-modal-read");
const categories = ["All", ...new Set(skills.map(skill => skill.category))];
const i18n = window.ToolkitI18n || {t: key => key, category: value => value};
let activeCategory = "All";
let currentSkill = null;
let lastFocused = null;

function renderFilters() {
  filters.innerHTML = categories.map(category => `<button class="filter-button${category === activeCategory ? " active" : ""}" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${i18n.category(category)}</button>`).join("");
}

function renderSkills() {
  const term = search.value.trim().toLowerCase();
  const visible = skills.filter(skill => {
    const categoryMatch = activeCategory === "All" || skill.category === activeCategory;
    const textMatch = !term || `${skill.name} ${skill.title} ${skill.category} ${i18n.category(skill.category)} ${skill.summary}`.toLowerCase().includes(term);
    return categoryMatch && textMatch;
  });

  grid.classList.toggle("product-focus", activeCategory === "Product design");
  grid.innerHTML = visible.map(skill => `
    <article class="skill-card" data-category="${skill.category}">
      <div class="skill-card-head">
        <span class="skill-glyph" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="assets/lucide-icons.svg?v=20260804-2#${skillIcons[skill.name]}"></use></svg></span>
        <span class="skill-category">${i18n.category(skill.category)}</span>
      </div>
      <h3>${skill.title}</h3>
      <span class="skill-name">${skill.name}</span>
      <p>${skill.summary}</p>
      <div class="skill-actions">
        <a class="skill-action skill-action-read" href="skills/${skill.name}/SKILL.md">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="assets/lucide-icons.svg?v=20260804-2#file-text"></use></svg>
          <span>${i18n.t("readSkill")}</span>
        </a>
        <button class="skill-action skill-action-icon" type="button" data-copy-skill="${skill.name}" aria-label="${i18n.t("copySkill")}" title="${i18n.t("copySkill")}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="assets/lucide-icons.svg?v=20260804-2#copy"></use></svg>
        </button>
        <button class="skill-action skill-action-how" type="button" data-how-to="${skill.name}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="assets/lucide-icons.svg?v=20260804-2#circle-help"></use></svg>
          <span>${i18n.t("howTo")}</span>
        </button>
      </div>
    </article>`).join("");

  count.textContent = visible.length === skills.length ? i18n.t("showAll", {count: skills.length}) : i18n.t("showSome", {visible: visible.length, count: skills.length});
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

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    showToast(i18n.t("copyFailed"));
  }
}

function buildExamplePrompt(skill) {
  return `Use $${skill.name} for this task. ${skill.summary} Apply it to the active project and verify the result.`;
}

function syncModal() {
  if (!currentSkill) return;
  modal.querySelector(".skill-modal-eyebrow").textContent = i18n.t("modalEyebrow");
  modalTitle.textContent = i18n.t("modalTitle", {title: currentSkill.title});
  modalIntro.textContent = i18n.t("modalIntro", {title: currentSkill.title});
  modal.querySelector('[data-modal-step="1"]').textContent = i18n.t("modalStep1");
  modal.querySelector('[data-modal-step="2"]').textContent = i18n.t("modalStep2");
  modal.querySelector('[data-modal-step="3"]').textContent = i18n.t("modalStep3");
  modal.querySelector('[data-modal-label="invocation"]').textContent = i18n.t("invocation");
  modal.querySelector('[data-modal-label="example"]').textContent = i18n.t("examplePrompt");
  modal.querySelector("[data-copy-invocation]").textContent = i18n.t("copy");
  modal.querySelector("[data-copy-prompt]").textContent = i18n.t("copyPrompt");
  modal.querySelectorAll("[data-modal-close]").forEach(button => button.setAttribute("aria-label", i18n.t("closeGuide")));
  modalInvocation.textContent = `$${currentSkill.name}`;
  modalPrompt.textContent = buildExamplePrompt(currentSkill);
  modalRead.textContent = i18n.t("readFull");
  modalRead.href = `skills/${currentSkill.name}/SKILL.md`;
}

function openSkillModal(name, trigger) {
  currentSkill = skills.find(skill => skill.name === name);
  if (!currentSkill) return;
  lastFocused = trigger;
  syncModal();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalPanel.focus();
}

function closeSkillModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}

async function copySkillInstructions(name) {
  try {
    const response = await fetch(`skills/${encodeURIComponent(name)}/SKILL.md`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await copyText(await response.text(), i18n.t("copiedSkill"));
  } catch {
    showToast(i18n.t("copyFailed"));
  }
}

document.addEventListener("click", async event => {
  const closeButton = event.target.closest("[data-modal-close]");
  if (closeButton) {
    closeSkillModal();
    return;
  }
  const howToButton = event.target.closest("[data-how-to]");
  if (howToButton) {
    openSkillModal(howToButton.dataset.howTo, howToButton);
    return;
  }
  const copySkillButton = event.target.closest("[data-copy-skill]");
  if (copySkillButton) {
    await copySkillInstructions(copySkillButton.dataset.copySkill);
    return;
  }
  if (event.target.closest("[data-copy-invocation]") && currentSkill) {
    await copyText(`$${currentSkill.name}`, i18n.t("copied"));
    return;
  }
  if (event.target.closest("[data-copy-prompt]") && currentSkill) {
    await copyText(buildExamplePrompt(currentSkill), i18n.t("copied"));
    return;
  }
  const skillTarget = event.target.closest("[data-skill-target]");
  if (skillTarget) {
    activeCategory = "All";
    search.value = skillTarget.dataset.skillTarget;
    renderFilters();
    renderSkills();
    document.querySelector("#skills")?.scrollIntoView({behavior: "smooth", block: "start"});
    return;
  }
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  await copyText(button.dataset.copy, i18n.t("copied"));
});

document.addEventListener("keydown", event => {
  if (modal.hidden) return;
  if (event.key === "Escape") {
    closeSkillModal();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...modalPanel.querySelectorAll('a[href], button:not([disabled])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || document.activeElement === modalPanel)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function applyDynamicCopy() {
  renderFilters();
  renderSkills();
  const clearButton = document.querySelector("#clear-filters");
  if (clearButton) clearButton.textContent = i18n.t("clear");
  const emptyTitle = document.querySelector("#empty-state strong");
  const emptyCopy = document.querySelector("#empty-state p");
  if (emptyTitle) emptyTitle.textContent = i18n.t("noMatch");
  if (emptyCopy) emptyCopy.textContent = i18n.t("broader");
}

applyDynamicCopy();
window.addEventListener("toolkit-language-change", () => {
  applyDynamicCopy();
  if (!modal.hidden) syncModal();
});
