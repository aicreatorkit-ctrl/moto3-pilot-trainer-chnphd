
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const TRAINING_TYPES = {
  FORZA_MAX: { label: 'Forza Massimale', color: '#FF4444', icon: 'dumbbell.fill', emoji: '💪' },
  POTENZA: { label: 'Potenza', color: '#FF8C00', icon: 'bolt.fill', emoji: '⚡' },
  RESISTENZA: { label: 'Resistenza', color: '#4CAF50', icon: 'figure.run', emoji: '🏃' },
  TECNICO: { label: 'Tecnico Specifico', color: '#2196F3', icon: 'figure.motorcycle', emoji: '🏍️' },
  MOBILITA: { label: 'Mobilità/Correttivo', color: '#9C27B0', icon: 'figure.flexibility', emoji: '🧘' },
  RECUPERO: { label: 'Recupero Attivo', color: '#00BCD4', icon: 'wind', emoji: '💆' },
  RIPOSO: { label: 'Riposo Completo', color: '#757575', icon: 'bed.double.fill', emoji: '😴' },
  GARA: { label: 'Gara', color: '#FFD700', icon: 'flag.checkered', emoji: '🏁' },
  DELOAD: { label: 'Deload', color: '#00BCD4', icon: 'leaf.fill', emoji: '🍃' },
  TAPER: { label: 'Taper', color: '#FFD700', icon: 'bolt.circle.fill', emoji: '⚡' },
};

