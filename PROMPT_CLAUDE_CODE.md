# Prompt inicial para o Claude Code: suíte de regressão Iris Sciences

> Cole este conteúdo como a primeira mensagem ao Claude Code, com o terminal aberto na raiz do repositório da suíte. Ele funciona também como brief permanente do projeto.

---

## 1. Papel e missão

Você vai me ajudar a construir o **Deliverable 01** de uma auditoria de QA e segurança: uma **suíte de testes de regressão em Playwright + TypeScript** que cobre os achados que determinei serem dignos de regressão no "Iris Sciences Operational Console".

Contexto importante:

- Este é um alvo de avaliação **autorizado e em sandbox**. O uso de IA é explicitamente permitido pelo enunciado.
- A suíte precisa ser **executável por um revisor que clona o repositório**, usando o próprio token dele.
- Quase tudo é **API** (autorização, exposição de dados e ciclo de vida de sessão). Há um único ponto que exige navegador (o índice público).

## 2. Antes de escrever qualquer linha de código

Leia, nesta ordem, e use como fonte da verdade:

1. `AUDIT.md` na raiz do repositório. Contém os **sete achados confirmados** (FINDING-001 a FINDING-007), cada um com endpoints, papéis, evidência e triagem de regressão. Não há esqueleto pendente: tudo está confirmado.
2. `openapi.json`. Inventário de endpoints, schemas e modelo de autenticação.
3. `package.json` já existente. A suíte foi iniciada com `@playwright/test` e `dotenv`.

O `AUDIT.md` modela os achados de autorização e de workflow com **tabelas de decisão** (Tabela A para autorização de endpoint, Tabela B para o ciclo de vida da sessão). Essas tabelas são a base da arquitetura da seção 6. Não invente achados: codifique somente o que está no `AUDIT.md`.

## 3. O produto em uma página

- Console de operações de uma instituição de pesquisa fictícia. Base da API: `https://iris.revelarautomation.com/api`.
- Toda requisição exige o header `X-Case-Token: <token>`.
- Autenticação de papel: `POST /api/auth/login` (form-urlencoded) com `role_id` (id numérico) e `password`. A resposta define um cookie de sessão assinado `iris_role_session`, que carrega o id do papel. **A identidade vem do cookie, não do corpo da requisição.** Nunca reenvie credencial em chamadas que não sejam o login.
- Escala de papéis (tier): Anon 0, Test Subject (271) 1, Junior Test Coordinator (272) 2, Senior Test Coordinator (273) 3, Director of Enrichment (274) 4.
- Credenciais que possuo: Subject, Junior e Director. As de Senior (273) e Chief Scientist (275) não foram emitidas.
- A senha do Director foi recuperada durante a auditoria (é o FINDING-002) e é tratada como segredo: entra por variável de ambiente, nunca no código.

## 4. Convenção central da suíte (documente isto no README)

Os testes de segurança **afirmam o comportamento correto e seguro**. Como o ambiente atual é vulnerável, esses testes **falham de propósito** contra o deploy atual: cada falha reproduz um achado e passaria a verde quando a correção fosse aplicada.

Inclua também **controles positivos**: testes que afirmam um comportamento que já está correto (por exemplo, um endpoint que já bloqueia). Esses passam e provam que o arnês está saudável, e não quebrado.

Deixe isso explícito no README e nos nomes dos testes, para o revisor entender que vermelho ali é o esperado.

## 5. Parametrização e segredos

- `BASE_URL` e `CASE_TOKEN` vêm de `.env` (forneça `.env.example`). Nada hardcoded.
- Crie `playwright/.auth/` para o estado de sessão e adicione `.env` e `playwright/.auth/` ao `.gitignore`. Esse estado contém cookies e equivale a um segredo.
- Testes que dependem de Director devem **pular com elegância** (`test.skip`) se a senha do Director não estiver no `.env`, para a suíte continuar executável por quem não recuperou essa credencial.

## 6. Arquitetura da suíte: data-driven (leia com atenção)

