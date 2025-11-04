
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';

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

const STORAGE_KEY = '@calendar_data';
const COMPLETION_KEY = '@calendar_completion';

// Complete training data structure (abbreviated for space - includes weeks 1, 4, 10, 15, 18)
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
          { name: 'Neck Isometrics 4 Dir', sets: 4, reps: '30"/dir', weight: 'Mano', tempo: 'Hold', rest: '45"', notes: 'Forza 70% max, NO movimento', rpe: 6 },
        ],
        rpe: 6.5,
        volume: '75min',
        notes: 'Baseline neck strength'
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
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Bike Z2 Steady State + Core Post-Bike',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '75min', weight: 'HR 130-145', tempo: 'Steady', rest: 'N/A', notes: '🚴 Outdoor/Indoor, cadenza 80-90 rpm', rpe: 6 },
          { name: 'Plank Hold (post-bike)', sets: 3, reps: '45"', weight: 'BW', tempo: 'Isometric', rest: '30"', notes: '⚠️ SOTTO FATICA = transfer gara', rpe: 7 },
        ],
        rpe: 6.5,
        volume: '90min',
        notes: '🎯 Core POST-BIKE = transfer cruciale ultimo giro gara'
      },
      notes: '🚴 Prima bike Z2 lunga! Monitorare HR + cadenza'
    },
    3: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:15',
        type: 'RESISTENZA',
        description: 'Lower Endurance + Core Specifico',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '45"', weight: 'BW', tempo: 'Isometric', rest: '90"', notes: '🎯 BASELINE! Coscia parallela', rpe: 7 },
          { name: 'Step-Up', sets: 3, reps: '12/gamba', weight: 'BW', tempo: '2-0-2', rest: '60"', notes: 'Box 40cm, spinta tallone', rpe: 5 },
        ],
        rpe: 6,
        volume: '75min',
        notes: '🎯 Wall Sit BASELINE 45" - target finale sarà 120"×3'
      },
      notes: 'Wall sit baseline: fondamentale per tracking progressione'
    },
    4: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RESISTENZA',
        description: 'Upper Endurance + Grip Specialist',
        exercises: [
          { name: 'Push-Up Standard', sets: 4, reps: '15-20', weight: 'BW', tempo: '2-0-1', rest: '60"', notes: 'Target totale: 60-80 reps', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max tempo', weight: 'BW', tempo: 'Hold', rest: '120"', notes: '🎯 Tentare battere baseline', rpe: 9 },
        ],
        rpe: 7,
        volume: '60min',
        notes: '💪 Grip focus! Dead-hang deve battere baseline'
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
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:45',
        type: 'RESISTENZA',
        description: 'Bike Z2 Long + Core + 🍌 +600 KCAL',
        exercises: [
          { name: 'Bike Z2 Extended', sets: 1, reps: '90min', weight: 'HR 130-145', tempo: 'Steady', rest: 'N/A', notes: '🍌 +600 KCAL protocol', rpe: 6 },
          { name: 'Plank Hold (post-bike)', sets: 3, reps: '45"', tempo: 'Iso', rest: '30"', notes: 'FATICA metabolica', rpe: 7 },
        ],
        rpe: 6,
        volume: '105min',
        notes: '🍌 SABATO +600 KCAL OBBLIGATORIO!'
      },
      notes: '⚠️ Calorie totali sabato: ~2670 kcal'
    },
    6: {
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' (OPZIONALE)',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RECUPERO',
        description: 'Recovery Attivo + Core Volume',
        exercises: [
          { name: 'Walk Aerobico O Yoga', sets: 1, reps: '30-40min', weight: 'N/A', notes: '🧘 HR <120 bpm', rpe: 3 },
          { name: 'Ab Wheel (ginocchia)', sets: 3, reps: 8, weight: 'BW', tempo: '4-2-1', rest: '90"', rpe: 6 },
        ],
        rpe: 6,
        volume: '60min',
        notes: '📊 Core volume domenica: ~40min'
      },
      notes: '✅ SETTIMANA 1 COMPLETATA!'
    }
  }
};

const getRPEColor = (rpe) => {
  if (rpe <= 3) return '#4CAF50';
  if (rpe <= 5) return '#8BC34A';
  if (rpe <= 7) return '#FFC107';
  if (rpe <= 8) return '#FF9800';
  return '#FF5722';
};