// Funzione per parsare gli esercizi dalla descrizione
const parseExercises = (description) => {
  if (!description) return [];
  
  // Separa gli esercizi usando | o newline
  const exerciseStrings = description.split(/\s*\|\s*|\n/).filter(e => e.trim());
  
  return exerciseStrings.map((exerciseStr, index) => {
    // Cerca pattern come "Nome Esercizio 4×10" o "Nome Esercizio 3×12-15"
    const match = exerciseStr.match(/^(.+?)\s+(\d+[×x]\d+(?:-\d+)?(?:\/\w+)?(?:\s*\[.*?\])?)(.*)$/);
    
    if (match) {
      return {
        id: index,
        name: match[1].trim(),
        sets: match[2].trim(),
        notes: match[3].trim()
      };
    }
    
    // Se non trova il pattern, restituisce l'esercizio completo come nome
    return {
      id: index,
      name: exerciseStr.trim(),
      sets: '',
      notes: ''
    };
  });
};

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [weekData, setWeekData] = useState({});
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    const trainingData = getTrainingData();
    setWeekData(trainingData);
  }, []);

  const getTrainingData = () => {
    const data = {};
    
    // SETTIMANA 1 (16-22 Novembre 2025) - Anatomical Adaptation
    data[1] = {
      0: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Cat-Cow 2×15 | Child\'s Pose 2×45" | Glute Bridge 2×12 | Psoas Stretch 2×40"/lato',
          reps: '2×15, 2×45", 2×12, 2×40"',
          execution: 'Movimenti controllati, respirazione profonda',
          focus: 'Mobilità colonna e anche',
          recovery: 'Nessuno (flusso continuo)',
          rpe: 3 
        },
        main: { 
          time: '10:00-12:00', 
          type: 'FORZA_MAX', 
          description: 'Goblet Squat KB 16kg 4×10 | Trap-Bar Deadlift 40kg 4×8 | Bulgarian Split BW 3×10 | Nordic Curl 3×5-6',
          reps: '4×10, 4×8, 3×10, 3×5-6',
          execution: 'Tempo 3-0-1-0, controllo eccentrico',
          focus: 'Tecnica perfetta, baseline forza',
          recovery: '90" tra serie, 2\' tra esercizi',
          rpe: 6 
        },
        recovery: { 
          time: '18:00-18:30', 
          type: 'RECUPERO', 
          description: 'Ab Wheel 4×8 | Hollow Hold 4×35" | Dead Bug 3×12 | Pallof Press 3×12/lato',
          reps: '4×8, 4×35", 3×12, 3×12',
          execution: 'Core sempre attivo, no compensi lombari',
          focus: 'Anti-estensione, stabilità',
          recovery: '60" tra serie',
          rpe: 7 
        },
        notes: 'MESO 1A - Baseline tecnica perfetta. Target: aderenza 85%+'
      },
      1: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Routine mattutina completa',
          reps: 'Vedi routine standard',
          execution: 'Movimenti fluidi',
          focus: 'Attivazione generale',
          recovery: 'Nessuno',
          rpe: 3 
        },
        main: { 
          time: '10:00-12:00', 
          type: 'FORZA_MAX', 
          description: 'Panca Manubri 8kg 4×10 | Lat Pull-Down 35kg 4×10 | Push-Up Piedi Elevati 30cm 3×12-15 | DB Row 12kg 3×10/lato',
          reps: '4×10, 4×10, 3×12-15, 3×10',
          execution: 'ROM completo, scapole retratte',
          focus: 'Upper body baseline',
          recovery: '90" tra serie',
          rpe: 6 
        },
        recovery: { 
          time: '18:00-18:30', 
          type: 'RECUPERO', 
          description: 'Neck Isometrics 4×30" (4 direzioni) | Dead-Hang 3×max tempo [BASELINE]',
          reps: '4×30", 3×max',
          execution: 'Isometria massimale, no movimento',
          focus: 'Neck strength, grip endurance',
          recovery: '60" tra serie',
          rpe: 6 
        },
        notes: 'Dead-hang baseline critico per tracking progressione'
      },
      2: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Routine mattutina completa',
          reps: 'Standard',
          execution: 'Fluido',
          focus: 'Attivazione',
          recovery: 'Nessuno',
          rpe: 3 
        },
        main: { 
          time: '10:00-11:15', 
          type: 'RESISTENZA', 
          description: 'Bike Z2 75min @ 130-145bpm steady state',
          reps: '75min continui',
          execution: 'Cadenza 80-90rpm, posizione aero',
          focus: 'Base aerobica, endurance',
          recovery: 'Nessuno (steady state)',
          rpe: 5 
        },
        recovery: { 
          time: '11:15-11:30', 
          type: 'RECUPERO', 
          description: 'Core Post-Bike (sotto fatica): 3 giri → Plank 45" | Side Plank 30"/lato | Glute Bridge 40"',
          reps: '3 giri (45", 30", 40")',
          execution: 'Sotto fatica metabolica',
          focus: 'Core endurance race simulation',
          recovery: '30" tra esercizi',
          rpe: 6 
        },
        notes: 'Core sotto fatica metabolica = transfer gara'
      },
      3: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Routine mattutina completa',
          reps: 'Standard',
          execution: 'Fluido',
          focus: 'Attivazione',
          recovery: 'Nessuno',
          rpe: 3 
        },
        main: { 
          time: '10:00-11:15', 
          type: 'RESISTENZA', 
          description: 'Wall Sit 3×45" [BASELINE] | Step-Up BW 3×12/gamba | Calf Raise 4×20 | Hamstring Curl Fitball 3×12',
          reps: '3×45", 3×12, 4×20, 3×12',
          execution: 'Isometria 90°, step controllato',
          focus: 'Lower endurance, baseline wall sit',
          recovery: '60" tra serie',
          rpe: 6 
        },
        recovery: { 
          time: '18:00-18:30', 
          type: 'RECUPERO', 
          description: 'Pallof Press 3×10/lato | Side Plank Rotation 3×8/lato | Dead Bug Long 3×6/lato | Bird Dog 3×6/lato',
          reps: '3×10, 3×8, 3×6, 3×6',
          execution: 'Anti-rotazione massimale',
          focus: 'Stabilità rotazionale',
          recovery: '45" tra serie',
          rpe: 6 
        },
        notes: 'Wall sit baseline importante: target 120" finale'
      },
      4: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Routine mattutina completa',
          reps: 'Standard',
          execution: 'Fluido',
          focus: 'Attivazione',
          recovery: 'Nessuno',
          rpe: 3 
        },
        main: { 
          time: '10:00-11:00', 
          type: 'RESISTENZA', 
          description: 'Push-Up Standard 4×15-20 (target 60-80 totali) | Inverted Row 4×12 | Pike Push-Up 3×10-12',
          reps: '4×15-20, 4×12, 3×10-12',
          execution: 'ROM completo, corpo rigido',
          focus: 'Upper endurance',
          recovery: '60" tra serie',
          rpe: 6 
        },
        recovery: { 
          time: '18:00-18:30', 
          type: 'RECUPERO', 
          description: 'Dead-Hang 4×max | Wrist Roller 5kg 3× | Plate Pinch 5kg 3×max/mano',
          reps: '4×max, 3×full, 3×max',
          execution: 'Presa massimale, no swing',
          focus: 'Grip endurance baseline',
          recovery: '90" tra serie',
          rpe: 7 
        },
        notes: 'Baseline grip: dead-hang ~40-50" expected'
      },
      5: {
        morning: { 
          time: '06:00-06:12', 
          type: 'MOBILITA', 
          description: 'Routine mattutina completa',
          reps: 'Standard',
          execution: 'Fluido',
          focus: 'Attivazione',
          recovery: 'Nessuno',
          rpe: 3 
        },
        main: { 
          time: '10:00-11:30', 
          type: 'RESISTENZA', 
          description: 'Bike Z2 90min @ 130-145bpm | Gel min 30+60 | Core Post-Bike 15min',
          reps: '90min + 15min core',
          execution: 'Steady state, nutrizione intra',
          focus: 'Endurance lunga, core fatica',
          recovery: 'Nessuno (steady)',
          rpe: 5 
        },
        recovery: null,
        notes: '🍽️ +600 KCAL: PRE +190 (banana+mandorle) | INTRA +200 (2 gel) | POST +85 (shake+banana extra) | CENA +115 (pasta+olio)'
      },
      6: {
        morning: { 
          time: '08:00-08:30', 
          type: 'MOBILITA', 
          description: 'Routine opzionale (6/7 ok)',
          reps: 'Opzionale',
          execution: 'Dolce',
          focus: 'Recovery',
          recovery: 'Completo',
          rpe: 2 
        },
        main: { 
          time: '10:00-10:30', 
          type: 'RECUPERO', 
          description: 'Walk 30-40min <120bpm O Yoga 30min',
          reps: '30-40min',
          execution: 'Molto leggero',
          focus: 'Recovery attivo',
          recovery: 'Completo',
          rpe: 3 
        },
        recovery: { 
          time: '18:00-18:40', 
          type: 'RECUPERO', 
          description: 'Core Volume 40min: Ab Wheel 3×8 | Weighted Plank BW 3×50" | L-Sit 3×15-20" | Russian Twist BW 3×20',
          reps: '3×8, 3×50", 3×15-20", 3×20',
          execution: 'Volume alto, intensità media',
          focus: 'Core capacity building',
          recovery: '45" tra serie',
          rpe: 6 
        },
        notes: 'Riposo attivo + core volume domenicale'
      }
    };

    // Aggiungi settimane 2-18 con struttura simile
    for (let week = 2; week <= 18; week++) {
      data[week] = {};
      for (let day = 0; day < 7; day++) {
        const isDeloadWeek = week === 4 || week === 8 || week === 12 || week === 16;
        const isTaperWeek = week >= 17;
        const mainType = isDeloadWeek ? 'DELOAD' : 
                        isTaperWeek ? 'TAPER' : 
                        week >= 13 ? 'TECNICO' : 
                        week >= 10 ? 'POTENZA' : 
                        week >= 5 ? 'FORZA_MAX' : 'FORZA_MAX';
        
        data[week][day] = {
          morning: { 
            time: '06:00-06:12', 
            type: 'MOBILITA', 
            description: `Settimana ${week} - Routine mattutina`,
            reps: 'Standard',
            execution: 'Fluido',
            focus: 'Attivazione',
            recovery: 'Nessuno',
            rpe: 3 
          },
          main: { 
            time: '10:00-12:00', 
            type: mainType,
            description: `Settimana ${week} - Allenamento principale giorno ${day + 1}`,
            reps: 'Da definire',
            execution: 'Controllato',
            focus: 'Progressione',
            recovery: '90" tra serie',
            rpe: isDeloadWeek ? 4 : isTaperWeek ? 5 : 7
          },
          recovery: day !== 6 ? { 
            time: '18:00-18:30', 
            type: 'RECUPERO', 
            description: `Core e recupero settimana ${week}`,
            reps: 'Standard',
            execution: 'Controllato',
            focus: 'Recovery',
            recovery: '60"',
            rpe: 6 
          } : null,
          notes: `Settimana ${week} - Giorno ${day + 1}. Personalizza con i tuoi dati.`
        };
      }
    }
    
    return data;
  };

  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getWeekDates = (weekNumber) => {
    const startDate = new Date(2025, 10, 16);
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  };

  const getWeekSummary = (weekNumber) => {
    const weekInfo = weekData[weekNumber];
    if (!weekInfo) return { totalSessions: 0, avgRPE: 0, types: {} };

    let totalSessions = 0;
    let totalRPE = 0;
    let rpeCount = 0;
    const types = {};

    Object.values(weekInfo).forEach((day) => {
      ['morning', 'main', 'recovery'].forEach((sessionType) => {
        if (day[sessionType]) {
          totalSessions++;
          const session = day[sessionType];
          if (session.rpe) {
            totalRPE += session.rpe;
            rpeCount++;
          }
          const type = session.type;
          types[type] = (types[type] || 0) + 1;
        }
      });
    });

    return {
      totalSessions,
      avgRPE: rpeCount > 0 ? (totalRPE / rpeCount).toFixed(1) : 0,
      types
    };
  };

  const weekDates = getWeekDates(selectedWeek);
  const currentDayData = selectedDay !== null ? weekData[selectedWeek]?.[selectedDay] : null;
  const weekSummary = getWeekSummary(selectedWeek);

  const openEditModal = (sessionType) => {
    if (!currentDayData) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditingSession({
      type: sessionType,
      data: currentDayData[sessionType] || { 
        time: '', 
        type: 'FORZA_MAX', 
        description: '',
        reps: '',
        execution: '',
        focus: '',
        recovery: '',
        rpe: 5 
      }
    });
    setModalVisible(true);
  };

  const saveSession = () => {
    if (!editingSession || selectedDay === null) return;
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newWeekData = { ...weekData };
    if (!newWeekData[selectedWeek]) newWeekData[selectedWeek] = {};
    if (!newWeekData[selectedWeek][selectedDay]) newWeekData[selectedWeek][selectedDay] = {};
    
    newWeekData[selectedWeek][selectedDay][editingSession.type] = editingSession.data;
    setWeekData(newWeekData);
    setModalVisible(false);
    setEditingSession(null);
  };

  const deleteSession = () => {
    if (!editingSession || selectedDay === null) return;
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    const newWeekData = { ...weekData };
    newWeekData[selectedWeek][selectedDay][editingSession.type] = null;
    setWeekData(newWeekData);
    setModalVisible(false);
    setEditingSession(null);
  };

  const updateNotes = (text) => {
    const newWeekData = { ...weekData };
    if (!newWeekData[selectedWeek][selectedDay]) newWeekData[selectedWeek][selectedDay] = {};
    newWeekData[selectedWeek][selectedDay].notes = text;
    setWeekData(newWeekData);
  };

  const getWeekPhase = (week) => {
    if (week === 4 || week === 8 || week === 12 || week === 16) return 'Deload';
    if (week >= 17) return 'Taper';
    if (week >= 13) return 'Tecnico';
    if (week >= 10) return 'Potenza';
    if (week >= 5) return 'Forza Max';
    return 'Adattamento';
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Calendario 18 Settimane',
            headerRight: () => (
              <Pressable 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCompactView(!compactView);
                }}
                style={{ marginRight: 8 }}
              >
                <IconSymbol 
                  name={compactView ? "list.bullet" : "square.grid.2x2"} 
                  size={22} 
                  color={colors.primary} 
                />
              </Pressable>
            ),
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
          {/* Week Selector with Phase Info */}
          <LinearGradient
            colors={[colors.primary + '20', colors.accent + '10']}
            style={[commonStyles.card, styles.weekSelector]}
          >
            <View style={styles.weekSelectorHeader}>
              <Text style={styles.sectionTitle}>📅 Seleziona Settimana</Text>
              <Pressable 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCompactView(!compactView);
                }}
                style={styles.viewToggle}
              >
                <IconSymbol 
                  name={compactView ? "list.bullet" : "square.grid.2x2"} 
                  size={18} 
                  color={colors.primary} 
                />
                <Text style={styles.viewToggleText}>
                  {compactView ? 'Dettagli' : 'Compatto'}
                </Text>
              </Pressable>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekList}
            >
              {weeks.map((week) => {
                const phase = getWeekPhase(week);
                let bgColor = colors.primary;
                if (week === 4 || week === 8 || week === 12 || week === 16) bgColor = '#00BCD4';
                else if (week >= 17) bgColor = '#FFD700';
                else if (week >= 13) bgColor = '#2196F3';
                else if (week >= 10) bgColor = '#FF8C00';
                else if (week >= 5) bgColor = '#4CAF50';
                
                return (
                  <Pressable
                    key={week}
                    style={[
                      styles.weekButton,
                      selectedWeek === week && styles.weekButtonActive,
                      { backgroundColor: selectedWeek === week ? bgColor : colors.background }
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
                    {selectedWeek === week && (
                      <Text style={styles.weekPhaseText}>{phase}</Text>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </LinearGradient>

          {/* Week Summary Card */}
          <LinearGradient
            colors={[colors.accent + '15', colors.primary + '10']}
            style={[commonStyles.card, styles.summaryCard]}
          >
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryTitle}>Settimana {selectedWeek}</Text>
                <Text style={styles.weekDates}>
                  {weekDates[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - {' '}
                  {weekDates[6].toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
              </View>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{weekSummary.totalSessions}</Text>
                  <Text style={styles.statLabel}>Sessioni</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{weekSummary.avgRPE}</Text>
                  <Text style={styles.statLabel}>RPE Medio</Text>
                </View>
              </View>
            </View>
            
            {/* Training Type Distribution */}
            <View style={styles.typeDistribution}>
              {Object.entries(weekSummary.types).map(([type, count]) => {
                const typeInfo = TRAINING_TYPES[type];
                if (!typeInfo) return null;
                return (
                  <View key={type} style={styles.typeChip}>
                    <View style={[styles.typeChipDot, { backgroundColor: typeInfo.color }]} />
                    <Text style={styles.typeChipText}>{typeInfo.emoji} {count}</Text>
                  </View>
                );
              })}
            </View>
          </LinearGradient>

          {/* Days Grid */}
          <View style={[commonStyles.card]}>
            <View style={styles.daysGrid}>
              {daysOfWeek.map((day, index) => {
                const date = weekDates[index];
                const isSelected = selectedDay === index;
                const isToday = date.toDateString() === new Date().toDateString();
                const dayData = weekData[selectedWeek]?.[index];
                const mainType = dayData?.main?.type || 'RIPOSO';
                const typeColor = TRAINING_TYPES[mainType]?.color || '#757575';
                const sessionCount = [dayData?.morning, dayData?.main, dayData?.recovery].filter(Boolean).length;
                
                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.dayCard,
                      isSelected && styles.dayCardSelected,
                      isToday && styles.dayCardToday,
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedDay(index);
                    }}
                  >
                    <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                      {day}
                    </Text>
                    <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                      {date.getDate()}
                    </Text>
                    <View style={styles.dayIndicators}>
                      <View style={[styles.dayIndicator, { backgroundColor: typeColor }]} />
                      {sessionCount > 1 && (
                        <Text style={[styles.sessionCount, isSelected && { color: '#FFF' }]}>
                          {sessionCount}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Day Details */}
          {selectedDay !== null && currentDayData && (
            <>
              <View style={[commonStyles.card]}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>
                    {daysOfWeek[selectedDay]} {weekDates[selectedDay].getDate()} {weekDates[selectedDay].toLocaleDateString('it-IT', { month: 'long' })}
                  </Text>
                  <Text style={styles.daySubtitle}>
                    {[currentDayData.morning, currentDayData.main, currentDayData.recovery].filter(Boolean).length} sessioni programmate
                  </Text>
                </View>
                
                {currentDayData.morning && (
                  <Pressable onPress={() => openEditModal('morning')}>
                    <SessionCard 
                      session={currentDayData.morning} 
                      title="Mattutina" 
                      icon="sunrise.fill"
                      compact={compactView}
                    />
                  </Pressable>
                )}

                {currentDayData.main && (
                  <Pressable onPress={() => openEditModal('main')}>
                    <SessionCard 
                      session={currentDayData.main} 
                      title="Principale" 
                      icon="flame.fill"
                      compact={compactView}
                    />
                  </Pressable>
                )}

                {currentDayData.recovery && (
                  <Pressable onPress={() => openEditModal('recovery')}>
                    <SessionCard 
                      session={currentDayData.recovery} 
                      title="Recupero" 
                      icon="heart.fill"
                      compact={compactView}
                    />
                  </Pressable>
                )}

                <Pressable 
                  style={styles.addButton}
                  onPress={() => {
                    if (!currentDayData.main) openEditModal('main');
                    else if (!currentDayData.recovery) openEditModal('recovery');
                    else openEditModal('morning');
                  }}
                >
                  <IconSymbol name="plus.circle.fill" size={20} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Aggiungi Sessione</Text>
                </Pressable>

                <View style={styles.notesSection}>
                  <View style={styles.notesSectionHeader}>
                    <IconSymbol name="note.text" size={18} color={colors.primary} />
                    <Text style={styles.notesTitle}>Note Giornaliere</Text>
                  </View>
                  <TextInput
                    style={styles.notesInput}
                    value={currentDayData.notes || ''}
                    onChangeText={updateNotes}
                    placeholder="Aggiungi note, sensazioni, dolori, progressi..."
                    multiline
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>
            </>
          )}

          {/* Legend */}
          <View style={[commonStyles.card, styles.legendCard]}>
            <Text style={styles.sectionTitle}>🏷️ Legenda Allenamenti</Text>
            <View style={styles.legendGrid}>
              {Object.entries(TRAINING_TYPES).map(([key, value]) => (
                <View key={key} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: value.color }]} />
                  <Text style={styles.legendEmoji}>{value.emoji}</Text>
                  <Text style={styles.legendText}>{value.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>✏️ Modifica Sessione</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
                </Pressable>
              </View>
              
              {editingSession && (
                <>
                  <Text style={styles.inputLabel}>⏰ Orario</Text>
                  <TextInput
                    style={styles.input}
                    value={editingSession.data.time}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, time: text }
                    })}
                    placeholder="es. 10:00-12:00"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>🏋️ Tipo Allenamento</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
                    {Object.entries(TRAINING_TYPES).map(([key, value]) => (
                      <Pressable
                        key={key}
                        style={[
                          styles.typeButton,
                          editingSession.data.type === key && { backgroundColor: value.color }
                        ]}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          setEditingSession({
                            ...editingSession,
                            data: { ...editingSession.data, type: key }
                          });
                        }}
                      >
                        <Text style={styles.typeButtonEmoji}>{value.emoji}</Text>
                        <Text style={[
                          styles.typeButtonText,
                          editingSession.data.type === key && { color: '#FFF' }
                        ]}>
                          {value.label}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>

                  <Text style={styles.inputLabel}>📋 Descrizione</Text>
                  <Text style={styles.inputHint}>
                    Separa gli esercizi con | (es: Squat 4×10 | Panca 3×12)
                  </Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editingSession.data.description}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, description: text }
                    })}
                    placeholder="Esercizio 1 4×10 | Esercizio 2 3×12 | Esercizio 3 5×8"
                    multiline
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>🔢 Reps/Serie</Text>
                  <TextInput
                    style={styles.input}
                    value={editingSession.data.reps}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, reps: text }
                    })}
                    placeholder="es. 4×10, 3×12, 5×8"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>⚙️ Esecuzione</Text>
                  <TextInput
                    style={styles.input}
                    value={editingSession.data.execution}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, execution: text }
                    })}
                    placeholder="es. Tempo 3-0-1-0, ROM completo"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>🎯 Focus</Text>
                  <TextInput
                    style={styles.input}
                    value={editingSession.data.focus}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, focus: text }
                    })}
                    placeholder="es. Tecnica perfetta, baseline forza"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>⏱️ Recupero</Text>
                  <TextInput
                    style={styles.input}
                    value={editingSession.data.recovery}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, recovery: text }
                    })}
                    placeholder="es. 90 secondi tra serie, 2 minuti tra esercizi"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={styles.inputLabel}>💪 RPE (1-10)</Text>
                  <View style={styles.rpeSelector}>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <Pressable
                        key={num}
                        style={[
                          styles.rpeButton,
                          editingSession.data.rpe === num && styles.rpeButtonActive
                        ]}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          setEditingSession({
                            ...editingSession,
                            data: { ...editingSession.data, rpe: num }
                          });
                        }}
                      >
                        <Text style={[
                          styles.rpeButtonText,
                          editingSession.data.rpe === num && styles.rpeButtonTextActive
                        ]}>
                          {num}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <View style={styles.modalButtons}>
                    <Pressable style={styles.deleteButton} onPress={deleteSession}>
                      <IconSymbol name="trash.fill" size={16} color="#FFFFFF" />
                      <Text style={styles.deleteButtonText}>Elimina</Text>
                    </Pressable>
                    <Pressable style={styles.saveButton} onPress={saveSession}>
                      <IconSymbol name="checkmark.circle.fill" size={16} color="#FFFFFF" />
                      <Text style={styles.saveButtonText}>Salva</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function SessionCard({ session, title, icon, compact }) {
  const type = TRAINING_TYPES[session.type] || TRAINING_TYPES.FORZA_MAX;
  const exercises = parseExercises(session.description);
  
  if (compact) {
    return (
      <View style={[styles.sessionCardCompact, { borderLeftColor: type.color }]}>
        <View style={styles.sessionHeaderCompact}>
          <View style={styles.sessionTitleRow}>
            <IconSymbol name={icon} size={16} color={type.color} />
            <Text style={styles.sessionTitleCompact}>{title}</Text>
            <View style={[styles.sessionBadgeCompact, { backgroundColor: type.color }]}>
              <Text style={styles.sessionBadgeTextCompact}>{type.emoji}</Text>
            </View>
          </View>
          <Text style={styles.sessionTimeCompact}>{session.time}</Text>
        </View>
        
        {/* Esercizi in formato compatto */}
        <View style={styles.exercisesListCompact}>
          {exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseRowCompact}>
              <Text style={styles.exerciseNumberCompact}>{index + 1}.</Text>
              <Text style={styles.exerciseNameCompact} numberOfLines={1}>
                {exercise.name}
              </Text>
              {exercise.sets && (
                <Text style={styles.exerciseSetsCompact}>{exercise.sets}</Text>
              )}
            </View>
          ))}
        </View>
        
        {session.rpe && (
          <View style={styles.rpeRowCompact}>
            <Text style={styles.rpeTextCompact}>RPE {session.rpe}/10</Text>
            <View style={styles.rpeBarCompact}>
              <View style={[styles.rpeBarFillCompact, { width: `${session.rpe * 10}%`, backgroundColor: type.color }]} />
            </View>
          </View>
        )}
      </View>
    );
  }
  
  return (
    <View style={[styles.sessionCard, { borderLeftColor: type.color }]}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionTitleContainer}>
          <IconSymbol name={icon} size={20} color={type.color} />
          <Text style={styles.sessionTitle}>{title}</Text>
        </View>
        <View style={[styles.sessionBadge, { backgroundColor: type.color }]}>
          <Text style={styles.sessionBadgeEmoji}>{type.emoji}</Text>
          <Text style={styles.sessionBadgeText}>{type.label}</Text>
        </View>
      </View>
      <Text style={styles.sessionTime}>⏰ {session.time}</Text>
      
      {/* Lista esercizi - uno per riga */}
      <View style={styles.exercisesList}>
        <View style={styles.exercisesHeader}>
          <IconSymbol name="list.bullet" size={16} color={colors.primary} />
          <Text style={styles.exercisesHeaderText}>Esercizi ({exercises.length})</Text>
        </View>
        {exercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseRow}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseContent}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              {exercise.sets && (
                <View style={styles.exerciseSetsContainer}>
                  <IconSymbol name="number" size={12} color={type.color} />
                  <Text style={[styles.exerciseSets, { color: type.color }]}>
                    {exercise.sets}
                  </Text>
                </View>
              )}
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      
      {/* Dettagli allenamento */}
      <View style={styles.detailsContainer}>
        {session.execution && (
          <View style={styles.detailRow}>
            <View style={styles.detailIconLabel}>
              <IconSymbol name="gearshape.fill" size={14} color={colors.primary} />
              <Text style={styles.detailLabel}>Esecuzione</Text>
            </View>
            <Text style={styles.detailValue}>{session.execution}</Text>
          </View>
        )}
        {session.focus && (
          <View style={styles.detailRow}>
            <View style={styles.detailIconLabel}>
              <IconSymbol name="target" size={14} color={colors.primary} />
              <Text style={styles.detailLabel}>Focus</Text>
            </View>
            <Text style={styles.detailValue}>{session.focus}</Text>
          </View>
        )}
        {session.recovery && (
          <View style={styles.detailRow}>
            <View style={styles.detailIconLabel}>
              <IconSymbol name="timer" size={14} color={colors.primary} />
              <Text style={styles.detailLabel}>Recupero</Text>
            </View>
            <Text style={styles.detailValue}>{session.recovery}</Text>
          </View>
        )}
      </View>
      
      {session.rpe && (
        <View style={styles.rpeContainer}>
          <View style={styles.rpeHeader}>
            <Text style={styles.sessionRpe}>💪 RPE: {session.rpe}/10</Text>
            <Text style={[styles.rpeIntensity, { color: type.color }]}>
              {session.rpe <= 3 ? 'Leggero' : session.rpe <= 6 ? 'Moderato' : session.rpe <= 8 ? 'Intenso' : 'Massimale'}
            </Text>
          </View>
          <View style={styles.rpeBar}>
            <View style={[styles.rpeBarFill, { width: `${session.rpe * 10}%`, backgroundColor: type.color }]} />
          </View>
        </View>
      )}
    </View>
  );
}

