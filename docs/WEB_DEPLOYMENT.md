
# Web Deployment Guide

## Overview
L'app Moto3 Pilot Trainer è ora completamente funzionale come web app. Questa guida spiega come eseguire e distribuire l'applicazione web.

## Funzionalità Web

### ✅ Completamente Supportate
- **Navigazione**: Tab navigation con FloatingTabBar
- **Storage**: AsyncStorage funziona su web usando localStorage
- **Icone**: Mapping automatico da SF Symbols a Material Icons
- **Stili**: Ottimizzati per web con boxShadow CSS
- **Animazioni**: React Native Reanimated funziona su web
- **Temi**: Dark mode e light mode completamente supportati
- **Responsive**: Layout adattivo per diverse dimensioni schermo

### ⚠️ Limitazioni Note
- **Haptics**: Usa Vibration API del browser quando disponibile
- **BlurView**: Disabilitato su web, usa background solido
- **SafeAreaView**: Sostituito con padding fisso su web
- **Network Detection**: Rimosso su web (sempre online)

## Esecuzione Locale

### Avvio Dev Server
```bash
npm run web
# oppure
expo start --web
```

L'app sarà disponibile su `http://localhost:8081`

### Build di Produzione
```bash
npm run build:web
```

Questo genera i file statici nella cartella `dist/` pronti per il deployment.

## Deployment

### Opzione 1: Netlify
1. Connetti il repository GitHub a Netlify
2. Configura build command: `npm run build:web`
3. Configura publish directory: `dist`
4. Deploy automatico ad ogni push

### Opzione 2: Vercel
1. Installa Vercel CLI: `npm i -g vercel`
2. Esegui: `vercel`
3. Segui le istruzioni per il deployment

### Opzione 3: GitHub Pages
1. Build: `npm run build:web`
2. Copia contenuto `dist/` nel branch `gh-pages`
3. Abilita GitHub Pages nelle impostazioni del repository

### Opzione 4: Server Statico Personalizzato
1. Build: `npm run build:web`
2. Carica contenuto `dist/` su qualsiasi hosting statico
3. Configura server per servire `index.html` per tutte le route

## Ottimizzazioni Web

### Performance
- ✅ Code splitting automatico
- ✅ Asset optimization
- ✅ Lazy loading dei componenti
- ✅ Service Worker per caching (opzionale)

### SEO
- ✅ Meta tags configurati
- ✅ Manifest.json per PWA
- ✅ Favicon configurato
- ✅ Open Graph tags (da aggiungere se necessario)

### PWA (Progressive Web App)
L'app può essere installata come PWA:
- ✅ Manifest configurato
- ✅ Icone per diverse dimensioni
- ⚠️ Service Worker da configurare per offline support

## Configurazione Avanzata

### Variabili d'Ambiente
Crea un file `.env` per configurazioni specifiche:
```
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Custom Domain
Dopo il deployment, configura il tuo dominio personalizzato:
1. Aggiungi record DNS CNAME
2. Configura SSL/TLS
3. Aggiorna `app.json` con il nuovo URL

## Testing Web

### Browser Supportati
- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Test Checklist
- [ ] Navigazione tra tab funziona
- [ ] Storage persiste i dati
- [ ] Animazioni sono fluide
- [ ] Dark mode funziona
- [ ] Responsive su mobile
- [ ] Responsive su tablet
- [ ] Responsive su desktop
- [ ] Icone si visualizzano correttamente
- [ ] Gradients funzionano
- [ ] Modal e overlay funzionano

## Troubleshooting

### Problema: Icone non si visualizzano
**Soluzione**: Verifica che `@expo/vector-icons` sia installato e importato correttamente.

### Problema: Storage non persiste
**Soluzione**: Controlla le impostazioni privacy del browser. localStorage deve essere abilitato.

### Problema: Animazioni lag
**Soluzione**: Riduci la complessità delle animazioni o usa `useNativeDriver: false` per animazioni web.

### Problema: Layout rotto su mobile
**Soluzione**: Verifica i media queries e usa `Dimensions.get('window')` per layout responsive.

## Monitoraggio

### Analytics
Integra analytics per monitorare l'uso:
- Google Analytics
- Plausible
- Mixpanel
- Custom analytics

### Error Tracking
Configura error tracking:
- Sentry
- Bugsnag
- Custom error logging

## Manutenzione

### Aggiornamenti
1. Testa localmente: `npm run web`
2. Build: `npm run build:web`
3. Deploy su staging
4. Test su staging
5. Deploy su produzione

### Backup
- Backup regolare del database (se presente)
- Backup delle configurazioni
- Version control con Git

## Risorse

- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## Supporto

Per problemi o domande:
1. Controlla la documentazione
2. Cerca nei GitHub Issues
3. Apri un nuovo issue con dettagli completi
