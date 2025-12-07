import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface WorkoutSession {
  id: string;
  day: string;
  type: string;
  duration: number; // minuti
  coreMin: number;
  intensity: string; // es: "75%", "80-82%", "touch only"
  description: string;
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

interface Week {
  weekNumber: number;
  startDate: string; // formato: "YYYY-MM-DD"
  endDate: string;
  theme: string;
  volumeTarget: number; // minuti totali
  coreTarget: number; // minuti core
  intensityRange: string;
  objectives: string[];
  sessions: WorkoutSession[];
  isRaceWeek: boolean;
  raceDate?: string;
  raceLocation?: string;
  weeklyReview?: {
    volumeActual: number;
    coreActual: number;
    bodyWeight: number;
    hrvAverage: number;
    plankCascoBest: string; // es: "4×65""
    energyLevel: number; // 1-10
    sleepAverage: number; // ore
    fatigueLevel: number; // 1-10
    confidenceLevel: number; // 1-10
    notes: string;
  };
}

interface Mesocycle {
  id: number;
  name: string;
  weeks: number[];
  phase: string;
  description: string;
  fileReference: string;
  color: string;
}

interface ProgressData {
  testingSession: number;
  date: string;
  plankCasco: string;
  frontSquat: string;
  trapBarDL: string;
  pullUps: number;
  boxJump: number;
  broadJump: number;
  rsaSprint: string;
}

// ============================================================================
// DATI PROGRAMMA COMPLETO
// ============================================================================

const MESOCYCLES: Mesocycle[] = [
  {
    id: 1,
    name: 'MESO 1: Foundation Base',
    weeks: [1, 2, 3, 4, 5],
    phase: 'Foundation',
    description: 'Costruzione base anatomica, adattamento, capacità lavoro',
    fileReference: 'MESOCICLO_1_PARTE_1-2_SETT1-5',
    color: '#4A90E2',
  },
  {
    id: 2,
    name: 'MESO 2: Foundation Advanced',
    weeks: [6, 7, 8, 9],
    phase: 'Foundation',
    description: 'Espansione capacità, volume progressivo, strength introduction',
    fileReference: 'MESOCICLO_2_PARTE_1-2_SETT6-9',
    color: '#5BA3E2',
  },
  {
    id: 3,
    name: 'MESO 3: Pre-Competition',
    weeks: [10, 11, 12, 13],
    phase: 'Pre-Competition',
    description: 'Intensità aumentata, Testing 1, transfer exercises, racing prep',
    fileReference: 'MESOCICLO_3_PARTE_1-2_SETT10-13',
    color: '#7CB342',
  },
  {
    id: 4,
    name: 'MESO 4: Competition Prep',
    weeks: [14, 15, 16],
    phase: 'Pre-Competition',
    description: 'Peak preparation, specificity massima, sharpness',
    fileReference: 'MESOCICLO_4_SETT14-16',
    color: '#8BC34A',
  },
  {
    id: 5,
    name: 'MESO 5: GARA 1 Lignano',
    weeks: [17, 18, 19],
    phase: 'Competition',
    description: 'Taper, Race Week, PRIMA GARA 17-19 Aprile',
    fileReference: 'MESOCICLO_5_TAPER_GARA1_SETT17-19',
    color: '#FF6B6B',
  },
  {
    id: 6,
    name: 'MESO 6: Between-Race + GARA 2',
    weeks: [20, 21, 22, 23, 24],
    phase: 'Competition',
    description: 'Recovery → Mini-Peak → GARA 2 Franciacorta 22-24 Maggio',
    fileReference: 'MESOCICLO_6_PARTE_1-2_GARA2_SETT20-24',
    color: '#FF8A65',
  },
  {
    id: 7,
    name: 'MESO 7: Between-Race + GARA 3',
    weeks: [25, 26, 27, 28, 29],
    phase: 'Competition',
    description: 'Recovery → Mini-Peak → GARA 3 Ala Karting 19-21 Giugno',
    fileReference: 'MESOCICLO_7_PARTE_1-2_GARA3_SETT25-29',
    color: '#FFA726',
  },
  {
    id: 8,
    name: 'MESO 8: Between-Race + GARA 4',
    weeks: [30, 31, 32, 33, 34],
    phase: 'Competition',
    description: 'Recovery → Mini-Peak → GARA 4 7 Laghi 17-19 Luglio',
    fileReference: 'MESOCICLO_8_PARTE_1-2_GARA4_SETT30-34',
    color: '#FFB74D',
  },
  {
    id: 9,
    name: 'MESO 9: GAP DEVELOPMENT ⭐⭐⭐',
    weeks: [35, 36, 37, 38, 39, 40, 41, 42],
    phase: 'GAP Development',
    description: '8 settimane CRITICHE: Hypertrophy → Strength PEAK → Testing 3',
    fileReference: 'GAP_PARTE_1-2-3-4_SETT35-42',
    color: '#9C27B0',
  },
  {
    id: 10,
    name: 'MESO 10: Taper GARA 5',
    weeks: [43, 44],
    phase: 'Competition',
    description: 'Taper Post-GAP → GARA 5 Pomposa 11-13 Settembre',
    fileReference: 'MESOCICLO_10_TAPER_GARA5_SETT43-44',
    color: '#E91E63',
  },
  {
    id: 11,
    name: 'MESO 11: FINALE GARA 6',
    weeks: [45, 46, 47, 48],
    phase: 'Competition Finale',
    description: 'Recovery → Mini-Peak → GARA 6 Cremona 16-18 Ottobre ⭐⭐⭐',
    fileReference: 'MESOCICLO_11_FINAL_RACE_GARA6_SETT45-48',
    color: '#D32F2F',
  },
];

const RACES = [
  {
    id: 1,
    name: 'GARA 1: Lignano Circuit',
    date: '2026-04-19',
    week: 19,
    location: 'Lignano',
  },
  {
    id: 2,
    name: 'GARA 2: Franciacorta Kartodromo',
    date: '2026-05-24',
    week: 24,
    location: 'Franciacorta',
  },
  {
    id: 3,
    name: 'GARA 3: Ala Karting',
    date: '2026-06-21',
    week: 28,
    location: 'Ala',
  },
  {
    id: 4,
    name: 'GARA 4: 7 Laghi',
    date: '2026-07-19',
    week: 33,
    location: '7 Laghi',
  },
  {
    id: 5,
    name: 'GARA 5: Pomposa Motodromo',
    date: '2026-10-12',
    week: 44,
    location: 'Pomposa',
  },
  {
    id: 6,
    name: 'GARA 6: Cremona Kartodromo FINALE',
    date: '2026-11-17',
    week: 48,
    location: 'Cremona',
  },
];

// Funzione per generare le 48 settimane con date reali
const generateWeeks = (): Week[] => {
  const weeks: Week[] = [];
  const startDate = new Date('2025-12-01'); // 1 Dicembre 2025

  // Week templates per diversi tipi
  const weekTemplates = {
    foundation: (weekNum: number, start: string, end: string): Week => ({
      weekNumber: weekNum,
      startDate: start,
      endDate: end,
      theme: 'Foundation Build',
      volumeTarget: 350 + (weekNum * 15), // Progressivo
      coreTarget: 75 + (weekNum * 5),
      intensityRange: '70-75%',
      objectives: [
        'ROUTINE 12\' ogni sessione',
        'Form perfetta sempre',
        'Progressive overload conservativo',
        'HRV monitoring daily',
      ],
      sessions: [
        {
          id: `w${weekNum}-mon`,
          day: 'Lunedì',
          type: 'Lower + Core',
          duration: 75,
          coreMin: 15,
          intensity: '70%',
          description: 'ROUTINE 12\' + Lower strength + Core foundation',
          completed: false,
        },
        {
          id: `w${weekNum}-tue`,
          day: 'Martedì',
          type: 'Cardio Z2',
          duration: 60,
          coreMin: 0,
          intensity: 'Z2',
          description: 'Ciclismo Z2 recovery + Mobility',
          completed: false,
        },
        {
          id: `w${weekNum}-wed`,
          day: 'Mercoledì',
          type: 'Upper + Core',
          duration: 70,
          coreMin: 15,
          intensity: '70%',
          description: 'ROUTINE 12\' + Upper strength + Core transfer',
          completed: false,
        },
        {
          id: `w${weekNum}-thu`,
          day: 'Giovedì',
          type: 'HIIT + Core',
          duration: 55,
          coreMin: 15,
          intensity: '85%',
          description: 'ROUTINE 12\' + HIIT intervals + Core plank casco',
          completed: false,
        },
        {
          id: `w${weekNum}-fri`,
          day: 'Venerdì',
          type: 'Full Body + Core',
          duration: 90,
          coreMin: 20,
          intensity: '75%',
          description: 'ROUTINE 12\' + Full body circuit + Extended core',
          completed: false,
        },
        {
          id: `w${weekNum}-sat`,
          day: 'Sabato',
          type: 'Active Recovery',
          duration: 45,
          coreMin: 10,
          intensity: 'Recovery',
          description: 'Mobility + Stretching + Core light',
          completed: false,
        },
      ],
      isRaceWeek: false,
    }),

    competition: (weekNum: number, start: string, end: string): Week => ({
      weekNumber: weekNum,
      startDate: start,
      endDate: end,
      theme: 'Competition Maintenance',
      volumeTarget: 600,
      coreTarget: 140,
      intensityRange: '80-82%',
      objectives: [
        'Maintain capacity',
        'Quality over quantity',
        'Race-specific exercises',
        'Recovery optimization',
      ],
      sessions: [
        {
          id: `w${weekNum}-mon`,
          day: 'Lunedì',
          type: 'Lower + PAP',
          duration: 85,
          coreMin: 20,
          intensity: '82%',
          description: 'ROUTINE 12\' + PAP Front Squat → Box Jump + Core transfer',
          completed: false,
        },
        {
          id: `w${weekNum}-tue`,
          day: 'Martedì',
          type: 'Core Transfer',
          duration: 70,
          coreMin: 40,
          intensity: '80%',
          description: 'Core-focused: Plank casco 4×70"+ + Transfer exercises',
          completed: false,
        },
        {
          id: `w${weekNum}-wed`,
          day: 'Mercoledì',
          type: 'Upper + Power',
          duration: 75,
          coreMin: 15,
          intensity: '82%',
          description: 'ROUTINE 12\' + Upper strength + Explosive upper',
          completed: false,
        },
        {
          id: `w${weekNum}-thu`,
          day: 'Giovedì',
          type: 'RSA + Core',
          duration: 65,
          coreMin: 20,
          intensity: '88%',
          description: 'RSA 6×30" + Recovery + Core endurance',
          completed: false,
        },
        {
          id: `w${weekNum}-fri`,
          day: 'Venerdì',
          type: 'Full Body Quality',
          duration: 95,
          coreMin: 25,
          intensity: '80%',
          description: 'Full body circuit quality + Extended core battery',
          completed: false,
        },
        {
          id: `w${weekNum}-sat`,
          day: 'Sabato',
          type: 'Recovery',
          duration: 50,
          coreMin: 20,
          intensity: 'Light',
          description: 'Active recovery + Core maintenance',
          completed: false,
        },
      ],
      isRaceWeek: false,
    }),

    gap: (weekNum: number, start: string, end: string, phase: string): Week => {
      const isHypertrophy = weekNum >= 37 && weekNum <= 38;
      const isStrength = weekNum >= 39 && weekNum <= 40;

      return {
        weekNumber: weekNum,
        startDate: start,
        endDate: end,
        theme: isHypertrophy
          ? 'GAP Hypertrophy PEAK'
          : isStrength
          ? 'GAP Strength PEAK ⭐⭐⭐'
          : 'GAP Development',
        volumeTarget: isHypertrophy ? 750 : isStrength ? 700 : 650,
        coreTarget: isHypertrophy ? 220 : isStrength ? 240 : 180,
        intensityRange: isHypertrophy ? '72-75%' : isStrength ? '85-90%' : '75-82%',
        objectives: isStrength
          ? [
              'PEAK strength demonstration',
              'Core 240 min = MAXIMUM',
              'Plank casco 5×80-82" target',
              'RSA 8×35" capability',
              'Perfect form sempre',
            ]
          : isHypertrophy
          ? [
              'Volume PEAK 750 min',
              'Muscle building focus',
              'Work capacity expansion',
              '8-12 reps, 3-4" eccentric',
            ]
          : [
              'Progressive GAP build',
              'Quality emphasis',
              'Recovery optimization',
              'Adaptation monitoring',
            ],
        sessions: [
          {
            id: `w${weekNum}-mon`,
            day: 'Lunedì',
            type: isStrength ? 'Lower PEAK' : 'Lower Volume',
            duration: isStrength ? 95 : 110,
            coreMin: isStrength ? 40 : 35,
            intensity: isStrength ? '85-90%' : '75%',
            description: isStrength
              ? 'FS 4×4 @85-90%, PAP peak, Core PEAK session'
              : 'Volume focus, 4×10 exercises, tempo control',
            completed: false,
          },
          {
            id: `w${weekNum}-tue`,
            day: 'Martedì',
            type: isStrength ? 'Core Transfer PEAK' : 'Core Volume',
            duration: isStrength ? 85 : 95,
            coreMin: isStrength ? 50 : 45,
            intensity: isStrength ? '88%' : '75%',
            description: isStrength
              ? 'Plank casco 5×78-80", full core battery peak'
              : 'High volume core, endurance focus',
            completed: false,
          },
          {
            id: `w${weekNum}-wed`,
            day: 'Mercoledì',
            type: 'Upper + Power',
            duration: isStrength ? 90 : 100,
            coreMin: isStrength ? 30 : 30,
            intensity: isStrength ? '85%' : '75%',
            description: isStrength
              ? 'Upper strength peak + Explosive movements'
              : 'Upper volume + Power development',
            completed: false,
          },
          {
            id: `w${weekNum}-thu`,
            day: 'Giovedì',
            type: isStrength ? 'RSA PEAK' : 'Cardio + Core',
            duration: isStrength ? 70 : 85,
            coreMin: isStrength ? 35 : 30,
            intensity: isStrength ? '90%' : '80%',
            description: isStrength
              ? 'RSA 8×35" demonstration + Core'
              : 'HIIT intervals + Core work',
            completed: false,
          },
          {
            id: `w${weekNum}-fri`,
            day: 'Venerdì',
            type: 'Full Body',
            duration: isStrength ? 100 : 115,
            coreMin: isStrength ? 40 : 40,
            intensity: isStrength ? '82%' : '75%',
            description: isStrength
              ? 'Quality full body + Extended core'
              : 'Volume full body circuit',
            completed: false,
          },
          {
            id: `w${weekNum}-sat`,
            day: 'Sabato',
            type: 'Recovery + Core',
            duration: 60,
            coreMin: isStrength ? 45 : 35,
            intensity: 'Light',
            description: isStrength
              ? 'Active recovery + Core maintenance capacity'
              : 'Recovery + Core light work',
            completed: false,
          },
        ],
        isRaceWeek: false,
      };
    },

    raceWeek: (weekNum: number, start: string, end: string, race: any): Week => ({
      weekNumber: weekNum,
      startDate: start,
      endDate: end,
      theme: `RACE WEEK - ${race.location}`,
      volumeTarget: 350,
      coreTarget: 90,
      intensityRange: 'Touch only',
      objectives: [
        'Sharpness maintenance',
        'Fatigue minimization',
        'Pre-race activation perfect',
        'Confidence peak',
      ],
      sessions: [
        {
          id: `w${weekNum}-mon`,
          day: 'Lunedì',
          type: 'Light Activation',
          duration: 50,
          coreMin: 15,
          intensity: 'Touch',
          description: 'ROUTINE 12\' + Light movements + Core touch',
          completed: false,
        },
        {
          id: `w${weekNum}-tue`,
          day: 'Martedì',
          type: 'Activation + Mobility',
          duration: 45,
          coreMin: 15,
          intensity: 'Touch',
          description: 'Movement quality + Mobility + Core light',
          completed: false,
        },
        {
          id: `w${weekNum}-wed`,
          day: 'Mercoledì',
          type: 'Pre-Race Touch',
          duration: 40,
          coreMin: 10,
          intensity: 'Touch',
          description: 'Singles/doubles quality + Core touch',
          completed: false,
        },
        {
          id: `w${weekNum}-thu`,
          day: 'Giovedì',
          type: 'Travel + Practice',
          duration: 30,
          coreMin: 10,
          intensity: 'Very Light',
          description: 'Travel day, light mobility, walk-through protocol',
          completed: false,
        },
        {
          id: `w${weekNum}-fri`,
          day: 'Venerdì',
          type: 'Practice Sessions',
          duration: 60,
          coreMin: 15,
          intensity: 'Practice',
          description: 'Track sessions, bike setup, brief activation',
          completed: false,
        },
        {
          id: `w${weekNum}-sat`,
          day: 'Sabato',
          type: 'Free Practice + Eve',
          duration: 45,
          coreMin: 10,
          intensity: 'Light',
          description: 'Morning practice, race eve protocol, sleep priority',
          completed: false,
        },
        {
          id: `w${weekNum}-sun`,
          day: 'Domenica',
          type: 'RACE DAY ⭐⭐⭐',
          duration: 80,
          coreMin: 25,
          intensity: 'RACE',
          description: 'Pre-race activation 30-40\' + RACE + Cool-down + Recovery',
          completed: false,
        },
      ],
      isRaceWeek: true,
      raceDate: race.date,
      raceLocation: race.location,
    }),

    recovery: (weekNum: number, start: string, end: string): Week => ({
      weekNumber: weekNum,
      startDate: start,
      endDate: end,
      theme: 'Recovery Post-Race',
      volumeTarget: 350,
      coreTarget: 75,
      intensityRange: 'Recovery',
      objectives: [
        'Complete rest priorità',
        'Tissue repair',
        'Mental reset',
        'Enjoy rest - earned it',
      ],
      sessions: [
        {
          id: `w${weekNum}-mon`,
          day: 'Lunedì',
          type: 'RIPOSO COMPLETO',
          duration: 0,
          coreMin: 0,
          intensity: 'OFF',
          description: 'Zero training. Sleep, eat, enjoy.',
          completed: false,
        },
        {
          id: `w${weekNum}-tue`,
          day: 'Martedì',
          type: 'RIPOSO COMPLETO',
          duration: 0,
          coreMin: 0,
          intensity: 'OFF',
          description: 'Zero training. Recovery priority.',
          completed: false,
        },
        {
          id: `w${weekNum}-wed`,
          day: 'Mercoledì',
          type: 'Walk + Stretch',
          duration: 30,
          coreMin: 0,
          intensity: 'Very Light',
          description: '20\' walk easy + 10\' stretching gentle',
          completed: false,
        },
        {
          id: `w${weekNum}-thu`,
          day: 'Giovedì',
          type: 'Active Recovery',
          duration: 45,
          coreMin: 10,
          intensity: 'Recovery',
          description: 'Mobility + Foam rolling + Core light touch',
          completed: false,
        },
        {
          id: `w${weekNum}-fri`,
          day: 'Venerdì',
          type: 'Z2 Easy',
          duration: 50,
          coreMin: 15,
          intensity: 'Z2',
          description: 'Easy cycling Z2 + Core gentle',
          completed: false,
        },
        {
          id: `w${weekNum}-sat`,
          day: 'Sabato',
          type: 'Light Movement',
          duration: 60,
          coreMin: 15,
          intensity: 'Light',
          description: 'ROUTINE 12\' + Light movements + Core foundation',
          completed: false,
        },
      ],
      isRaceWeek: false,
    }),
  };

  // Genera le 48 settimane
  for (let weekNum = 1; weekNum <= 48; weekNum++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNum - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toISOString().split('T')[0];
    const endStr = weekEnd.toISOString().split('T')[0];

    // Determina il tipo di settimana
    const race = RACES.find((r) => r.week === weekNum);
    const isRecovery = RACES.some((r) => r.week === weekNum - 1);
    const isGAP = weekNum >= 35 && weekNum <= 42;

    let week: Week;

    if (race) {
      week = weekTemplates.raceWeek(weekNum, startStr, endStr, race);
    } else if (isRecovery) {
      week = weekTemplates.recovery(weekNum, startStr, endStr);
    } else if (isGAP) {
      const gapPhase =
        weekNum >= 39 && weekNum <= 40
          ? 'strength'
          : weekNum >= 37 && weekNum <= 38
          ? 'hypertrophy'
          : 'base';
      week = weekTemplates.gap(weekNum, startStr, endStr, gapPhase);
    } else if (weekNum >= 20) {
      week = weekTemplates.competition(weekNum, startStr, endStr);
    } else {
      week = weekTemplates.foundation(weekNum, startStr, endStr);
    }

    weeks.push(week);
  }

  return weeks;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PerformanceCalendar() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedMeso, setSelectedMeso] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [showWeekDetail, setShowWeekDetail] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'mesocycles' | 'progress'>(
    'overview'
  );

  // Progress tracking state
  const [progressData, setProgressData] = useState<ProgressData[]>([
    {
      testingSession: 0,
      date: '2025-12-01',
      plankCasco: '3×50"',
      frontSquat: '~40kg',
      trapBarDL: '~80kg',
      pullUps: 6,
      boxJump: 50,
      broadJump: 180,
      rsaSprint: '4×20" baseline',
    },
  ]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load weeks
      const storedWeeks = await AsyncStorage.getItem('weeks');
      if (storedWeeks) {
        setWeeks(JSON.parse(storedWeeks));
      } else {
        const initialWeeks = generateWeeks();
        setWeeks(initialWeeks);
        await AsyncStorage.setItem('weeks', JSON.stringify(initialWeeks));
      }

      // Load progress
      const storedProgress = await AsyncStorage.getItem('progress');
      if (storedProgress) {
        setProgressData(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to generated data
      setWeeks(generateWeeks());
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('weeks', JSON.stringify(weeks));
      await AsyncStorage.setItem('progress', JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Toggle session completion
  const toggleSessionComplete = (weekNum: number, sessionId: string) => {
    const updatedWeeks = weeks.map((week) => {
      if (week.weekNumber === weekNum) {
        return {
          ...week,
          sessions: week.sessions.map((session) => {
            if (session.id === sessionId) {
              return {
                ...session,
                completed: !session.completed,
                completedDate: !session.completed
                  ? new Date().toISOString().split('T')[0]
                  : undefined,
              };
            }
            return session;
          }),
        };
      }
      return week;
    });
    setWeeks(updatedWeeks);
    saveData();
  };

  // Calculate stats
  const calculateStats = () => {
    const totalSessions = weeks.reduce((acc, week) => acc + week.sessions.length, 0);
    const completedSessions = weeks.reduce(
      (acc, week) => acc + week.sessions.filter((s) => s.completed).length,
      0
    );
    const completedWeeks = weeks.filter(
      (week) => week.sessions.every((s) => s.completed)
    ).length;
    const currentWeek =
      weeks.find((w) => {
        const today = new Date();
        const start = new Date(w.startDate);
        const end = new Date(w.endDate);
        return today >= start && today <= end;
      })?.weekNumber || 1;

    const totalVolumeCompleted = weeks.reduce((acc, week) => {
      return (
        acc +
        week.sessions
          .filter((s) => s.completed)
          .reduce((sum, s) => sum + s.duration, 0)
      );
    }, 0);

    const totalCoreCompleted = weeks.reduce((acc, week) => {
      return (
        acc +
        week.sessions.filter((s) => s.completed).reduce((sum, s) => sum + s.coreMin, 0)
      );
    }, 0);

    const racesCompleted = RACES.filter((race) => {
      const raceWeek = weeks.find((w) => w.weekNumber === race.week);
      return raceWeek?.sessions.some((s) => s.type.includes('RACE') && s.completed);
    }).length;

    return {
      totalSessions,
      completedSessions,
      completedWeeks,
      currentWeek,
      adherenceRate:
        totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(1) : '0',
      totalVolumeCompleted,
      totalCoreCompleted,
      racesCompleted,
    };
  };

  const stats = calculateStats();

  // ============================================================================
  // RENDER: Overview Screen
  // ============================================================================

  const renderOverview = () => {
    const currentWeek = weeks[stats.currentWeek - 1];
    const currentMeso = MESOCYCLES.find((m) =>
      m.weeks.includes(stats.currentWeek)
    );

    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PERFORMANCE CALENDAR</Text>
          <Text style={styles.headerSubtitle}>Moto3 Season 2026 - 48 Settimane</Text>
        </View>

        {/* Current Week Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>SETTIMANA CORRENTE</Text>
            <View
              style={[
                styles.badge,
                { backgroundColor: currentMeso?.color || '#4A90E2' },
              ]}
            >
              <Text style={styles.badgeText}>Week {stats.currentWeek}</Text>
            </View>
          </View>
          {currentWeek && (
            <>
              <Text style={styles.weekTheme}>{currentWeek.theme}</Text>
              <Text style={styles.weekDates}>
                {formatDate(currentWeek.startDate)} - {formatDate(currentWeek.endDate)}
              </Text>

              {currentWeek.isRaceWeek && (
                <View style={styles.raceAlert}>
                  <Text style={styles.raceAlertText}>
                    🏁 RACE WEEK - {currentWeek.raceLocation}
                  </Text>
                </View>
              )}

              <View style={styles.weekTargets}>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Volume Target</Text>
                  <Text style={styles.targetValue}>
                    {currentWeek.volumeTarget} min
                  </Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Core Target</Text>
                  <Text style={styles.targetValue}>{currentWeek.coreTarget} min</Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Intensity</Text>
                  <Text style={styles.targetValue}>
                    {currentWeek.intensityRange}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  setSelectedWeek(currentWeek);
                  setShowWeekDetail(true);
                }}
              >
                <Text style={styles.primaryButtonText}>
                  Vedi Dettagli Settimana →
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Stats Overview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>STATISTICHE GLOBALI</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completedWeeks}/48</Text>
              <Text style={styles.statLabel}>Settimane Complete</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.adherenceRate}%</Text>
              <Text style={styles.statLabel}>Adherence</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {stats.completedSessions}/{stats.totalSessions}
              </Text>
              <Text style={styles.statLabel}>Sessioni</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.racesCompleted}/6</Text>
              <Text style={styles.statLabel}>Gare Complete</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor(stats.totalVolumeCompleted / 60)}h
              </Text>
              <Text style={styles.statLabel}>Volume Totale</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor(stats.totalCoreCompleted / 60)}h
              </Text>
              <Text style={styles.statLabel}>Core Totale</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Races */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CALENDARIO GARE</Text>
          {RACES.map((race) => {
            const raceWeek = weeks.find((w) => w.weekNumber === race.week);
            const isCompleted = raceWeek?.sessions.some(
              (s) => s.type.includes('RACE') && s.completed
            );
            const isPast = new Date(race.date) < new Date();
            const isUpcoming =
              !isPast && new Date(race.date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

            return (
              <View
                key={race.id}
                style={[
                  styles.raceItem,
                  isCompleted && styles.raceItemCompleted,
                  isUpcoming && styles.raceItemUpcoming,
                ]}
              >
                <View style={styles.raceItemHeader}>
                  <Text
                    style={[
                      styles.raceItemTitle,
                      isCompleted && styles.textCompleted,
                    ]}
                  >
                    {isCompleted ? '✓ ' : ''}
                    {race.name}
                  </Text>
                  {isUpcoming && (
                    <View style={styles.upcomingBadge}>
                      <Text style={styles.upcomingBadgeText}>PROSSIMA</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.raceItemDate}>
                  {formatDate(race.date)} - Week {race.week}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AZIONI RAPIDE</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCurrentView('mesocycles')}
          >
            <Text style={styles.actionButtonText}>
              📅 Esplora Tutti i Mesocicli
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCurrentView('progress')}
          >
            <Text style={styles.actionButtonText}>📊 Vedi Progress Testing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              Alert.alert(
                'START HERE Guide',
                'Consulta il file START_HERE_PERFORMANCE.md per navigazione rapida, concetti chiave, e decision tree.\n\nFile disponibili:\n• 22 file totali\n• Ogni mesociclo dettagliato\n• GAP 8 settimane\n• Race protocols\n• Testing sessions',
                [{ text: 'OK' }]
              );
            }}
          >
            <Text style={styles.actionButtonText}>📖 START HERE Guide</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    );
  };

  // ============================================================================
  // RENDER: Mesocycles Screen
  // ============================================================================

  const renderMesocycles = () => {
    if (selectedMeso !== null) {
      const meso = MESOCYCLES.find((m) => m.id === selectedMeso);
      if (!meso) return null;

      const mesoWeeks = weeks.filter((w) => meso.weeks.includes(w.weekNumber));

      return (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedMeso(null)}
          >
            <Text style={styles.backButtonText}>← Back to Mesocycles</Text>
          </TouchableOpacity>

          <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: meso.color }]}>
            <Text style={styles.mesoTitle}>{meso.name}</Text>
            <View style={[styles.badge, { backgroundColor: meso.color }]}>
              <Text style={styles.badgeText}>{meso.phase}</Text>
            </View>
            <Text style={styles.mesoDescription}>{meso.description}</Text>
            <Text style={styles.mesoWeeks}>
              Settimane: {meso.weeks[0]} - {meso.weeks[meso.weeks.length - 1]}
            </Text>
            <Text style={styles.mesoFile}>File: {meso.fileReference}.md</Text>
          </View>

          <Text style={styles.sectionTitle}>SETTIMANE ({mesoWeeks.length})</Text>

          {mesoWeeks.map((week) => {
            const completedCount = week.sessions.filter((s) => s.completed).length;
            const totalCount = week.sessions.length;
            const isComplete = completedCount === totalCount;
            const progressPercent = (completedCount / totalCount) * 100;

            return (
              <TouchableOpacity
                key={week.weekNumber}
                style={[styles.weekCard, isComplete && styles.weekCardComplete]}
                onPress={() => {
                  setSelectedWeek(week);
                  setShowWeekDetail(true);
                }}
              >
                <View style={styles.weekCardHeader}>
                  <View>
                    <Text style={styles.weekCardNumber}>
                      Week {week.weekNumber}
                    </Text>
                    <Text style={styles.weekCardTheme}>{week.theme}</Text>
                  </View>
                  {isComplete && <Text style={styles.checkmark}>✓</Text>}
                </View>

                <Text style={styles.weekCardDates}>
                  {formatDate(week.startDate)} - {formatDate(week.endDate)}
                </Text>

                {week.isRaceWeek && (
                  <View style={styles.raceFlag}>
                    <Text style={styles.raceFlagText}>
                      🏁 {week.raceLocation}
                    </Text>
                  </View>
                )}

                <View style={styles.weekCardStats}>
                  <Text style={styles.weekCardStat}>
                    Vol: {week.volumeTarget}' | Core: {week.coreTarget}' |{' '}
                    {week.intensityRange}
                  </Text>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progressPercent}%`,
                        backgroundColor: isComplete ? '#4CAF50' : meso.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {completedCount}/{totalCount} sessioni
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={{ height: 100 }} />
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MESOCICLI</Text>
          <Text style={styles.headerSubtitle}>11 Mesocicli - 48 Settimane</Text>
        </View>

        {MESOCYCLES.map((meso) => {
          const mesoWeeks = weeks.filter((w) => meso.weeks.includes(w.weekNumber));
          const completedWeeks = mesoWeeks.filter((w) =>
            w.sessions.every((s) => s.completed)
          ).length;
          const totalWeeks = mesoWeeks.length;
          const progressPercent =
            totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;

          return (
            <TouchableOpacity
              key={meso.id}
              style={[
                styles.mesoCard,
                { borderLeftWidth: 4, borderLeftColor: meso.color },
              ]}
              onPress={() => setSelectedMeso(meso.id)}
            >
              <View style={styles.mesoCardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.mesoCardTitle}>{meso.name}</Text>
                  <View style={[styles.badge, { backgroundColor: meso.color }]}>
                    <Text style={styles.badgeText}>{meso.phase}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.mesoCardDescription}>{meso.description}</Text>

              <View style={styles.mesoCardFooter}>
                <Text style={styles.mesoCardWeeks}>
                  Weeks {meso.weeks[0]}-{meso.weeks[meso.weeks.length - 1]} (
                  {totalWeeks} settimane)
                </Text>
                <Text style={styles.mesoCardProgress}>
                  {completedWeeks}/{totalWeeks} complete
                </Text>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%`, backgroundColor: meso.color },
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    );
  };

  // ============================================================================
  // RENDER: Progress Screen
  // ============================================================================

  const renderProgress = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PROGRESS TRACKING</Text>
          <Text style={styles.headerSubtitle}>Testing 0 → Testing 3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>TESTING SESSIONS</Text>
          <Text style={styles.infoText}>
            • Testing 0: Baseline iniziale (1 Dic 2025)
          </Text>
          <Text style={styles.infoText}>
            • Testing 1: Competition-ready (Week 13, ~15 Feb 2026)
          </Text>
          <Text style={styles.infoText}>
            • Testing Baseline GAP: Pre-GAP (Week 36, 10 Ago 2026)
          </Text>
          <Text style={styles.infoText}>
            • Testing 3: Post-GAP Results (Week 42, 21 Set 2026)
          </Text>
        </View>

        {progressData.map((test, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.testHeader}>
              <Text style={styles.testTitle}>
                {test.testingSession === 0
                  ? 'BASELINE INIZIALE'
                  : `TESTING ${test.testingSession}`}
              </Text>
              <Text style={styles.testDate}>{formatDate(test.date)}</Text>
            </View>

            <View style={styles.testResults}>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Plank Casco:</Text>
                <Text style={styles.testValue}>{test.plankCasco}</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Front Squat:</Text>
                <Text style={styles.testValue}>{test.frontSquat}</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Trap-Bar DL:</Text>
                <Text style={styles.testValue}>{test.trapBarDL}</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Pull-Ups:</Text>
                <Text style={styles.testValue}>{test.pullUps}</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Box Jump:</Text>
                <Text style={styles.testValue}>{test.boxJump} cm</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>Broad Jump:</Text>
                <Text style={styles.testValue}>{test.broadJump} cm</Text>
              </View>
              <View style={styles.testRow}>
                <Text style={styles.testLabel}>RSA:</Text>
                <Text style={styles.testValue}>{test.rsaSprint}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>TARGET IMPROVEMENTS</Text>
          <Text style={styles.improvementText}>Core: 3×50" → 5×82" (+64%)</Text>
          <Text style={styles.improvementText}>
            Strength: +10-15% all lifts
          </Text>
          <Text style={styles.improvementText}>
            Power: +8-12cm box, +20-25cm broad
          </Text>
          <Text style={styles.improvementText}>RSA: 4×20" → 8×35"</Text>
          <Text style={styles.improvementText}>Body: +1.5-2.5kg muscle</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            Alert.alert(
              'Add Testing Results',
              'Funzionalità per aggiungere nuovi risultati testing sarà implementata nella versione completa.',
              [{ text: 'OK' }]
            );
          }}
        >
          <Text style={styles.primaryButtonText}>+ Aggiungi Testing Result</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    );
  };

  // ============================================================================
  // RENDER: Week Detail Modal
  // ============================================================================

  const renderWeekDetail = () => {
    if (!selectedWeek) return null;

    const completedCount = selectedWeek.sessions.filter((s) => s.completed).length;
    const totalCount = selectedWeek.sessions.length;
    const isComplete = completedCount === totalCount;

    return (
      <Modal
        visible={showWeekDetail}
        animationType="slide"
        onRequestClose={() => setShowWeekDetail(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowWeekDetail(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Week {selectedWeek.weekNumber}</Text>
              {isComplete && <Text style={styles.modalCheckmark}>✓</Text>}
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalTheme}>{selectedWeek.theme}</Text>
              <Text style={styles.modalDates}>
                {formatDate(selectedWeek.startDate)} -{' '}
                {formatDate(selectedWeek.endDate)}
              </Text>

              {selectedWeek.isRaceWeek && (
                <View style={styles.raceAlert}>
                  <Text style={styles.raceAlertText}>
                    🏁 RACE WEEK - {selectedWeek.raceLocation}
                  </Text>
                  <Text style={styles.raceAlertDate}>
                    Race: {formatDate(selectedWeek.raceDate!)}
                  </Text>
                </View>
              )}

              <View style={styles.weekTargets}>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Volume Target</Text>
                  <Text style={styles.targetValue}>
                    {selectedWeek.volumeTarget} min
                  </Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Core Target</Text>
                  <Text style={styles.targetValue}>
                    {selectedWeek.coreTarget} min
                  </Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetLabel}>Intensity</Text>
                  <Text style={styles.targetValue}>
                    {selectedWeek.intensityRange}
                  </Text>
                </View>
              </View>

              <View style={styles.objectivesCard}>
                <Text style={styles.objectivesTitle}>OBIETTIVI SETTIMANA:</Text>
                {selectedWeek.objectives.map((obj, index) => (
                  <Text key={index} style={styles.objectiveItem}>
                    • {obj}
                  </Text>
                ))}
              </View>

              <Text style={styles.sessionsTitle}>
                SESSIONI ({completedCount}/{totalCount})
              </Text>

              {selectedWeek.sessions.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  style={[
                    styles.sessionCard,
                    session.completed && styles.sessionCardComplete,
                  ]}
                  onPress={() =>
                    toggleSessionComplete(selectedWeek.weekNumber, session.id)
                  }
                >
                  <View style={styles.sessionHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sessionDay}>{session.day}</Text>
                      <Text style={styles.sessionType}>{session.type}</Text>
                    </View>
                    <View style={styles.sessionCheckbox}>
                      {session.completed && (
                        <Text style={styles.sessionCheck}>✓</Text>
                      )}
                    </View>
                  </View>

                  <Text style={styles.sessionDescription}>
                    {session.description}
                  </Text>

                  <View style={styles.sessionMeta}>
                    <Text style={styles.sessionMetaText}>
                      ⏱ {session.duration}' | Core: {session.coreMin}' | {session.intensity}
                    </Text>
                  </View>

                  {session.completed && session.completedDate && (
                    <Text style={styles.sessionCompleted}>
                      Completata: {formatDate(session.completedDate)}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}

              {isComplete && (
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => setShowReviewModal(true)}
                >
                  <Text style={styles.reviewButtonText}>
                    📝 Aggiungi Weekly Review
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  // ============================================================================
  // RENDER: Bottom Navigation
  // ============================================================================

  const renderBottomNav = () => {
    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentView('overview')}
        >
          <Text
            style={[
              styles.navItemText,
              currentView === 'overview' && styles.navItemActive,
            ]}
          >
            🏠 Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setSelectedMeso(null);
            setCurrentView('mesocycles');
          }}
        >
          <Text
            style={[
              styles.navItemText,
              currentView === 'mesocycles' && styles.navItemActive,
            ]}
          >
            📅 Mesos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentView('progress')}
        >
          <Text
            style={[
              styles.navItemText,
              currentView === 'progress' && styles.navItemActive,
            ]}
          >
            📊 Progress
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentView === 'overview' && renderOverview()}
      {currentView === 'mesocycles' && renderMesocycles()}
      {currentView === 'progress' && renderProgress()}
      {renderBottomNav()}
      {renderWeekDetail()}
    </SafeAreaView>
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  return date.toLocaleDateString('it-IT', options);
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  // Header
  header: {
    padding: 20,
    backgroundColor: '#1E3A5F',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#B0C4DE',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 12,
  },

  // Badge
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Week Theme
  weekTheme: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  weekDates: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },

  // Race Alert
  raceAlert: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  raceAlertText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  raceAlertDate: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },

  // Week Targets
  weekTargets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  targetItem: {
    alignItems: 'center',
  },
  targetLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  targetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  // Race Items
  raceItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  raceItemCompleted: {
    backgroundColor: '#D4EDDA',
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  raceItemUpcoming: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  raceItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  raceItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  textCompleted: {
    color: '#28A745',
  },
  upcomingBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  upcomingBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  raceItemDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },

  // Buttons
  primaryButton: {
    backgroundColor: '#1E3A5F',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },

  // Mesocycle Cards
  mesoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mesoCardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  mesoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  mesoCardDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
    lineHeight: 20,
  },
  mesoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mesoCardWeeks: {
    fontSize: 13,
    color: '#95A5A6',
  },
  mesoCardProgress: {
    fontSize: 13,
    color: '#27AE60',
    fontWeight: '600',
  },

  // Meso Detail
  mesoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  mesoDescription: {
    fontSize: 15,
    color: '#7F8C8D',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 22,
  },
  mesoWeeks: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 4,
  },
  mesoFile: {
    fontSize: 13,
    color: '#3498DB',
    fontStyle: 'italic',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },

  // Week Cards
  weekCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekCardComplete: {
    backgroundColor: '#F0F9FF',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  weekCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  weekCardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  weekCardTheme: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 28,
    color: '#4CAF50',
  },
  weekCardDates: {
    fontSize: 13,
    color: '#95A5A6',
    marginBottom: 12,
  },
  raceFlag: {
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  raceFlagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  weekCardStats: {
    marginBottom: 12,
  },
  weekCardStat: {
    fontSize: 13,
    color: '#7F8C8D',
  },

  // Progress Bar
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'right',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1E3A5F',
  },
  modalClose: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  modalCheckmark: {
    fontSize: 28,
    color: '#4CAF50',
  },
  modalContent: {
    padding: 16,
  },
  modalTheme: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  modalDates: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },

  // Objectives
  objectivesCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  objectivesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  objectiveItem: {
    fontSize: 13,
    color: '#5D4037',
    marginBottom: 4,
    lineHeight: 18,
  },

  sessionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 12,
  },

  // Session Cards
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sessionCardComplete: {
    backgroundColor: '#F0F9FF',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  sessionType: {
    fontSize: 14,
    color: '#4A90E2',
    marginTop: 2,
  },
  sessionCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionCheck: {
    fontSize: 20,
    color: '#4CAF50',
  },
  sessionDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
    marginBottom: 8,
  },
  sessionMeta: {
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    padding: 8,
  },
  sessionMetaText: {
    fontSize: 12,
    color: '#95A5A6',
  },
  sessionCompleted: {
    fontSize: 11,
    color: '#27AE60',
    marginTop: 8,
    fontWeight: '600',
  },

  reviewButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Progress/Testing
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    lineHeight: 20,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  testDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  testResults: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  testLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  testValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  improvementText: {
    fontSize: 15,
    color: '#27AE60',
    marginBottom: 8,
    fontWeight: '600',
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemText: {
    fontSize: 12,
    color: '#95A5A6',
    fontWeight: '600',
  },
  navItemActive: {
    color: '#1E3A5F',
    fontWeight: 'bold',
  },
}); 