A suíte **não** deve ser um arquivo de teste artesanal por achado. As tabelas de decisão do `AUDIT.md` já transformaram os testes em dados, então a suíte é um pequeno motor guiado por uma **tabela de casos**.

**A tabela de casos.** Cada caso é uma linha de dado: id, método, path, papel (ou tier mínimo exigido), estratégia de probe e resultado esperado. Adicionar cobertura é adicionar uma linha, não escrever código novo. A rastreabilidade (caso para regra da tabela de decisão para achado) fica dentro do próprio dado.

**Duas funções de veredito.** Uma deriva o esperado da tabela (`tier do chamador >= tier exigido` significa permitido). A outra reduz a resposta real ao mesmo vocabulário binário **passou** ou **barrou**:

- barrou (negado): status `401` ou `403`.
- passou: `200`, `201`, `409` ou `422` (chegou na lógica/validação).
- `404` num probe de id inexistente é ambíguo: trate como inconclusivo a inspecionar, não como achado automático.

O achado é uma comparação: `esperado === negar && real === passou`.

**Nuances de oráculo que o motor precisa respeitar:**

1. **Endpoints de escrita: use id inexistente.** Para testar autorização de `PATCH`, `DELETE`, `approve` etc. sem mutar nada, dispare contra um id que não existe (ex.: `AUTH-PROBE-NAO-EXISTE`). Se a checagem de papel vier primeiro, o papel proibido recebe `403`. Se vier `404` ou `422`, passou pela autorização. Nada é tocado porque o id é falso.
2. **Ciclo de vida: afirme o ESTADO, não só o status.** A Tabela B diz "estado inalterado" em transição ilegal. Depois de cada transição, **leia o estado de volta** e afirme sobre ele. Um sistema vulnerável pode devolver 4xx e mesmo assim mudar o estado, ou devolver 200 numa transição que deveria ser proibida.
3. **"Negado" é um conjunto de status, não um número mágico.** Afirme `status in {401, 403}` para negação por papel, e o conjunto de transição ilegal (tipicamente `409` ou `422`) para a Tabela B.

## 7. Regras de processo (siga à risca)

**Regra 1: planeje primeiro, não escreva código ainda.**
Sua primeira resposta deve ser um **plano**, não implementação. O plano precisa conter:

- a arquitetura de pastas e arquivos proposta;
- o desenho da **tabela de casos** e do **runner** que a consome (seção 6);
- o desenho das fixtures e da estratégia de `storageState` (setup project por papel);
- o desenho dos service objects de API e do page object do único teste de navegador;
- o desenho da **fábrica de estado** para os testes de ciclo de vida (seção 9, FINDING-007);
- o mapeamento de cada achado para casos de teste;
- a ordem de implementação, começando pela fundação (auth, fixtures, storageState, tabela de casos) antes dos testes.

Pare após o plano e espere minha aprovação.

**Regra 2: um teste por vez.**
Depois que eu aprovar, implemente **um único teste por vez**. A cada teste:

- explique em uma frase o que ele faz e a qual achado do `AUDIT.md` ele corresponde;
- diga o comando exato para rodar só aquele teste;
- pare e espere meu OK antes de seguir.

Não despeje a suíte inteira de uma vez. A revisão incremental é proposital.

**Regra 3: aplique as melhores práticas da seção 8** de forma consistente em todo arquivo.

## 8. Melhores práticas (com explicação)

### 8.1 Page Object Model (POM) e seu equivalente para API

Padrão que cria uma camada de abstração entre os testes e a aplicação. Cada página ou componente vira uma classe que concentra os locators e os métodos de ação daquela tela. Regras: locators vivem **somente** dentro do page object, nunca nos testes; cada classe tem responsabilidade única; use locators do Playwright (que têm auto-waiting) em vez de seletores crus; nomes descritivos. As asserções (`expect`) ficam nos testes, não dentro do page object. Pastas: `pages/` para as classes, `tests/` para os cenários. Quando a UI muda, você atualiza um lugar só.

