# Analisi Legale Completa e Specifiche per Cookie Banner Conforme

**Documento tecnico-legale per sviluppatori**
**Data: 9 febbraio 2026**

**Destinatario**: Team di sviluppo - The AI and Beyond (theaiandbeyond.it)

---

## SOMMARIO

- **PARTE A**: Analisi dello stato attuale del sito
- **PARTE B**: Specifiche esatte per il Cookie Banner conforme
- **PARTE C**: Pagine mancanti nel sito
- **PARTE D**: Checklist di conformità completa
- **PARTE E**: Raccomandazioni aggiuntive e prossimi passi

---

## PARTE A: Analisi dello Stato Attuale del Sito

### A.1 Elementi già conformi

#### Security Headers - ✅ CONFORME
**Stato**: Implementato in `next.config.mjs`

Headers presenti:
- `X-Content-Type-Options: nosniff` ✅
- `X-Frame-Options: DENY` ✅
- `X-XSS-Protection: 1; mode=block` ✅
- `Referrer-Policy: strict-origin-when-cross-origin` ✅
- `Permissions-Policy: geolocation=(), microphone=(), camera=()` ✅
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` ✅

**Valutazione**: Headers ben configurati, proteggono da attacchi XSS, clickjacking, MIME-sniffing.

#### CSP (Content Security Policy) - ✅ CONFORME
**Stato**: Implementato con direttive restrittive

CSP attuale:
```
default-src 'self';
script-src 'self' 'unsafe-inline' vercel.live cdn.vercel.com;
style-src 'self' 'unsafe-inline';
font-src 'self' data: fonts.googleapis.com fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' vercel.live api.github.com;
```

**Valutazione**: CSP ragionevolmente restrittivo. Note:
- `unsafe-inline` per script: accettabile per Next.js, ma potrebbe essere ridotto in futuro
- Vercel Analytics già nei CSP connect-src

#### Cookie Consent Mechanism - ⚠️ NON COMPLETAMENTE CONFORME
**Stato**: Implementato ma con lacune significative

File coinvolti:
- `CookieConsentBanner.tsx` - componente di visualizzazione
- `useConsentStorage.ts` - logica di gestione consenso

**Problemi identificati**:

1. **Manca consenso granulare** ❌
   - Il banner mostra solo "Accetta" e "Rifiuta"
   - Manca pulsante "Personalizza" / "Gestisci preferenze"
   - Non permette di scegliere quali categorie accettare
   - **Violazione del Provvedimento Garante 10/06/2021**

2. **Link "Scopri di più" non corretto** ❌
   - Attualmente reindirizza a `/privacy`
   - Dovrebbe reindirizzare a `/cookie-policy` (ancora da creare)
   - La Privacy Policy contiene informazioni su dati personali, non su cookie specificamente

3. **Assenza elenco categorie nel banner** ❌
   - Il banner non menziona quali categorie di cookie sono utilizzati
   - Non fornisce breve descrizione degli usi
   - **Violazione di trasparenza GDPR**

4. **Struttura del cookie di consenso inadeguata** ⚠️
   - Attualmente registra solo `accepted: true/false`
   - Dovrebbe registrare preferenze granulari: `{"analytics": true/false, "technical": true/false, ...}`

5. **Gestione post-consenso incompleta** ⚠️
   - Pulsante "Gestisci Cookie" nel footer esiste
   - Ma attualmente non riapre il pannello preferenze, solo resetta il consenso
   - Consenso non completamente revocabile in modo trasparente

#### HTTPS e Hosting - ✅ CONFORME
**Stato**: Vercel fornisce SSL/TLS automatico

- HTTPS obbligatorio: ✅ Sì
- Certificati rinnovati automaticamente: ✅ Sì
- Supporto HTTP/2: ✅ Sì

#### P.IVA Visibile - ✅ CONFORME
**Stato**: Presente nel footer

Visibile come: "P.IVA: 02754730469"

#### Dati Identificativi del Titolare - ⚠️ PARZIALMENTE CONFORME
**Stato**: Presente nel footer ma incompleto

Attualmente visibile:
- P.IVA: 02754730469 ✅
- Indirizzo: Via Genova 9, 55049 Viareggio (LU) ✅

Mancante:
- Nome completo del titolare: "Leonardo Sarti Magi" non è esplicito (si dice "di Leonardo Sarti Magi" in nota)
- Email di contatto nel footer (presente solo in form) - dovrebbe essere più prominente

#### Form di Contatto - ⚠️ PARZIALMENTE CONFORME
**Stato**: Implementato con alcuni elementi corretti

Elementi presenti:
- Campi standard: nome, email, oggetto, messaggio ✅
- Informativa privacy brevemente menzionata ⚠️

Miglioramenti necessari:
- Checkbox esplicita "Accetto l'informativa privacy" (separata da consenso marketing)
- Link chiaro alla Privacy Policy nel form
- Nessun campo nascosto che raccoglie dati senza consenso

#### Nessun Tracciamento Prima del Consenso - ✅ CONFORME
**Stato**: Corretto secondo il GDPR

Verifica nel codice:
- Vercel Analytics caricato solo dopo consenso `useEffect` ✅
- Google Analytics: NON ATTIVO al momento (bene)
- Script terzi non caricati automaticamente ✅

---

### A.2 Elementi Mancanti o Non Conformi

#### 1. Pagina Privacy Policy - ❌ NON ESISTE
**Criticità**: ALTA

Stato: Sito contiene link `/privacy` ma la pagina non è stata ancora creata.

Contenuti richiesti:
- Identificazione del titolare (nome, P.IVA, indirizzo)
- Contatti DPO (se applicabile)
- Base legale del trattamento
- Dati personali raccolti e loro scopo
- Destinatari dei dati (Vercel, Resend, ecc.)
- Periodo di conservazione
- Diritti dell'interessato (accesso, rettifica, cancellazione, ecc.)
- Informazioni su profilazione e decisioni automatizzate (se applicabile)
- Informazioni su cookies e tracking (rimandare a Cookie Policy)
- Informazioni su link esterni (LinkedIn)

#### 2. Pagina Cookie Policy - ❌ NON ESISTE
**Criticità**: ALTA

Stato: Sito non ha pagina dedicata ai cookie.

Contenuti richiesti:
- Elenco completo di TUTTI i cookie utilizzati (nome, dominio, durata, scopo)
- Categorizzazione per tipo (tecnico, analitico, di marketing, ecc.)
- Cookie propri vs cookie di terzi
- Come gestore di cookie di terzi (Vercel Analytics, ecc.)
- Come disabilitare i cookie nel browser
- Link ai gestori di cookie di terzi e loro informative
- Durata della conservazione del consenso (raccomandato: 6 mesi)

#### 3. Cookie Banner Non Conforme - ❌ NON CONFORME AL PROVVEDIMENTO GARANTE 2021
**Criticità**: ALTA

Problemi specifici (vedi PARTE B per dettagli):
- Manca consenso granulare
- Link "Scopri di più" inadeguato
- Assenza elenco categorie nel banner
- Struttura dati consenso non granulare
- Gestione post-consenso incompleta

#### 4. DPA (Data Processing Agreement) con Vercel - ❌ DA VERIFICARE
**Criticità**: MEDIA-ALTA

Stato: Vercel fornisce DPA standard nella documentazione, ma deve essere:
- Revisionato dal titolare
- Conservato in archivio
- Verificato che copra tutte le attività di processing

**Azione richiesta**: Scaricare DPA da Vercel dashboard e mantenerlo in archivio.

#### 5. DPA con Resend (per Email) - ❌ DA VERIFICARE
**Criticità**: MEDIA-ALTA

Stato: Resend è utilizzato per invio email dal form di contatto.

**Azione richiesta**:
- Verificare se Resend ha DPA disponibile
- Se sì, scaricarlo e mantenerlo in archivio
- Se no, aggiungere clausola DPA al Processor nel Registro Trattamenti

#### 6. Registro dei Trattamenti - ⚠️ RACCOMANDATO
**Criticità**: MEDIA

Stato: Non ancora creato.

Per conformità GDPR completa, è buona pratica mantenere un registro (anche se formalmente non obbligatorio per tutti) che documenti:
- Scopo del trattamento (gestire form, analitiche, hosting)
- Categoria di dati (nome, email, IP address, ecc.)
- Periodo di conservazione
- Destinatari (Vercel, Resend, Google se attivato)
- Misure di sicurezza

**Suggerimento formato**: Documento spreadsheet o markdown

#### 7. DPIA (Data Protection Impact Assessment) - ⚠️ POTENZIALMENTE RICHIESTO
**Criticità**: BASSA (per ora)

Stato: Attualmente non necessario poiché:
- Sito non ha chatbot AI attivo
- Nessuna profilazione automatizzata
- Nessun trattamento su larga scala di dati sensibili

**Azione futura**: Se si riattiva il chatbot AI o si aggiungono funzionalità di IA, valutare se DPIA è necessaria.

#### 8. Informativa Privacy nel Form di Contatto - ⚠️ INCOMPLETA
**Criticità**: MEDIA

Stato: Presente ma poco prominente.

Miglioramenti:
- Checkbox esplicita sotto il form: "Ho letto e accetto l'informativa privacy"
- Link alla pagina `/privacy` nel footer del form
- Brevissima informativa inline (max 2 righe) richiamando privacy policy completa

---

### A.3 Analisi Vercel (Hosting Provider)

#### Conformità GDPR di Vercel
- ✅ Fornisce DPA (Data Processing Agreement)
- ✅ Dichiara compliance GDPR
- ✅ Ubicazione server: EU zone + US zone (scegliere EU se possibile)
- ✅ Encryption in transit (HTTPS) e at rest

#### Attualmente configurato:
- `vercelAnalytics`: script caricato DOPO consenso ✅
- `vercelWebVitals`: NO (vercelAnalytics sufficiente)
- No Google Analytics (non configurato) ✅
- No Facebook Pixel ✅

#### Considerazioni sulla localizzazione:
Vercel ha server negli USA. Per piena conformità GDPR, verificare nelle impostazioni del progetto:
- Se è possibile scegliere datacenter EU
- Se sì, configurare per EU

---

## PARTE B: Specifiche Esatte per Cookie Banner Conforme

### B.1 Riferimento Normativo

**Norma di riferimento**: Provvedimento Garante per la Protezione dei Dati Personali del 10 giugno 2021
"Linee Guida Cookie e altri identificatori online"

**Requisiti chiave**:
1. Consenso deve essere informato, specifico, e granulare
2. Accettazione e rifiuto devono avere eguale prominenza
3. Niente cookie wall (sito deve essere navigabile senza consenso)
4. Niente consenso implicito (es. scroll, chiusura banner)
5. Consenso facilmente revocabile

---

### B.2 Struttura del Banner - Primo Livello

#### B.2.1 Quando mostrare il banner
- Alla prima visita di un Utente non ancora tracciato
- Quando il consenso precedente è scaduto
- Quando l'Utente clicca "Gestisci Cookie" nel footer

#### B.2.2 Elemento visivo banner

```
┌─────────────────────────────────────────────────────────────┐
│ 🍪 Preferenze Cookie e Tracciamento                          │
│                                                               │
│ Questo sito utilizza cookie tecnici (necessari), cookie      │
│ analitici (Vercel Analytics), e potenzialmente cookie di     │
│ terzi per migliorare l'esperienza utente.                    │
│                                                               │
│ Per dettagli su ciascuna categoria, leggi la nostra:         │
│ > Cookie Policy completa <                                   │
│                                                               │
│ [Accetta Tutti]  [Rifiuta Tutti]  [Personalizza]            │
└─────────────────────────────────────────────────────────────┘
```

#### B.2.3 Specifiche di UI/UX

**Posizionamento**:
- Fondo della pagina, full-width (mobile) o finestra modale (desktop)
- Sempre visibile, non scrollabile
- Z-index: 1000+ (sopra tutti gli elementi)

**Testo informativo**:
- Massimo 2-3 righe
- Font leggibile (min 12px)
- Lingua: italiano per versione IT, inglese per versione EN
- Menzionare almeno le categorie di cookie utilizzati
- Link alla Cookie Policy (non Privacy Policy)

**Pulsanti**:

1. **"Accetta Tutti"**
   - Background color: colore principale (es. blu)
   - Text color: bianco
   - Padding: 12px 24px
   - Border-radius: 4px
   - Cursor: pointer

2. **"Rifiuta Tutti"**
   - Background color: bianco o grigio chiaro
   - Border: 2px solid (colore principale)
   - Text color: colore principale
   - Padding: 12px 24px
   - **Eguale prominenza visiva di "Accetta Tutti"** ⚠️
   - Cursor: pointer

3. **"Personalizza"**
   - Background color: trasparente
   - Text color: colore principale (es. blu)
   - Underline: yes
   - Cursor: pointer
   - Apre il pannello preferenze (vedi B.3)

4. **"Cookie Policy"**
   - Link testuale
   - Color: colore principale
   - Underline: yes
   - Target: `/cookie-policy` (nuova pagina)
   - Target="_blank" opzionale (ma NO per mantenere sessione)

**Comportamenti proibiti**:
- ❌ Niente X per chiudere il banner (il Garante considera la chiusura = rifiuto)
- ❌ Niente timeout automatico che accetta cookie
- ❌ Niente scroll = consenso (scrollare il sito NON equivale ad accettare)
- ❌ Niente pre-checked checkbox
- ❌ Niente cookie wall (il sito deve essere completamente navigabile senza clicchere nulla)

---

### B.3 Secondo Livello: Pannello Preferenze Dettagliato

#### B.3.1 Quando appare
- Quando l'Utente clicca "Personalizza" nel banner
- Quando l'Utente clicca "Gestisci Cookie" nel footer
- Come modale o pannello full-page (a scelta di design)

#### B.3.2 Struttura del pannello

```
┌─────────────────────────────────────────────────────────────┐
│ 🍪 Gestisci Preferenze Cookie                               │
│                                                               │
│ Seleziona quali categorie di cookie desideri accettare:     │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ✓ Cookie Tecnici / Necessari                      [ON]  │ │
│ │   Questi cookie sono OBBLIGATORI per il             │ │
│ │   funzionamento del sito (sessione, sicurezza,      │ │
│ │   preferenze). Non è possibile disattivarli.        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ☐ Cookie Analitici                              [OFF]  │ │
│ │   Cookies per analizzare come usi il sito          │ │
│ │   (Vercel Analytics). Questi dati ci aiutano a      │ │
│ │   migliorare l'esperienza utente.                   │ │
│ │   Disattiva per non essere tracciato.               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ☐ Cookie di Marketing / Social Media           [OFF]  │ │
│ │   Non attualmente utilizzati, ma potrebbero          │ │
│ │   essere aggiunti in futuro per integrazioni        │ │
│ │   con piattaforme sociali (LinkedIn, ecc.).        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ [Accetta Tutti]  [Rifiuta Tutti]  [Salva Preferenze]       │
│                                                               │
│ [← Torna al banner]                                          │
└─────────────────────────────────────────────────────────────┘
```

#### B.3.3 Categorie di Cookie da implementare

**1. Cookie Tecnici / Necessari**
- **Stato**: SEMPRE ATTIVO (non disattivabile)
- **Toggle**: Disabilitato (visual only)
- **Descrizione breve**:
  ```
  Questi cookie sono essenziali per il funzionamento del sito web
  (gestione sessione, autenticazione, sicurezza, preferenze utente).
  La loro disattivazione comporterebbe il malfunzionamento del sito.
  Sono conformi al GDPR art. 6(1)(a) e non richiedono consenso.
  ```

- **Elenco cookie**:
  ```
  - __Host-consent: Memorizza il consenso dell'utente ai cookie
    Durata: 6 mesi (in linea con raccomandazione Garante)

  - _vercel_jwt: Creato da Vercel per verifica sessione
    Durata: Sessione browser

  - Potenzialmente altri (es. CSRF token, sessionId)
    se applicabile per il funzionamento
  ```

**2. Cookie Analitici**
- **Stato**: DISATTIVO per default
- **Toggle**: Attivabile/disattivabile
- **Descrizione breve**:
  ```
  Questi cookie consentono di analizzare come gli utenti
  utilizzano il sito (pagine visitate, tempo speso, ecc.).
  I dati sono aggregati e anonimi. Usiamo Vercel Analytics
  per questo scopo.
  ```

- **Cookie includiti**:
  ```
  - Vercel Analytics Cookie (nome specifico dipende da Vercel)
    Dominio: *.vercel-analytics.com
    Durata: ~1 anno
    Gestito da: Vercel (USA)

  - Potenzialmente Google Analytics (se attivato in futuro)
    Dominio: .google-analytics.com
    Durata: 2 anni
    Gestito da: Google (USA)
  ```

**3. Cookie di Marketing / Social Media** (Opzionale, per future espansioni)
- **Stato**: DISATTIVO per default
- **Toggle**: Attivabile/disattivabile
- **Descrizione breve**:
  ```
  Questi cookie sono utilizzati per integrare il sito con
  piattaforme social e strumenti di advertising. Attualmente
  non attivi, ma potrebbero essere abilitati in futuro
  (es. LinkedIn pixel, Facebook pixel).
  ```

---

### B.4 Azioni dei Pulsanti - Specifiche Tecniche

#### B.4.1 "Accetta Tutti" (nel banner)
```javascript
// Pseudocodice
function handleAcceptAll() {
  const consent = {
    timestamp: new Date().toISOString(),
    version: "1.0",
    expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 mesi
    categories: {
      technical: true,        // sempre true, non modificabile
      analytics: true,        // accetto
      marketing: true         // accetto
    },
    banner: "accepted-all"
  };

  // Salva nel cookie
  localStorage.setItem('cookie-consent', JSON.stringify(consent));
  setCookieConsent(consent);

  // Carica script analitici
  loadAnalytics();

  // Chiudi banner
  closeBanner();
}
```

#### B.4.2 "Rifiuta Tutti" (nel banner)
```javascript
// Pseudocodice
function handleRejectAll() {
  const consent = {
    timestamp: new Date().toISOString(),
    version: "1.0",
    expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
    categories: {
      technical: true,        // sempre true
      analytics: false,       // rifiuto
      marketing: false        // rifiuto
    },
    banner: "rejected-all"
  };

  localStorage.setItem('cookie-consent', JSON.stringify(consent));
  setCookieConsent(consent);

  // NON carica script analitici
  // NON carica Google Analytics

  closeBanner();
}
```

#### B.4.3 "Personalizza" (nel banner)
```javascript
function handleCustomize() {
  closeBanner();
  openPreferencesPanel();
}
```

#### B.4.4 "Salva Preferenze" (nel pannello)
```javascript
function handleSavePreferences(preferences) {
  // preferences = { technical: true, analytics: true/false, marketing: true/false }

  const consent = {
    timestamp: new Date().toISOString(),
    version: "1.0",
    expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
    categories: preferences,
    banner: "customized"
  };

  localStorage.setItem('cookie-consent', JSON.stringify(consent));
  setCookieConsent(consent);

  // Carica/scarica script a seconda delle preferenze
  if (preferences.analytics) {
    loadAnalytics();
  } else {
    unloadAnalytics();
  }

  closePreferencesPanel();
  showSuccessMessage("Preferenze salvate"); // opzionale
}
```

---

### B.5 Scadenza e Rinnovo del Consenso

**Durata del consenso**: 6 mesi

**Logica di rinnovo**:
```javascript
function checkConsentValidity() {
  const storedConsent = JSON.parse(localStorage.getItem('cookie-consent'));

  if (!storedConsent) {
    // Primo accesso
    showBanner();
    return;
  }

  const expiresAt = new Date(storedConsent.expiresAt);
  const now = new Date();

  if (now > expiresAt) {
    // Consenso scaduto, mostra banner di rinnovo
    showBanner();
    localStorage.removeItem('cookie-consent');
  }
}
```

**Esecuzione**: Al caricamento della pagina (in `useEffect` nel layout principale)

---

### B.6 Struttura Dati del Cookie di Consenso

**Storage**: localStorage (non cookie HTTP-only, poiché il cookie HTTP è per il tecnico)

**Chiave**: `cookie-consent`

**Formato JSON**:
```json
{
  "timestamp": "2026-02-09T10:30:00Z",
  "version": "1.0",
  "expiresAt": "2026-08-09T23:59:59Z",
  "categories": {
    "technical": true,
    "analytics": true,
    "marketing": false
  },
  "banner": "customized"
}
```

**Versioning**: Aumentare `version` se vengono aggiunte nuove categorie in futuro. Se versione non corrisponde, mostra banner di consenso aggiornato.

---

### B.7 Gestione Post-Consenso

#### B.7.1 Pulsante "Gestisci Cookie" nel Footer

**Posizione**: Footer del sito
**Testo**: "Gestisci Cookie" (o "Cookie Settings" in inglese)

**Comportamento**:
- Cliccare apre il pannello preferenze (B.3)
- Permette all'Utente di modificare consenso in qualsiasi momento
- Non resetta il consenso, solo lo mostra per modifica

```javascript
function openCookieManager() {
  openPreferencesPanel();
  // Carica il pannello con le preferenze ATTUALI, non le default
  loadCurrentPreferences();
}
```

#### B.7.2 Revoca del Consenso

L'Utente può:
1. Aprire il pannello preferenze (B.7.1)
2. Disattivare le categorie desiderate
3. Cliccare "Salva Preferenze"

Non è necessario un pulsante "Reset Consenso" separato.

---

## PARTE C: Pagine Mancanti nel Sito

### C.1 Pagina Privacy Policy

**URL**: `/privacy`
**Titolo**: Privacy Policy / Informativa Privacy (EN: Privacy Policy)

**Contenuti minimi richiesti**:

```markdown
# Privacy Policy

