# Back End

Version-Timestamp: 2026-08-04 17:36:47 +05:00

Identify the framework, runtime, authentication model, job system, storage, mail path, scheduler, and deployment model before testing.

## Discovery checklist

- Language and supported runtime version
- Framework and exact installed version
- Route and middleware structure
- Authentication, roles, policies, gates, and tenant scopes
- Validation location and error format
- ORM/query layer and transaction boundaries
- Queue, scheduler, retry, and idempotency behavior
- File/object storage and download authorization
- Mail configuration and delivery path
- Cache and session drivers
- Logging, monitoring, health endpoints, and backup controls
- Web server, process manager, containers, serverless functions, or desktop runtime

## Framework routing

| Back end | Useful checks |
|---|---|
| Laravel/PHP | `composer.json`, routes, middleware, policies, Form Requests, Eloquent scopes, queues, scheduler, config cache, Blade compilation, PHPUnit/Pest |
| Node.js | package lock, framework routes/middleware, schema validation, async error boundaries, workers, npm test/lint/build |
| Python | requirements/lock, Django/FastAPI/Flask routes, permissions, serializers/schemas, task workers, pytest, migrations scope |
| .NET | target framework, controllers/minimal APIs, authorization policies, EF Core, hosted services, xUnit/NUnit, configuration providers |
| Java/Kotlin | build file, Spring/security filters, validation, ORM, transactions, schedulers, JUnit, profiles |
| Ruby/Rails | routes, controllers/policies, Active Record scopes, jobs, mailers, RSpec, credentials handling |
| Serverless | function auth, event validation, retries, idempotency, concurrency, secret bindings, cold starts, observability |

Do not assume a stack from appearance. Prefer existing supported components over introducing test dependencies. Validate third-party packages, browser extensions, and plugins before sharing confidential application data with them.
