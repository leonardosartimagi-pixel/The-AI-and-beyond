# Informativa Privacy

**Titolare del Trattamento:** Leonardo Sarti Magi (ditta individuale)
**Ragione Sociale:** The AI and beyond di Leonardo Sarti Magi
**P.IVA:** 02754730469
**Sede Legale:** Via Genova 9, 55049 Viareggio (LU), Italia
**Email Privacy:** privacy@theaiandbeyond.it
**Email Informazioni Generali:** info@theaiandbeyond.it
**Sito Web:** https://theaiandbeyond.it

**Data Ultimo Aggiornamento:** 11 febbraio 2026

---

## 1. Introduzione

Questa informativa descrive come il sito web "The AI and beyond" (di seguito "il Sito") raccoglie, utilizza, conserva e protegge i dati personali degli utenti. I dati personali sono qualsiasi informazione relativa a una persona fisica identificata o identificabile (interessato).

Il trattamento dei dati personali è effettuato in conformità al Regolamento UE 2016/679 (GDPR) e al Decreto Legislativo 196/2003 come modificato dal Decreto Legislativo 101/2018 (Codice della Privacy italiano).

---

## 2. Titolare del Trattamento

**Titolare del Trattamento** (colui che determina le finalità e le modalità del trattamento dei dati) è:

**Leonardo Sarti Magi**

- Ditta individuale iscritta nel Registro delle Imprese di Lucca
- P.IVA: 02754730469
- Sede: Via Genova 9, 55049 Viareggio (LU), Italia
- Email: privacy@theaiandbeyond.it

Non è stato designato un Responsabile della Protezione dei Dati (DPO), in quanto non obbligatorio secondo l'articolo 37 GDPR per le ditte individuali che non effettuano trattamenti su larga scala.

---

## 3. Tipologie di Dati Raccolti

### 3.1 Dati Forniti Direttamente dall'Utente

Tramite il **modulo di contatto** presente sul Sito, vengono raccolti i seguenti dati personali:

- **Nome e Cognome** (obbligatorio)
- **Indirizzo Email** (obbligatorio)
- **Nome Azienda** (facoltativo)
- **Messaggio/Contenuto** (obbligatorio)
- **Consenso alla Privacy** (obbligatorio - checkbox di consenso)

Il modulo di contatto include una dichiarazione di consenso che l'utente deve accettare prima di inviare il messaggio.

### 3.2 Dati Raccolti Automaticamente

Durante la visita del Sito, vengono raccolti automaticamente i seguenti dati:

#### 3.2.1 Dati Tecnici di Accesso

- **Indirizzo IP**: Utilizzato per il rate limiting del modulo di contatto al fine di prevenire abusi. L'indirizzo IP è memorizzato temporaneamente (massimo 15 minuti) nel servizio di rate limiting Upstash Redis, dopodiché viene automaticamente eliminato tramite TTL (Time-To-Live). L'IP non è utilizzato per altri scopi e non è associato ad altri dati personali.
- **User Agent e informazioni del browser**: Raccolti dal server Vercel per scopi di hosting e sicurezza.
- **Timestamp della richiesta**: Registrato automaticamente dal server di hosting.

#### 3.2.2 Cookie Tecnici e Storage Locale

- **Cookie di Consenso**: Un cookie tecnico denominato `cookie-consent` è memorizzato nel localStorage del browser dell'utente, contenente:
  - Stato del consenso agli analytics (`analytics: true/false`)
  - Timestamp del consenso

Questo cookie è strettamente necessario per ricordare le preferenze dell'utente rispetto al tracciamento analitico e non richiede consenso preventivo secondo l'ePrivacy Directive.

#### 3.2.3 Google Fonts

- **Google Fonts**: Il Sito utilizza caratteri tramite Next.js Font Optimization, che carica i font in modo self-hosted. Non vi è alcuna connessione diretta ai server di Google per il caricamento dei font.