SessionCard.propTypes = {
  session: PropTypes.shape({
    type: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reps: PropTypes.string,
    execution: PropTypes.string,
    focus: PropTypes.string,
    recovery: PropTypes.string,
    rpe: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  compact: PropTypes.bool,
};

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
  weekSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  viewToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  weekList: {
    paddingVertical: 4,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  weekButtonActive: {
    borderColor: colors.accent,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
  },
  weekPhaseText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
    opacity: 0.9,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  weekDates: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  typeDistribution: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  typeChipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    width: '13%',
    aspectRatio: 0.7,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  dayCardToday: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  dayName: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
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
  dayIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dayIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sessionCount: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.text,
  },
  dayHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  daySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sessionCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  sessionBadgeEmoji: {
    fontSize: 12,
  },
  sessionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sessionTime: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  exercisesList: {
    backgroundColor: colors.highlight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  exercisesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exercisesHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '30',
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  exerciseNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  exerciseSetsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  exerciseSets: {
    fontSize: 13,
    fontWeight: '700',
  },
  exerciseNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  detailsContainer: {
    backgroundColor: colors.highlight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 0.4,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  detailValue: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 0.6,
    textAlign: 'right',
  },
  rpeContainer: {
    marginTop: 8,
  },
  rpeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sessionRpe: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  rpeIntensity: {
    fontSize: 11,
    fontWeight: '700',
  },
  rpeBar: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  rpeBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  sessionCardCompact: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderLeftWidth: 4,
  },
  sessionHeaderCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  sessionTitleCompact: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  sessionBadgeCompact: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionBadgeTextCompact: {
    fontSize: 12,
  },
  sessionTimeCompact: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  exercisesListCompact: {
    marginBottom: 8,
  },
  exerciseRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 4,
  },
  exerciseNumberCompact: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    width: 20,
  },
  exerciseNameCompact: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  exerciseSetsCompact: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rpeRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rpeTextCompact: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    width: 60,
  },
  rpeBarCompact: {
    flex: 1,
    height: 4,
    backgroundColor: colors.highlight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  rpeBarFillCompact: {
    height: '100%',
    borderRadius: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  notesSection: {
    marginTop: 16,
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 14,
  },
  notesSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    fontSize: 14,
    color: colors.text,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendCard: {
    marginTop: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  inputHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    marginBottom: 12,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  typeButtonEmoji: {
    fontSize: 14,
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  rpeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rpeButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  rpeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rpeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  rpeButtonTextActive: {
    color: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
});
