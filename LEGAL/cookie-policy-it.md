# Informativa sui Cookie e altri strumenti di tracciamento

**Sito web:** https://theaiandbeyond.it
**Ultima modifica:** Febbraio 2026

---

## 1. Cosa sono i cookie e gli strumenti di tracciamento

I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente (computer, tablet, smartphone) quando visita un sito web. Altre tecnologie di tracciamento, come il localStorage e sessionstorage, funzionano in modo simile: memorizzano dati localmente sul dispositivo per scopi specifici.

Secondo le disposizioni della direttiva ePrivacy e del Regolamento generale sulla protezione dei dati (RGPD), i siti web devono informare gli utenti in modo chiaro e trasparente sull'utilizzo di questi strumenti e ottenere il consenso esplicito prima di memorizzare informazioni personali (con eccezione per i cookie strettamente necessari).

---

## 2. Titolare del trattamento

**Nome:** Leonardo Sarti Magi - "The AI and beyond di Leonardo Sarti Magi"
**P.IVA:** 02754730469
**Sede legale:** Via Genova 9, 55049 Viareggio (LU), Italia
**Email privacy:** privacy@theaiandbeyond.it

Per domande in merito a questa informativa o all'utilizzo di cookie, non esitate a contattarci.

---

## 3. Tipologie di cookie e strumenti di tracciamento utilizzati

Il nostro sito web utilizza solo cookie e strumenti di tracciamento strettamente necessari al funzionamento della piattaforma e cookie analitici, esclusivamente con consenso esplicito dell'utente.

### 3.1 Cookie Tecnici e Necessari (senza consenso richiesto)

I cookie tecnici sono essenziali per il corretto funzionamento del sito web. Secondo la normativa, non richiedono il consenso preventivo in quanto sono strettamente necessari per fornire i servizi esplicitamente richiesti dall'utente.

#### Cookie di consenso