## 1. Identificazione del Titolare del Trattamento
- Nome: The AI and Beyond di Leonardo Sarti Magi
- P.IVA: 02754730469
- Indirizzo: Via Genova 9, 55049 Viareggio (LU), Italia
- Email: privacy@theaiandbeyond.it
- Telefono: [se disponibile]

## 2. Contatti Responsabile della Protezione dei Dati (DPO)
[Se applicabile. Altrimenti: "Attualmente non è stato designato un DPO in quanto non è obbligatorio per questa attività"]

## 3. Base Legale del Trattamento
- Art. 6(1)(a) GDPR: Consenso esplicito (es. form contatti, consenso marketing)
- Art. 6(1)(b) GDPR: Esecuzione di contratto (futuri contratti di consulenza)
- Art. 6(1)(f) GDPR: Legittimi interessi (es. analytics, security)

## 4. Dati Personali Raccolti

### Via Form di Contatto:
- Nome
- Email
- Numero di telefono (opzionale)
- Oggetto e messaggio
- [IP address (registrato da server)]

**Scopo**: Rispondere alle richieste di informazioni, fornire preventivi

**Periodo di conservazione**: 12 mesi dopo l'ultima interazione (salvo esigenze contabili/legali)

### Via Analytics (Vercel Analytics):
- IP address (anonimizzato)
- User agent
- Referrer
- Pagine visitate
- Tempo speso
- Tipo di dispositivo

