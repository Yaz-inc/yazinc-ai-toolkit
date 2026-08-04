window.ToolkitResources = [
  {
    id: "focused-ai-prototype",
    icon: "brain-circuit",
    stack: "React · Vite · Puter.js",
    links: [
      {label: "Puter.js documentation", href: "https://developer.puter.com/ai/"},
      {label: "Vite documentation", href: "https://vite.dev/guide/"}
    ],
    prompt: "Build a focused AI prototype with React, Vite, and Puter.js. First define one clear user journey and select the relevant Yazinc AI Toolkit skills. Do not place provider API keys in frontend code. Confirm Puter.js authentication and user-pays behavior, then implement accessible loading, empty, error, and result states. Validate inputs, handle failed requests, test the complete journey, and report the evidence and remaining production risks.",
    copy: {
      en: {title: "Launch a focused AI prototype", what: "A fast browser-based starting point using React, Vite, and Puter.js without placing provider API keys in frontend code.", how: "Define one user journey, confirm Puter’s authentication and user-pays model, then build accessible loading, error, and result states."},
      es: {title: "Lanza un prototipo de IA enfocado", what: "Un punto de partida rápido en el navegador con React, Vite y Puter.js, sin colocar claves de API del proveedor en el frontend.", how: "Define un recorrido de usuario, confirma la autenticación y el modelo de pago del usuario de Puter, y crea estados accesibles de carga, error y resultado."},
      fr: {title: "Lancer un prototype IA ciblé", what: "Un point de départ rapide dans le navigateur avec React, Vite et Puter.js, sans placer les clés API du fournisseur dans le frontend.", how: "Définissez un parcours utilisateur, confirmez l’authentification et le modèle payé par l’utilisateur de Puter, puis créez des états accessibles de chargement, d’erreur et de résultat."},
      de: {title: "Einen fokussierten KI-Prototyp starten", what: "Ein schneller browserbasierter Einstieg mit React, Vite und Puter.js, ohne Anbieter-API-Schlüssel im Frontend zu speichern.", how: "Definieren Sie eine User Journey, prüfen Sie Puters Authentifizierung und nutzerfinanziertes Modell und bauen Sie barrierefreie Lade-, Fehler- und Ergebniszustände."}
    }
  },
  {
    id: "maintainable-full-stack",
    icon: "panels-top-left",
    stack: "Next.js · Supabase",
    links: [
      {label: "Next.js documentation", href: "https://nextjs.org/docs"},
      {label: "Supabase documentation", href: "https://supabase.com/docs"}
    ],
    prompt: "Build a maintainable full-stack application with Next.js and Supabase. First inspect the project and select the relevant Yazinc AI Toolkit skills. Model users, ownership, and data relationships before coding. Enforce row-level security and server-side authorization, validate every read and write, keep secrets outside the client, and add accessible states. Test authentication, CRUD, sorting, filtering, pagination, concurrency, and failure paths. Add observability, backup, rollback, and deployment checks, then report verification evidence.",
    copy: {
      en: {title: "Build a maintainable full-stack app", what: "A structured Next.js and Supabase foundation for applications that need routing, authentication, relational data, storage, and deployment.", how: "Model ownership first, enforce row-level security, validate every write, then add tests, observability, backup, and rollback."},
      es: {title: "Crea una aplicación full-stack mantenible", what: "Una base estructurada con Next.js y Supabase para aplicaciones que requieren rutas, autenticación, datos relacionales, almacenamiento y despliegue.", how: "Modela primero la propiedad, aplica seguridad a nivel de fila, valida cada escritura y añade pruebas, observabilidad, respaldo y reversión."},
      fr: {title: "Créer une application full-stack maintenable", what: "Une base structurée avec Next.js et Supabase pour les applications nécessitant routage, authentification, données relationnelles, stockage et déploiement.", how: "Modélisez d’abord la propriété, appliquez la sécurité au niveau des lignes, validez chaque écriture, puis ajoutez tests, observabilité, sauvegarde et retour arrière."},
      de: {title: "Eine wartbare Full-Stack-App bauen", what: "Eine strukturierte Next.js- und Supabase-Basis für Anwendungen mit Routing, Authentifizierung, relationalen Daten, Speicher und Bereitstellung.", how: "Modellieren Sie zuerst Eigentümerschaft, erzwingen Sie Row-Level Security, validieren Sie jeden Schreibvorgang und ergänzen Sie Tests, Observability, Backup und Rollback."}
    }
  },
  {
    id: "reliable-automation",
    icon: "workflow",
    stack: "n8n · APIs · Databases",
    links: [
      {label: "n8n documentation", href: "https://docs.n8n.io/"}
    ],
    prompt: "Design a reliable business workflow with n8n. First map the trigger, inputs, outputs, systems, data sensitivity, credentials, and owner, then select the relevant Yazinc AI Toolkit skills. Use least-privilege credentials and safe test data. Make each operation idempotent, validate payloads, handle rate limits, add bounded retries, timeouts, alerts, audit evidence, and a manual recovery path. Test duplicates, partial failures, unavailable services, and replay before requesting production access.",
    copy: {
      en: {title: "Automate a reliable business workflow", what: "An n8n workflow pattern for connecting triggers, APIs, databases, notifications, and controlled AI steps.", how: "Map inputs and credentials, make each step idempotent, add retries and alerts, then test with safe data before production access."},
      es: {title: "Automatiza un flujo empresarial fiable", what: "Un patrón de n8n para conectar disparadores, API, bases de datos, notificaciones y pasos de IA controlados.", how: "Mapea entradas y credenciales, haz cada paso idempotente, añade reintentos y alertas, y prueba con datos seguros antes del acceso a producción."},
      fr: {title: "Automatiser un workflow métier fiable", what: "Un modèle n8n pour relier déclencheurs, API, bases de données, notifications et étapes IA contrôlées.", how: "Cartographiez les entrées et identifiants, rendez chaque étape idempotente, ajoutez reprises et alertes, puis testez avec des données sûres avant l’accès à la production."},
      de: {title: "Einen zuverlässigen Geschäftsablauf automatisieren", what: "Ein n8n-Muster zur Verbindung von Triggern, APIs, Datenbanken, Benachrichtigungen und kontrollierten KI-Schritten.", how: "Ordnen Sie Eingaben und Zugangsdaten zu, machen Sie jeden Schritt idempotent, ergänzen Sie Wiederholungen und Warnungen und testen Sie vor Produktionszugriff mit sicheren Daten."}
    }
  },
  {
    id: "private-local-ai",
    icon: "server-cog",
    stack: "Ollama · Local models",
    links: [
      {label: "Ollama documentation", href: "https://docs.ollama.com/"}
    ],
    prompt: "Plan and implement a private local AI workflow with Ollama. First define the use case, data classification, privacy boundary, acceptable quality, latency, and hardware limits, then select the relevant Yazinc AI Toolkit skills. Choose and pin a suitable model, keep sensitive data within the approved boundary, validate outputs, and measure quality, latency, memory, and failure behavior. Add logging that excludes prompts and secrets, plus fallback, update, rollback, and monitoring procedures.",
    copy: {
      en: {title: "Run private AI locally", what: "An Ollama-based starting point for AI workloads that benefit from local models, tighter data control, or offline development.", how: "Verify hardware and model fit, define privacy boundaries, benchmark quality and latency, then add fallback and monitoring."},
      es: {title: "Ejecuta IA privada localmente", what: "Un punto de partida con Ollama para cargas de IA que se benefician de modelos locales, mayor control de datos o desarrollo sin conexión.", how: "Verifica el hardware y el modelo, define límites de privacidad, mide calidad y latencia, y añade respaldo y supervisión."},
      fr: {title: "Exécuter une IA privée localement", what: "Un point de départ avec Ollama pour les charges IA bénéficiant de modèles locaux, d’un meilleur contrôle des données ou du développement hors ligne.", how: "Vérifiez l’adéquation du matériel et du modèle, définissez les limites de confidentialité, mesurez qualité et latence, puis ajoutez secours et surveillance."},
      de: {title: "Private KI lokal ausführen", what: "Ein Ollama-basierter Einstieg für KI-Workloads, die von lokalen Modellen, stärkerer Datenkontrolle oder Offline-Entwicklung profitieren.", how: "Prüfen Sie Hardware und Modell, definieren Sie Datenschutzgrenzen, messen Sie Qualität und Latenz und ergänzen Sie Fallback und Monitoring."}
    }
  }
];