Aplicação aqui: como quase tudo é API, aplique o mesmo encapsulamento com **service objects**, um cliente por área da API (por exemplo `AuthApi`, `AdminApi`, `SessionsApi`, `LegacyApi`, `AssetsApi`), concentrando caminhos e chamadas nessas classes em vez de espalhar URLs pelos testes. Reserve o page object clássico para o único teste de navegador (o do índice público).

### 8.2 Custom fixtures

Fixtures são blocos de setup e teardown que o Playwright injeta sob demanda. Você estende o test base com `base.extend()` num arquivo central (`fixtures.ts`) e exporta dali o `test` e o `expect`. Cada fixture roda só quando um teste a consome, e o teardown acontece automaticamente. Servem para tirar lógica repetida dos testes: um contexto autenticado por papel, dados, um cliente de API pronto, uma instância de page object.

Aplicação aqui: fixtures `directorRequest`, `juniorRequest`, `subjectRequest` e `anonRequest`, cada uma entregando um `APIRequestContext` já com o `X-Case-Token` e o cookie do papel certo. Para esconder fixtures auxiliares do relatório, use `{ box: true }`.

### 8.3 Session storage (storageState)

Em vez de logar antes de cada teste, o Playwright autentica uma vez e salva o estado da sessão (cookies, localStorage, IndexedDB) num JSON, reutilizado pelos testes já autenticados. Abordagem oficial: um **setup project** (`auth.setup.ts`, com `testMatch: /.*\.setup\.ts/`) que loga e salva o estado em `playwright/.auth/<papel>.json`; os projetos de teste declaram `dependencies: ['setup']` e apontam `storageState: 'playwright/.auth/<papel>.json'`. Um arquivo de estado por papel. O diretório `playwright/.auth/` vai para o `.gitignore`.

Aplicação aqui: a sessão do Iris é o cookie assinado `iris_role_session`, então o `storageState` guarda exatamente esse cookie por papel. O setup project loga uma vez como Subject, Junior e Director (este condicionado à senha no `.env`).

### 8.4 Clean Code, DRY e reaproveitamento

**DRY**: nada de copiar e colar lógica, extraia para fixtures, helpers, service objects ou a tabela de casos. **Responsabilidade única**: cada arquivo, classe e teste faz uma coisa. **Separação de preocupações**: caminhos e chamadas nos service objects, asserções nos testes, setup nas fixtures, configuração no `playwright.config.ts` e no `.env`, casos na tabela de dados. **Nomes que revelam intenção**: o nome do teste descreve o comportamento esperado e o achado. **Sem segredos nem números mágicos no código**. **Independência**: cada teste roda isolado, sem depender da ordem de outro.

## 9. Referência técnica e mapa de asserções

**Login e papéis.** `POST /api/auth/login`, form-urlencoded, `role_id` numérico e `password`. Subject `271`, Junior `272`, Director `274`. Todas as requisições levam `X-Case-Token`.

**Tabela de expectativa de autorização (Tabela A).** Tier mínimo intencionado por endpoint. O motor afirma que todo papel abaixo do tier recebe `403`.

| Endpoint | Método | Tier mínimo |
| --- | --- | --- |
| /api/admin/subjects | GET | Junior |
| /api/admin/subjects/{id} | GET | Subject (próprio) / Junior (qualquer) |
| /api/admin/chambers, /chambers/{id} | GET | Junior |
| /api/admin/apparatus | GET | Junior |
| /api/admin/sessions, /sessions/{id} | GET | Junior |
| /api/admin/sessions | POST | Junior |
| /api/admin/sessions/{id}/approve, /reject, /cancel | POST | Senior |
| /api/admin/sessions/{id}/start, /complete | POST | Senior (intencionado; ver FINDING-007) |
| /api/admin/subjects/{id}/reassign | POST | Director (controle positivo: já nega Junior) |
| /api/admin/subjects/{id} | PATCH, DELETE | Director (FINDING-006: guarda ausente) |
| /api/admin/dashboard, /audit, /reports/export | GET | Director |
| /api/admin/roles | GET | Director (informativo, possivelmente intencional) |
| /api/admin/issue-token | POST | Director (controle positivo: já nega) |
| /api/admin/methodology | GET | Director (controle positivo: já nega) |
| /api/v1/legacy/exclusions | GET | Director |

