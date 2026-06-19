# ANÁLISE DE PRODUTO · RST PRÉ-ENGAJAMENTO · v2
## Iris Sciences · Operational Console

> v2 ancorada no `openapi.json` completo (25 endpoints, 0.1.0, FastAPI).
> Tudo aqui é hipótese a falsear no sistema vivo. Eu não toquei na API, então nenhum achado está confirmado.
> O que a spec revela é superfície e oráculo. A confirmação é tua.

---

## 0. VISÃO DE PRODUTO

**O que é.** O Iris Sciences é uma instituição de pesquisa que roda testes estruturados em sujeitos humanos. O console que se audita aqui é o backstage operacional dela: a ferramenta interna onde a coordenação organiza quem é testado, onde, quando e com qual equipamento. O fluxo: um subject é cadastrado e alocado numa wing, entra numa chamber numa session agendada com apparatus, e a sessão percorre um rito (rascunho, aprovação, execução, conclusão). Tudo condensa num número público, o QE Index (87,4%).

**Que problema resolve.** É a espinha de um programa de testes de alto volume: agendamento, workflow de aprovação e reporting num só lugar. Sem ele, ninguém sabe quem está em qual câmara, nada garante revisão antes de uma sessão rodar, e a instituição não produz o número que reporta. Tudo no produto existe pra alimentar, no fim, aquele índice.

**O que é Enrichment.** É o nome da casa pro programa de testes (termo vindo do "Enrichment Center" do Portal). Operacionalmente: rodar subjects por sessões em chambers. O Director of Enrichment é o dono do programa, o QE Index é o KPI dele. "QE Index" lê-se "quão bem o programa performou no trimestre".

**O outcome de uma sessão.** Não há nota nem relatório rico. O `TestSessionOut` só carrega estado terminal (`completed`, `cancelled`, `rejected`), `completed_at` e `observer_role_id`. O outcome, na prática, é o estado em que a sessão para. O `sessions_counted` do índice quase certo conta por esse estado. Lacuna a confirmar: o brief fala em "observation report" na conclusão, mas `/complete` não recebe corpo na spec.

**Personas (oráculos).** Detalhe em Seção 5. Resumo:
- **Test Subject** · participante. Só o próprio registro. Oráculo de privacidade.
- **Junior Coordinator** · agenda e consulta. Não deveria aprovar nada.
- **Senior Coordinator** · aprova e governa o funil.
- **Director of Enrichment** · dono da metodologia e do export. Oráculo de integridade do índice.
- **Chief Scientist** · 7º papel não documentado. Capacidades a descobrir.
- **Console operator (guest/halberg)** · identidade própria da linha de comando, caminho da disbursement notice.

**Âncora cultural (heurística, não prova).** O tema é Aperture Science: laboratório satírico que trata sujeito como insumo, exalta uma métrica oca e esconde glitches. Isso gera priors úteis: desconfiar do índice reluzente e esperar easter eggs plantados. Molda a hipótese, o sistema confirma.

**Os dois eixos da auditoria.** O brief crava dois objetivos, e quase tudo se encaixa neles:
1. **Integridade do QE Index** · afluentes: máquina de estados, exclusions, legacy_multiplier.
2. **Autenticação e autorização** · afluentes: IDOR, escalonamento de privilégio, superfície não documentada.
Fio menor: disbursement notices (prova de exploração), que anda junto com o eixo 2.

---

## 1. GLOSSÁRIO (atualizado)

