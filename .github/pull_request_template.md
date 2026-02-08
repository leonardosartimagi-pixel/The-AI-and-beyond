## Descrizione
<!-- Cosa cambia e perché -->

## Tipo di modifica
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Security fix
- [ ] Config / Infra
- [ ] Docs

## Security Checklist
- [ ] Nessun segreto aggiunto al codice (API keys, token, password)
- [ ] Input validato dove necessario (Zod o equivalente)
- [ ] Output correttamente escaped/sanitizzato
- [ ] Nessuna dipendenza nuova non giustificata
- [ ] Test aggiunti o aggiornati (o motivazione per assenza)
- [ ] Nessun `console.log` con dati sensibili (email, IP con contesto, token)
- [ ] Security headers non modificati o rimossi
- [ ] Rate limiting non bypassato
- [ ] Nessun uso di `dangerouslySetInnerHTML`, `eval()`, `Function()`
- [ ] Nessuna variabile `NEXT_PUBLIC_` con dati sensibili

## Test
<!-- Come verificare che funziona -->

## Risk Assessment
- **Rischio**: Basso / Medio / Alto
- **Componenti impattati**:
- **Rollback plan**:
