
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';

const TRAINING_TYPES = {
  FORZA_MAX: { label: 'Forza Massimale', color: '#FF4444', icon: 'dumbbell.fill' },
  POTENZA: { label: 'Potenza', color: '#FF8C00', icon: 'bolt.fill' },
  RESISTENZA: { label: 'Resistenza', color: '#4CAF50', icon: 'figure.run' },
  TECNICO: { label: 'Tecnico Specifico', color: '#2196F3', icon: 'figure.motorcycle' },
  MOBILITA: { label: 'Mobilità/Correttivo', color: '#9C27B0', icon: 'figure.flexibility' },
  RECUPERO: { label: 'Recupero Attivo', color: '#00BCD4', icon: 'wind' },
  RIPOSO: { label: 'Riposo Completo', color: '#757575', icon: 'bed.double.fill' },
  DELOAD: { label: 'Deload', color: '#FFB300', icon: 'arrow.down.circle.fill' },
  GARA: { label: 'Gara', color: '#FFD700', icon: 'flag.checkered' },
};

const getRPEColor = (rpe) => {
  if (rpe <= 3) return '#4CAF50';
  if (rpe <= 5) return '#8BC34A';
  if (rpe <= 7) return '#FFC107';
  if (rpe <= 9) return '#FF9800';
  return '#FF5722';
};

// Simplified training data - only weeks with data
const COMPLETE_TRAINING_DATA = {
  1: {
    0: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3" per fase', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare passivo', rpe: 3 },
          { name: 'Glute Bridge Activation', sets: 2, reps: 12, tempo: 'Pausa 2" alto', rest: '0"', notes: 'RETROVERSIONE prima salire', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione lombare', rpe: 3 },
        ],
        rpe: 3,
        notes: 'Prima routine! Focus forma perfetta'
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core Forza',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: 10, weight: '16kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale, NO iperestensione', rpe: 6 },
          { name: 'Trap-Bar Deadlift', sets: 4, reps: 8, weight: '40kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep, schiena neutra', rpe: 6 },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10/gamba', weight: 'BW', tempo: '2-0-2', rest: '75"', notes: 'Corpo libero, equilibrio focus', rpe: 5 },
          { name: 'Nordic Curl (assistito)', sets: 3, reps: '5-6', weight: 'Elastico forte', tempo: '5" ecc', rest: '90"', notes: 'Resistere caduta, femorali attivi', rpe: 7 },
          { name: 'Ab Wheel (ginocchia)', sets: 4, reps: 8, weight: 'BW', tempo: '4-2-1', rest: '90"', notes: 'RETROVERSIONE costante, stop se lombare estende', rpe: 7 },
          { name: 'Hollow Hold', sets: 4, reps: '35"', weight: 'BW', tempo: 'Isometric', rest: '75"', notes: 'Schiena PIATTA terra', rpe: 6 },
          { name: 'Dead Bug Breathing', sets: 3, reps: 12, weight: 'BW', tempo: '4-2-4 breath', rest: '75"', notes: 'Espira FORTE quando estendi', rpe: 5 },
          { name: 'Pallof Press', sets: 3, reps: '12/lato', weight: 'Elastico forte', tempo: '2" hold', rest: '60"', notes: 'NO rotazione busto', rpe: 5 },
        ],
        rpe: 6.5,
        volume: '90min',
        notes: 'Baseline settimana 1! Registra tutto'
      },
      recovery: {
        time: '18:00-18:15',
        type: 'RECUPERO',
        description: 'Stretching Post-Workout',
        exercises: [
          { name: 'Psoas Stretch', sets: 2, reps: '60"/lato', notes: 'Focus iperlordosi' },
          { name: 'Child\'s Pose', sets: 2, reps: '60"', notes: 'Respirazione profonda' },
          { name: 'Pigeon Pose', sets: 2, reps: '45"/lato', notes: 'Anche mobility' },
        ],
        rpe: 2
      },
      notes: '🎯 PRIMA SESSIONE! Focus: baseline tecnica + tracking rigidità lombare PRE/POST'
    },
    1: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rest: '0"', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rest: '0"', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck Specialist',
        exercises: [
          { name: 'Panca Piana Manubri', sets: 4, reps: 10, weight: '8kg/mano', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte, gomiti 45°', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '35kg', tempo: '2-0-1', rest: '75"', notes: 'Depressione scapole, porta a clavicola', rpe: 6 },
          { name: 'Push-Up Piedi Elevati', sets: 3, reps: '12-15', weight: 'Box 30cm', tempo: '2-0-1', rest: '60"', notes: 'Corpo linea retta', rpe: 6 },
          { name: 'Dumbbell Row Unilaterale', sets: 3, reps: '10/lato', weight: '12kg', tempo: '2-0-1', rest: '45"', notes: 'Schiena piatta, scapola retratta', rpe: 6 },
          { name: 'Neck Isometrics 4 Dir', sets: 4, reps: '30"/dir', weight: 'Mano', tempo: 'Hold', rest: '45"', notes: 'Forza 70% max, NO movimento', rpe: 6 },
          { name: 'Dead-Hang Grip', sets: 3, reps: 'Max tempo', weight: 'BW', tempo: 'Hold', rest: '120"', notes: 'Target 40-50" per serie', rpe: 8 },
        ],
        rpe: 6.5,
        volume: '75min',
        notes: '📊 BASELINE GRIP: Dead-hang best time è CRITICO per tracking futuro'
      },
      recovery: {
        time: '18:00-18:15',
        type: 'RECUPERO',
        description: 'Stretching Upper + Neck',
        exercises: [
          { name: 'Pettorale Stretch', sets: 2, reps: '60"' },
          { name: 'Dorsali Stretch', sets: 2, reps: '60"' },
          { name: 'Neck Stretch 4 Dir', sets: 1, reps: '30"/dir' },
        ],
        rpe: 2
      },
      notes: 'Dead-hang baseline: registra tempo migliore!'
    },
    2: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Bike Z2 Steady State + Core Post-Bike',
        exercises: [
          { 
            name: 'Bike Z2', 
            sets: 1, 
            reps: '75min', 
            weight: 'HR 130-145', 
            tempo: 'Steady', 
            rest: 'N/A', 
            notes: '🚴 Outdoor/Indoor, cadenza 80-90 rpm, acqua ogni 15min', 
            rpe: 6
          },
          { name: 'Plank Hold (post-bike)', sets: 3, reps: '45"', weight: 'BW', tempo: 'Isometric', rest: '30"', notes: '⚠️ SOTTO FATICA = transfer gara', rpe: 7 },
          { name: 'Side Plank (post-bike)', sets: 3, reps: '30"/lato', weight: 'BW', tempo: 'Isometric', rest: '30"', notes: 'Stabilità laterale stanco', rpe: 7 },
          { name: 'Glute Bridge Iso (post-bike)', sets: 3, reps: '40"', weight: 'BW', tempo: 'Isometric', rest: '30"', notes: 'Glutei attivi anche faticati', rpe: 6 },
        ],
        rpe: 6.5,
        volume: '90min',
        notes: '🎯 Core POST-BIKE = transfer cruciale ultimo giro gara. Target: drop <10% giro 1→3'
      },
      recovery: null,
      notes: '🚴 Prima bike Z2 lunga! Monitorare HR + cadenza'
    },
    3: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:15',
        type: 'RESISTENZA',
        description: 'Lower Endurance + Core Specifico',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '45"', weight: 'BW', tempo: 'Isometric', rest: '90"', notes: '🎯 BASELINE! Coscia parallela, schiena muro', rpe: 7 },
          { name: 'Step-Up', sets: 3, reps: '12/gamba', weight: 'BW', tempo: '2-0-2', rest: '60"', notes: 'Box 40cm, spinta tallone', rpe: 5 },
          { name: 'Calf Raise Bipodalico', sets: 4, reps: 20, weight: 'BW', tempo: '2-0-1', rest: '45"', notes: 'Rialzo 10-15cm, ROM completo', rpe: 6 },
          { name: 'Hamstring Curl Fitball', sets: 3, reps: 12, weight: 'BW', tempo: '2-0-2', rest: '75"', notes: 'Piega ginocchia, NO crampi polpacci', rpe: 6 },
          { name: 'Pallof Press Squat Stance', sets: 3, reps: '12/lato', weight: 'Elastico forte', tempo: '2" hold', rest: '60"', notes: 'Anti-rotazione', rpe: 6 },
          { name: 'Side Plank con Rotation', sets: 3, reps: '8/lato', weight: 'BW', tempo: 'Controlled', rest: '60"', notes: 'Thread needle movimento', rpe: 6 },
          { name: 'Dead Bug Long Hold', sets: 3, reps: '6/lato', weight: 'BW', tempo: '10" hold', rest: '60"', notes: 'Box 4-2-4 respirazione', rpe: 6 },
          { name: 'Bird Dog Slow Tempo', sets: 3, reps: '6/lato', weight: 'BW', tempo: '5-3-5', rest: '60"', notes: 'Zero movimento lombare', rpe: 6 },
        ],
        rpe: 6,
        volume: '75min',
        notes: '🎯 Wall Sit BASELINE 45" - target finale sarà 120"×3 = 6 min totali'
      },
      recovery: {
        time: '18:00-18:15',
        type: 'RECUPERO',
        exercises: [
          { name: 'Quad Stretch', sets: 2, reps: '60"/lato' },
          { name: 'Hamstring Stretch', sets: 2, reps: '60"' },
          { name: 'Hip Flexor Stretch', sets: 2, reps: '60"/lato' },
        ],
        rpe: 2
      },
      notes: '📊 Wall sit baseline: fondamentale per tracking progressione'
    },
    4: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RESISTENZA',
        description: 'Upper Endurance + Grip Specialist',
        exercises: [
          { name: 'Push-Up Standard', sets: 4, reps: '15-20', weight: 'BW', tempo: '2-0-1', rest: '60"', notes: 'Target totale: 60-80 reps', rpe: 6 },
          { name: 'Inverted Row', sets: 4, reps: 12, weight: 'BW', tempo: '2-0-1', rest: '60"', notes: 'Sbarra bassa O TRX, 45° inclinazione', rpe: 6 },
          { name: 'Pike Push-Up', sets: 3, reps: '10-12', weight: 'BW', tempo: '2-0-1', rest: '60"', notes: 'Deltoidi anteriori focus', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max tempo', weight: 'BW', tempo: 'Hold', rest: '120"', notes: '🎯 Tentare battere baseline Martedì +5-10"', rpe: 9 },
          { name: 'Wrist Roller Bidirezionale', sets: 3, reps: 'Up+Down', weight: '5kg', tempo: 'Slow', rest: '90"', notes: '⚡ NOVITÀ! Avambracci burn normale', rpe: 7 },
          { name: 'Plate Pinch Hold', sets: 3, reps: 'Max/mano', weight: '2×2.5kg', tempo: 'Hold', rest: '90"', notes: 'Target 20-30"/mano', rpe: 7 },
        ],
        rpe: 7,
        volume: '60min',
        notes: '💪 Grip focus! Dead-hang deve battere baseline Martedì'
      },
      recovery: {
        time: '18:00-18:15',
        type: 'RECUPERO',
        exercises: [
          { name: 'Forearm Stretch', sets: 2, reps: '45"/lato' },
          { name: 'Wrist Circles', sets: 2, reps: '20/dir' },
          { name: 'Upper Back Stretch', sets: 2, reps: '60"' },
        ],
        rpe: 2
      },
      notes: 'Wrist roller: PRIMA VOLTA! Normale se avambracci bruciano'
    },
    5: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:45',
        type: 'RESISTENZA',
        description: 'Bike Z2 Long + Core + 🍌 +600 KCAL',
        exercises: [
          { 
            name: 'Bike Z2 Extended', 
            sets: 1, 
            reps: '90min', 
            weight: 'HR 130-145', 
            tempo: 'Steady', 
            rest: 'N/A', 
            notes: '🍌 +600 KCAL: PRE 190kcal + INTRA 200kcal + POST 225kcal + CENA 115kcal extra', 
            rpe: 6
          },
          { name: 'Plank Hold (post-bike)', sets: 3, reps: '45"', tempo: 'Iso', rest: '30"', notes: 'FATICA metabolica', rpe: 7 },
          { name: 'Side Plank (post-bike)', sets: 3, reps: '30"/lato', tempo: 'Iso', rest: '30"', rpe: 7 },
          { name: 'Glute Bridge Iso (post-bike)', sets: 3, reps: '40"', tempo: 'Iso', rest: '30"', rpe: 6 },
        ],
        rpe: 6,
        volume: '105min',
        notes: '🍌 SABATO +600 KCAL OBBLIGATORIO! PRE: banana+mandorle | INTRA: 2 gel | POST: shake+banana extra | CENA: +pasta+olio'
      },
      recovery: null,
      notes: '⚠️ Calorie totali sabato: ~2670 kcal (vs 2080 normale). Peso sera può salire 0.3-0.5kg = normale (glicogeno)'
    },
    6: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' (OPZIONALE se 6/7 già fatto)',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RECUPERO',
        description: 'Recovery Attivo + Core Volume',
        exercises: [
          { name: 'Walk Aerobico O Yoga', sets: 1, reps: '30-40min', weight: 'N/A', notes: '🧘 HR <120 bpm, conversational, nature', rpe: 3 },
          { name: 'Ab Wheel (ginocchia)', sets: 3, reps: 8, weight: 'BW', tempo: '4-2-1', rest: '90"', rpe: 6 },
          { name: 'Weighted Plank', sets: 3, reps: '50"', weight: 'BW', tempo: 'Iso', rest: '75"', notes: 'Settimana 1: ancora senza zavorra', rpe: 6 },
          { name: 'L-Sit Hold', sets: 3, reps: '15-20"', weight: 'Parallette/terra', tempo: 'Hold', rest: '60"', rpe: 7 },
          { name: 'Hollow Hold Long', sets: 3, reps: '45"', weight: 'BW', tempo: 'Iso', rest: '60"', rpe: 6 },
          { name: 'Superman Hold', sets: 3, reps: '40"', weight: 'BW', tempo: 'Iso', rest: '60"', rpe: 6 },
          { name: 'Side Plank', sets: 3, reps: '40"/lato', weight: 'BW', tempo: 'Iso', rest: '60"', rpe: 6 },
          { name: 'Russian Twist', sets: 3, reps: 20, weight: 'BW', tempo: 'Controlled', rest: '60"', notes: '⚡ NOVITÀ rotational', rpe: 6 },
          { name: 'Pallof Press Slow', sets: 3, reps: '8/lato', weight: 'Elastico', tempo: 'Slow', rest: '60"', rpe: 6 },
          { name: 'Bicycle Crunch', sets: 3, reps: 20, weight: 'BW', tempo: 'Controlled', rest: '60"', rpe: 6 },
        ],
        rpe: 6,
        volume: '60min',
        notes: '📊 Core volume domenica: ~40min. Totale settimana: ~210min'
      },
      recovery: {
        time: '18:00-18:10',
        type: 'RECUPERO',
        exercises: [
          { name: 'Child\'s Pose', sets: 2, reps: '60"' },
          { name: 'Pigeon Pose', sets: 2, reps: '45"/lato' },
          { name: 'Spinal Twist', sets: 2, reps: '30"/lato' },
        ],
        rpe: 2
      },
      notes: '✅ SETTIMANA 1 COMPLETATA! Review domenica sera: aderenza, HRV, rigidità, performance baseline'
    }
  },
  // Add placeholder for other weeks
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
  13: {},
  14: {},
  15: {},
  16: {},
  17: {},
  18: {},
};