- **Nome:** `cookie-consent`
- **Tipo:** localStorage
- **Durata:** persistente (fino al reset da parte dell'utente)
- **Contenuto:** preferenze di consenso dell'utente (es. `{analytics: boolean, timestamp: number}`)
- **Scopo:** memorizzare le preferenze di consenso dell'utente riguardante cookie analitici e strumenti di tracciamento
- **Gestore:** The AI and beyond

#### Preferenze di lingua

- **Nome:** `preferred-locale`
- **Tipo:** localStorage
- **Durata:** persistente (fino alla cancellazione manuale dei dati del browser)
- **Contenuto:** codice lingua selezionato dall'utente (`it` o `en`)
- **Scopo:** memorizzare la preferenza linguistica dell'utente per visualizzare il sito nella lingua selezionata
- **Gestore:** The AI and beyond

#### Token di sviluppo Vercel (solo in preview)

- **Nome:** `__vercel_live_token`
- **Tipo:** cookie
- **Durata:** sessione
- **Scopo:** token di sviluppo per ambienti di preview/staging (NON presente in produzione)
- **Nota:** Questo cookie è presente solo su ambienti di sviluppo e non è accessibile agli utenti finali sul sito in produzione

### 3.2 Cookie Analitici (richiedono consenso esplicito)

I cookie analitici consentono al gestore del sito di raccogliere informazioni sul comportamento dei visitatori, al fine di migliorare l'esperienza utente e ottimizzare il sito web. Questi cookie non identificano direttamente l'utente, ma memorizzano un identificativo univoco per tracciare sessioni e visualizzazioni di pagina.

#### Vercel Analytics e Web Vitals

- **Nome:** variabili di tracciamento gestite da Vercel (non è un cookie nel senso tradizionale, ma una tecnologia di analisi)
- **Tipo:** beacons e localStorage
- **Durata:** i dati sono elaborati e non permanentemente memorizzati
- **Scopo:**
  - Raccogliere metriche di pagina view in modo rispettoso della privacy
  - Analizzare Core Web Vitals e performance del sito (velocità di caricamento, interattività, stabilità visuale)
- **Gestore:** Vercel Inc., San Francisco, USA
- **Privacy Policy:** https://vercel.com/legal/privacy-policy
- **Attivazione:** solo dopo consenso esplicito dell'utente
- **Conformità:** Vercel Analytics è progettato per essere conforme al RGPD senza necessità di IP anonymization aggiuntiva

#### Google Analytics 4

- **Nome:** `_ga`, `_ga_*`
- **Tipo:** cookie HTTP
- **Durata:** `_ga` 2 anni, `_ga_*` 2 anni (dalla data di impostazione/aggiornamento)
- **Scopo:**
  - Analizzare il traffico del sito e il comportamento dei visitatori (pagine visitate, durata sessione, provenienza geografica anonimizzata)
  - Generare statistiche aggregate sull'utilizzo del sito
- **Gestore:** Google Ireland Limited, Gordon House, Barrow Street, Dublino 4, Irlanda
- **Privacy Policy:** https://policies.google.com/privacy
- **Attivazione:** solo dopo consenso esplicito dell'utente
- **Conformità:** IP anonymization attiva (`anonymize_ip: true`); cookie impostati con flag `Secure` e `SameSite=Lax`
- **Opt-out:** https://tools.google.com/dlpage/gaoptout

---

## 4. Tabella riepilogativa dei cookie

| Nome Cookie           | Gestore            | Tipo                | Durata          | Scopo                              | Consenso Richiesto |
| --------------------- | ------------------ | ------------------- | --------------- | ---------------------------------- | ------------------ |
| `cookie-consent`      | The AI and beyond  | localStorage        | Persistente     | Memorizzare preferenze di consenso | No                 |
| `preferred-locale`    | The AI and beyond  | localStorage        | Persistente     | Preferenza lingua                  | No                 |
| `__vercel_live_token` | Vercel             | cookie              | Sessione        | Token sviluppo (solo preview)      | No                 |
| Vercel Analytics      | Vercel Inc.        | beacon/localStorage | Non persistente | Analisi performance e pagine viste | Sì                 |
| `_ga`, `_ga_*`        | Google Ireland Ltd | cookie HTTP         | 2 anni          | Analisi traffico e comportamento   | Sì                 |

---

## 5. Come gestire i cookie

L'utente ha il diritto di controllare e gestire i cookie in qualsiasi momento, utilizzando uno dei seguenti metodi:

### 5.1 Gestione tramite il banner del sito

Il nostro sito web fornisce un banner di consenso ai cookie nella parte bassa della pagina. Tramite questo banner è possibile:

1. **Accettare tutti i cookie** - Consente l'utilizzo di tutti i cookie (tecnici e analitici)
2. **Rifiutare i cookie non essenziali** - Consente solo i cookie strettamente necessari
3. **Modificare le preferenze successivamente** - Il bottone "Gestisci Cookie" è disponibile nel footer del sito e consente di riaprire il banner per modificare la scelta effettuata

Quando l'utente modifica le preferenze tramite il banner, la scelta viene memorizzata nel cookie `cookie-consent` e i cookie analitici vengono caricati o rimossi di conseguenza.

### 5.2 Gestione tramite impostazioni del browser

L'utente può gestire i cookie anche tramite le impostazioni del proprio browser web. Qui di seguito le istruzioni per i browser più comuni:

#### Google Chrome

1. Aprire Chrome
2. In alto a destra, cliccare su **Altro** (tre puntini) → **Impostazioni**
3. Selezionare **Privacy e sicurezza** → **Cookie e altri dati dei siti**
4. Configurare le preferenze:
   - **Blocca cookie di terze parti** - blocca i cookie di tracciamento di terze parti
   - **Blocca tutti i cookie** - blocca tutti i cookie (non consigliato, può danneggiare la funzionalità dei siti)
5. Opzionalmente, aggiungere eccezioni per siti specifici

**Link diretto:** https://support.google.com/accounts/answer/61050

#### Mozilla Firefox

1. Aprire Firefox
2. In alto a destra, cliccare sul menu (tre righe) → **Impostazioni**
3. Selezionare **Privacy e sicurezza**
4. Scorrere fino a **Cookie e dati dei siti web**
5. Configurare le preferenze desiderate (Standard, Stretto, Personalizzato)

**Link diretto:** https://support.mozilla.org/it/kb/Attivare-disattivare-cookie

#### Apple Safari (macOS)

1. Aprire Safari
2. Cliccare su **Safari** nel menu in alto → **Preferenze**
3. Selezionare il tab **Privacy**
4. Configurare le opzioni per i cookie sotto "Blocca cookie"

**Link diretto:** https://support.apple.com/it-it/guide/safari/sfri11471/mac

#### Microsoft Edge

1. Aprire Edge
2. In alto a destra, cliccare su **Impostazioni** (tre puntini) → **Impostazioni**
3. Selezionare **Privacy, ricerca e servizi**
4. Scorrere fino a **Cancella dati di navigazione**
5. Configurare le opzioni per i cookie

**Link diretto:** https://support.microsoft.com/it-it/microsoft-edge

### 5.3 Opt-out dai servizi di analytics specifici

#### Opt-out da Vercel Analytics

Vercel Analytics non fornisce un meccanismo di opt-out esplicito perché è progettato per essere privacy-preserving per default. Tuttavia, è possibile:

- Rifiutare il cookie di analytics tramite il banner del nostro sito
- Disabilitare i beacon nel browser se disponibile
- Contattarci per richiedere l'esclusione

#### Opt-out da Google Analytics

Google fornisce un componente aggiuntivo per il browser che consente di disattivare il monitoraggio di Google Analytics su tutti i siti web:

- **Browser add-on:** https://tools.google.com/dlpage/gaoptout
- In alternativa, è sufficiente rifiutare i cookie analitici tramite il banner del nostro sito

### 5.4 Modalità "Non tracciare" (DNT) e Global Privacy Control (GPC)

Il nostro sito **rispetta attivamente** i segnali di privacy inviati dal browser. Se il vostro browser ha attivato DNT o GPC, il sito tratta automaticamente l'utente come se avesse rifiutato i cookie analitici, senza mostrare il banner di consenso.

Per attivare questi segnali nel vostro browser:

- **Chrome:** Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti → Deselezionare "Consenti ai siti di controllare..."
- **Firefox:** Impostazioni → Privacy e sicurezza → "Invia un segnale "Non voglio essere tracciato" ai siti web" (impostazione avanzata)
- **Safari:** Preferenze → Privacy → "Limita il tracciamento tra i siti web"
- **Edge:** Impostazioni → Privacy, ricerca e servizi → Attivare "Tracker prevention"

**Nota**: Se l'utente ha precedentemente effettuato una scelta esplicita tramite il banner cookie (accettare o rifiutare), tale scelta prevale sui segnali DNT/GPC del browser.

---

## 6. Cookie e strumenti di terze parti

Il nostro sito utilizza servizi forniti da terze parti per l'analisi e il funzionamento. Le terze parti utilizzate sono:

### 6.1 Vercel Inc.

- **Servizio:** Vercel Analytics, Web Vitals
- **Sito web:** https://vercel.com
- **Privacy Policy:** https://vercel.com/legal/privacy-policy
- **Utilizzo:** Analisi delle prestazioni del sito e comportamento degli utenti
- **Sede:** San Francisco, USA
- **Conformità:** GDPR-compliant

### 6.2 Google Ireland Limited

- **Servizio:** Google Analytics 4
- **Sito web:** https://analytics.google.com
- **Privacy Policy:** https://policies.google.com/privacy
- **Utilizzo:** Analisi del traffico web e comportamento dei visitatori
- **Sede:** Gordon House, Barrow Street, Dublino 4, Irlanda
- **Sub-processore:** Google LLC, Mountain View, CA, USA
- **Conformità:** GDPR-compliant, certificato EU-US Data Privacy Framework

### Informazioni sulla trasferimento dati verso paesi terzi

I servizi analitici di Vercel e Google comportano il trasferimento di dati verso gli Stati Uniti. Per la trasferimento dati verso i paesi terzi, il Titolare si affida ai seguenti meccanismi:

- **Per Vercel:** Vercel ha implementato misure di sicurezza appropriate secondo il GDPR ed è certificato EU-US Data Privacy Framework. Per i dettagli, consultare la loro Privacy Policy.
- **Per Google:** Google Ireland Limited trasferisce dati a Google LLC (USA) sulla base del EU-US Data Privacy Framework. Google ha implementato misure di sicurezza tecniche e organizzative conformi al GDPR. Per i dettagli, consultare: https://policies.google.com/privacy/frameworks

---

## 7. Consenso e gestione del consenso

### 7.1 Consenso esplicito

Secondo il Regolamento generale sulla protezione dei dati (RGPD) e la Direttiva ePrivacy, il nostro sito richiede il **consenso esplicito e informato** prima di installare cookie non essenziali.

**Il consenso è ottenuto tramite:**

1. Banner di consenso ai cookie che appare al primo caricamento del sito
2. Informazioni chiare sul tipo di cookie e il loro scopo
3. Possibilità di accettare o rifiutare selettivamente i cookie

**Il consenso è:**

- Libero (non è un prerequisito per accedere ai contenuti del sito)
- Specifico (per ogni categoria di cookie)
- Informato (con link a questa informativa)
- Revocabile (l'utente può cambiar idea in qualsiasi momento)

### 7.2 Revoca del consenso

L'utente può revocare il consenso ai cookie in qualsiasi momento:

1. Facendo clic sul bottone "Gestisci Cookie" (presente nel footer del sito o accessibile tramite il banner)
2. Modificando le preferenze di consenso
3. Eliminando il cookie `cookie-consent` e i cookie di analytics dal browser
4. Contattando il Titolare all'indirizzo email privacy@theaiandbeyond.it

Una volta revocato il consenso, i cookie analitici saranno rimossi dal browser e non saranno più raccolti dati analitici.

### 7.3 Conservazione del consenso

Il consenso è memorizzato nel cookie `cookie-consent` con un timestamp. Questo permette al sito di:

- Ricordare la preferenza dell'utente nelle visite successive
- Ricaricare i cookie analitici se l'utente li ha autorizzati
- Richiedere un nuovo consenso se il cookie viene eliminato o scade

---

## 8. Conformità normativa

Questa informativa è redatta in conformità a:

- **Regolamento (UE) 2016/679** (Regolamento generale sulla protezione dei dati - RGPD)
- **Direttiva 2002/58/CE** (Direttiva ePrivacy, come modificata dalla Direttiva 2009/136/CE)
- **Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021** - "Linee guida cookie e altri strumenti di tracciamento"
- **Decreto Legislativo 30 giugno 2003, n. 196** (Codice in materia di protezione dei dati personali, come modificato dal RGPD)
- **Decreto Legislativo 1° dicembre 2018, n. 145** (Attuazione della Direttiva ePrivacy)

Il nostro sito è stato configurato per:

- Richiedere il consenso esplicito prima di caricare i cookie analitici
- Fornire informazioni complete e trasparenti sull'utilizzo dei cookie
- Permettere all'utente di gestire e revocare il consenso in qualsiasi momento
- Non utilizzare cookie di profiling, marketing, o advertising
- Non tracciare l'utente attraverso cookie di terze parti (ad eccezione di Vercel Analytics e Google Analytics 4, caricati solo con consenso)

---

## 9. Aggiornamenti a questa informativa

Il Titolare si riserva il diritto di aggiornare questa informativa in qualsiasi momento, in particolare:

- Se introduce nuovi cookie o strumenti di tracciamento
- Se modifica l'utilizzo dei cookie esistenti
- Se sono introdotte nuove normative che richiedono aggiornamenti
- Se cambiano i processori di dati o le loro politiche privacy

Gli aggiornamenti saranno comunicati tramite:

- Pubblicazione della versione aggiornata sul sito (con data "Ultima modifica")
- Richiesta di nuovo consenso, se necessario

La data "Ultima modifica" in cima a questa informativa indica quando è stata aggiornata per l'ultima volta.

---

## 10. Diritti dell'utente

In conformità al RGPD, l'utente ha i seguenti diritti:

- **Diritto di accesso** (Art. 15 RGPD): accedere ai dati personali che lo riguardano
- **Diritto di rettifica** (Art. 16 RGPD): correggere dati inesatti
- **Diritto alla cancellazione** (Art. 17 RGPD): richiedere la cancellazione dei dati
- **Diritto alla limitazione del trattamento** (Art. 18 RGPD): limitare il trattamento dei dati
- **Diritto di portabilità dei dati** (Art. 20 RGPD): ricevere i dati in un formato strutturato
- **Diritto di opposizione** (Art. 21 RGPD): opporsi al trattamento dei dati
- **Diritto di non essere sottoposto a decisioni interamente automatizzate** (Art. 22 RGPD)

Per esercitare questi diritti, contattare:

- **Email:** privacy@theaiandbeyond.it
- **Indirizzo:** Via Genova 9, 55049 Viareggio (LU), Italia

---

## 11. Contatti

Per domande, chiarimenti, o per esercitare i vostri diritti riguardanti i cookie e il trattamento dei dati personali, potete contattare:

**The AI and beyond di Leonardo Sarti Magi**

- **Email:** privacy@theaiandbeyond.it
- **Sito web:** https://theaiandbeyond.it
- **Indirizzo:** Via Genova 9, 55049 Viareggio (LU), Italia
- **P.IVA:** 02754730469

Per segnalare violazioni della privacy o reclami riguardanti il trattamento dei dati, è possibile contattare anche l'Autorità Garante per la protezione dei dati personali (Garante Privacy):

**Garante per la protezione dei dati personali**

- **Sito:** https://www.garanteprivacy.it
- **Centralino:** +39 06 696771
- **Indirizzo:** Piazza Venezia 11, 00187 Roma, Italia

---

**Questa informativa è aggiornata a febbraio 2026.**