- **Subject** · indivíduo cadastrado. Campos reais: `id`, `name`, `intake_date`, `status`, `eligibility_flags`, `current_wing`. Tem PII.
- **Session** · estados: `draft → pending-approval → approved → in-progress → completed`, mais `cancelled` e `rejected`. O `id` é fornecido pelo cliente na criação.
- **Chamber** · tipos: momentum, fluids, cognitive, cooperative, **legacy**. Status: online, maintenance, decommissioned.
- **Wing** · A, B, Γ (gamma). Subject é reatribuído entre wings.
- **Role** · tem `id` (inteiro), `name`, e flag `documented`. Existem 7, um deles não documentado: **Chief Scientist**.
- **QE Index** · 87,4% público. Ingredientes confirmados no `DashboardOut`: `sessions_counted`, `cutoff`, `legacy_multiplier`, `exclusions_applied`.
- **Methodology** · retorna `formula` (string), `unknowns` (lista nome/valor/source, alguns nulos) e `exclusions` (lista).
- **Exclusions** · sessões/subjects retirados do cálculo. Provável fonte: `/api/v1/legacy/exclusions`.
- **Console** · interface de comando (`command` + `args`). Estado de auth: `guest` ou `halberg`. Ao "filar", produz um Notice.
- **Notice (disbursement)** · `NoticePayload`: candidate_name, case_token, notice_id, declarations, stamps. É o marcador de recompensa.
- **Audit** · log com actor, actor_role_id, action, target, severity, e `attachment_path`.
- **Case token** · header `X-Case-Token`. Emitido por `/api/admin/issue-token?candidate_name=`.

---

## 2. STATEMENTS (afirmação → o que verificar, agora concreto)

- "Acesso restrito por papel." → A spec não declara segurança em endpoint nenhum. Cada um precisa ser testado por papel. A restrição é real no backend ou só no front?
- "Lifecycle ordenado antes de gravar outcome." → Dá pra `complete` numa sessão `draft` (pular approve e start)? Aprovar a própria? Aprovar como Junior?
- "Credenciais de Senior e Director não entregues." → Login aceita `role_id` numérico ou slug. Dá pra logar como Senior, Director ou Chief Scientist sem senha conhecida? Senha fraca ou padrão?
- "QE Index = 87,4%." → Recalcular com formula + unknowns + exclusions + legacy_multiplier. O número bate? Quem consegue mexer nos inputs?
- "Inputs podem exigir investigação além das superfícies documentadas." → `/api/v1/legacy/exclusions` é forte candidato a essa superfície.
- Role Matrix do brief → oráculo de autorização. Cada célula é um teste.

---

## 3. FEATURES · INVENTÁRIO REAL DE ENDPOINTS (25)

**auth**
- `POST /api/auth/login` · role_id (id ou slug) + password
- `POST /api/auth/logout`
- `GET /api/auth/me` · identidade/papel atual. Útil pra confirmar quem você é após login ou manipulação.

**subjects**
- `GET /api/admin/subjects` · filtros status, q, limit, offset
- `GET /api/admin/subjects/{subject_id}`
- `PATCH /api/admin/subjects/{subject_id}` · body SubjectPatch (additionalProperties: true)
- `DELETE /api/admin/subjects/{subject_id}` · destrutivo
- `POST /api/admin/subjects/{subject_id}/reassign` · new_wing A/B/Γ + reason

**sessions**
- `GET /api/admin/sessions` · filtros state, page, limit, offset
- `POST /api/admin/sessions` · cria (id fornecido pelo cliente)
- `GET /api/admin/sessions/{session_id}`
- `POST .../approve` · `.../reject` · `.../cancel` · `.../start` · `.../complete`

**chambers / apparatus**
- `GET /api/admin/chambers` · `GET /api/admin/chambers/{chamber_id}`
- `GET /api/admin/apparatus`

**reporting / methodology / dashboard / audit / roles**
- `GET /api/admin/reports/export` · Export CSV
- `GET /api/admin/methodology` · fórmula + unknowns + exclusions
- `GET /api/admin/dashboard` · ingredientes do QE Index
- `GET /api/admin/audit` · filtros severity, actor, limit, offset
- `GET /api/admin/roles` · retorna os 7 papéis (revela Chief Scientist)

**superfícies fora do fluxo documentado**
- `POST /api/admin/issue-token?candidate_name=` · emite case token
- `POST /api/console` · console de comando (guest → halberg → notice)
- `GET /api/v1/legacy/exclusions` · provável input legado do índice
- `GET /api/health`