function SessionCard({ session, title, onExercisePress }) {
  const type = TRAINING_TYPES[session.type] || TRAINING_TYPES.FORZA_MAX;
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View style={[styles.sessionCard, { borderLeftColor: type.color, borderLeftWidth: 4 }]}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View style={styles.sessionHeader}>
          <View style={[styles.sessionBadge, { backgroundColor: type.color }]}>
            <Text style={styles.sessionBadgeText}>{type.label}</Text>
          </View>
          <Text style={styles.sessionTitle}>{title}</Text>
          <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
        </View>
        {session.time && <Text style={styles.sessionTime}>⏰ {session.time}</Text>}
        <Text style={styles.sessionDescription}>{session.description}</Text>
        {session.rpe && (
          <View style={[styles.rpeBar, { width: `${session.rpe * 10}%`, backgroundColor: getRPEColor(session.rpe) }]}>
            <Text style={styles.sessionRpe}>RPE {session.rpe}/10</Text>
          </View>
        )}
        {session.volume && (
          <Text style={styles.sessionVolume}>⏱️ Volume: {session.volume}</Text>
        )}
      </Pressable>

      {expanded && session.exercises && (
        <View style={styles.exercisesList}>
          <Text style={styles.exercisesTitle}>📋 Esercizi ({session.exercises.length}):</Text>
          {session.exercises.map((exercise, idx) => (
            <Pressable
              key={idx}
              style={styles.exerciseItem}
              onPress={() => onExercisePress(exercise)}
            >
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>
                  {idx + 1}. {exercise.name}
                </Text>
              </View>
              {exercise.sets && (
                <Text style={styles.exerciseDetails}>
                  {exercise.sets}×{exercise.reps}
                  {exercise.weight && ` @ ${exercise.weight}`}
                  {exercise.tempo && ` | Tempo: ${exercise.tempo}`}
                </Text>
              )}
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
              )}
            </Pressable>
          ))}
        </View>
      )}

      {session.notes && (
        <View style={styles.sessionNotesBox}>
          <Text style={styles.sessionNotesText}>💡 {session.notes}</Text>
        </View>
      )}
    </View>
  );
}

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getWeekDates = (weekNumber) => {
    const startDate = new Date('2025-11-16'); // 16 Nov 2025
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(selectedWeek);
  const currentDayData = selectedDay !== null ? COMPLETE_TRAINING_DATA[selectedWeek]?.[selectedDay] : null;

  const openExerciseDetail = (exercise) => {
    setSelectedExercise(exercise);
    setDetailModalVisible(true);
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Calendario 18 Settimane',
          }}
        />
      )}
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Week Selector */}
          <View style={[commonStyles.card, styles.weekSelector]}>
            <Text style={styles.sectionTitle}>Seleziona Settimana</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekList}
            >
              {weeks.map((week) => {
                let mesoLabel = '';
                if (week <= 3) mesoLabel = 'M1';
                else if (week === 4) mesoLabel = 'D1';
                else if (week <= 8) mesoLabel = 'M2';
                else if (week === 9) mesoLabel = 'M2B';
                else if (week <= 11) mesoLabel = 'M3';
                else if (week === 12) mesoLabel = 'D3';
                else if (week <= 15) mesoLabel = 'M3B';
                else if (week === 16) mesoLabel = 'D4+T';
                else mesoLabel = 'TAPER';

                const hasData = COMPLETE_TRAINING_DATA[week] && Object.keys(COMPLETE_TRAINING_DATA[week]).length > 0;

                return (
                  <Pressable
                    key={week}
                    style={[
                      styles.weekButton,
                      selectedWeek === week && styles.weekButtonActive,
                      [4, 8, 12, 16].includes(week) && styles.weekButtonDeload,
                      !hasData && styles.weekButtonNoData,
                    ]}
                    onPress={() => {
                      setSelectedWeek(week);
                      setSelectedDay(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.weekButtonText,
                        selectedWeek === week && styles.weekButtonTextActive,
                      ]}
                    >
                      S{week}
                    </Text>
                    <Text style={[styles.weekButtonMeso, selectedWeek === week && styles.weekButtonTextActive]}>
                      {mesoLabel}
                    </Text>
                    {!hasData && <Text style={styles.noDataIndicator}>⚠️</Text>}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Week View */}
          <View style={[commonStyles.card]}>
            <View style={styles.weekHeader}>
              <Text style={styles.sectionTitle}>Settimana {selectedWeek}</Text>
              <Text style={styles.weekDates}>
                {weekDates[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - {' '}
                {weekDates[6].toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
              </Text>
            </View>

            {!COMPLETE_TRAINING_DATA[selectedWeek] || Object.keys(COMPLETE_TRAINING_DATA[selectedWeek]).length === 0 ? (
              <View style={styles.noDataMessage}>
                <Text style={styles.noDataText}>⚠️ Dati non ancora disponibili per questa settimana</Text>
                <Text style={styles.noDataSubtext}>Settimane con dati: 1, 2, 3, 4, 10, 15, 18</Text>
              </View>
            ) : (
              <View style={styles.daysGrid}>
                {daysOfWeek.map((day, index) => {
                  const date = weekDates[index];
                  const isSelected = selectedDay === index;
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayData = COMPLETE_TRAINING_DATA[selectedWeek]?.[index];
                  const mainType = dayData?.main?.type || 'RIPOSO';
                  const typeColor = TRAINING_TYPES[mainType]?.color || '#757575';
                  
                  return (
                    <Pressable
                      key={index}
                      style={[
                        styles.dayCard,
                        isSelected && styles.dayCardSelected,
                        isToday && styles.dayCardToday,
                      ]}
                      onPress={() => setSelectedDay(index)}
                    >
                      <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                        {day}
                      </Text>
                      <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                        {date.getDate()}
                      </Text>
                      <View style={[styles.dayIndicator, { backgroundColor: typeColor }]} />
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {/* Day Details */}
          {selectedDay !== null && currentDayData && (
            <>
              <View style={[commonStyles.card]}>
                <View style={styles.dayDetailHeader}>
                  <Text style={styles.sectionTitle}>
                    {daysOfWeek[selectedDay]} {weekDates[selectedDay].getDate()} {weekDates[selectedDay].toLocaleDateString('it-IT', { month: 'long' })}
                  </Text>
                  {currentDayData.main && (
                    <View style={[styles.rpeSmallBadge, { backgroundColor: getRPEColor(currentDayData.main.rpe) }]}>
                      <Text style={styles.rpeSmallText}>RPE {currentDayData.main.rpe}</Text>
                    </View>
                  )}
                </View>
                
                {currentDayData.morning && (
                  <SessionCard 
                    session={currentDayData.morning} 
                    title="🌅 Mattutina" 
                    onExercisePress={openExerciseDetail}
                  />
                )}

                {currentDayData.main && (
                  <SessionCard 
                    session={currentDayData.main} 
                    title="💪 Principale" 
                    onExercisePress={openExerciseDetail}
                  />
                )}

                {currentDayData.recovery && (
                  <SessionCard 
                    session={currentDayData.recovery} 
                    title="🔄 Recupero" 
                    onExercisePress={openExerciseDetail}
                  />
                )}

                {currentDayData.notes && (
                  <View style={styles.dayNotesCard}>
                    <Text style={styles.dayNotesTitle}>📝 Note Giornata:</Text>
                    <Text style={styles.dayNotesText}>{currentDayData.notes}</Text>
                  </View>
                )}
              </View>
            </>
          )}

          {/* Legend */}
          <View style={[commonStyles.card, styles.legendCard]}>
            <Text style={styles.sectionTitle}>Legenda Allenamenti</Text>
            {Object.entries(TRAINING_TYPES).map(([key, value]) => (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: value.color }]} />
                <Text style={styles.legendText}>{value.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Exercise Detail Modal */}
      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedExercise && (
                <>
                  <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                  
                  {selectedExercise.sets && (
                    <View style={styles.exerciseDetailRow}>
                      <Text style={styles.exerciseDetailLabel}>📊 Volume:</Text>
                      <Text style={styles.exerciseDetailValue}>
                        {selectedExercise.sets}×{selectedExercise.reps}
                        {selectedExercise.weight && ` @ ${selectedExercise.weight}`}
                      </Text>
                    </View>
                  )}

                  {selectedExercise.tempo && (
                    <View style={styles.exerciseDetailRow}>
                      <Text style={styles.exerciseDetailLabel}>⏱️ Tempo:</Text>
                      <Text style={styles.exerciseDetailValue}>{selectedExercise.tempo}</Text>
                    </View>
                  )}

                  {selectedExercise.rest && (
                    <View style={styles.exerciseDetailRow}>
                      <Text style={styles.exerciseDetailLabel}>💤 Recupero:</Text>
                      <Text style={styles.exerciseDetailValue}>{selectedExercise.rest}</Text>
                    </View>
                  )}

                  {selectedExercise.rpe && (
                    <View style={styles.exerciseDetailRow}>
                      <Text style={styles.exerciseDetailLabel}>🔥 RPE:</Text>
                      <View style={[styles.rpeBadge, { backgroundColor: getRPEColor(selectedExercise.rpe) }]}>
                        <Text style={styles.rpeBadgeText}>{selectedExercise.rpe}/10</Text>
                      </View>
                    </View>
                  )}

                  {selectedExercise.notes && (
                    <View style={styles.exerciseNotesSection}>
                      <Text style={styles.exerciseNotesLabel}>📝 Note Tecniche:</Text>
                      <Text style={styles.exerciseNotesText}>{selectedExercise.notes}</Text>
                    </View>
                  )}

                  <Pressable 
                    style={styles.closeButton}
                    onPress={() => setDetailModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Chiudi</Text>
                  </Pressable>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  weekSelector: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  weekList: {
    flexDirection: 'row',
    gap: 8,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    minWidth: 70,
    alignItems: 'center',
  },
  weekButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  weekButtonDeload: {
    borderColor: '#FFB300',
    borderWidth: 2,
  },
  weekButtonNoData: {
    opacity: 0.5,
  },
  weekButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
  },
  weekButtonMeso: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  noDataIndicator: {
    fontSize: 10,
    marginTop: 2,
  },
  weekHeader: {
    marginBottom: 16,
  },
  weekDates: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  noDataMessage: {
    padding: 24,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  noDataSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCard: {
    flex: 1,
    minWidth: '13%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayCardToday: {
    borderColor: colors.accent,
    borderWidth: 3,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  dayNameSelected: {
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  dayDateSelected: {
    color: '#FFFFFF',
  },
  dayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  dayDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rpeSmallBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rpeSmallText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sessionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  sessionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  expandIcon: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  rpeBar: {
    height: 6,
    borderRadius: 3,
    marginVertical: 8,
  },
  sessionRpe: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 8,
  },
  sessionVolume: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  exercisesList: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  exercisesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  exerciseItem: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  exerciseDetails: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  exerciseNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  sessionNotesBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  sessionNotesText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dayNotesCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  dayNotesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  dayNotesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  legendCard: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  exerciseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  exerciseDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  rpeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rpeBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exerciseNotesSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  exerciseNotesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  exerciseNotesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