### 3.3 Dati da Servizi di Terze Parti (Solo se Consenso Fornito)

I seguenti servizi di analisi sono integrati nel Sito ma attivati **SOLO dopo il consenso esplicito dell'utente**:

#### 3.3.1 Vercel Analytics e Speed Insights

- **Fornitore**: Vercel Inc. (sede legale: Stati Uniti)
- **Dati raccolti**:
  - Visualizzazioni di pagina
  - Dati di performance e velocità del sito
  - Informazioni di base sul browser e dispositivo
- **Base giuridica**: Consenso esplicito dell'utente (articolo 6, comma 1, lettera a) GDPR)
- **Attivazione**: Solo dopo accettazione del banner cookie
- **Conservazione**: Secondo le politiche di Vercel (disponibile in https://vercel.com/privacy)

---

## 4. Finalità del Trattamento

I dati personali sono trattati per le seguenti finalità:

### 4.1 Modulo di Contatto

- **Finalità**: Rispondere alle richieste di informazioni e consulenza inviate dagli utenti, incluso l'invio di un'email automatica di conferma ricezione al mittente
- **Base giuridica**:
  - Articolo 6, comma 1, lettera a) GDPR: Consenso esplicito (dichiarazione di accettazione della presente informativa)
  - Articolo 6, comma 1, lettera b) GDPR: Esecuzione di un contratto o di misure precontrattuali (quando applicabile)

### 4.2 Prevenzione degli Abusi

- **Finalità**: Implementare misure di sicurezza per il rate limiting del modulo di contatto, prevenendo invii massivi o automatizzati
- **Base giuridica**: Articolo 6, comma 1, lettera f) GDPR: Interesse legittimo del Titolare nel proteggere i propri sistemi da abusi
- **Nota**: L'indirizzo IP utilizzato per questo scopo è memorizzato temporaneamente (massimo 15 minuti) nel servizio Upstash Redis, dopodiché viene eliminato automaticamente

### 4.3 Analytics e Miglioramento del Sito

- **Finalità**: Comprendere come gli utenti interagiscono con il Sito al fine di migliorare l'esperienza utente, l'usabilità e le funzionalità
- **Base giuridica**: Articolo 6, comma 1, lettera a) GDPR: Consenso esplicito dell'utente
- **Applicabile a**: Vercel Analytics, Speed Insights

### 4.4 Rispetto degli Obblighi Legali

- **Finalità**: Adempimento di obblighi legali in materia fiscale e contabile (conservazione della documentazione dei contatti per scopi amministrativi)
- **Base giuridica**: Articolo 6, comma 1, lettera c) GDPR

---

## 5. Base Giuridica del Trattamento

Il trattamento dei dati personali è effettuato sulla base delle seguenti fondamenti giuridici (articolo 6 GDPR):

| Tipo di Dato               | Base Giuridica                                 | Note                                                                       |
| -------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| Dati modulo di contatto    | Consenso (art. 6.1.a) + Contratto (art. 6.1.b) | Consenso ottenuto tramite checkbox; rapporto potenziale cliente            |
| IP per rate limiting       | Interesse legittimo (art. 6.1.f)               | Protezione da abusi e spam; IP memorizzato in Upstash Redis per max 15 min |
| Cookie tecnici di consenso | Necessità tecnica (Direttiva ePrivacy)         | Non richiede consenso, è strettamente necessario                           |
| Analytics (Vercel)         | Consenso (art. 6.1.a)                          | Attivati solo dopo consenso esplicito                                      |
| Google Fonts               | Interesse legittimo (art. 6.1.f)               | Self-hosted, no tracking                                                   |
| Obblighi legali            | Adempimento legge (art. 6.1.c)                 | Conservazione per scopi fiscali/amministrativi                             |

---

## 6. Modalità del Trattamento

### 6.1 Sicurezza dei Dati

Il Titolare del Trattamento implementa le seguenti misure di sicurezza:

- **Hosting su Vercel**: Infrastruttura cloud con standard di sicurezza internazionali (ISO 27001)
- **Connessione HTTPS**: Tutti i dati in transito sono cifrati tramite SSL/TLS
- **Validazione input**: I dati del modulo di contatto sono validati tramite Zod schema per prevenire iniezioni e dati malformati
- **Conservazione temporanea IP**: Gli indirizzi IP per il rate limiting sono memorizzati temporaneamente (massimo 15 minuti) nel servizio Upstash Redis con eliminazione automatica tramite TTL
- **Nessun database dati personali**: I dati del modulo di contatto NON sono archiviati in un database locale o online, bensì trasmessi tramite API Resend direttamente all'email del proprietario
- **Accesso limitato**: Solo il titolare del trattamento ha accesso ai dati trasmessi tramite il modulo di contatto

### 6.2 Flusso dei Dati del Modulo di Contatto

```
Utente compila modulo
         ↓
Validazione lato client (Zod schema)
         ↓
Invio tramite API (HTTPS) a Resend
         ↓
Resend elabora e invia email a proprietario
         ↓
Dati NON memorizzati nel database del Sito
         ↓
Email archiviata nel client email proprietario
```

### 6.3 Protezione Dati e Conformità

- **Crittografia**: Tutti i dati in transito utilizzano TLS 1.2 o superiore
- **Backup**: Gestiti da Vercel secondo standard del settore
- **Controllo accessi**: Nessun accesso automatico; richiedono autenticazione nel sistema email del proprietario
- **Conformità GDPR**: Tutte le operazioni sono documentate e soggette agli obblighi GDPR

---

## 7. Luogo del Trattamento

### 7.1 Hosting - Vercel

Il Sito è ospitato su **Vercel Inc.** (sede legale: Stati Uniti)

- **Ubicazione server**: Distribuiti globalmente (inclusa Europa)
- **Certificazione**: Vercel Inc. è certificata EU-US Data Privacy Framework
- **Dati elaborati**: Contenuti del Sito, logistica di hosting, analytics opzionali
- **Accordo di trattamento**: Vercel ha sottoscritto Data Processing Agreement conforme GDPR

### 7.2 Servizio Email - Resend

I dati del modulo di contatto sono trasmessi a **Resend Inc.** (sede legale: Stati Uniti)

- **Processo**: Resend riceve il messaggio e lo consegna all'email del proprietario
- **Ubicazione**: Server distribuiti (inclusa Europa)
- **Certificazione**: Resend aderisce a standard di sicurezza internazionali
- **Accordo di trattamento**: Resend ha sottoscritto Data Processing Agreement conforme GDPR
- **Conservazione**: I dati sono conservati per il tempo necessario alla consegna email, dopodiché rimossi

### 7.3 Analytics - Vercel Analytics

- **Vercel Analytics**: Elaborati presso Vercel Inc. (USA, con EU-US Data Privacy Framework)

### 7.4 Trasferimenti Extra-UE

Alcuni dati possono essere trasferiti verso Stati Uniti tramite:

- **EU-US Data Privacy Framework**: Per Vercel Inc. (analytics, hosting)
- **EU-US Data Privacy Framework**: Per Upstash Inc. (rate limiting, IP temporaneo)

Tali trasferimenti sono autorizzati dalla Commissione Europea e comportano garanzie equipollenti a quelle previste dal GDPR.

---

## 8. Periodo di Conservazione dei Dati

| Tipo di Dato               | Periodo di Conservazione                               | Motivo                              |
| -------------------------- | ------------------------------------------------------ | ----------------------------------- |
| Dati modulo di contatto    | 3 anni                                                 | Obblighi fiscali/amministrativi     |
| IP per rate limiting       | 15 minuti (Upstash Redis, eliminazione automatica TTL) | Rate limiting per prevenzione abusi |
| Cookie di consenso         | 12 mesi                                                | Ricordare preferenze utente         |
| Analytics (Vercel)         | Secondo policy Vercel (default 90 giorni)              | Analisi statistiche aggregate       |
| Logistica hosting (Vercel) | Secondo retention policy Vercel                        | Sicurezza e troubleshooting         |

**Nota**: Dopo la scadenza del periodo di conservazione, i dati sono eliminati o anonimizzati in conformità al principio di minimizzazione dei dati.

---

## 9. Diritti degli Interessati

Secondo il Capo III del GDPR (Diritti dell'interessato), ogni persona ha il diritto di:

### 9.1 Diritto di Accesso (Art. 15 GDPR)

Ottenere conferma della presente informativa e accesso ai dati personali in nostro possesso in qualsiasi momento.

### 9.2 Diritto di Rettifica (Art. 16 GDPR)

Richiedere la correzione di dati personali inesatti o incompleti.

### 9.3 Diritto all'Oblio / Cancellazione (Art. 17 GDPR)

Chiedere la cancellazione dei dati personali, con eccezioni per obblighi legali e conservazione documentale.

**Nota**: Dato che non memorizziamo dati in database (solo via email), l'esercizio di questo diritto sarà facilitato dalla cancellazione dall'archivio email del proprietario, fatta salva la conservazione per obblighi fiscali (3 anni).

### 9.4 Diritto alla Limitazione del Trattamento (Art. 18 GDPR)

Richiedere il blocco del trattamento dei dati mentre si verifica la loro correttezza.

### 9.5 Diritto alla Portabilità dei Dati (Art. 20 GDPR)

Ricevere i propri dati in formato strutturato, comunemente usato e leggibile da macchina (es. CSV, JSON).

### 9.6 Diritto di Opposizione (Art. 21 GDPR)

Opporsi al trattamento dei dati per motivi connessi alla situazione particolare dell'interessato.

**Applicabile a**:

- Analytics (è sempre possibile disabilitare il consenso)
- Rate limiting (richiedere che il Titolare implementi metodi alternativi)

### 9.7 Diritto a Non Essere Sottoposto a Decisioni Automatizzate (Art. 22 GDPR)

Non è applicabile a questo Sito poiché non vengono prese decisioni automatizzate che producono effetti significativi.

### 9.8 Come Esercitare i Diritti

Per esercitare uno qualsiasi dei diritti sopra descritti, l'interessato deve inviare una richiesta scritta al Titolare del Trattamento:

**Email**: privacy@theaiandbeyond.it
**Indirizzo**: Via Genova 9, 55049 Viareggio (LU), Italia

La richiesta deve contenere:

- Identificazione dell'interessato (nome, cognome, email)
- Descrizione del diritto che si desidera esercitare
- Documentazione di identità (per verifiche di sicurezza)

Il Titolare risponderà entro **30 giorni** dal ricevimento della richiesta (estensibili di 60 giorni per questioni complesse), come previsto dall'articolo 12 GDPR.

### 9.9 Diritto di Reclamo presso l'Autorità Garante

Qualora l'interessato ritenga che il trattamento dei propri dati violi le disposizioni del GDPR o del Codice della Privacy italiano, ha diritto di presentare un reclamo presso:

**Garante per la Protezione dei Dati Personali**
Piazza Venezia 11, 00187 Roma, Italia
Sito: https://www.garanteprivacy.it
Email: protocollo@pec.garanteprivacy.it

---

## 10. Cookie e Tracciamento

### 10.1 Definizione di Cookie

I cookie sono piccoli file di testo memorizzati sul dispositivo dell'utente che contengono informazioni sulla navigazione.

### 10.2 Cookie Utilizzati su Questo Sito

#### 10.2.1 Cookie Strettamente Necessari (Senza Consenso)

- **`cookie-consent`** (localStorage): Memorizza le preferenze dell'utente rispetto al tracciamento analitico. Non richiede consenso preventivo in quanto strettamente necessario per fornire il servizio secondo la Direttiva ePrivacy.

#### 10.2.2 Cookie Analitici (Richiedono Consenso)

- **Vercel Analytics**: Memorizza cookie per tracciare le visualizzazioni di pagina. Attivato solo dopo consenso.

### 10.3 Gestione dei Cookie

L'utente può gestire le preferenze di cookie:

1. **Via Banner Cookie**: Al primo accesso al Sito, compare un banner che consente di accettare o rifiutare gli analytics
2. **Via Browser**: È possibile disabilitare i cookie direttamente dalle impostazioni del browser
3. **Terzi**: È possibile revocare il consenso ai servizi di terze parti (Vercel) dalle loro rispettive impostazioni

### 10.4 Cookie di Terze Parti

Il Sito integra i seguenti servizi che memorizzano cookie di terze parti:

| Servizio         | Tipo         | Consenso Richiesto | Privacy Policy             |
| ---------------- | ------------ | ------------------ | -------------------------- |
| Vercel Analytics | Analytics    | Sì                 | https://vercel.com/privacy |
| Google Fonts     | Funzionalità | No (self-hosted)   | N/A                        |

---

## 11. Servizi di Terze Parti e Responsabili del Trattamento

### 11.1 Responsabili del Trattamento

Secondo l'articolo 28 GDPR, i seguenti servizi fungono da **Responsabili del Trattamento** (incaricati del trattamento su disposizione del Titolare):

#### 11.1.1 Vercel Inc.

- **Ruolo**: Hosting, CDN, Analytics
- **Sede**: Stati Uniti
- **DPA**: Disponibile su https://vercel.com/security
- **Certificazione**: EU-US Data Privacy Framework
- **Contatti**: privacy@vercel.com

#### 11.1.2 Resend Inc.

- **Ruolo**: Email delivery (invio messaggi modulo contatto)
- **Sede**: Stati Uniti
- **DPA**: Disponibile
- **Dati elaborati**: Nome, email, messaggio dal modulo di contatto
- **Conservazione**: Fino a consegna email
- **Contatti**: support@resend.com

#### 11.1.3 Upstash Inc.

- **Ruolo**: Rate limiting (memorizzazione temporanea IP per prevenzione abusi)
- **Sede**: Stati Uniti
- **DPA**: Disponibile su https://upstash.com/trust/dpa.pdf
- **Dati elaborati**: Indirizzo IP (con TTL di 15 minuti, eliminazione automatica)
- **Conservazione**: Massimo 15 minuti
- **Contatti**: support@upstash.com

### 11.2 Condivisione dei Dati con Terzi

I dati personali NON sono condivisi con terze parti, eccetto:

- **Resend**: Per l'invio di email (modulo contatto)
- **Vercel**: Per hosting e analytics (solo con consenso)
- **Upstash**: Per il rate limiting (memorizzazione temporanea IP, max 15 minuti)

Nessun dato è venduto, ceduto in licenza o altrimenti divulgato a fini di marketing o profitto.

---

## 12. Diritti dell'Interessato nei Confronti dei Responsabili del Trattamento

L'interessato ha il diritto di contattare direttamente i Responsabili del Trattamento per:

- Accesso ai dati personali elaborati
- Esercizio dei diritti GDPR
- Segnalazione di violazioni o abusi

**Contatti diretti**:

- **Vercel**: https://vercel.com/contact (Data Privacy)
- **Resend**: support@resend.com

---

## 13. Modifiche a Questa Informativa

Il Titolare del Trattamento si riserva il diritto di modificare questa informativa in qualsiasi momento al fine di adeguarsi a:

- Nuove normative legali
- Nuovi servizi integrati nel Sito
- Esigenze di sicurezza e conformità

Le modifiche saranno pubblicate su questa pagina con aggiornamento della data "Data Ultimo Aggiornamento". L'uso continuativo del Sito dopo la pubblicazione di modifiche costituisce accettazione delle stesse.

Se le modifiche comportano un materiale cambiamento nelle modalità di trattamento dei dati, sarà fornita notifica per email agli utenti registrati (se disponibile).

---

## 14. Meccanismi di Consenso

Il consenso al trattamento dei dati personali è acquisito tramite meccanismi specifici e non tramite la semplice navigazione del Sito:

1. **Modulo di contatto**: L'utente deve selezionare esplicitamente la checkbox "Accetto l'informativa privacy" prima di inviare il messaggio. Senza tale consenso, il modulo non può essere inviato.
2. **Cookie analitici**: Il consenso è acquisito tramite il banner cookie, che consente di accettare o rifiutare gli analytics. Senza consenso, nessun cookie analitico viene installato.
3. **Cookie tecnici**: Non richiedono consenso in quanto strettamente necessari al funzionamento del Sito (Direttiva ePrivacy).

La navigazione del Sito non implica il consenso al trattamento dei dati personali, che resta soggetto ai meccanismi sopra descritti.

### 14.1 Prova del Consenso

Ai sensi dell'articolo 7, comma 1, del GDPR, il Titolare conserva una registrazione anonimizzata del consenso prestato dall'utente. Al momento dell'accettazione o del rifiuto tramite il banner cookie, viene salvato un record contenente: la scelta effettuata, la versione dell'informativa, e il timestamp. L'indirizzo IP dell'utente viene sostituito da un hash crittografico non reversibile (SHA-256 troncato) e i record scadono automaticamente dopo 13 mesi.

### 14.2 Segnali "Do Not Track" e "Global Privacy Control"

Il Sito rispetta i segnali di privacy inviati dal browser dell'utente:

- **Do Not Track (DNT)**: Se il browser invia il segnale `DNT: 1`, il Sito tratta automaticamente l'utente come se avesse rifiutato i cookie analitici, senza mostrare il banner.
- **Global Privacy Control (GPC)**: Se il browser invia il segnale GPC, il Sito applica lo stesso comportamento automatico di rifiuto dei cookie analitici.

Questi segnali vengono rispettati solo in assenza di una scelta esplicita già memorizzata dall'utente. Se l'utente ha precedentemente effettuato una scelta tramite il banner, tale scelta prevale sui segnali del browser.

---

## 15. Contatti e Supporto

Per qualsiasi domanda, preoccupazione o richiesta relativa a questa informativa o al trattamento dei dati personali:

**Email Privacy**: privacy@theaiandbeyond.it
**Email Informazioni Generali**: info@theaiandbeyond.it
**Indirizzo**: Via Genova 9, 55049 Viareggio (LU), Italia
**Sito Web**: https://theaiandbeyond.it

Il Titolare risponderà a tutte le richieste entro 30 giorni (extendibili a 60 giorni per questioni complesse).

---

## 16. Glossario

- **Interessato**: La persona fisica cui si riferiscono i dati personali
- **Titolare del Trattamento**: La persona fisica o giuridica che determina le finalità e le modalità del trattamento (in questo caso: Leonardo Sarti Magi)
- **Responsabile del Trattamento**: La persona fisica o giuridica che tratta i dati su istruzione del Titolare (Vercel, Resend, Upstash)
- **Trattamento**: Qualsiasi operazione su dati personali (raccolta, conservazione, utilizzo, cancellazione, ecc.)
- **Dato Personale**: Qualsiasi informazione relativa a una persona fisica identificata o identificabile
- **GDPR**: Regolamento (UE) 2016/679 - Regolamento generale sulla protezione dei dati
- **DPA**: Data Processing Agreement - Accordo di trattamento dei dati
- **SCCs**: Standard Contractual Clauses - Clausole contrattuali standard
- **Cookie**: Piccoli file memorizzati nel browser che contengono informazioni sulla navigazione
- **localStorage**: Meccanismo di archiviazione locale nel browser senza limiti di sessione

---

**Documento redatto in conformità al GDPR (Reg. UE 2016/679) e al Codice della Privacy italiano (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018).**

**Ultima revisione**: 11 febbraio 2026
