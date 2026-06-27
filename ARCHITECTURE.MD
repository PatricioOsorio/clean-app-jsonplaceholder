# Plan: Fill ARCHITECTURE.md — Generic Clean Architecture doc for AI agents

## Context

The repo is a learning sandbox for Clean Architecture in React/TS. An empty
`ARCHITECTURE.MD` exists at repo root. Goal: turn it into a **portable
architecture spec** an AI agent can read in a _different_ project and reproduce
the same layering, naming, and rules — without coupling the doc to the `Post`
use case that happens to live here.

Decisions (from user):

- **Language:** English, full.
- **Depth:** Rules + generic copy-paste templates (Entity/Repo/DTO/Mapper/Hook/Component).
- **Scope:** Clean Arch principles assuming _this stack_ (React 19 + TS, tsyringe DI, TanStack Query, Tailwind v4, the component/IMV pattern). Not framework-agnostic.
- **Validation:** Document what the **code actually does** — DTO factory does NOT validate; validators are resolved separately via DI and run in the hook/boundary before `DTO.create`. (AGENTS.md's `create(props, validator)` is out of sync; the doc will describe the real flow and may footnote the divergence.)

The doc generalizes the patterns observed across `src/domain`, `src/infrastructure`,
`src/presentation` into named rules + neutral templates (use `Foo`/`Widget`
placeholders, never `Post`).

## File to write

Only `/Users/1147839/Documents/dev/labs/clean-app-new/ARCHITECTURE.MD` (rename intent: keep existing name `ARCHITECTURE.MD`).

## Document structure

### 1. Purpose & how to use this doc

- One paragraph: this is the architectural contract; agents must conform new code to it.
- Stack table (React 19, TS, react-router v7, TanStack Query v5, Axios, Tailwind v4, Vite, tsyringe + reflect-metadata).

### 2. The three layers & the Dependency Rule

- ASCII diagram: `presentation → domain ← infrastructure`. Dependencies point **inward only**.
- Per-layer one-line responsibility:
  - **domain** — entities, port interfaces (abstract classes), input DTOs, errors, validator contracts. Zero framework deps (only abstract validator interfaces allowed).
  - **infrastructure** — port implementations: HTTP clients, repositories, mappers (response→entity), storage, validators, DI composition root.
  - **presentation** — React components, controller/data hooks, TanStack Query, router, view-models (IMV) + entity→VM mappers.
- Hard rules list (no use-case classes; raw API responses never reach domain; DI tokens live in domain as `static TOKEN = Symbol(...)`; path aliases `@domain` / `@infrastructure` / `@presentation`; barrels everywhere).

### 3. Naming & file-suffix convention (the dot-role system)

- Table of suffixes: `.entity.ts`, `.repo.ts` (port) / `.repo.<source>.ts` (impl), `.dto.ts`, `.error.ts`, `.module.ts`, `.mapper.ts`, `.response.ts`, `.client.ts`, `.validators.ts`, `.mv.ts`, `.interfaces.ts`.
- Casing rules: kebab-case files / lowercase grouping folders / PascalCase component+page folders.
- Identifier rules: classes PascalCase; `I`-prefixed type alias mirrors (`IFooEntity = FooEntity`); SCREAMING_SNAKE module config consts.
- Note the real-repo "reponse" typo → doc prescribes correct `.response.ts`.

### 4. Domain layer (rules + templates)

- **Entity** template: pure data class + `IFooEntity` alias.
- **Repository port** template: abstract class + `static readonly TOKEN = Symbol(...)`, abstract methods returning entities/`Promise`.
- **Input DTO** template: `FooProps` type, class `implements FooProps`, `readonly` fields, `private constructor` + `Object.assign`, `static create(data)` factory, `static VALIDATOR_TOKEN`. State plainly: factory does **not** validate.
- **Errors** template: base `DomainError extends Error` (title + prototype fix), feature subclasses, optional `issues: IValidationIssue[]`.
- **Validator contract** template: `IValidatorEntity<T> { validate(input: unknown): T }`, `IValidationIssue`.
- Feature-slice folder layout (`domain/<feature>/{ entity, repo, dtos/, errors/, index }`).

### 5. Infrastructure layer (rules + templates)

- **Transport port + adapter** template: abstract `HttpRepository` (domain port) + `@injectable() AxiosHttpClient implements HttpRepository`, error translation raw→`HttpError`.
- **Repository impl** template: `@injectable()`, `@inject(Port.TOKEN)` ctor injection, per-method try/catch → `handleError` translating infra errors (`HttpError`/`NetworkError`) into domain errors. Multiple interchangeable impls (`.api` / `.mock` / `.local`).
- **Response model** template: `IFooResponse` raw external shape (infra-only).
- **Mapper** template: `abstract class` of `static` methods — `toEntity`/`toEntities` (response→entity) and `toResponse` (partial, entity→write payload); field-rename is the single translation point.
- **Storage port + adapter**, **config** (`ENV` via env-var, `VITE_DATA_SOURCE`), **validators** (provider-prefixed, `implements IValidatorEntity`, throw domain error).
- **DI composition root** template: per-concern `*.module.ts` side-effect files registering `Port.TOKEN → { useClass }`; root `container.ts` aggregates via side-effect imports and selects impl/validator by ENV const. This is SOLID O/L/D made concrete.

### 6. Presentation layer (rules + templates)

- **IMV / view-model contract** (`.mv.ts`, `IFooVM`): minimal UI shape, primitives only, no React/lib imports; lives once in `features/<f>/models/<f>/`; components import it, never redeclare.
- **Entity↔VM mapper** in `models/`: anti-corruption boundary keeping entities out of UI.
- **Data flow trace** (generic): `Page → controller hook (usePage) → data hook (use-foo) → DI-resolved repository (useFeatureDependencies) → Mapper.toVM → component`. Entities never escape data hooks.
- **Dependency hook** template: `useFeatureDependencies()` memoized `container.resolve<Port>(Port.TOKEN)` — per-feature, not a global context.
- **Data/mutation hooks**: TanStack Query; centralized `QUERY_KEYS`; optimistic mutation wrapper pattern (shared hook + `__optimistic` flag).
- **Component pattern** (reference the mandatory `.agents/skills/component` skill): four archetypes (leaf/card, composite/list, detail, presentational); core 4 files `Foo.tsx + Foo.interfaces.ts + Foo.css + index.ts`; `Empty`/`Skeleton` sub-components attached as statics; props compose styleguide mixins (`IWithRootProps`, `IWithLoading`, …) + local VM; root spreads `{...rootProps}` + `cn(...)`; CSS `@reference`, single `-container` root, first-letter-segment `xyz__` child prefixes.
- Routing: `createBrowserRouter`, lazy routes, `AppLayout`, basename from ENV.

### 7. Checklist for adding a new feature (the reproducible recipe)

Ordered steps an agent follows end-to-end:

1. domain: entity + repo port (+TOKEN) + DTOs + errors + barrels.
2. infrastructure: response model + mapper + repo impl(s) + validators + `*.module.ts` registration + wire into `container.ts`.
3. presentation: `models/` (IMV + VM mapper) → `useFeatureDependencies` → data/mutation hooks → components (per skill) → page + controller hook → route.
4. Verify dependency rule (no `domain → infrastructure` import).

### 8. Anti-patterns (short "do NOT" list)

Use-case pass-through classes; entities/responses crossing boundaries; Axios/React types in domain; global DI context; logic in components instead of hooks; redeclaring the data shape in component interfaces; new dependency where a few lines suffice.

## Verification

- Re-read each layer's representative files cited above and confirm every template in the doc matches a real pattern in the repo (entity, repo port, DTO, mapper, DI module, dependency hook, component archetype).
- Grep check the doc contains no `Post`-specific identifiers (placeholders only): `grep -i "post" ARCHITECTURE.MD` should return only incidental prose, not template code.
- Sanity: an agent could, from §7 alone, scaffold a new feature folder set matching existing structure.

skipped: framework-agnostic variant, validator-in-factory refactor. add when: user wants either.