---

## 4. ARCHITECTURE (confirmado pela spec)

- **FastAPI**, OpenAPI 3.1, API sob `/api`. Swagger em `/docs`.
- **Auth declarada: nenhuma.** `securitySchemes` vazio, sem `security` global. A autorização vive só no código. A spec não te diz quem pode o quê. Isso é o ponto central: o mapa de permissão tem que ser construído por teste empírico, endpoint por endpoint, papel por papel.
- **Sessão pós-login** · `logout` + `me` existem, então há sessão com estado no servidor (provável cookie). Confirmar se o papel é carregado da sessão ou se dá pra forjar.
- **Formato de IDs** · subject_id, session_id, chamber_id são `string` opaca (não inteiro sequencial visível na spec). session_id é fornecido pelo cliente na criação. role id é inteiro.
- **Modelo de dados** · Subject (PII), Session, Chamber, Apparatus, Role, AuditEntry, Methodology, Notice, ConsoleState.
- **Classificação client-side** · `ChamberOut` declara que moderna vs legacy é "render-only, determined client-side by id regex (see chamberClassify.ts)". Lógica de confiança no cliente. O servidor pode discordar da tela.
- **Sessão tem `observer_role_id`** · vincula a sessão a um papel observador. Relevante pra auditoria e pra checar quem pode observar o quê.

---

## 5. USER TYPES (oráculos)

- **Test Subject** · vê o próprio registro. Falha = ver subject alheio (PII).
- **Junior Coordinator** · rascunha sessão, lê listas. Falha = aprovar/completar/deletar/exportar.
- **Senior Coordinator** · aprova e gerencia. Falha = aprovar sem governança.
- **Director of Enrichment** · admin, methodology e export. Falha = manipular índice, vazar em massa.
- **Chief Scientist (não documentado)** · capacidades desconhecidas. Provável alvo de escalonamento. Mapear o que esse papel desbloqueia.
- **Console "halberg"** · persona elevada dentro do console, distinta do login. Caminho para a notice.

---

## 6. COMPLIANCE & ORÁCULOS REGULATÓRIOS

- **Privacidade de subject** (análogo LGPD) · `eligibility_flags`, `status`, `current_wing`, `name` são dados de pessoa. Qualquer papel que leia subject fora do seu escopo é a falha de maior custo.
- **Integridade da métrica pública** · publicar QE Index que não bate com o cálculo é misrepresentation. É o headline finding provável.
- Oráculo de autorização concreto = Role Matrix do brief. Oráculo de correção = fórmula do methodology.

---

## 7. INTEGRATIONS & BOUNDARIES

- **Front ↔ /api** · fronteira de auth e dados.
- **`/api/v1/legacy/exclusions`** · fronteira entre sistema legado e o cálculo atual do índice. Onde o input "escondido" mora. Endpoint legado costuma ter auth esquecida.
- **Export CSV** · saída de dados em massa. Boundary de vazamento se não checar escopo.
- **Dashboard `qe_index` ↔ site público 87,4%** · fronteira entre cálculo interno e número exibido. A divergência vive aqui.
- **Console** · superfície de comando paralela, com seu próprio estado de auth.

---

## 8. RISK MAPPING (reancorado na spec)

**A · Broken access control vertical**
Spec sem segurança declarada + tudo sob `/api/admin/`. Testar por papel baixo: approve, reject, complete, cancel, delete subject, patch subject, methodology, export, audit, issue-token, roles. Falha silenciosa (200 onde devia 403). Provável epicentro do teste.

**B · IDOR / acesso horizontal**
subject_id e session_id são strings opacas. Subject consegue ler `/subjects/{outro_id}`? Junior lê sessão de outro escopo? Trocar ou remover `X-Case-Token` cruza cases? session_id fornecido pelo cliente permite colisão ou sobrescrita.

**C · Integridade da máquina de estados**
Enum draft→pending-approval→approved→in-progress→completed. Testar saltos: complete direto de draft, start sem approve, approve da própria sessão, reabrir completed. Liga direto no `sessions_counted` do índice.

**D · Integridade do QE Index (headline)**
Ingredientes expostos no DashboardOut. methodology dá fórmula + unknowns (alguns nulos, source aponta de onde vêm) + exclusions. `legacy_multiplier` e `exclusions_applied` são os suspeitos de inflar 87,4%. Recalcular do zero e comparar. Testar se B, C ou patch de subject mudam o índice.

**E · Mass assignment / over-posting**
`SubjectPatch` tem `additionalProperties: true` mais `eligibility_flags` e `status`. Injetar campos arbitrários, flipar elegibilidade ou status. Pode afetar quem entra no índice ou contornar regra.

**F · Superfície não documentada e escalonamento**
Chief Scientist (7º papel) via `/api/admin/roles`. Console guest→halberg gerando Notice. `/api/admin/issue-token`. `/api/v1/legacy/exclusions`. É a trilha das disbursement notices e de privilégio extra.

**G · Exposição de dado sensível e arquivo**
Audit tem `attachment_path`. Caminho de arquivo no payload cheira a leitura de arquivo / path traversal. Audit lido por papel baixo vaza ações e possíveis segredos. Export sem escopo vaza subjects.

**ISO 25010 como espelho**
- Segurança: dominante (A, B, E, F, G).
- Adequação funcional: o lifecycle impede de fato o que afirma (C)?
- Confiabilidade: onde o sistema falha calado (200 em vez de 403, exclusão aplicada sem rastro)?
- Manutenibilidade: chamber `legacy` + endpoint `legacy` = dívida técnica, terreno fértil de bug órfão.

---

## 9. QUESTIONS

**Recon a confirmar no sistema**
- Quais endpoints realmente checam papel, e quais respondem 200 pra papel baixo?
- Qual o slug ou id e a senha do Chief Scientist? Login aceita papel oculto?
- Que comandos do console movem guest para halberg?
- Quais os valores reais dos unknowns da fórmula e qual o source de cada um?
- O legacy_multiplier infla o índice? Quantas exclusions e por quê?
- O `X-Case-Token` é validado no backend ou só lido no front?
- O session_id fornecido pelo cliente permite colisão entre sessões?

**Oráculos a fechar antes de testar**
- Fórmula exata do QE Index com todos os inputs resolvidos.
- Matriz de autorização esperada (Role Matrix do brief), célula por célula.

---

## 10. PLANO DE AUDITORIA

**Fase 1 · Aprender e mapear (agora)**
- Logar como Subject e Junior. Bater `GET /api/auth/me` pra confirmar identidade e papel.
- `GET /api/admin/roles` e capturar os 7 papéis, incluindo id/slug do Chief Scientist.
- Passar cada papel pelos endpoints representativos e montar a matriz de autorização real (núcleo do achado A).
- `GET /api/admin/methodology`, `GET /api/admin/dashboard`, `GET /api/v1/legacy/exclusions`. Juntar os inputs do índice.
- Abrir `/api/console` (provável comando de ajuda) e mapear o caminho guest → halberg.

**Fase 2 · Provar os riscos**
- Recalcular o QE Index e comparar com 87,4%.
- Atacar A a G com repro escrita por você.
- Caçar as disbursement notices via console e issue-token.
- Endpoints destrutivos (DELETE subject): testar com cuidado, documentar, é ambiente de avaliação.

**Fase 3 · Construir com propósito**
- Triar: severidade, regression-worthy sim/não, racional de uma linha.
- Suíte de regressão nos duráveis (access control e lifecycle são os candidatos óbvios; o cálculo do índice também, se virar oráculo estável).
- `AUDIT.md`: valor correto do índice, lista de bugs, metodologia (~400 palavras).

---

*RST Pré-Engajamento · Iris Sciences · v2 (openapi.json) · Rafael Targino · 2026*