**Scopo**: Comprendere il comportamento degli utenti, migliorare il sito

**Periodo di conservazione**: 90 giorni (default Vercel)

### Cookie __Host-consent:
- Versione del banner
- Data di accettazione/rifiuto
- Categorie accettate/rifiutate

**Scopo**: Ricordare le preferenze dell'utente

**Periodo di conservazione**: 6 mesi

## 5. Destinatari dei Dati (Sub-Responsabili)

### Vercel (Hosting Provider)
- **Ruolo**: Responsabile del Trattamento
- **Dati trasferiti**: IP address, user agent, dati analitici
- **Ubicazione**: EU + US (verificare impostazioni progetto per EU)
- **DPA**: Disponibile nella dashboard Vercel

### Resend (Email Service Provider)
- **Ruolo**: Responsabile del Trattamento
- **Dati trasferiti**: Email, nome, contenuto del form
- **Ubicazione**: USA
- **DPA**: [Verificare disponibilità]

### Google Analytics (se attivato in futuro)
- **Ruolo**: Co-Responsabile del Trattamento
- **Dati trasferiti**: IP (anonimizzato), behavior dati
- **Ubicazione**: USA
- **DPA**: Disponibile in Google Cloud Console

## 6. Trasferimenti Internazionali di Dati

Alcuni dati potrebbero essere trasferiti verso:
- **USA**: Vercel, Resend (soggetto a Standard Contractual Clauses)
- **Altre giurisdizioni**: A seconda dei servizi utilizzati in futuro

