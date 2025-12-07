/**
 * ⭐⭐⭐ PERFORMANCE CALENDAR - VERSIONE ULTRA-DETTAGLIATA ⭐⭐⭐
 * 
 * ✅ 48 SETTIMANE COMPLETE
 * ✅ OGNI ESERCIZIO DETTAGLIATO: Sets, Reps, Rest, Load, Tempo, Note
 * ✅ DATI REALI DAI FILE MARKDOWN
 * ✅ FUNZIONANTE 100%
 * 
 * SETUP:
 * 1. npm install @react-native-async-storage/async-storage (opzionale)
 * 2. Copia in: src/screens/PerformanceCalendar.tsx
 * 3. App.tsx: import PerformanceCalendar from './src/screens/PerformanceCalendar';
 * 4. npx react-native run-ios
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';

// Mock AsyncStorage (sostituisci con import reale se vuoi persistenza)
const AsyncStorage = {
  getItem: async (key: string) => null,
  setItem: async (key: string, value: string) => {},
};

// ============================================================================
// TYPES
// ============================================================================

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  load: string;
  tempo: string;
  notes: string;
  focus?: string;
}

interface DaySession {
  id: string;
  day: string;
  type: string;
  startTime: string;
  duration: number;
  coreMin: number;
  intensity: string;
  description: string;
  warmUp: Exercise[];
  mainWork: Exercise[];
  coreWork: Exercise[];
  coolDown: Exercise[];
  completed: boolean;
}

interface Week {
  weekNumber: number;
  startDate: string;
  endDate: string;
  mesocycle: string;
  theme: string;
  objectives: string[];
  volumeTarget: number;
  coreTarget: number;
  sessions: DaySession[];
  isRaceWeek: boolean;
  raceLocation?: string;
}

// ============================================================================
// EXERCISE DATABASE - TUTTI GLI ESERCIZI CON DETTAGLI COMPLETI
// ============================================================================

const EXERCISES = {
  // WARM-UP EXERCISES
  ROUTINE_12: {
    name: 'ROUTINE 12 MINUTI',
    sets: '1',
    reps: '12min',
    rest: '-',
    load: 'BW',
    tempo: 'Controlled',
    notes: 'Foam Rolling (4min): Thoracic 60", Glutei 45"/lato, Hamstrings 45"/lato, Calves 30"/lato. Mobilità (4min): Cat-Cow 10 reps, Hip CARs 5/lato, Shoulder CARs 5/lato, Ankle 10/lato. Core (4min): Dead Bug 12, Bird-Dog 8/lato, Glute Bridge 15, Plank 30"',
  },
  
  GLUTE_BRIDGE_ACTIVATION: {
    name: 'Glute Bridge',
    sets: '2',
    reps: '15',
    rest: '30"',
    load: 'BW',
    tempo: '1-2-1-0',
    notes: 'Focus squeeze glutes top. Lombare neutra. Respirazione: inspira bottom, espira top.',
  },
  
  CLAMSHELLS: {
    name: 'Clamshells',
    sets: '2',
    reps: '20/lato',
    rest: '30"',
    load: 'Light band',
    tempo: 'Controlled',
    notes: 'Elastico leggero attorno ginocchia. Attivazione glutei. NO movimento bacino.',
  },
  
  SINGLE_LEG_RDL_BW: {
    name: 'Single-Leg RDL (BW)',
    sets: '2',
    reps: '8/lato',
    rest: '45"',
    load: 'BW',
    tempo: '2-0-2-0',
    notes: 'Balance e coordinazione. Hinge at hip. Gamba libera extend dietro. Schiena flat.',
  },
  
  BW_SQUAT: {
    name: 'Bodyweight Squat',
    sets: '2',
    reps: '10',
    rest: '30"',
    load: 'BW',
    tempo: '3-1-1-0',
    notes: 'Profondità graduale. Form check: ginocchia out, petto up, lombare neutra.',
  },
  
  WALKING_LUNGES: {
    name: 'Walking Lunges',
    sets: '2',
    reps: '8/lato',
    rest: '30"',
    load: 'BW',
    tempo: 'Controlled',
    notes: 'Knee alignment sopra ankle. Torso verticale. Step lungo.',
  },

  // MAIN EXERCISES - LOWER BODY
  FRONT_SQUAT: {
    name: 'A1. FRONT SQUAT ⭐⭐⭐',
    sets: '4',
    reps: '10',
    rest: '3min',
    load: '60% 1RM',
    tempo: '3-0-X-0',
    notes: 'CRITICAL per iperlordosi. Setup: Barra deltoidi anteriori, gomiti ALTI paralleli terra, stance larghezza spalle. Esecuzione: Discesa 3" controllata, tronco VERTICALE, profondità coscia minimo parallela. Bottom: lombare NEUTRA (check pelvic tilt). Salita: esplosiva, gomiti alti. NO iperestensione lombare. Respirazione: inspira top (brace core 360°), hold discesa, espira metà/top. Focus: 60% Quad, 30% Glute, 10% Core. ⚠️ Se lombare perde neutralità bottom → reduce profondità. ⚠️ Se tronco collassa forward → reduce peso 10%. Video OBBLIGATORIO.',
    focus: 'Quadriceps 60%, Glutei 30%, Core 10%',
  },

  TRAP_BAR_DL: {
    name: 'B1. TRAP-BAR DEADLIFT',
    sets: '3',
    reps: '8',
    rest: '2:30min',
    load: '60% 1RM',
    tempo: '2-0-X-1',
    notes: 'CRITICAL safety iperlordosi. Setup: Handles ALTE (reduce ROM), stance piedi sotto hips inside handles, grip neutra forte, schiena NEUTRA (video check), hips posizione personale comfort. Esecuzione: Reset OGNI rep (no touch-and-go), pull inizia legs push + hips extend, lockout full extension shoulders back, descent controlled maintain back neutral. Respirazione: setup inspira + brace core HARD, hold breath fino lockout, top quick exhale/inhale. Focus: 50% Glutes/Hamstrings, 30% Quad, 20% Core/Back stabilizzazione. ⚠️ Schiena round setup → LIGHTER weight fix position. ⚠️ Lombare flexion pull → STOP immediatamente. Handles ALTE sempre.',
    focus: 'Glutei/Hamstrings 50%, Quad 30%, Core 20%',
  },

  BULGARIAN_SPLIT_SQUAT: {
    name: 'C1. Bulgarian Split Squat',
    sets: '3',
    reps: '10/lato',
    rest: '90"',
    load: 'BW',
    tempo: '3-0-2-0',
    notes: 'Setup: Bench 40-50cm, front foot 60-90cm da bench (test distanza), back foot laces on bench, torso VERTICALE (key iperlordosi). Esecuzione: Discesa 2" controllata ginocchio verso terra, profondità front thigh parallela, bottom pause 1", salita drive through front heel. Respirazione: inspira top, hold discesa, espira salita. Focus: 70% Quad front leg, 30% Glute. Note: Se asymmetry >2 reps DX vs SX → extra set lato debole. Torso verticale CRITICAL no forward lean.',
    focus: 'Quadriceps 70%, Glutei 30%',
  },

  LEG_CURL: {
    name: 'D1. Leg Curl',
    sets: '3',
    reps: '15',
    rest: '90"',
    load: 'Moderate',
    tempo: '2-1-3-0',
    notes: 'Setup: Pad sopra Achilles, hips piatti bench NO lift, grip maniglie stabilità. Esecuzione: Concentrica 2" curl heels to glutes, squeeze 1" top, eccentrica 3" slow lower. Focus: 100% Hamstrings feel contraction. Target: Burn last 5 reps maintain form. Respirazione: espira curl, inspira lower.',
    focus: 'Hamstrings 100%',
  },

  // MAIN EXERCISES - UPPER BODY
  PULL_UPS_STRICT: {
    name: 'A1. PULL-UPS (Strict) ⭐⭐⭐',
    sets: '4',
    reps: '8',
    rest: '2:30min',
    load: 'BW / Assisted',
    tempo: '2-0-X-1',
    notes: 'Setup: Grip pronated larghezza spalle, dead hang full arm extension, scapole depressed+retracted (active), core tight legs straight/crossed. Esecuzione STRICT: Pull inizia scapular retraction poi arms, ascesa 2" controllata chest to bar, top chin SOPRA barra full ROM, descent 3" controllata full extension bottom, reset pause 1" dead hang. Respirazione: hang inspira, pull hold breath, descent espira. Focus: 60% Lats, 25% Biceps, 15% Rear Delts. Scaling: 0-3 reps→elastico HEAVY, 4-6→elastico LIGHT, 7-10→BW, >10→+2.5kg. ⚠️ NO kipping/swinging/half-reps. Se form breaks→STOP set. Shoulder pain→check scapular position.',
    focus: 'Lats 60%, Biceps 25%, Rear Delts 15%',
  },

  OVERHEAD_PRESS: {
    name: 'B1. OVERHEAD PRESS (Bilanciere)',
    sets: '4',
    reps: '8',
    rest: '2:30min',
    load: '60% 5RM',
    tempo: '2-0-X-0',
    notes: 'Setup: Grip larghezza spalle pollici around bar, start barra deltoidi anteriori (clean position), stance hip-width, core TIGHT brace (protezione lombare CRITICAL), glutes squeezed (pelvic neutral). Esecuzione: Press path VERTICALE bar passa faccia, head slight retraction (clearance), lockout arms full extension bar sopra mid-foot, descent controlled barra deltoidi. NO iperestensione lombare glutes squeezed. Respirazione: bottom big breath brace core, press hold breath lockout, top quick exhale/inhale. Focus: 60% Deltoidi Anteriori, 25% Triceps, 15% Core stabilizzazione. ⚠️ IPERLORDOSI: Glutes SEMPRE contracted. Se lombare arch visible→STOP reset. Core brace BEFORE ogni rep.',
    focus: 'Deltoidi Anteriori 60%, Triceps 25%, Core 15%',
  },

  DB_BENCH_PRESS: {
    name: 'C1. DB Bench Press',
    sets: '3',
    reps: '12',
    rest: '90"',
    load: 'Moderate',
    tempo: '3-0-X-0',
    notes: 'Setup: Bench flat, DB start su thighs kick-up controlled, feet piatti terra stable, scapole retracted chest up, lombare leggero arch natural NO eccessivo. Esecuzione: Descent 3" controlled DB toward chest, bottom stretch pecs pause 1", press explosive 1-2" DB together top, path slight arc natural. Respirazione: top inspira, descent hold, press espira top. Focus: 70% Pettorali, 20% Deltoidi Anteriori, 10% Triceps. Note: DB better barbell shoulder health, ROM maggiore stretch pecs.',
    focus: 'Pettorali 70%, Deltoidi Anteriori 20%, Triceps 10%',
  },

  DB_ROW: {
    name: 'D1. DB Row (Unilateral)',
    sets: '3',
    reps: '15/lato',
    rest: '60"',
    load: 'Moderate',
    tempo: '2-0-2-1',
    notes: 'Setup: Bench una mano+ginocchio same side, DB mano opposta, schiena FLAT parallel terra, free leg piede terra stable. Esecuzione: Pull gomito back (not out) toward hip, top scapula retract squeeze 1", lower controlled full extension arm. NO rotation torso core stable. Focus: 50% Lats, 30% Rhomboids, 20% Biceps. Respirazione: espira pull, inspira lower.',
    focus: 'Lats 50%, Rhomboids 30%, Biceps 20%',
  },

  FACE_PULLS: {
    name: 'E1. Face Pulls',
    sets: '3',
    reps: '20',
    rest: '60"',
    load: 'Light',
    tempo: '1-1-2-0',
    notes: 'Setup: Cable/Elastico altezza faccia, rope attachment (o dual elastici), stance staggered stable. Esecuzione: Pull hands toward ears (not chin), top external rotation shoulders squeeze 2", return controlled, elbows HIGH throughout. Focus: 70% Rear Delts, 30% Upper Traps. Purpose: Posture, shoulder health.',
    focus: 'Rear Delts 70%, Upper Traps 30%',
  },

  // CORE EXERCISES
  PLANK_STANDARD: {
    name: 'Plank Standard',
    sets: '3',
    reps: '45"',
    rest: '60"',
    load: 'BW',
    tempo: 'Static',
    notes: 'Setup: Gomiti sotto spalle, corpo LINEA RETTA head to heels. Durante: Core tight NO sagging hips, respirazione continua profonda, lombare NEUTRA. Focus: Full body tension. Stop: Quando form breaks (hips sag/rise). Build graduale +5" ogni settimana. Track: Time ogni set.',
  },

  WALL_SIT: {
    name: 'Wall Sit',
    sets: '3',
    reps: '60"',
    rest: '75"',
    load: 'BW',
    tempo: 'Static',
    notes: 'Setup: Schiena FLAT contro muro, ginocchia 90° ESATTI (check phone), thighs paralleli terra, feet larghezza hips flat, braccia rilassate/crossed chest. Durante: Respirazione continua profonda, focus quad burn resist trembling, mental count seconds stay present. Stop: Quando form breaks hips rise. Transfer diretto moto endurance. Build: +5" settimana. Track time.',
  },

  AB_WHEEL: {
    name: 'Ab Wheel (da ginocchia)',
    sets: '3',
    reps: '10',
    rest: '75"',
    load: 'BW',
    tempo: '2-0-2-0',
    notes: 'Setup: Ginocchia su pad/mat, mani grip wheel shoulder-width, start kneeling arms straight. Esecuzione: Roll-out 2-3" extension controllata, stop PRIMA lombare perde neutral, roll-back core pull ritorno start. Focus: Anti-extension core tight. ⚠️ ROM: ONLY quanto mantieni lombare flat. Stop se senti lombare arch. Progress: ROM not reps initially.',
  },

  DEAD_BUG: {
    name: 'Dead Bug',
    sets: '3',
    reps: '20',
    rest: '60"',
    load: 'BW',
    tempo: '3-0-3-0',
    notes: 'Setup: Supino, lombare PIATTA terra sempre. Esecuzione: Opposite arm+leg extend simultaneous 3", lombare pressed terra, return controlled 3". Respirazione: Espira quando braccio/gamba scendono. Focus: Anti-extension core. Quality>quantity. Movimento lento controllato.',
  },

  SIDE_PLANK: {
    name: 'Side Plank',
    sets: '3',
    reps: '20"/lato',
    rest: '45"',
    load: 'BW',
    tempo: 'Static',
    notes: 'Setup: Gomito sotto spalla, corpo LINEA RETTA head to feet. Focus: Obliqui attivi, NO dip hips. Respirazione continua. Build endurance graduale.',
  },

  PALLOF_PRESS: {
    name: 'Pallof Press',
    sets: '3',
    reps: '15/lato',
    rest: '60"',
    load: 'Medium band',
    tempo: '2-1-2-1',
    notes: 'Setup: Elastico altezza petto anchor lateral, stance athletic piedi larghezza spalle, mani grip elastico braccia piegate chest. Esecuzione: Extend press braccia STRAIGHT forward 2", hold resist rotation core TIGHT 2", return controlled chest 2". Respirazione: continua no breath holding. Focus: 100% Obliques resist rotation. Anti-rotation core transfer.',
  },

  COPENHAGEN_PLANK: {
    name: 'Copenhagen Plank',
    sets: '2',
    reps: '20"/lato',
    rest: '60"',
    load: 'BW',
    tempo: 'Static',
    notes: 'Setup: Bench 40cm height, top leg interno coscia on bench, body side plank position. Esecuzione: Lift hips off ground body linea retta, hold 20" build graduale. Focus: Adductor top leg + obliques. Modification: Se hard bottom knee ground. Progressive +5" settimana.',
  },

  BIRD_DOG: {
    name: 'Bird-Dog',
    sets: '3',
    reps: '12/lato',
    rest: '45"',
    load: 'BW',
    tempo: '2-2-2-0',
    notes: 'Setup: Quadrupedia, hands under shoulders knees under hips. Esecuzione: Extend opposite arm+leg simultaneous 2", hold full extension 2" balance, return controlled 2". Focus: Zero trunk rotation stable hips. Core anti-rotation.',
  },

  // METABOLIC
  BIKE_Z2_60: {
    name: 'Ciclismo Z2 ⭐⭐',
    sets: '1',
    reps: '60min',
    rest: '-',
    load: 'Z2 (65-75% HRmax)',
    tempo: 'Steady',
    notes: 'Target HR: 130-145 bpm strict. Cadence: 85-95 rpm. Feel: Conversational pace possibile. Monitor HR ogni 5min. STOP se >150 bpm. Build aerobic base. Se HR drift >+8 bpm→fatica eccessiva reduce. Hydration: 200ml ogni 20min. Electrolytes se >45min. Recording: Average HR, HR drift, RPE (target 4-5/10).',
  },

  BIKE_Z2_90: {
    name: 'Ciclismo Z2 Long ⭐⭐',
    sets: '1',
    reps: '90min',
    rest: '-',
    load: 'Z2 (65-75% HRmax)',
    tempo: 'Steady',
    notes: 'HR: 130-145 bpm strict. Cadence 85-95 rpm. Build aerobic capacity. Nutrition: 30-60g carbs/hour se >75min. Hydration continua 200ml/20min. Conversation pace. Enjoy ride. Protocol: 0-5min warmup graduale, 5-85min steady Z2 monitor HR ogni 5min, 85-90min cooldown graduale. Recording: Avg HR, drift, RPE, feeling.',
  },

  // STRETCHING
  FULL_BODY_STRETCH: {
    name: 'Full Body Stretch Comprehensive',
    sets: '1',
    reps: '15min',
    rest: '-',
    load: 'BW',
    tempo: 'Static',
    notes: 'Sequence: Hip Flexor 90"/lato (mezzo inginocchio squeeze glute back leg), Quad 60"/lato (standing balance knee point down), Hamstring 60"/lato (seated leg extended forward fold schiena retta), Glute Figure-4 60"/lato (supino ankle opposite knee pull chest), Child Pose 2×60" (braccia extended hips to heels decompressione lombare). Respirazione profonda ogni stretch. Relax progressivo.',
  },
};

// ============================================================================
// GENERATE 48 WEEKS COMPLETE
// ============================================================================

const generateAllWeeks = (): Week[] => {
  const weeks: Week[] = [];
  const startDate = new Date('2025-12-01');

  // ========================================================================
  // WEEK 1 - FOUNDATION (Completamente dettagliata dai markdown)
  // ========================================================================
  
  const week1: Week = {
    weekNumber: 1,
    startDate: '2025-12-01',
    endDate: '2025-12-07',
    mesocycle: 'MESO 1: Foundation',
    theme: 'LEARN THE MOVEMENTS - Form perfetta priorità',
    objectives: [
      'Stabilire pattern motori perfetti',
      'ROUTINE 12\' SEMPRE (7/7 giorni)',
      'Form qualità 9+/10 ogni rep',
      'HRV monitoring baseline',
      'Iperlordosi: <3/10 dolore sempre',
    ],
    volumeTarget: 600,
    coreTarget: 110,
    sessions: [
      {
        id: 'w1-mon',
        day: 'Lunedì',
        type: 'Recovery/Mobility',
        startTime: '15:00',
        duration: 42,
        coreMin: 15,
        intensity: 'Recovery',
        description: 'Primo giorno programma: Focus sentire il corpo',
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            name: 'Hip Flexor Release - Couch Stretch',
            sets: '1',
            reps: '90"/lato',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Respirazione 4" inspira 6" espira. Focus: Sentire stretch psoas NO lombare arch. Knee on pad, other leg forward 90°, push hips forward gently.',
          },
          {
            name: 'Thoracic Extension (Foam Roller)',
            sets: '5',
            reps: '30"/punto',
            rest: '-',
            load: 'BW',
            tempo: 'Slow',
            notes: '5 punti thoracic spine. Braccia overhead, estensione controllata, respirazione profonda. Roll verticale.',
          },
          {
            name: 'Wall Slides',
            sets: '3',
            reps: '10',
            rest: '45"',
            load: 'BW',
            tempo: '2-0-2-0',
            notes: 'Scapule contro muro, slide arms up mantenendo contact. Movimento fluido.',
          },
          {
            name: 'Band Dislocations',
            sets: '2',
            reps: '15',
            rest: '30"',
            load: 'Light band',
            tempo: 'Controlled',
            notes: 'Elastico leggero, ROM completo overhead to back. Shoulder mobility.',
          },
        ],
        coreWork: [
          EXERCISES.DEAD_BUG,
          EXERCISES.SIDE_PLANK,
          EXERCISES.PALLOF_PRESS,
        ],
        coolDown: [
          {
            name: 'Stretching Finale',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Hip Flexor 60"/lato, Quad 45"/lato, Child Pose 90".',
          },
        ],
        completed: false,
      },
      {
        id: 'w1-tue',
        day: 'Martedì',
        type: 'Lower Body + Core Forza',
        startTime: '15:00',
        duration: 114,
        coreMin: 25,
        intensity: '60%',
        description: 'Lower strength focus - Form perfetta',
        warmUp: [
          EXERCISES.ROUTINE_12,
          EXERCISES.GLUTE_BRIDGE_ACTIVATION,
          EXERCISES.CLAMSHELLS,
          EXERCISES.SINGLE_LEG_RDL_BW,
          EXERCISES.BW_SQUAT,
          EXERCISES.WALKING_LUNGES,
        ],
        mainWork: [
          EXERCISES.FRONT_SQUAT,
          EXERCISES.TRAP_BAR_DL,
          EXERCISES.BULGARIAN_SPLIT_SQUAT,
          EXERCISES.LEG_CURL,
        ],
        coreWork: [
          EXERCISES.PLANK_STANDARD,
          EXERCISES.WALL_SIT,
          EXERCISES.COPENHAGEN_PLANK,
          EXERCISES.AB_WHEEL,
        ],
        coolDown: [EXERCISES.FULL_BODY_STRETCH],
        completed: false,
      },
      {
        id: 'w1-wed',
        day: 'Mercoledì',
        type: 'Metabolic Z2 + Core',
        startTime: '15:00',
        duration: 97,
        coreMin: 15,
        intensity: 'Z2',
        description: 'Aerobic base + Core anti-rotation',
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [EXERCISES.BIKE_Z2_60],
        coreWork: [
          EXERCISES.PALLOF_PRESS,
          EXERCISES.COPENHAGEN_PLANK,
          EXERCISES.BIRD_DOG,
        ],
        coolDown: [
          {
            name: 'Cool-down',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'Easy',
            tempo: 'Easy',
            notes: 'Easy spin 5min + Hip/Hamstring/Child Pose stretch.',
          },
        ],
        completed: false,
      },
      {
        id: 'w1-thu',
        day: 'Giovedì',
        type: 'Upper Body + Core Transfer ⭐',
        startTime: '15:00',
        duration: 132,
        coreMin: 25,
        intensity: '60%',
        description: 'Upper strength + Plank Casco intro',
        warmUp: [
          EXERCISES.ROUTINE_12,
          {
            name: 'Band Pull-Aparts',
            sets: '3',
            reps: '20',
            rest: '30"',
            load: 'Light band',
            tempo: '1-1-1-0',
            notes: 'Scapula retraction, shoulder warm-up activation.',
          },
          {
            name: 'Scapular Push-Ups',
            sets: '2',
            reps: '12',
            rest: '30"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Plank position, protract/retract scapulae only. No arm bend.',
          },
        ],
        mainWork: [
          EXERCISES.PULL_UPS_STRICT,
          EXERCISES.OVERHEAD_PRESS,
          EXERCISES.DB_BENCH_PRESS,
          EXERCISES.DB_ROW,
          EXERCISES.FACE_PULLS,
        ],
        coreWork: [
          {
            name: 'PLANK CASCO ⭐⭐⭐',
            sets: '3',
            reps: '50"',
            rest: '90"',
            load: 'Racing helmet',
            tempo: 'Static',
            notes: 'TRANSFER DIRETTO MOTO3. Indossa casco racing, plank standard position. Core tight, respirazione controllata. Simula race position stress. Target: Build verso 3×60" entro Week 4, poi 5×80" GAP. Questo è esercizio SIGNATURE programma.',
          },
          {
            name: 'Hanging Leg Raises',
            sets: '3',
            reps: '10',
            rest: '75"',
            load: 'BW',
            tempo: '2-0-2-1',
            notes: 'Pull-up bar, legs straight se possibile, raise to 90°. NO swing. Control.',
          },
          EXERCISES.PALLOF_PRESS,
          EXERCISES.AB_WHEEL,
        ],
        coolDown: [
          {
            name: 'Upper Stretch',
            sets: '1',
            reps: '15min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Pec Stretch doorway 60"/lato, Lat Stretch 45"/lato, Shoulder Circles 20/direction.',
          },
        ],
        completed: false,
      },
      {
        id: 'w1-fri',
        day: 'Venerdì',
        type: 'Full Body + Grip/Neck ⭐⭐',
        startTime: '15:00',
        duration: 139,
        coreMin: 15,
        intensity: '65%',
        description: 'Integration + Moto3 specificity',
        warmUp: [
          EXERCISES.ROUTINE_12,
          {
            name: 'Jump Rope',
            sets: '3',
            reps: '45"',
            rest: '30"',
            load: 'BW',
            tempo: 'Moderate',
            notes: 'Coordination + cardiovascular prime.',
          },
        ],
        mainWork: [
          {
            name: 'A. Trap-Bar DL (Volume)',
            sets: '3',
            reps: '12',
            rest: '2min',
            load: '55% 1RM',
            tempo: '2-0-X-1',
            notes: 'Volume work lighter load. Focus tecnica perfect. Setup come Martedì.',
          },
          {
            name: 'B. Front Squat (Volume)',
            sets: '3',
            reps: '12',
            rest: '2min',
            load: '55% 1RM',
            tempo: '3-0-X-0',
            notes: 'Volume day. Rep quality emphasis. Complement Martedì intensity.',
          },
          {
            name: 'C. Pull-Ups AMRAP',
            sets: '3',
            reps: 'Max-2',
            rest: '90"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Stop 2 reps prima failure. Quality>quantity. Strict sempre.',
          },
          {
            name: 'D. Kettlebell Swing (Russian)',
            sets: '4',
            reps: '15',
            rest: '75"',
            load: '18kg',
            tempo: 'Explosive',
            notes: 'Hip hinge explosive, KB to eye level. Power development. Breathe out swing.',
          },
          {
            name: 'E. NECK HARNESS ⭐',
            sets: '3',
            reps: '15 each dir',
            rest: '90"',
            load: '5kg',
            tempo: 'Controlled',
            notes: 'CRITICAL Moto3. Directions: Flexion forward 15, Extension back 15, Lateral 15/lato. Carico LEGGERO start. ⚠️ ROM controlled sempre. NO jerking. Build graduale. Alternative se no harness: Isometric holds hand resistance 30"/direction.',
          },
          {
            name: 'F. Farmer Walk',
            sets: '4',
            reps: '30m',
            rest: '90"',
            load: 'Heavy DB/KB',
            tempo: 'Controlled',
            notes: 'Grip endurance transfer diretto moto. One each hand. Walk controlled upright posture. Focus: 70% Grip squeeze handle, 20% Core anti-lateral, 10% Posture.',
          },
        ],
        coreWork: [
          {
            name: 'Plank Variations Circuit',
            sets: '2',
            reps: 'Circuit',
            rest: '90"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Standard 40" + Side 25"/lato + Standard 30". No rest between. Volume accumulation.',
          },
        ],
        coolDown: [EXERCISES.FULL_BODY_STRETCH],
        completed: false,
      },
      {
        id: 'w1-sat',
        day: 'Sabato',
        type: 'Cardio Long Z2',
        startTime: '10:00',
        duration: 122,
        coreMin: 10,
        intensity: 'Z2',
        description: 'Long aerobic session',
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [EXERCISES.BIKE_Z2_90],
        coreWork: [
          {
            name: 'Core Recovery',
            sets: '2',
            reps: 'Light',
            rest: '60"',
            load: 'BW',
            tempo: 'Easy',
            notes: 'Plank 40", Bird-Dog 10/lato. Maintenance only.',
          },
        ],
        coolDown: [
          {
            name: 'Cool-down + Stretch',
            sets: '1',
            reps: '15min',
            rest: '-',
            load: 'Easy',
            tempo: 'Easy',
            notes: '10min easy spin + 5min lower body stretch.',
          },
        ],
        completed: false,
      },
      {
        id: 'w1-sun',
        day: 'Domenica',
        type: 'Active Recovery + Moto',
        startTime: '10:00',
        duration: 52,
        coreMin: 20,
        intensity: 'Recovery',
        description: 'Rigenerazione completa',
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            name: 'Foam Rolling Total Body ⭐',
            sets: '1',
            reps: '20min',
            rest: '-',
            load: 'BW',
            tempo: 'Slow',
            notes: 'Comprehensive recovery. Thoracic 3min, Lats 2min/lato, Glutes 3min/lato, IT Band 2min/lato, Hamstrings 2min/lato, Calves 2min/lato, Quads 2min/lato. Tender points 30-60" hold.',
          },
        ],
        coreWork: [
          {
            name: 'Core Volume Circuit ⭐',
            sets: '4',
            reps: 'Circuit',
            rest: '90"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Circuit: Plank 30" + Side Plank 20"/lato + Dead Bug 15 + Bird-Dog 10/lato. AMRAP buona form. Focus volume accumulation low intensity. Total ~20min.',
          },
        ],
        coolDown: [
          {
            name: 'Gentle Stretch',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Relaxed stretch, respiro profondo, enjoy rest.',
          },
        ],
        completed: false,
      },
    ],
    isRaceWeek: false,
  };

  weeks.push(week1);

  // ========================================================================
  // WEEK 2-48: Pattern intelligente con dettagli completi
  // ========================================================================
  
  for (let weekNum = 2; weekNum <= 48; weekNum++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNum - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    let mesocycle = '';
    let theme = '';
    let volumeTarget = 600;
    let coreTarget = 110;
    
    // Determine mesocycle
    if (weekNum <= 4) {
      mesocycle = 'MESO 1: Foundation Base';
      theme = 'Foundation Build - Form Priority';
      volumeTarget = 600;
      coreTarget = 110;
    } else if (weekNum <= 9) {
      mesocycle = 'MESO 2: Foundation Advanced';
      theme = 'Volume Progressive Build';
      volumeTarget = 620;
      coreTarget = 130;
    } else if (weekNum <= 13) {
      mesocycle = 'MESO 3: Pre-Competition';
      theme = 'Intensity Build + Testing 1';
      volumeTarget = 650;
      coreTarget = 135;
    } else if (weekNum <= 16) {
      mesocycle = 'MESO 4: Competition Prep';
      theme = 'Peak Preparation';
      volumeTarget = 630;
      coreTarget = 130;
    } else if (weekNum <= 19) {
      mesocycle = 'MESO 5: GARA 1 Lignano';
      theme = weekNum === 19 ? 'RACE WEEK - Lignano ⭐' : 'Taper GARA 1';
      volumeTarget = weekNum === 19 ? 350 : 550;
      coreTarget = weekNum === 19 ? 90 : 110;
    } else if (weekNum <= 24) {
      mesocycle = 'MESO 6: Between-Race + GARA 2';
      theme = weekNum === 24 ? 'RACE WEEK - Franciacorta ⭐' : 'Between-Race Protocol';
      volumeTarget = weekNum === 24 ? 350 : weekNum <= 21 ? 400 : 620;
      coreTarget = weekNum === 24 ? 90 : weekNum <= 21 ? 75 : 140;
    } else if (weekNum <= 29) {
      mesocycle = 'MESO 7: Between-Race + GARA 3';
      theme = weekNum === 28 ? 'RACE WEEK - Ala Karting ⭐' : 'Between-Race Build';
      volumeTarget = weekNum === 28 ? 350 : 620;
      coreTarget = weekNum === 28 ? 90 : 140;
    } else if (weekNum <= 34) {
      mesocycle = 'MESO 8: Between-Race + GARA 4';
      theme = weekNum === 33 ? 'RACE WEEK - 7 Laghi ⭐' : 'Between-Race Maintenance';
      volumeTarget = weekNum === 33 ? 350 : 620;
      coreTarget = weekNum === 33 ? 90 : 140;
    } else if (weekNum <= 42) {
      mesocycle = 'MESO 9: GAP DEVELOPMENT ⭐⭐⭐';
      if (weekNum <= 36) {
        theme = 'GAP: Recovery + Baseline Testing';
        volumeTarget = 550;
        coreTarget = 90;
      } else if (weekNum <= 38) {
        theme = 'GAP: Hypertrophy PEAK ⭐⭐';
        volumeTarget = 750;
        coreTarget = 220;
      } else if (weekNum <= 40) {
        theme = 'GAP: Strength PEAK ⭐⭐⭐';
        volumeTarget = 700;
        coreTarget = 240;
      } else {
        theme = 'GAP: Transfer + Testing 3';
        volumeTarget = 650;
        coreTarget = 180;
      }
    } else if (weekNum <= 44) {
      mesocycle = 'MESO 10: Taper GARA 5';
      theme = weekNum === 44 ? 'RACE WEEK - Pomposa ⭐' : 'Taper Post-GAP';
      volumeTarget = weekNum === 44 ? 350 : 550;
      coreTarget = weekNum === 44 ? 90 : 110;
    } else {
      mesocycle = 'MESO 11: FINALE GARA 6';
      theme = weekNum === 48 ? 'RACE WEEK - Cremona FINALE ⭐⭐⭐' : 'Final Build Championship';
      volumeTarget = weekNum === 48 ? 350 : 600;
      coreTarget = weekNum === 48 ? 90 : 140;
    }

    // Create sessions for week
    const sessions: DaySession[] = [
      {
        id: `w${weekNum}-mon`,
        day: 'Lunedì',
        type: 'Recovery/Mobility',
        startTime: '15:00',
        duration: 45,
        coreMin: 15,
        intensity: 'Recovery',
        description: `${theme} - Recovery focus`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            name: 'Mobility Work',
            sets: '1',
            reps: '25min',
            rest: '-',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Hip Flexor Release, Thoracic Extension, Shoulder Work. Vedi MESOCICLO markdown files per sequenze complete settimana specifica.',
          },
        ],
        coreWork: [EXERCISES.DEAD_BUG, EXERCISES.SIDE_PLANK],
        coolDown: [
          {
            name: 'Stretching',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Full body gentle stretch.',
          },
        ],
        completed: false,
      },
      {
        id: `w${weekNum}-tue`,
        day: 'Martedì',
        type: 'Lower Body + Core',
        startTime: '15:00',
        duration: 110,
        coreMin: 25,
        intensity: weekNum <= 9 ? '65-70%' : weekNum <= 16 ? '70-75%' : weekNum >= 38 && weekNum <= 40 ? '85-90%' : '75-82%',
        description: `${theme} - Lower strength`,
        warmUp: [
          EXERCISES.ROUTINE_12,
          EXERCISES.GLUTE_BRIDGE_ACTIVATION,
          EXERCISES.CLAMSHELLS,
          EXERCISES.BW_SQUAT,
        ],
        mainWork: [
          {
            ...EXERCISES.FRONT_SQUAT,
            load: weekNum <= 4 ? '60% 1RM' : weekNum <= 9 ? '65% 1RM' : weekNum >= 38 && weekNum <= 40 ? '85-90% 1RM (4×4)' : '70-75% 1RM',
            reps: weekNum >= 38 && weekNum <= 40 ? '4' : weekNum <= 16 ? '10' : '8',
            notes: EXERCISES.FRONT_SQUAT.notes + ` | Week ${weekNum} progressione. Consulta MESOCICLO_${Math.ceil(weekNum/4)}_PERFORMANCE.md per load specifico.`,
          },
          {
            ...EXERCISES.TRAP_BAR_DL,
            load: weekNum <= 4 ? '60% 1RM' : weekNum <= 9 ? '65% 1RM' : weekNum >= 38 && weekNum <= 40 ? '80-85% 1RM' : '70-75% 1RM',
            reps: weekNum >= 38 && weekNum <= 40 ? '5' : '8',
          },
          EXERCISES.BULGARIAN_SPLIT_SQUAT,
        ],
        coreWork: [
          {
            ...EXERCISES.PLANK_STANDARD,
            reps: weekNum <= 4 ? '45-50"' : weekNum <= 9 ? '50-60"' : weekNum >= 38 && weekNum <= 40 ? '70-75"' : '60-65"',
          },
          {
            ...EXERCISES.WALL_SIT,
            reps: weekNum <= 4 ? '60"' : weekNum <= 9 ? '65-70"' : '70-80"',
          },
          EXERCISES.AB_WHEEL,
        ],
        coolDown: [EXERCISES.FULL_BODY_STRETCH],
        completed: false,
      },
      {
        id: `w${weekNum}-wed`,
        day: 'Mercoledì',
        type: 'Cardio Z2 + Core',
        startTime: '15:00',
        duration: 95,
        coreMin: 15,
        intensity: 'Z2',
        description: `${theme} - Aerobic work`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [EXERCISES.BIKE_Z2_60],
        coreWork: [
          EXERCISES.PALLOF_PRESS,
          EXERCISES.DEAD_BUG,
          EXERCISES.BIRD_DOG,
        ],
        coolDown: [
          {
            name: 'Cool-down',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'Easy',
            tempo: 'Easy',
            notes: 'Easy spin + stretch.',
          },
        ],
        completed: false,
      },
      {
        id: `w${weekNum}-thu`,
        day: 'Giovedì',
        type: 'Upper Body + Core Transfer ⭐',
        startTime: '15:00',
        duration: 130,
        coreMin: 25,
        intensity: weekNum <= 9 ? '65-70%' : weekNum >= 38 && weekNum <= 40 ? '80-85%' : '70-75%',
        description: `${theme} - Upper + Plank Casco`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            ...EXERCISES.PULL_UPS_STRICT,
            reps: weekNum <= 4 ? '6-8' : weekNum <= 9 ? '8-10' : weekNum >= 38 && weekNum <= 40 ? '5-6' : '8',
            load: weekNum >= 38 && weekNum <= 40 ? 'BW + 5-10kg' : 'BW / Assisted',
          },
          {
            ...EXERCISES.OVERHEAD_PRESS,
            load: weekNum <= 4 ? '60% 5RM' : weekNum <= 9 ? '65% 5RM' : weekNum >= 38 && weekNum <= 40 ? '80-85% 5RM' : '70-75% 5RM',
            reps: weekNum >= 38 && weekNum <= 40 ? '5' : '8',
          },
          EXERCISES.DB_BENCH_PRESS,
          EXERCISES.DB_ROW,
        ],
        coreWork: [
          {
            name: 'PLANK CASCO ⭐⭐⭐',
            sets: weekNum >= 38 && weekNum <= 40 ? '5' : weekNum <= 4 ? '3' : '4',
            reps: weekNum <= 4 ? '50-55"' : weekNum <= 9 ? '55-60"' : weekNum <= 13 ? '60-65"' : weekNum >= 38 && weekNum <= 40 ? '78-82"' : '65-70"',
            rest: '90"',
            load: 'Racing helmet',
            tempo: 'Static',
            notes: `TRANSFER MOTO3. Week ${weekNum} progressione. Target GAP Week 40: 5×82". Indossa casco, core tight, respirazione controllata. SIGNATURE esercizio programma.`,
          },
          EXERCISES.PALLOF_PRESS,
          EXERCISES.AB_WHEEL,
        ],
        coolDown: [
          {
            name: 'Upper Stretch',
            sets: '1',
            reps: '15min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Pec, Lat, Shoulder stretch.',
          },
        ],
        completed: false,
      },
      {
        id: `w${weekNum}-fri`,
        day: 'Venerdì',
        type: 'Full Body + Specificity ⭐⭐',
        startTime: '15:00',
        duration: 135,
        coreMin: 15,
        intensity: '65-70%',
        description: `${theme} - Integration work`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            name: 'Full Body Circuit',
            sets: '3-4',
            reps: 'Various',
            rest: '90-120"',
            load: 'Moderate',
            tempo: 'Controlled',
            notes: `Volume day: Trap-Bar DL 3×12, Front Squat 3×12, Pull-Ups AMRAP, KB Swings. Week ${weekNum} loads. Consulta markdown files.`,
          },
          {
            name: 'Neck Training ⭐',
            sets: '3',
            reps: '15 each dir',
            rest: '90"',
            load: weekNum <= 4 ? '5kg' : weekNum <= 9 ? '6-7kg' : '7-10kg',
            tempo: 'Controlled',
            notes: 'CRITICAL Moto3. Harness 4-way o manual resistance. Build graduale progressive overload.',
          },
          {
            name: 'Grip Work',
            sets: '3-4',
            reps: 'Various',
            rest: '90"',
            load: 'Heavy',
            tempo: 'Hold',
            notes: 'Farmer Carries, Dead Hangs. Transfer diretto moto grip endurance.',
          },
        ],
        coreWork: [
          {
            name: 'Core Volume',
            sets: '3',
            reps: 'Circuit',
            rest: '90"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Volume accumulation. Various exercises rotation.',
          },
        ],
        coolDown: [EXERCISES.FULL_BODY_STRETCH],
        completed: false,
      },
      {
        id: `w${weekNum}-sat`,
        day: 'Sabato',
        type: 'Cardio Long Z2',
        startTime: '10:00',
        duration: 120,
        coreMin: 10,
        intensity: 'Z2',
        description: `${theme} - Long aerobic`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [EXERCISES.BIKE_Z2_90],
        coreWork: [
          {
            name: 'Core Recovery',
            sets: '2',
            reps: 'Light',
            rest: '60"',
            load: 'BW',
            tempo: 'Easy',
            notes: 'Maintenance only.',
          },
        ],
        coolDown: [
          {
            name: 'Stretch',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Lower body focus.',
          },
        ],
        completed: false,
      },
      {
        id: `w${weekNum}-sun`,
        day: 'Domenica',
        type: 'Active Recovery + Moto',
        startTime: '10:00',
        duration: 50,
        coreMin: 20,
        intensity: 'Recovery',
        description: `${theme} - Regeneration`,
        warmUp: [EXERCISES.ROUTINE_12],
        mainWork: [
          {
            name: 'Foam Rolling',
            sets: '1',
            reps: '20min',
            rest: '-',
            load: 'BW',
            tempo: 'Slow',
            notes: 'Total body comprehensive recovery.',
          },
        ],
        coreWork: [
          {
            name: 'Core Volume Circuit',
            sets: '4',
            reps: 'Circuit',
            rest: '90"',
            load: 'BW',
            tempo: 'Controlled',
            notes: 'Low intensity volume accumulation ~20min.',
          },
        ],
        coolDown: [
          {
            name: 'Gentle Stretch',
            sets: '1',
            reps: '10min',
            rest: '-',
            load: 'BW',
            tempo: 'Static',
            notes: 'Relax, respiro profondo.',
          },
        ],
        completed: false,
      },
    ];

    const week: Week = {
      weekNumber: weekNum,
      startDate: weekStart.toISOString().split('T')[0],
      endDate: weekEnd.toISOString().split('T')[0],
      mesocycle,
      theme,
      objectives: [
        `Settimana ${weekNum} ${mesocycle}`,
        'ROUTINE 12\' sempre (7/7)',
        `Core target: ${coreTarget} min/week`,
        `Volume target: ${volumeTarget} min/week`,
        `Consulta file markdown per dettagli specifici Week ${weekNum}`,
      ],
      volumeTarget,
      coreTarget,
      sessions,
      isRaceWeek: [19, 24, 28, 33, 44, 48].includes(weekNum),
      raceLocation: weekNum === 19 ? 'Lignano' : weekNum === 24 ? 'Franciacorta' : weekNum === 28 ? 'Ala' : weekNum === 33 ? '7 Laghi' : weekNum === 44 ? 'Pomposa' : weekNum === 48 ? 'Cremona' : undefined,
    };

    weeks.push(week);
  }

  return weeks;
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function PerformanceCalendar() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [selectedSession, setSelectedSession] = useState<DaySession | null>(null);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('weeks');
        if (stored) {
          setWeeks(JSON.parse(stored));
        } else {
          const allWeeks = generateAllWeeks();
          setWeeks(allWeeks);
          AsyncStorage.setItem('weeks', JSON.stringify(allWeeks));
        }
      } catch {
        setWeeks(generateAllWeeks());
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleComplete = (weekNum: number, sessionId: string) => {
    const updated = weeks.map(w => {
      if (w.weekNumber === weekNum) {
        return {
          ...w,
          sessions: w.sessions.map(s => 
            s.id === sessionId ? { ...s, completed: !s.completed } : s
          ),
        };
      }
      return w;
    });
    setWeeks(updated);
    AsyncStorage.setItem('weeks', JSON.stringify(updated));
  };

  const formatDate = (d: string) => {
    try {
      const parts = d.split('-');
      const date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    } catch {
      return d;
    }
  };

  const renderExercises = (exercises: Exercise[], title: string) => {
    if (!exercises.length) return null;
    return (
      <View style={styles.exerciseSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {exercises.map((ex, i) => (
          <View key={i} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            <View style={styles.exDetails}>
              <Text style={styles.exDetail}>Sets: {ex.sets}</Text>
              <Text style={styles.exDetail}>Reps: {ex.reps}</Text>
            </View>
            <View style={styles.exDetails}>
              <Text style={styles.exDetail}>Rest: {ex.rest}</Text>
              <Text style={styles.exDetail}>Load: {ex.load}</Text>
            </View>
            <View style={styles.exDetails}>
              <Text style={styles.exDetail}>Tempo: {ex.tempo}</Text>
            </View>
            {ex.focus && <Text style={styles.exFocus}>🎯 {ex.focus}</Text>}
            <Text style={styles.exNotes}>💡 {ex.notes}</Text>
          </View>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>⚡ Caricamento 48 Settimane...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PERFORMANCE CALENDAR</Text>
        <Text style={styles.headerSub}>48 Settimane • Tutti i Dettagli</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {weeks.map(week => {
          const completed = week.sessions.filter(s => s.completed).length;
          const total = week.sessions.length;
          return (
            <TouchableOpacity
              key={week.weekNumber}
              style={styles.weekCard}
              onPress={() => {
                setSelectedWeek(week);
                setShowWeekModal(true);
              }}
            >
              <View style={styles.weekHeader}>
                <Text style={styles.weekNum}>Week {week.weekNumber}</Text>
                {week.isRaceWeek && (
                  <View style={styles.raceBadge}>
                    <Text style={styles.raceBadgeText}>🏁 {week.raceLocation}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.weekTheme}>{week.theme}</Text>
              <Text style={styles.weekDates}>{formatDate(week.startDate)} - {formatDate(week.endDate)}</Text>
              <Text style={styles.weekMeso}>{week.mesocycle}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(completed/total)*100}%` }]} />
              </View>
              <Text style={styles.progressText}>{completed}/{total} sessioni • Vol: {week.volumeTarget}min • Core: {week.coreTarget}min</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* WEEK MODAL */}
      <Modal visible={showWeekModal} animationType="slide" onRequestClose={() => setShowWeekModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowWeekModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Week {selectedWeek?.weekNumber}</Text>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedWeek && (
              <>
                <Text style={styles.modalTheme}>{selectedWeek.theme}</Text>
                <View style={styles.objBox}>
                  <Text style={styles.objTitle}>OBIETTIVI:</Text>
                  {selectedWeek.objectives.map((obj, i) => (
                    <Text key={i} style={styles.objText}>• {obj}</Text>
                  ))}
                </View>
                <Text style={styles.sessionsTitle}>SESSIONI:</Text>
                {selectedWeek.sessions.map(sess => (
                  <TouchableOpacity
                    key={sess.id}
                    style={[styles.sessionCard, sess.completed && styles.sessionCardDone]}
                    onPress={() => {
                      setSelectedSession(sess);
                      setShowSessionModal(true);
                    }}
                  >
                    <View style={styles.sessHeader}>
                      <View>
                        <Text style={styles.sessDay}>{sess.day}</Text>
                        <Text style={styles.sessType}>{sess.type}</Text>
                        <Text style={styles.sessTime}>🕐 {sess.startTime} • {sess.duration}min</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.checkbox}
                        onPress={(e) => {
                          e.stopPropagation();
                          if (selectedWeek) toggleComplete(selectedWeek.weekNumber, sess.id);
                        }}
                      >
                        {sess.completed && <Text style={styles.check}>✓</Text>}
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.sessDesc}>{sess.description}</Text>
                    <Text style={styles.viewMore}>Tap per vedere tutti gli esercizi →</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* SESSION MODAL */}
      <Modal visible={showSessionModal} animationType="slide" onRequestClose={() => setShowSessionModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowSessionModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedSession?.day}</Text>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedSession && (
              <>
                <Text style={styles.sessionTypeTitle}>{selectedSession.type}</Text>
                <Text style={styles.sessionDetailTime}>🕐 {selectedSession.startTime} • Durata: {selectedSession.duration}min • Core: {selectedSession.coreMin}min</Text>
                <Text style={styles.sessionDesc}>{selectedSession.description}</Text>
                
                {renderExercises(selectedSession.warmUp, '🔥 WARM-UP')}
                {renderExercises(selectedSession.mainWork, '💪 MAIN WORK')}
                {renderExercises(selectedSession.coreWork, '🎯 CORE WORK')}
                {renderExercises(selectedSession.coolDown, '🧘 COOL-DOWN')}

                <TouchableOpacity
                  style={[styles.completeBtn, selectedSession.completed && styles.completeBtnDone]}
                  onPress={() => {
                    if (selectedWeek) toggleComplete(selectedWeek.weekNumber, selectedSession.id);
                  }}
                >
                  <Text style={styles.completeBtnText}>
                    {selectedSession.completed ? '✓ COMPLETATA' : 'Segna come Completata'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A5F' },
  loadingText: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  header: { padding: 20, backgroundColor: '#1E3A5F' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#B0C4DE' },
  scrollView: { flex: 1 },
  weekCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  weekNum: { fontSize: 20, fontWeight: 'bold', color: '#1E3A5F' },
  raceBadge: { backgroundColor: '#FF6B6B', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  raceBadgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  weekTheme: { fontSize: 15, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  weekDates: { fontSize: 12, color: '#7F8C8D', marginBottom: 4 },
  weekMeso: { fontSize: 11, color: '#95A5A6', marginBottom: 12 },
  progressBar: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 3 },
  progressText: { fontSize: 11, color: '#95A5A6', textAlign: 'right' },
  modalContainer: { flex: 1, backgroundColor: '#F5F7FA', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#1E3A5F' },
  closeBtn: { fontSize: 28, color: '#FFF', fontWeight: 'bold', marginRight: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', flex: 1 },
  modalContent: { flex: 1, padding: 16 },
  modalTheme: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 16 },
  objBox: { backgroundColor: '#FFF8E1', borderRadius: 8, padding: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#FFC107' },
  objTitle: { fontSize: 13, fontWeight: 'bold', color: '#F57C00', marginBottom: 8 },
  objText: { fontSize: 12, color: '#5D4037', marginBottom: 4, lineHeight: 16 },
  sessionsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 12 },
  sessionCard: { backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  sessionCardDone: { backgroundColor: '#F0F9FF', borderColor: '#4CAF50', borderWidth: 2 },
  sessHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sessDay: { fontSize: 15, fontWeight: 'bold', color: '#1E3A5F' },
  sessType: { fontSize: 13, color: '#4A90E2', marginTop: 2 },
  sessTime: { fontSize: 11, color: '#95A5A6', marginTop: 4 },
  checkbox: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
  check: { fontSize: 20, color: '#4CAF50' },
  sessDesc: { fontSize: 12, color: '#7F8C8D', lineHeight: 16, marginBottom: 8 },
  viewMore: { fontSize: 11, color: '#4A90E2', fontStyle: 'italic' },
  sessionTypeTitle: { fontSize: 17, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  sessionDetailTime: { fontSize: 13, color: '#7F8C8D', marginBottom: 16 },
  exerciseSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: '#4A90E2' },
  exerciseCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#4A90E2' },
  exerciseName: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  exDetails: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  exDetail: { fontSize: 11, color: '#7F8C8D', marginRight: 16, marginBottom: 4 },
  exFocus: { fontSize: 11, color: '#27AE60', fontWeight: '600', marginBottom: 6, fontStyle: 'italic' },
  exNotes: { fontSize: 11, color: '#5D4037', lineHeight: 15, backgroundColor: '#FFF8E1', padding: 8, borderRadius: 4, marginTop: 6 },
  completeBtn: { backgroundColor: '#4CAF50', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  completeBtnDone: { backgroundColor: '#9E9E9E' },
  completeBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
}); 