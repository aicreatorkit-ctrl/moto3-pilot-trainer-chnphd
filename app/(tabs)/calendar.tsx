
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  load: string;
  tempo: string;
  notes: string;
}

interface WorkoutSession {
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
  completedDate?: string;
  notes?: string;
}

interface Week {
  weekNumber: number;
  startDate: string;
  endDate: string;
  theme: string;
  volumeTarget: number;
  coreTarget: number;
  intensityRange: string;
  objectives: string[];
  sessions: WorkoutSession[];
  isRaceWeek: boolean;
  raceDate?: string;
  raceLocation?: string;
  weeklyNotes?: string;
}

interface Mesocycle {
  id: number;
  name: string;
  weeks: number[];
  phase: string;
  description: string;
  color: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MESOCYCLES: Mesocycle[] = [
  { id: 1, name: 'MESO 1: Foundation Base', weeks: [1, 2, 3, 4], phase: 'Foundation', description: 'Costruzione base anatomica', color: '#4A90E2' },
  { id: 2, name: 'MESO 2: Foundation Advanced', weeks: [5, 6, 7, 8, 9], phase: 'Foundation', description: 'Espansione capacità', color: '#5BA3E2' },
  { id: 3, name: 'MESO 3: Pre-Competition', weeks: [10, 11, 12, 13], phase: 'Pre-Competition', description: 'Testing 1, racing prep', color: '#7CB342' },
  { id: 4, name: 'MESO 4: Competition Prep', weeks: [14, 15, 16], phase: 'Pre-Competition', description: 'Peak preparation', color: '#8BC34A' },
  { id: 5, name: 'MESO 5: GARA 1 Lignano', weeks: [17, 18, 19], phase: 'Competition', description: 'PRIMA GARA 17-19 Aprile', color: '#FF6B6B' },
  { id: 6, name: 'MESO 6: GARA 2', weeks: [20, 21, 22, 23, 24], phase: 'Competition', description: 'Franciacorta 22-24 Maggio', color: '#FF8A65' },
  { id: 7, name: 'MESO 7: GARA 3', weeks: [25, 26, 27, 28, 29], phase: 'Competition', description: 'Ala Karting 19-21 Giugno', color: '#FFA726' },
  { id: 8, name: 'MESO 8: GARA 4', weeks: [30, 31, 32, 33, 34], phase: 'Competition', description: '7 Laghi 17-19 Luglio', color: '#FFB74D' },
  { id: 9, name: 'MESO 9: GAP ⭐⭐⭐', weeks: [35, 36, 37, 38, 39, 40, 41, 42], phase: 'GAP', description: '8 settimane CRITICHE', color: '#9C27B0' },
  { id: 10, name: 'MESO 10: GARA 5', weeks: [43, 44], phase: 'Competition', description: 'Pomposa 11-13 Settembre', color: '#E91E63' },
  { id: 11, name: 'MESO 11: FINALE GARA 6', weeks: [45, 46, 47, 48], phase: 'Competition', description: 'Cremona 16-18 Ottobre', color: '#D32F2F' },
];

const RACES = [
  { id: 1, name: 'GARA 1: Lignano', date: '2026-04-19', week: 19, location: 'Lignano' },
  { id: 2, name: 'GARA 2: Franciacorta', date: '2026-05-24', week: 24, location: 'Franciacorta' },
  { id: 3, name: 'GARA 3: Ala Karting', date: '2026-06-21', week: 28, location: 'Ala' },
  { id: 4, name: 'GARA 4: 7 Laghi', date: '2026-07-19', week: 33, location: '7 Laghi' },
  { id: 5, name: 'GARA 5: Pomposa', date: '2026-10-12', week: 44, location: 'Pomposa' },
  { id: 6, name: 'GARA 6: Cremona FINALE', date: '2026-11-17', week: 48, location: 'Cremona' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const createTemplateSessions = (weekNum: number, theme: string): WorkoutSession[] => {
  const baseId = `w${weekNum}`;
  
  return [
    {
      id: `${baseId}-mon`,
      day: 'Lunedì',
      type: 'Recovery/Mobility',
      startTime: '15:00',
      duration: 45,
      coreMin: 15,
      intensity: 'Recovery',
      description: `${theme} - Recovery day`,
      warmUp: [{ name: 'ROUTINE 12\'', sets: '1', reps: '12min', rest: '-', load: 'BW', tempo: 'Controlled', notes: 'Standard protocol' }],
      mainWork: [{ name: 'Mobility Work', sets: 'Various', reps: '25min', rest: '-', load: 'BW', tempo: 'Controlled', notes: 'Hip flexor release, thoracic mobility, shoulder work' }],
      coreWork: [
        { name: 'Dead Bug', sets: '3', reps: '20', rest: '60"', load: 'BW', tempo: '3-0-3-0', notes: 'Core activation' },
        { name: 'Side Plank', sets: '3', reps: '20-25"/lato', rest: '45"', load: 'BW', tempo: 'Static', notes: 'Oblique work' },
      ],
      coolDown: [{ name: 'Stretching', sets: '1', reps: '10min', rest: '-', load: 'BW', tempo: 'Static', notes: 'Full body stretch' }],
      completed: false,
    },
    {
      id: `${baseId}-tue`,
      day: 'Martedì',
      type: 'Lower Body + Core',
      startTime: '15:00',
      duration: 110,
      coreMin: 25,
      intensity: '70-75%',
      description: `${theme} - Lower focus`,
      warmUp: [
        { name: 'ROUTINE 12\'', sets: '1', reps: '12min', rest: '-', load: 'BW', tempo: 'Controlled', notes: 'Standard' },
        { name: 'Lower Body Prep', sets: '2-3', reps: '10-15', rest: '30-45"', load: 'BW/Light', tempo: 'Controlled', notes: 'Glute bridge, leg swings, bodyweight squat, lunges' },
      ],
      mainWork: [
        { name: 'A. Front Squat ⭐⭐⭐', sets: '4', reps: '8-10', rest: '2:30-3min', load: '65-70%', tempo: '3-0-X-0', notes: 'Esercizio primario. Tronco verticale, profondità, lombare neutra' },
        { name: 'B. Trap-Bar Deadlift', sets: '3-4', reps: '6-10', rest: '2:30min', load: '65-70%', tempo: '2-0-X-1', notes: 'Secondary. Setup perfect, push floor' },
        { name: 'C. Bulgarian Split Squat', sets: '3', reps: '10-12/lato', rest: '90"', load: 'BW/DBs', tempo: '3-0-2-0', notes: 'Unilateral stability' },
      ],
      coreWork: [
        { name: 'Plank Standard', sets: '3-4', reps: '45-60"', rest: '60-75"', load: 'BW', tempo: 'Static', notes: 'Progressione settimanale' },
        { name: 'Wall Sit', sets: '3', reps: '60-75"', rest: '75"', load: 'BW', tempo: 'Static', notes: 'Endurance build' },
        { name: 'Ab Wheel', sets: '3', reps: '10-12', rest: '75"', load: 'BW', tempo: '2-0-2-0', notes: 'Core strength' },
      ],
      coolDown: [{ name: 'Lower Body Stretch', sets: '1', reps: '15min', rest: '-', load: 'BW', tempo: 'Static', notes: 'Comprehensive' }],
      completed: false,
    },
    {
      id: `${baseId}-wed`,
      day: 'Mercoledì',
      type: 'Cardio Z2 + Core',
      startTime: '15:00',
      duration: 95,
      coreMin: 15,
      intensity: 'Z2 (65-75%)',
      description: `${theme} - Aerobic base`,
      warmUp: [{ name: 'ROUTINE 12\' + Bike Prep', sets: '1', reps: '15min', rest: '-', load: 'BW', tempo: 'Easy', notes: 'Mobilità + easy spin' }],
      mainWork: [
        { name: 'Ciclismo Z2 ⭐⭐', sets: '1', reps: '60min', rest: '-', load: 'Z2', tempo: 'Steady', notes: 'HR 130-145 bpm, cadence 85-95 rpm. Conversational pace' },
      ],
      coreWork: [
        { name: 'Pallof Press', sets: '3', reps: '12-15/lato', rest: '60"', load: 'Med/Heavy band', tempo: '2-1-2-1', notes: 'Anti-rotation' },
        { name: 'Dead Bug Weighted', sets: '3', reps: '15', rest: '60"', load: '2-3kg/hand', tempo: '3-1-3-0', notes: 'Control' },
        { name: 'Bird-Dog', sets: '3', reps: '12/lato', rest: '45"', load: 'BW', tempo: '2-2-2-0', notes: 'Stability' },
      ],
      coolDown: [{ name: 'Easy Spin + Stretch', sets: '1', reps: '10min', rest: '-', load: 'Light', tempo: 'Easy', notes: 'Cool down' }],
      completed: false,
    },
    {
      id: `${baseId}-thu`,
      day: 'Giovedì',
      type: 'Upper Body + Core Transfer ⭐',
      startTime: '15:00',
      duration: 130,
      coreMin: 25,
      intensity: '70-75%',
      description: `${theme} - Upper + Plank Casco`,
      warmUp: [
        { name: 'ROUTINE 12\'', sets: '1', reps: '12min', rest: '-', load: 'BW', tempo: 'Controlled', notes: 'Standard' },
        { name: 'Upper Body Prep', sets: '2-3', reps: '10-20', rest: '30"', load: 'BW/Band', tempo: 'Controlled', notes: 'Band pull-aparts, scap push-ups, wall slides' },
      ],
      mainWork: [
        { name: 'A. Pull-Ups Strict ⭐⭐⭐', sets: '4', reps: '6-10', rest: '2:30min', load: 'BW/Assisted', tempo: '2-0-X-1', notes: 'ROM completo, scapulae attive, zero kipping' },
        { name: 'B. Overhead Press', sets: '4', reps: '6-10', rest: '2:30min', load: '65-70%', tempo: '2-0-X-0', notes: 'Bar path verticale, core brace, lombare neutra' },
        { name: 'C1. DB Row', sets: '3', reps: '10-12/lato', rest: '90"', load: 'Moderate', tempo: '2-0-2-1', notes: 'Unilateral, scapula retraction' },
        { name: 'C2. DB Bench Press', sets: '3', reps: '10-12', rest: '90"', load: 'Moderate', tempo: '3-0-X-0', notes: 'Scapulae retracted' },
      ],
      coreWork: [
        { name: 'PLANK CASCO ⭐⭐⭐', sets: '3-4', reps: '50-65"', rest: '90"', load: 'Racing helmet', tempo: 'Static', notes: 'TRANSFER DIRETTO MOTO3. Indossa casco, core tight' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '10-12', rest: '75"', load: 'BW', tempo: '2-0-2-1', notes: 'Abs + grip' },
        { name: 'Pallof Press Heavy', sets: '3', reps: '12/lato', rest: '60"', load: 'Heavy band', tempo: '2-1-2-1', notes: 'Max resistance' },
      ],
      coolDown: [{ name: 'Upper Body Stretch', sets: '1', reps: '15min', rest: '-', load: 'BW', tempo: 'Static', notes: 'Pecs, lats, shoulders' }],
      completed: false,
    },
    {
      id: `${baseId}-fri`,
      day: 'Venerdì',
      type: 'Full Body + Specificity ⭐⭐',
      startTime: '15:00',
      duration: 135,
      coreMin: 15,
      intensity: '65-70%',
      description: `${theme} - Integration + Neck/Grip`,
      warmUp: [
        { name: 'ROUTINE 12\'', sets: '1', reps: '12min', rest: '-', load: 'BW', tempo: 'Controlled', notes: 'Full body prep' },
        { name: 'Dynamic Warm-up', sets: '2', reps: '10 each', rest: '45"', load: 'BW', tempo: 'Dynamic', notes: 'Squat + push-up + lunge. Circuit style' },
      ],
      mainWork: [
        { name: 'A. Trap-Bar DL (Volume)', sets: '3', reps: '10-15', rest: '2min', load: '55-60%', tempo: '2-0-X-1', notes: 'Higher reps, volume emphasis' },
        { name: 'B. Front Squat (Volume)', sets: '3', reps: '10-15', rest: '2min', load: '55-60%', tempo: '3-0-X-0', notes: 'Rep quality' },
        { name: 'C. Pull-Ups AMRAP', sets: '3', reps: 'Max-2', rest: '90"', load: 'BW', tempo: 'Controlled', notes: 'Quality reps' },
        { name: 'E. Neck Training ⭐', sets: '2-3', reps: '12 each dir', rest: '60"', load: '5-8kg', tempo: 'Controlled', notes: 'Harness 4 directions. CRITICAL Moto3' },
        { name: 'F. Grip Work', sets: '2-3', reps: 'Various', rest: '60"', load: 'Various', tempo: 'Hold/Controlled', notes: 'Dead hangs 45-60", farmer carries, pinch grip' },
      ],
      coreWork: [
        { name: 'Core Circuit', sets: '3', reps: 'Circuit', rest: '90"', load: 'BW/Light', tempo: 'Controlled', notes: 'Plank 45" + Russian Twist 20/lato + Dead Bug 15' },
      ],
      coolDown: [{ name: 'Full Body Stretch', sets: '1', reps: '15min', rest: '-', load: 'BW', tempo: 'Static', notes: 'Comprehensive end-week stretch' }],
      completed: false,
    },
    {
      id: `${baseId}-sat`,
      day: 'Sabato',
      type: 'Cardio Long Z2',
      startTime: '10:00',
      duration: 120,
      coreMin: 10,
      intensity: 'Z2',
      description: `${theme} - Long aerobic`,
      warmUp: [{ name: 'ROUTINE 12\' + Easy Spin', sets: '1', reps: '15min', rest: '-', load: 'Easy', tempo: 'Easy', notes: 'Warm-up graduale' }],
      mainWork: [
        { name: 'Ciclismo Z2 Long ⭐⭐', sets: '1', reps: '90min', rest: '-', load: 'Z2', tempo: 'Steady', notes: 'HR 130-145 bpm. Cadence 85-95. Nutrition se >75min (30-60g carbs/h)' },
      ],
      coreWork: [
        { name: 'Core Recovery', sets: '2', reps: 'Various', rest: '60"', load: 'BW', tempo: 'Easy', notes: 'Plank 40", bird-dog, dead bug. Maintenance only' },
      ],
      coolDown: [{ name: 'Cool Down + Stretch', sets: '1', reps: '15min', rest: '-', load: 'Easy', tempo: 'Easy', notes: '10min easy spin + 5min stretch' }],
      completed: false,
    },
    {
      id: `${baseId}-sun`,
      day: 'Domenica',
      type: 'Active Recovery + Moto',
      startTime: '10:00',
      duration: 50,
      coreMin: 20,
      intensity: 'Recovery',
      description: `${theme} - Regeneration`,
      warmUp: [{ name: 'ROUTINE 12\'', sets: '1', reps: '12min', rest: '-', load: 'BW', tempo: 'Easy', notes: 'Recovery pace' }],
      mainWork: [
        { name: 'Foam Rolling ⭐', sets: '1', reps: '20min', rest: '-', load: 'BW', tempo: 'Slow', notes: 'Total body: Thoracic, lats, glutes, IT band, hamstrings, quads, calves' },
      ],
      coreWork: [
        { name: 'Core Volume Circuit', sets: '4', reps: 'Circuit', rest: '90"', load: 'BW', tempo: 'Controlled', notes: 'Plank 30" + side plank 20"/lato + dead bug 15 + bird-dog 10/lato' },
      ],
      coolDown: [{ name: 'Gentle Stretch', sets: '1', reps: '10min', rest: '-', load: 'BW', tempo: 'Static', notes: 'Relaxation, respiro profondo' }],
      completed: false,
    },
  ];
};

const generateAllWeeks = (): Week[] => {
  const weeks: Week[] = [];
  const startDate = new Date('2025-12-01');

  for (let weekNum = 1; weekNum <= 48; weekNum++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNum - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toISOString().split('T')[0];
    const endStr = weekEnd.toISOString().split('T')[0];

    const race = RACES.find((r) => r.week === weekNum);
    const isGAP = weekNum >= 35 && weekNum <= 42;

    let theme = 'Foundation Build';
    let volumeTarget = 400 + (weekNum * 10);
    let coreTarget = 80 + (weekNum * 2);
    let intensityRange = '65-70%';

    if (weekNum <= 4) {
      theme = 'LEARN THE MOVEMENTS';
      volumeTarget = 600;
      coreTarget = 110;
      intensityRange = '60-65%';
    } else if (weekNum <= 9) {
      theme = 'Foundation Advanced';
      volumeTarget = 620;
      coreTarget = 130;
      intensityRange = '65-70%';
    } else if (weekNum <= 13) {
      theme = 'Pre-Competition Build';
      volumeTarget = 650;
      coreTarget = 135;
      intensityRange = '70-75%';
    } else if (weekNum <= 19) {
      theme = 'Competition Prep → GARA 1';
      volumeTarget = 630;
      coreTarget = 130;
      intensityRange = '75-80%';
    } else if (weekNum <= 34) {
      theme = 'Competition Season';
      volumeTarget = 620;
      coreTarget = 140;
      intensityRange = '75-82%';
    } else if (isGAP) {
      if (weekNum <= 36) {
        theme = 'GAP: Recovery + Baseline';
        volumeTarget = 550;
        coreTarget = 90;
        intensityRange = '65-70%';
      } else if (weekNum <= 38) {
        theme = 'GAP: Hypertrophy PEAK ⭐⭐';
        volumeTarget = 750;
        coreTarget = 220;
        intensityRange = '72-75%';
      } else if (weekNum <= 40) {
        theme = 'GAP: Strength PEAK ⭐⭐⭐';
        volumeTarget = 700;
        coreTarget = 240;
        intensityRange = '85-90%';
      } else {
        theme = 'GAP: Transfer + Testing';
        volumeTarget = 650;
        coreTarget = 180;
        intensityRange = '80-85%';
      }
    } else if (weekNum <= 48) {
      theme = 'Final Races + Championship';
      volumeTarget = 600;
      coreTarget = 140;
      intensityRange = '75-82%';
    }

    const sessions = createTemplateSessions(weekNum, theme);

    const week: Week = {
      weekNumber: weekNum,
      startDate: startStr,
      endDate: endStr,
      theme: theme,
      volumeTarget: volumeTarget,
      coreTarget: coreTarget,
      intensityRange: intensityRange,
      objectives: [
        'ROUTINE 12\' sempre',
        'Form perfetta priorità',
        `Core target: ${coreTarget} min/week`,
      ],
      sessions: sessions,
      isRaceWeek: race !== undefined,
      raceDate: race?.date,
      raceLocation: race?.location,
      weeklyNotes: `Consulta ${theme.split(':')[0]} per tutti i dettagli completi questa settimana.`,
    };

    weeks.push(week);
  }

  return weeks;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PerformanceCalendar() {
  const theme = useTheme();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);
  const [showWeekDetail, setShowWeekDetail] = useState(false);
  const [showSessionDetail, setShowSessionDetail] = useState(false);
  const [currentView, setCurrentView] = useState<'calendar' | 'mesocycles'>('calendar');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const storedWeeks = await AsyncStorage.getItem('training_weeks');
      if (storedWeeks) {
        setWeeks(JSON.parse(storedWeeks));
      } else {
        const initialWeeks = generateAllWeeks();
        setWeeks(initialWeeks);
        await AsyncStorage.setItem('training_weeks', JSON.stringify(initialWeeks));
      }
    } catch (error) {
      console.log('Error loading weeks:', error);
      const initialWeeks = generateAllWeeks();
      setWeeks(initialWeeks);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSessionComplete = async (weekNum: number, sessionId: string) => {
    const updatedWeeks = weeks.map((week) => {
      if (week.weekNumber === weekNum) {
        return {
          ...week,
          sessions: week.sessions.map((session) => {
            if (session.id === sessionId) {
              return {
                ...session,
                completed: !session.completed,
                completedDate: !session.completed ? new Date().toISOString().split('T')[0] : undefined,
              };
            }
            return session;
          }),
        };
      }
      return week;
    });
    setWeeks(updatedWeeks);
    try {
      await AsyncStorage.setItem('training_weeks', JSON.stringify(updatedWeeks));
    } catch (error) {
      console.log('Error saving weeks:', error);
    }
  };

  const formatDate = (dateStr: string): string => {
    try {
      const parts = dateStr.split('-');
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const renderExerciseList = (exercises: Exercise[], title: string) => {
    if (exercises.length === 0) return null;
    
    return (
      <View style={styles.exerciseSection}>
        <Text style={[styles.exerciseSectionTitle, { color: theme.colors.primary }]}>{title}</Text>
        {exercises.map((ex, i) => (
          <View key={i} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.exerciseName, { color: theme.colors.text }]}>{ex.name}</Text>
            <View style={styles.exerciseDetails}>
              <Text style={[styles.exerciseDetail, { color: theme.colors.text }]}>Sets: {ex.sets}</Text>
              <Text style={[styles.exerciseDetail, { color: theme.colors.text }]}>Reps: {ex.reps}</Text>
              <Text style={[styles.exerciseDetail, { color: theme.colors.text }]}>Rest: {ex.rest}</Text>
            </View>
            <View style={styles.exerciseDetails}>
              <Text style={[styles.exerciseDetail, { color: theme.colors.text }]}>Load: {ex.load}</Text>
              <Text style={[styles.exerciseDetail, { color: theme.colors.text }]}>Tempo: {ex.tempo}</Text>
            </View>
            {ex.notes && <Text style={[styles.exerciseNotes, { color: theme.colors.text }]}>💡 {ex.notes}</Text>}
          </View>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>⚡ Caricamento...</Text>
          <Text style={[styles.loadingSubtext, { color: theme.colors.text }]}>48 Settimane • Tutti i Dettagli</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentWeekNum = weeks.find((w) => {
    const today = new Date();
    const start = new Date(w.startDate);
    const end = new Date(w.endDate);
    return today >= start && today <= end;
  })?.weekNumber || 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.headerTitle}>CALENDARIO ALLENAMENTI</Text>
          <Text style={styles.headerSubtitle}>48 Settimane • Ogni Dettaglio</Text>
        </View>

        {weeks.map((week) => {
          const isCurrent = week.weekNumber === currentWeekNum;
          const completedCount = week.sessions.filter((s) => s.completed).length;
          const totalCount = week.sessions.length;

          return (
            <TouchableOpacity
              key={week.weekNumber}
              style={[
                styles.weekCard,
                { backgroundColor: theme.colors.card },
                isCurrent && styles.weekCardCurrent
              ]}
              onPress={() => {
                setSelectedWeek(week);
                setShowWeekDetail(true);
              }}
            >
              <View style={styles.weekCardHeader}>
                <Text style={[styles.weekNumber, { color: theme.colors.text }]}>Week {week.weekNumber}</Text>
                {isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>CORRENTE</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.weekTheme, { color: theme.colors.text }]}>{week.theme}</Text>
              <Text style={[styles.weekDates, { color: theme.colors.text }]}>
                {formatDate(week.startDate)} - {formatDate(week.endDate)}
              </Text>
              
              {week.isRaceWeek && (
                <View style={styles.raceBadge}>
                  <Text style={styles.raceBadgeText}>🏁 {week.raceLocation}</Text>
                </View>
              )}

              <View style={styles.weekStats}>
                <Text style={[styles.weekStat, { color: theme.colors.text }]}>
                  Vol: {week.volumeTarget}&apos; | Core: {week.coreTarget}&apos;
                </Text>
                <Text style={[styles.weekStat, { color: theme.colors.text }]}>{week.intensityRange}</Text>
              </View>

              <View style={[styles.progressBar, { backgroundColor: theme.dark ? '#333' : '#E0E0E0' }]}>
                <View style={[styles.progressFill, { width: `${(completedCount/totalCount)*100}%` }]} />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.text }]}>
                {completedCount}/{totalCount} sessioni
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Week Detail Modal */}
      <Modal
        visible={showWeekDetail}
        animationType="slide"
        onRequestClose={() => setShowWeekDetail(false)}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.colors.primary }]}>
            <TouchableOpacity onPress={() => setShowWeekDetail(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Week {selectedWeek?.weekNumber}</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedWeek && (
              <React.Fragment>
                <Text style={[styles.modalTheme, { color: theme.colors.text }]}>{selectedWeek.theme}</Text>
                <Text style={[styles.modalDates, { color: theme.colors.text }]}>
                  {formatDate(selectedWeek.startDate)} - {formatDate(selectedWeek.endDate)}
                </Text>

                <View style={styles.objectivesBox}>
                  <Text style={styles.objectivesTitle}>OBIETTIVI SETTIMANA:</Text>
                  {selectedWeek.objectives.map((obj, i) => (
                    <Text key={i} style={styles.objectiveText}>• {obj}</Text>
                  ))}
                </View>

                {selectedWeek.weeklyNotes && (
                  <View style={styles.notesBox}>
                    <Text style={styles.notesText}>📝 {selectedWeek.weeklyNotes}</Text>
                  </View>
                )}

                <Text style={[styles.sessionsTitle, { color: theme.colors.text }]}>SESSIONI ALLENAMENTO:</Text>

                {selectedWeek.sessions.map((session) => (
                  <TouchableOpacity
                    key={session.id}
                    style={[
                      styles.sessionCard,
                      { backgroundColor: theme.colors.card },
                      session.completed && styles.sessionCardComplete
                    ]}
                    onPress={() => {
                      setSelectedSession(session);
                      setShowSessionDetail(true);
                    }}
                  >
                    <View style={styles.sessionHeader}>
                      <View>
                        <Text style={[styles.sessionDay, { color: theme.colors.text }]}>{session.day}</Text>
                        <Text style={[styles.sessionType, { color: theme.colors.primary }]}>{session.type}</Text>
                        <Text style={[styles.sessionTime, { color: theme.colors.text }]}>
                          🕐 {session.startTime} • {session.duration}min
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.checkbox}
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleSessionComplete(selectedWeek.weekNumber, session.id);
                        }}
                      >
                        {session.completed && <Text style={styles.checkmark}>✓</Text>}
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={[styles.sessionDesc, { color: theme.colors.text }]}>{session.description}</Text>
                    
                    <View style={styles.sessionMeta}>
                      <Text style={[styles.sessionMetaText, { color: theme.colors.text }]}>
                        Core: {session.coreMin}min • {session.intensity}
                      </Text>
                    </View>

                    <Text style={[styles.viewDetailsText, { color: theme.colors.primary }]}>
                      Tap per vedere tutti gli esercizi →
                    </Text>
                  </TouchableOpacity>
                ))}
              </React.Fragment>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Session Detail Modal */}
      <Modal
        visible={showSessionDetail}
        animationType="slide"
        onRequestClose={() => setShowSessionDetail(false)}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.colors.primary }]}>
            <TouchableOpacity onPress={() => setShowSessionDetail(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedSession?.day}</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedSession && (
              <React.Fragment>
                <Text style={[styles.sessionDetailType, { color: theme.colors.text }]}>{selectedSession.type}</Text>
                <Text style={[styles.sessionDetailTime, { color: theme.colors.text }]}>
                  🕐 {selectedSession.startTime} • Durata: {selectedSession.duration}min
                </Text>
                <Text style={[styles.sessionDetailDesc, { color: theme.colors.text }]}>{selectedSession.description}</Text>

                <View style={[styles.sessionDetailMeta, { backgroundColor: theme.colors.card }]}>
                  <Text style={[styles.sessionDetailMetaText, { color: theme.colors.text }]}>
                    Core: {selectedSession.coreMin}min
                  </Text>
                  <Text style={[styles.sessionDetailMetaText, { color: theme.colors.text }]}>
                    Intensità: {selectedSession.intensity}
                  </Text>
                </View>

                {renderExerciseList(selectedSession.warmUp, '🔥 WARM-UP')}
                {renderExerciseList(selectedSession.mainWork, '💪 MAIN WORK')}
                {renderExerciseList(selectedSession.coreWork, '🎯 CORE WORK')}
                {renderExerciseList(selectedSession.coolDown, '🧘 COOL-DOWN')}

                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    { backgroundColor: theme.colors.primary },
                    selectedSession.completed && styles.completeButtonDone
                  ]}
                  onPress={() => {
                    if (selectedWeek) {
                      toggleSessionComplete(selectedWeek.weekNumber, selectedSession.id);
                    }
                  }}
                >
                  <Text style={styles.completeButtonText}>
                    {selectedSession.completed ? '✓ COMPLETATA' : 'Segna come Completata'}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  loadingSubtext: {
    fontSize: 14,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  weekCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekCardCurrent: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  weekCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weekNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  weekTheme: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  weekDates: {
    fontSize: 13,
    marginBottom: 12,
    opacity: 0.7,
  },
  raceBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  raceBadgeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  weekStats: {
    marginBottom: 8,
  },
  weekStat: {
    fontSize: 12,
    marginBottom: 2,
    opacity: 0.7,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    textAlign: 'right',
    opacity: 0.7,
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  modalClose: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalTheme: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDates: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
  },
  objectivesBox: {
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
  objectiveText: {
    fontSize: 13,
    color: '#5D4037',
    marginBottom: 4,
    lineHeight: 18,
  },
  notesBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  notesText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
  sessionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  sessionCard: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sessionCardComplete: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sessionDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionType: {
    fontSize: 14,
    marginTop: 2,
  },
  sessionTime: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
  },
  sessionDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
    opacity: 0.8,
  },
  sessionMeta: {
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    opacity: 0.9,
  },
  sessionMetaText: {
    fontSize: 12,
  },
  viewDetailsText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  sessionDetailType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sessionDetailTime: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.7,
  },
  sessionDetailDesc: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
    opacity: 0.8,
  },
  sessionDetailMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  sessionDetailMetaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  exerciseSection: {
    marginBottom: 24,
  },
  exerciseSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
  },
  exerciseCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  exerciseDetail: {
    fontSize: 12,
    marginRight: 16,
    marginBottom: 4,
    opacity: 0.8,
  },
  exerciseNotes: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 16,
    backgroundColor: '#FFF8E1',
    padding: 8,
    borderRadius: 4,
  },
  completeButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  completeButtonDone: {
    backgroundColor: '#9E9E9E',
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