Per ulteriori informazioni su transfer mechanisms, contattare privacy@theaiandbeyond.it

## 7. Diritti dell'Interessato

Ogni interessato ha diritto a:

- **Art. 15 GDPR**: Diritto di accesso ai propri dati
- **Art. 16 GDPR**: Diritto di rettifica
- **Art. 17 GDPR**: Diritto all'oblio (cancellazione)
- **Art. 18 GDPR**: Diritto alla limitazione del trattamento
- **Art. 20 GDPR**: Diritto alla portabilità dei dati
- **Art. 21 GDPR**: Diritto di opposizione al trattamento

Per esercitare i diritti, contattare: **privacy@theaiandbeyond.it**

## 8. Cookie e Tracciamento

Per informazioni dettagliate su cookie, modalità di disabilitazione, e categorie di cookie utilizzati, consultare la **[Cookie Policy](/cookie-policy)**.

## 9. Sicurezza dei Dati

Implementiamo misure di sicurezza appropriate:
- Hosting su Vercel con HTTPS obbligatorio
- Security headers (HSTS, X-Frame-Options, CSP)
- Encryption in transit e at rest
- Accesso limitato ai dati sensibili

Tuttavia, nessun metodo di trasmissione è 100% sicuro. L'Utente trasmette dati a proprio rischio.