const SessionCard = ({ session, title, onExercisePress, onToggleComplete, isCompleted }) => {
  if (!session) return null;

  const typeInfo = TRAINING_TYPES[session.type] || TRAINING_TYPES.RIPOSO;

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionTitleRow}>
          <IconSymbol name={typeInfo.icon} size={20} color={typeInfo.color} />
          <Text style={styles.sessionTitle}>{title}</Text>
        </View>
        {session.rpe && (
          <View style={[styles.rpeSmallBadge, { backgroundColor: getRPEColor(session.rpe) }]}>
            <Text style={styles.rpeSmallText}>RPE {session.rpe}</Text>
          </View>
        )}
      </View>

      {session.time && (
        <Text style={styles.sessionTime}>⏰ {session.time}</Text>
      )}

      <Text style={styles.sessionDescription}>{session.description}</Text>

      {session.exercises && session.exercises.length > 0 && (
        <View style={styles.exercisesList}>
          <Text style={styles.exercisesTitle}>Esercizi ({session.exercises.length}):</Text>
          {session.exercises.slice(0, 3).map((exercise, index) => (
            <Pressable
              key={index}
              style={styles.exerciseItem}
              onPress={() => onExercisePress(exercise)}
            >
              <Text style={styles.exerciseName}>• {exercise.name}</Text>
              {exercise.sets && (
                <Text style={styles.exerciseDetails}>
                  {exercise.sets}×{exercise.reps}
                  {exercise.weight && ` @ ${exercise.weight}`}
                </Text>
              )}
            </Pressable>
          ))}
          {session.exercises.length > 3 && (
            <Text style={styles.moreExercises}>
              +{session.exercises.length - 3} altri esercizi
            </Text>
          )}
        </View>
      )}

      {session.notes && (
        <View style={styles.sessionNotes}>
          <Text style={styles.sessionNotesText}>{session.notes}</Text>
        </View>
      )}

      <Pressable
        style={[styles.completeButton, isCompleted && styles.completeButtonActive]}
        onPress={onToggleComplete}
      >
        <IconSymbol
          name={isCompleted ? 'checkmark.circle.fill' : 'circle'}
          size={20}
          color={isCompleted ? colors.success : colors.textSecondary}
        />
        <Text style={[styles.completeButtonText, isCompleted && styles.completeButtonTextActive]}>
          {isCompleted ? 'Completato' : 'Segna come completato'}
        </Text>
      </Pressable>
    </View>
  );
};

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weekData, setWeekData] = useState(COMPLETE_TRAINING_DATA);
  const [completionData, setCompletionData] = useState({});
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');
  const [editingSession, setEditingSession] = useState(null);

  useEffect(() => {
    loadCompletionData();
  }, []);

  const loadCompletionData = async () => {
    try {
      const data = await AsyncStorage.getItem(COMPLETION_KEY);
      if (data) {
        setCompletionData(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading completion data:', error);
    }
  };

  const saveCompletionData = async (newData) => {
    try {
      await AsyncStorage.setItem(COMPLETION_KEY, JSON.stringify(newData));
      setCompletionData(newData);
    } catch (error) {
      console.log('Error saving completion data:', error);
    }
  };

  const toggleSessionComplete = (week, day, sessionType) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const key = `${week}-${day}-${sessionType}`;
    const newData = {
      ...completionData,
      [key]: !completionData[key]
    };
    saveCompletionData(newData);
  };

  const isSessionComplete = (week, day, sessionType) => {
    const key = `${week}-${day}-${sessionType}`;
    return completionData[key] || false;
  };

  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getWeekDates = (weekNumber) => {
    const startDate = new Date('2025-11-16');
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(selectedWeek);
  const currentDayData = selectedDay !== null ? weekData[selectedWeek]?.[selectedDay] : null;

  const openExerciseDetail = (exercise) => {
    setSelectedExercise(exercise);
    setDetailModalVisible(true);
  };

  const getMesoLabel = (week) => {
    if (week <= 3) return 'M1';
    if (week === 4) return 'D1';
    if (week <= 8) return 'M2';
    if (week === 9) return 'M2B';
    if (week <= 11) return 'M3';
    if (week === 12) return 'D3';
    if (week <= 15) return 'M3B';
    if (week === 16) return 'D4+T';
    return 'TAPER';
  };

  const getDayCompletionStatus = (week, day) => {
    const dayData = weekData[week]?.[day];
    if (!dayData) return { total: 0, completed: 0 };

    let total = 0;
    let completed = 0;

    if (dayData.morning) {
      total++;
      if (isSessionComplete(week, day, 'morning')) completed++;
    }
    if (dayData.main) {
      total++;
      if (isSessionComplete(week, day, 'main')) completed++;
    }
    if (dayData.recovery) {
      total++;
      if (isSessionComplete(week, day, 'recovery')) completed++;
    }

    return { total, completed };
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
                const mesoLabel = getMesoLabel(week);
                const isDeload = [4, 8, 12, 16].includes(week);

                return (
                  <Pressable
                    key={week}
                    style={[
                      styles.weekButton,
                      selectedWeek === week && styles.weekButtonActive,
                      isDeload && styles.weekButtonDeload,
                    ]}
                    onPress={() => {
                      if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
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

            <View style={styles.daysGrid}>
              {daysOfWeek.map((day, index) => {
                const date = weekDates[index];
                const isSelected = selectedDay === index;
                const isToday = date.toDateString() === new Date().toDateString();
                const dayData = weekData[selectedWeek]?.[index];
                const mainType = dayData?.main?.type || 'RIPOSO';
                const typeColor = TRAINING_TYPES[mainType]?.color || '#757575';
                const completion = getDayCompletionStatus(selectedWeek, index);
                
                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.dayCard,
                      isSelected && styles.dayCardSelected,
                      isToday && styles.dayCardToday,
                    ]}
                    onPress={() => {
                      if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      setSelectedDay(index);
                    }}
                  >
                    <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                      {day}
                    </Text>
                    <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                      {date.getDate()}
                    </Text>
                    <View style={[styles.dayIndicator, { backgroundColor: typeColor }]} />
                    {completion.total > 0 && (
                      <Text style={styles.completionText}>
                        {completion.completed}/{completion.total}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
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
                    onToggleComplete={() => toggleSessionComplete(selectedWeek, selectedDay, 'morning')}
                    isCompleted={isSessionComplete(selectedWeek, selectedDay, 'morning')}
                  />
                )}

                {currentDayData.main && (
                  <SessionCard 
                    session={currentDayData.main} 
                    title="💪 Principale" 
                    onExercisePress={openExerciseDetail}
                    onToggleComplete={() => toggleSessionComplete(selectedWeek, selectedDay, 'main')}
                    isCompleted={isSessionComplete(selectedWeek, selectedDay, 'main')}
                  />
                )}

                {currentDayData.recovery && (
                  <SessionCard 
                    session={currentDayData.recovery} 
                    title="🔄 Recupero" 
                    onExercisePress={openExerciseDetail}
                    onToggleComplete={() => toggleSessionComplete(selectedWeek, selectedDay, 'recovery')}
                    isCompleted={isSessionComplete(selectedWeek, selectedDay, 'recovery')}
                  />
                )}

                {currentDayData.notes && (
                  <View style={styles.dayNotesCard}>
                    <Text style={styles.dayNotesTitle}>📝 Note Giornata:</Text>
                    <Text style={styles.dayNotesText}>{currentDayData.notes}</Text>
                  </View>
                )}
              </View>

              {/* Info Cards */}
              {selectedWeek <= 9 && (
                <View style={[commonStyles.card, styles.warningCard]}>
                  <Text style={styles.warningTitle}>⚠️ Attenzione Iperlordosi</Text>
                  <Text style={styles.warningText}>
                    - NO iperestensioni lombari{'\n'}
                    - Core anti-estensione quotidiano{'\n'}
                    - RETROVERSIONE attiva sempre{'\n'}
                    - Monitor rigidità lombare PRE/POST
                  </Text>
                </View>
              )}

              {selectedWeek >= 10 && (
                <View style={[commonStyles.card, styles.moto3Card]}>
                  <Text style={styles.moto3Title}>🏍️ Transfer Specifico Moto3</Text>
                  <Text style={styles.moto3Text}>
                    {selectedWeek >= 10 && selectedWeek <= 11 && '- RSA intervals: 8×30" Z4-Z5\n- Plank casco: 45-65"\n- Farmer\'s walks: grip endurance\n- Dual-task cognitive'}
                    {selectedWeek === 12 && '- DELOAD week - Recovery\n- Preparazione peak transfer'}
                    {selectedWeek >= 13 && selectedWeek <= 15 && '- PEAK TRANSFER:\n- Metabolic circuit 5 giri\n- RSA 6×30" Z5\n- Plank casco: 70-90"\n- Wall sit: 100-120"\n- Race simulation'}
                    {selectedWeek === 16 && '- DELOAD + TAPER START\n- Volume -40%, Intensità mantenuta'}
                    {selectedWeek >= 17 && '- TAPER + PEAK READINESS\n- Freshness building\n- Mental prep\n- KPI test (sett 18)'}
                  </Text>
                </View>
              )}
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
    paddingRight: 16,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
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
    fontWeight: '500',
    color: colors.textSecondary,
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
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCard: {
    width: '13%',
    minWidth: 45,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
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
    borderWidth: 2,
  },
  dayName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  dayNameSelected: {
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
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
  completionText: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dayDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rpeSmallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rpeSmallText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sessionTime: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    fontWeight: '500',
  },
  exercisesList: {
    marginTop: 8,
  },
  exercisesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  exerciseItem: {
    paddingVertical: 6,
    paddingLeft: 8,
  },
  exerciseName: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  exerciseDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  moreExercises: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  sessionNotes: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  sessionNotesText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  completeButtonActive: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  completeButtonTextActive: {
    color: colors.success,
  },
  dayNotesCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayNotesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  dayNotesText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
    borderWidth: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
  },
  moto3Card: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  moto3Title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 8,
  },
  moto3Text: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 20,
  },
  legendCard: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
    ...shadows.large,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  exerciseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseDetailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  exerciseDetailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  rpeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rpeBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exerciseNotesSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  exerciseNotesLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  exerciseNotesText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
