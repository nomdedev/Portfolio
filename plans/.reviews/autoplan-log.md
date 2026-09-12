# /autoplan — Log de revisión

Skill: `autoplan` (gstack) · Plan: `plans/responsive-plan.md` · Rama: `main` · HEAD: `3c4fcf2`
Punto de restauración: `plans/.reviews/main-autoplan-restore-20260912-192531.md`
Fecha: 2026-09-12

## Degradación de voces (matriz)

| Intento | Resultado |
|---------|-----------|
| Claude subagente (`delegate_task`) | `HTTP 404: model: deepseek-flash` tras 5 reintentos (38s) |
| Codex (`codex exec`) | binario no instalado |
| Claude CLI (`claude -p`) como voz externa | `401 OAuth access token has been revoked` |
| Binarios gstack (`~/.hermes/skills/gstack/bin/*`) | no instalados |

**Modo: `single-reviewer`.** Los binarios de gstack y los paths `~/.gstack/*` se sustituyen
por `plans/.reviews/` dentro del repo. No se finge consenso de dos voces: los cuadros de
consensus van con `N/A`.

## Fases

- Fase 0 (intake, restore point, contexto, detección de scope): UI scope = sí (componentes,
  layout, nav, grilla); DX scope = no → Fase 3.5 saltada con motivo escrito.
- Fase 1 (CEO): 4 premisas (1 sin verificar, 1 asumida), 3 alternativas evaluadas,
  modo SELECTIVE EXPANSION, registros de errores y de modos de fallo, delta de estado
  soñado. **Corrigió una premisa del plan con medición** (el nav no entra a 1024).
- Fase 2 (Diseño): 7 pasadas con nota, mapa de anchos propuesto, el hueco de 768-1023
  identificado como el problema compartido.
- Fase 3 (Ingeniería): diagrama de arquitectura, mapa codepath → test, modos de fallo con
  brecha crítica, plan de tests en disco (`plans/.reviews/eng-test-plan.md`).
- Fase 4 (gate): 7 decisiones de gusto + 3 desafíos al usuario + 8 tareas agregadas.

## Decisiones: 12 auto-decididas (ver audit trail en el plan), 7 al gate del usuario.

## Correcciones al plan original (producto del review)

1. **R1 estaba mal.** "El nav entra a 1024" era una suposición; medido: disponible 824px vs
   necesario 935px (ES) / 885px (EN) → sobran -111px / -61px. Se reescribe R1 con la
   compactación medida (ocultar índices `0N.`: 125px; `gap-6`: 32px más).
2. **R6 crece:** landscape 844×390, idiomas ES+EN, reflow 200% y el contrato del fondo
   (regresión del bug que dejaba el fondo animado invisible).
3. **R7 se posterga:** no hay problema medido que justifique `clamp()` global.
4. **Se agrega R1b:** contención de foco y scroll lock del menú móvil (radio de impacto R1).

## Pendientes declarados

- Segunda voz (adversarial) sobre este plan: no ejecutada por falta de tooling.
- Verificar P2 (tráfico móvil real) en `/analytics` de Vercel antes de priorizar R3.