## 10. Contatti per Reclami

Per reclami relativi al trattamento dei dati, contattare:

- **Titolare**: privacy@theaiandbeyond.it
- **Garante per la Protezione dei Dati Personali** (Italia):
  Piazza di Monte Citorio, 121 - 00186 Roma
  Phone: +39 06 696 77 1
  https://www.garanteprivacy.it

## 11. Modifiche a questa Informativa

Il Titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento.
Modifiche significative saranno notificate tramite email (se disponibile) o banner sul sito.

**Data ultimo aggiornamento**: 9 febbraio 2026
```

**Formato**: Markdown o pagina HTML Next.js (app/privacy/page.tsx)

---

### C.2 Pagina Cookie Policy

**URL**: `/cookie-policy`
**Titolo**: Cookie Policy / Informativa Cookie (EN: Cookie Policy)

**Contenuti minimi richiesti**:

```markdown
# Cookie Policy

## 1. Che cosa sono i Cookie?

I cookie sono piccoli file di testo che vengono memorizzati nel browser dell'utente
quando visita un sito web. Possono contenere informazioni come preferenze dell'utente,
cronologia di navigazione, ecc.

I cookie possono essere:
- **Cookie sessione**: Eliminati quando il browser viene chiuso
- **Cookie persistenti**: Rimangono nel browser fino alla scadenza specificata
- **Cookie first-party**: Creati dal sito visitato
- **Cookie third-party**: Creati da domini diversi da quello visitato

## 2. Cookie Utilizzati su questo Sito

### 2.1 Cookie Tecnici / Necessari

Questi cookie sono essenziali per il funzionamento del sito e non richiedono consenso
secondo le linee guida dell'EDPB e il Provvedimento del Garante.

| Nome Cookie | Dominio | Durata | Scopo |
|---|---|---|---|
| `__Host-consent` | theaiandbeyond.it | 6 mesi | Memorizza consenso cookie |
| `_vercel_jwt` | *.vercel.app | Sessione | Autenticazione Vercel |

**Come funzionano**: Questi cookie permettono al sito di ricordarsi delle tue preferenze
e di fornire una navigazione fluida.

**Come disattivarli**: Non è possibile/consigliato disattivarli poiché il sito potrebbe
non funzionare correttamente.

### 2.2 Cookie Analitici

Questi cookie consentono di analizzare in forma anonima come gli utenti utilizzano il sito.