**Os sete achados e as asserções que cada um implica:**

- **FINDING-001 e FINDING-003 (controle de acesso de leitura).** Subject (271) e Junior (272) devem receber `403` em todo endpoint acima do tier deles, conforme a tabela. Hoje a superfície de leitura inteira devolve `200` ao Subject, então esses testes falham. `methodology` é o controle positivo (já `403`).
- **FINDING-002 (exposição de credenciais).** `/assets/audit/onboarding-robertson-20260312.pdf` deve exigir Director. Hoje é baixável sem autenticação. Asserção: anônimo e Subject recebem status não-`200`.
- **FINDING-004 (integridade do índice QE).** (a) o `cutoff` do dashboard deve ser de era atual, não 1971 (ano maior ou igual a 2000); (b) `sessions_counted` deve ser maior que 1; (c) no navegador, o índice exibido na home pública deve ser igual ao canônico da API dentro de uma tolerância. Hoje a home mostra 87.4 e o canônico é 22.7. Este é o único teste de navegador; o seletor pode precisar de ajuste ao DOM.
- **FINDING-005 (IDOR).** Subject lendo `/api/admin/subjects/{id}` de um registro que não é o seu deve receber `403`/`404`. Hoje devolve `200` para ids arbitrários. Use um id que não seja o próprio.
- **FINDING-006 (PATCH e DELETE sem guarda).** Junior e Subject devem receber `403` em `PATCH` e `DELETE` de `/api/admin/subjects/{id}`. Hoje devolvem `404` (guarda ausente). **Use um id inexistente** para a asserção nunca mutar dado. `reassign` é o controle positivo (já `403`).
- **FINDING-007 (ciclo de vida sem precondição).** `start` e `complete` devem rejeitar qualquer estado de origem ilegal (`draft`, `pending-approval`, `rejected`, `cancelled`, e o terminal `completed`) com `4xx` e **estado inalterado**. Estados terminais não podem reabrir, e nenhuma transição pode deixar campos contraditórios (ex.: `completed_at` preenchido num `in-progress`). Afirme também que `start`/`complete` não estão disponíveis para Junior se o dono intencionado for Senior.

**Fábrica de estado para o FINDING-007.** Os testes de ciclo de vida precisam de uma sessão num estado de origem específico. Não mutue as sessões reais da listagem. Em vez disso, crie uma **sessão descartável** (id único com prefixo `REGTEST-`) como Director e conduza-a até o estado alvo pelo caminho conhecido, depois execute a transição sob avaliação e leia o estado de volta. Faça teardown cancelando as sessões `REGTEST-` ao fim. A listagem `GET /api/admin/sessions` já contém ids em todos os estados (`draft`, `pending-approval`, `approved`, `in-progress`, `completed`, `cancelled`, `rejected`); use-a apenas para os testes de leitura, não para mutar.

## 10. Definição de pronto

- `git clone`, `npm install`, `npx playwright install`, copiar `.env.example` para `.env` e preencher, depois `npx playwright test` roda sem erro de configuração.
- README explica setup, execução, a convenção de "teste de segurança falha de propósito" e o mapeamento teste para achado.
- A cobertura vem da tabela de casos: cada regra das tabelas de decisão do `AUDIT.md` tem ao menos um caso.
- Nenhum segredo versionado. `.env` e `playwright/.auth/` no `.gitignore`.
- Cada teste tem nome que descreve o comportamento esperado e referencia o achado.

---

**Comece agora pela Regra 1: leia os arquivos da seção 2 e me devolva o plano, incluindo o desenho da tabela de casos, do runner e da fábrica de estado. Não escreva código de teste ainda.**