**Vercel Analytics**
- **Dominio**: vercel-analytics.com
- **Durata**: ~1 anno
- **Scopo**: Raccogliere dati su visite, pagine visitate, tempo speso
- **Gestore**: Vercel Inc. (https://vercel.com/legal/privacy)
- **Privacy Policy**: https://vercel.com/legal/privacy
- **Dati personali**: IP address (anonimizzato), user agent
- **Consenso**: Richiesto. L'Utente può disattivare tramite Cookie Manager.

### 2.3 Cookie di Marketing / Social Media

Attualmente NON utilizzati, ma potrebbero essere abilitati in futuro per:
- Integrazioni con LinkedIn (LinkedIn Insight Tag)
- Pixel di tracciamento da piattaforme sociali

Qualora attivati, nuovi cookie verranno documentati in questo elenco e il consenso
sarà nuovamente richiesto agli utenti.

## 3. Come Disabilitare i Cookie nel Browser

### Firefox
1. Apri Firefox → Preferenze
2. Vai a Privacy → Cookie
3. Seleziona "Non memorizzare cookie"

### Chrome
1. Apri Chrome → Impostazioni
2. Vai a Privacy e sicurezza → Cookie e altri dati dei siti
3. Disattiva "Consenti a tutti i siti di memorizzare cookie"

### Safari
1. Apri Safari → Preferenze
2. Vai a Privacy
3. Seleziona "Blocca sempre"

### Edge
1. Apri Edge → Impostazioni
2. Vai a Privacy e sicurezza
3. Disattiva il tracciamento dei cookie

**Nota**: Disabilitare i cookie potrebbe ridurre la funzionalità del sito.

## 4. Cookie di Terzi e loro Politiche

### Vercel
- **Privacy Policy**: https://vercel.com/legal/privacy
- **Opt-out**: https://vercel.com/privacy
- **Ubicazione dati**: USA (con opzione EU se configurato)

## 5. Rinnovo e Scadenza del Consenso

- **Durata del consenso**: 6 mesi
- **Rinnovo**: Alla scadenza, il banner di consenso apparirà nuovamente
- **Revoca**: In qualsiasi momento tramite il pulsante "Gestisci Cookie" nel footer

## 6. Come Contattarci

Per domande riguardanti i cookie su questo sito, contattare:

**privacy@theaiandbeyond.it**
Via Genova 9, 55049 Viareggio (LU), Italia

## 7. Modifiche a questa Cookie Policy

L'Utente è invitato a controllare periodicamente questa pagina per eventuali aggiornamenti.

**Data ultimo aggiornamento**: 9 febbraio 2026
```

**Formato**: Markdown o pagina HTML Next.js (app/cookie-policy/page.tsx)

---

## PARTE D: Checklist di Conformità Completa

Questa checklist fornisce una visione d'insieme dello stato di conformità legale del sito
e i prossimi step per raggiungere una conformità completa.

### D.1 Documenti Legali Pubblici

- [ ] **Privacy Policy** pubblicata e raggiungibile
  - URL: `/privacy` ✅ Link presente
  - Contenuti: ✅ Da compilare (vedi C.1)
  - Aggiornata: ✅ Con data corrente

- [ ] **Cookie Policy** pubblicata e raggiungibile
  - URL: `/cookie-policy` ✅ Link presente
  - Contenuti: ✅ Da compilare (vedi C.2)
  - Aggiornata: ✅ Con data corrente

- [ ] **Termini e Condizioni** pubblicati e raggiungibili
  - URL: `/terms` (o simile)
  - Contenuti: ✅ Disponibile (vedi DOCUMENTO 1)
  - Aggiornata: ✅ Con data corrente

- [ ] **Dati Identificativi del Titolare** visibili
  - P.IVA: ✅ Presente nel footer (02754730469)
  - Nome titolare: ⚠️ Poco visibile, migliorare nel footer
  - Indirizzo: ✅ Presente nel footer
  - Email contatti: ⚠️ Presente nel form, dovrebbe essere anche nel footer

### D.2 Cookie Banner e Tracking

- [ ] **Cookie Banner Conforme**
  - Primo accesso: ⚠️ Mostra banner, ma NON granulare
  - Granularità: ❌ Manca "Personalizza" e categorie separate
  - Link Cookie Policy: ⚠️ Va a `/privacy`, dovrebbe andare a `/cookie-policy`
  - Pulsante "Rifiuta Tutti": ✅ Presente
  - Pulsante "Accetta Tutti": ✅ Presente
  - Eguale prominenza: ⚠️ Da verificare nel CSS
  - No X per chiudere: ✅ Bene
  - No cookie wall: ✅ Sito navigabile senza consenso
  - No scroll = consenso: ✅ Bene
  - Durata consenso: ❌ Specificare 6 mesi nel cookie

- [ ] **Cookie Preferences Panel**
  - Pannello dettagliato: ❌ NON ESISTE
  - Toggle per categorie: ❌ NON IMPLEMENTATO
  - Descrizione categorie: ❌ NON IMPLEMENTATO
  - Pulsante "Salva Preferenze": ❌ NON IMPLEMENTATO

- [ ] **Post-Consenso**
  - Pulsante "Gestisci Cookie": ✅ Presente nel footer
  - Comportamento: ⚠️ Dovrebbe aprire preferenze panel, non solo resettare
  - Revocabilità: ⚠️ Migliorabile

- [ ] **Tracciamento**
  - Nessun script analitico prima del consenso: ✅ Corretto
  - Vercel Analytics caricato post-consenso: ✅ Corretto
  - Google Analytics: ✅ NON ATTIVO (bene)
  - Facebook Pixel: ✅ NON ATTIVO (bene)

### D.3 Form di Contatto

- [ ] **Raccolta Dati**
  - Campi nome/email: ✅ Presente
  - Informativa privacy: ⚠️ Presente ma poco evidente
  - Checkbox privacy: ❌ Dovrebbe essere esplicita
  - Nessun campo nascosto: ✅ Verificato

- [ ] **Invio Email**
  - Verifica Resend DPA: ❌ DA FARE
  - Email tracciamento: ✅ Non implementato (bene)

### D.4 Security e Hosting

- [ ] **HTTPS**
  - Certificato SSL valido: ✅ Vercel fornisce
  - HSTS abilitato: ✅ Sì
  - Forzatura HTTPS: ✅ Sì

- [ ] **Security Headers**
  - X-Content-Type-Options: ✅ nosniff
  - X-Frame-Options: ✅ DENY
  - X-XSS-Protection: ✅ Abilitato
  - CSP: ✅ Implementato
  - Referrer-Policy: ✅ strict-origin-when-cross-origin
  - Permissions-Policy: ✅ Restrittivo

- [ ] **Vercel DPA**
  - DPA scaricato: ❌ DA FARE
  - DPA conservato in archivio: ❌ DA FARE
  - Data Processing Agreement sottoscritto: ❌ DA FARE

### D.5 Data Protection

- [ ] **Registro dei Trattamenti**
  - Registro creato: ⚠️ RACCOMANDATO
  - Scopi documentati: ❌ DA FARE
  - Categorie dati: ❌ DA FARE
  - Destinatari elencati: ❌ DA FARE
  - Periodo conservazione: ❌ DA FARE

- [ ] **DPIA (Data Protection Impact Assessment)**
  - DPIA richiesta: ❌ Attualmente NO
  - Nota: Sarà necessaria se si attiva chatbot AI

- [ ] **Sub-responsabili DPA**
  - Vercel: ⚠️ Da sottoscrivere
  - Resend: ❌ Da verificare/sottoscrivere
  - Google (se attivato): ❌ Da sottoscrivere in futuro

### D.6 Trasparenza e Informative

- [ ] **Informativa Privacy Completa**
  - Privacy Policy pagina: ❌ NON ESISTE
  - Contenuti minimi GDPR: ❌ DA COMPILARE
  - Diritti interessato elencati: ❌ DA COMPILARE
  - Contatto DPO: ⚠️ Se applicabile

- [ ] **Informativa Cookie Completa**
  - Cookie Policy pagina: ❌ NON ESISTE
  - Elenco cookie dettagliato: ❌ DA COMPILARE
  - Categorie spiegate: ❌ DA COMPILARE
  - Come disabilitare: ❌ DA COMPILARE

- [ ] **Form Contatto Informativa**
  - Breve informativa inline: ⚠️ Presente ma poco visibile
  - Link Privacy Policy: ❌ Dovrebbe essere nel form
  - Checkbox accettazione: ❌ Dovrebbe essere esplicita

### D.7 Conformità GDPR Specifico

- [ ] **Consenso Esplicito**
  - Consenso informato: ⚠️ Parziale (cookie banner, form)
  - Consenso esplicito: ⚠️ Form ha checkbox, banner no
  - Granularità: ❌ Cookie banner manca granularità
  - Facilità revoca: ⚠️ Migliorabile

- [ ] **Trasparenza**
  - Identificazione titolare: ✅ Presente (footer)
  - Scopi trattamento: ⚠️ In Privacy Policy (da scrivere)
  - Destinatari: ⚠️ In Privacy Policy (da scrivere)
  - Diritti interessato: ⚠️ In Privacy Policy (da scrivere)

- [ ] **Right to be Forgotten**
  - Meccanismo cancellazione dati: ❌ DA IMPLEMENTARE (email a privacy@...)
  - Procedura documentata: ❌ DA DOCUMENTARE

- [ ] **Data Portability**
  - Meccanismo export dati: ❌ DA IMPLEMENTARE (se dati personali estesi)

---

## PARTE E: Raccomandazioni Aggiuntive e Prossimi Passi

### E.1 Priorità Immediate (Entro 1 mese)

1. **Creare Privacy Policy** (`/privacy`)
   - Copiare template da C.1
   - Personalizzare con dati reali di The AI and Beyond
   - Pubblicare e linkare da footer + form

2. **Creare Cookie Policy** (`/cookie-policy`)
   - Copiare template da C.2
   - Dettagliare tutti i cookie attuali
   - Pubblicare e linkare da banner

3. **Implementare Cookie Banner Granulare**
   - Aggiungere pulsante "Personalizza"
   - Creare pannello preferenze (B.3)
   - Implementare toggle per categorie (technical sempre ON, analytics/marketing toggle)
   - Aggiornare logica localStorage per registrare preferenze granulari
   - Fixare link "Scopri di più" → `/cookie-policy`

4. **Verificare/Sottoscrivere DPA Vercel**
   - Accedere a Vercel dashboard
   - Scaricare Data Processing Agreement
   - Conservare in archivio
   - Almeno leggere per verificare che copra il trattamento dati

5. **Aggiornare Footer**
   - Aggiungere email contatti principale: `info@theaiandbeyond.it`
   - Rendere più prominente il nome del titolare: "Leonardo Sarti Magi"
   - Assicurare che link a `/privacy`, `/cookie-policy`, `/terms` siano visibili

### E.2 Priorità Medie (Entro 3 mesi)

1. **Verificare Resend DPA**
   - Contattare Resend per disponibilità DPA
   - Se disponibile: scaricare e sottoscrivere
   - Se non disponibile: aggiungere al Registro Trattamenti come sub-responsabile

2. **Creare Registro dei Trattamenti** (formato spreadsheet o markdown)
   - Scopo: forma.contatti (raccogliere richieste informazioni)
   - Scopo: analytics (Vercel Analytics)
   - Scopo: marketing (futuri newsletter, se implementati)
   - Per ogni scopo: dati, durata conservazione, destinatari, base legale

3. **Migliorare Informativa Privacy nel Form**
   - Aggiungere checkbox esplicita: "Ho letto l'informativa privacy e accetto il trattamento dei miei dati"
   - Linkare a `/privacy` nel form footer
   - Separare da eventuali consensi marketing

4. **Implementare "Right to be Forgotten"**
   - Creare procedura per cancellare dati utente
   - Endpoint API privato o email handler che processa richieste cancellazione
   - Documentare in Privacy Policy

### E.3 Priorità Basse / Future (Optional)

1. **DPIA per Chatbot AI** (se si riattiva)
   - Valutare necessità DPIA secondo art. 35 GDPR
   - Se necessaria: condurre Data Protection Impact Assessment
   - Documentare risultati

2. **Google Analytics** (se riattivato)
   - Aggiungere categoria "analytics" nel cookie banner
   - Sottoscrivere DPA con Google
   - Implementare anonimizzazione IP
   - Documentare in Cookie Policy

3. **LinkedIn Pixel** (se implementato)
   - Aggiungere categoria "marketing" nel cookie banner
   - Sottoscrivere DPA con LinkedIn
   - Implementare granular consent
   - Documentare in Cookie Policy

4. **Newsletter/Email Marketing** (se implementato)
   - Implementare consent management per email
   - Sottoscrivere DPA con provider email (Resend)
   - Documentare unsubscribe mechanism

5. **Bot Detection / CAPTCHA** (se implementato)
   - Valutare necessità DPIA
   - Documentare in Privacy Policy

---

### E.4 Cronologia e Responsabilità

| Task | Priorità | Responsabile | Deadline | Status |
|---|---|---|---|---|
| Creare `/privacy` | ALTA | Dev/Legal | 28 Feb 2026 | Pending |
| Creare `/cookie-policy` | ALTA | Dev/Legal | 28 Feb 2026 | Pending |
| Implementare banner granulare | ALTA | Frontend Dev | 28 Feb 2026 | Pending |
| Fix link "Scopri di più" | ALTA | Frontend Dev | 28 Feb 2026 | Pending |
| Vercel DPA | MEDIA | Legal/Admin | 31 Mar 2026 | Pending |
| Resend DPA | MEDIA | Legal/Admin | 31 Mar 2026 | Pending |
| Registro Trattamenti | MEDIA | Legal/Admin | 31 Mar 2026 | Pending |
| Migliorare form contatto | MEDIA | Frontend Dev | 31 Mar 2026 | Pending |

---

### E.5 Testing Checklist

Dopo implementazione, testare:

1. **Banner Cookie**
   - [ ] Banner appare alla prima visita
   - [ ] "Accetta Tutti" salva preferenze complete
   - [ ] "Rifiuta Tutti" salva preferenze rifiuto
   - [ ] "Personalizza" apre pannello dettagliato
   - [ ] Link "Cookie Policy" va a `/cookie-policy`
   - [ ] Banner non ha X per chiuderlo
   - [ ] Scrollare sito non accetta cookie
   - [ ] Sito navigabile senza consenso

2. **Pannello Preferenze**
   - [ ] Toggle "tecnici" è disabilitato (sempre ON)
   - [ ] Toggle "analytics" è abilitabile/disabilitabile
   - [ ] Toggle "marketing" è abilitabile/disabilitabile
   - [ ] "Salva Preferenze" salva le scelte
   - [ ] "Accetta Tutti" da pannello funziona
   - [ ] "Rifiuta Tutti" da pannello funziona

3. **Post-Consenso**
   - [ ] "Gestisci Cookie" nel footer apre pannello preferenze
   - [ ] Scadenza consenso (6 mesi): banner riappare dopo
   - [ ] Vercel Analytics carica solo se analytics=true
   - [ ] localStorage contiene JSON strutturato correttamente

4. **Pagine Legal**
   - [ ] `/privacy` raggiungibile e contiene informazioni richieste
   - [ ] `/cookie-policy` raggiungibile e lista cookie completa
   - [ ] `/terms` raggiungibile e ben formattato
   - [ ] Link reciproci tra pagine

5. **Form Contatto**
   - [ ] Checkbox privacy visibile e obbligatoria
   - [ ] Link Privacy Policy nel form
   - [ ] Dati inviati a Resend
   - [ ] Nessun errore di validazione

6. **Mobile**
   - [ ] Banner responsive su mobile
   - [ ] Pulsanti facilmente cliccabili (min 44px)
   - [ ] Testo leggibile su mobile
   - [ ] Pannello preferenze scrollabile se necessario

---

### E.6 Documentazione da Conservare in Archivio

Conservare i seguenti documenti per audit e compliance:

1. **DPA Vercel**
   - Scarica da: https://vercel.com/legal/dpa
   - Conserva in: `/docs/legal/vercel-dpa.pdf`
   - Data accesso: [data]

2. **DPA Resend** (se disponibile)
   - Scarica da: https://resend.com/legal (verifica)
   - Conserva in: `/docs/legal/resend-dpa.pdf`
   - Data accesso: [data]

3. **Registro Trattamenti**
   - Formato: Markdown o Spreadsheet
   - Conserva in: `/docs/legal/registro-trattamenti.md` o `.xlsx`
   - Aggiornamento: Almeno annuale

4. **Privacy Policy e Cookie Policy**
   - Versionate con data
   - Conservare copie precedenti se modificate
   - Archivio: `/public/legal/` o `/docs/legal/`

5. **Termini e Condizioni**
   - Versionato con data
   - Archivio: `/public/legal/` o `/docs/legal/`

---

## CONCLUSIONE

Il sito "The AI and Beyond" ha fondamenta solide in termini di security headers, CSP,
e compliance di base. Tuttavia, per raggiungere piena conformità al Provvedimento del
Garante 2021 e al GDPR, sono necessari i seguenti step:

**URGENTI** (entro 1 mese):
1. Pagina Privacy Policy
2. Pagina Cookie Policy
3. Cookie banner granulare con pannello preferenze
4. Fix link "Scopri di più"

**IMPORTANTI** (entro 3 mesi):
5. Verifica/sottoscrizione DPA Vercel e Resend
6. Registro Trattamenti
7. Miglioramento form contatto

**OPZIONALI** (future espansioni):
8. DPIA per chatbot AI
9. Google Analytics con consent
10. LinkedIn Pixel con consent

Una volta completati questi step, il sito avrà **conformità legale completa** secondo
le normative italiane e europee in vigore al febbraio 2026.

---

**Documento curato da**: Leonardo Sarti Magi / Team di Sviluppo
**Data**: 9 febbraio 2026
**Versione**: 1.0

Per domande o chiarimenti: **privacy@theaiandbeyond.it**
