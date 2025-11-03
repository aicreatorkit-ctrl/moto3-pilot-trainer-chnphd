
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

const TRAINING_TYPES = {
  FORZA_MAX: { label: 'Forza Massimale', color: '#FF4444', icon: 'dumbbell.fill' },
  POTENZA: { label: 'Potenza', color: '#FF8C00', icon: 'bolt.fill' },
  RESISTENZA: { label: 'Resistenza', color: '#4CAF50', icon: 'figure.run' },
  TECNICO: { label: 'Tecnico Specifico', color: '#2196F3', icon: 'figure.motorcycle' },
  MOBILITA: { label: 'Mobilità/Correttivo', color: '#9C27B0', icon: 'figure.flexibility' },
  RECUPERO: { label: 'Recupero Attivo', color: '#00BCD4', icon: 'wind' },
  RIPOSO: { label: 'Riposo Completo', color: '#757575', icon: 'bed.double.fill' },
  GARA: { label: 'Gara', color: '#FFD700', icon: 'flag.checkered' },
  DELOAD: { label: 'Deload', color: '#00BCD4', icon: 'leaf.fill' },
  TAPER: { label: 'Taper', color: '#FFD700', icon: 'bolt.circle.fill' },
};

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [weekData, setWeekData] = useState({});

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
          description: 'Cat-Cow 2×15, Child\'s Pose 2×45", Glute Bridge 2×12, Psoas Stretch 2×40"/lato',
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

    // Aggiungi settimane 2-18 con struttura simile (abbreviato per spazio)
    for (let week = 2; week <= 18; week++) {
      data[week] = {};
      for (let day = 0; day < 7; day++) {
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
            type: week === 4 || week === 8 || week === 12 || week === 16 ? 'DELOAD' : 
                  week >= 17 ? 'TAPER' : 
                  week >= 13 ? 'TECNICO' : 
                  week >= 10 ? 'POTENZA' : 
                  week >= 5 ? 'FORZA_MAX' : 'FORZA_MAX',
            description: `Settimana ${week} - Allenamento principale giorno ${day + 1}`,
            reps: 'Da definire',
            execution: 'Controllato',
            focus: 'Progressione',
            recovery: '90" tra serie',
            rpe: week === 4 || week === 8 || week === 12 || week === 16 ? 4 : 
                 week >= 17 ? 5 : 7
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

  const weekDates = getWeekDates(selectedWeek);
  const currentDayData = selectedDay !== null ? weekData[selectedWeek]?.[selectedDay] : null;

  const openEditModal = (sessionType) => {
    if (!currentDayData) return;
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
            <Text style={styles.sectionTitle}>📅 Seleziona Settimana</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekList}
            >
              {weeks.map((week) => {
                let bgColor = colors.primary;
                if (week === 4 || week === 8 || week === 12 || week === 16) bgColor = '#00BCD4';
                else if (week >= 17) bgColor = '#FFD700';
                else if (week >= 13) bgColor = '#FF8C00';
                else if (week >= 10) bgColor = '#2196F3';
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
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Week Info */}
          <View style={[commonStyles.card]}>
            <View style={styles.weekHeader}>
              <Text style={styles.sectionTitle}>Settimana {selectedWeek}</Text>
              <Text style={styles.weekDates}>
                {weekDates[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })} - {' '}
                {weekDates[6].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
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
          </View>

          {/* Day Details */}
          {selectedDay !== null && currentDayData && (
            <>
              <View style={[commonStyles.card]}>
                <Text style={styles.sectionTitle}>
                  {daysOfWeek[selectedDay]} - {weekDates[selectedDay].toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                </Text>
                
                {currentDayData.morning && (
                  <Pressable onPress={() => openEditModal('morning')}>
                    <SessionCard session={currentDayData.morning} title="Mattutina 🌅" />
                  </Pressable>
                )}

                {currentDayData.main && (
                  <Pressable onPress={() => openEditModal('main')}>
                    <SessionCard session={currentDayData.main} title="Principale 🔥" />
                  </Pressable>
                )}

                {currentDayData.recovery && (
                  <Pressable onPress={() => openEditModal('recovery')}>
                    <SessionCard session={currentDayData.recovery} title="Recupero 💆" />
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
                  <Text style={styles.notesTitle}>📝 Note Giornaliere:</Text>
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
                        onPress={() => setEditingSession({
                          ...editingSession,
                          data: { ...editingSession.data, type: key }
                        })}
                      >
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
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editingSession.data.description}
                    onChangeText={(text) => setEditingSession({
                      ...editingSession,
                      data: { ...editingSession.data, description: text }
                    })}
                    placeholder="Dettagli allenamento..."
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
                    placeholder="es. 90\" tra serie, 2' tra esercizi"
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
                        onPress={() => setEditingSession({
                          ...editingSession,
                          data: { ...editingSession.data, rpe: num }
                        })}
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

function SessionCard({ session, title }) {
  const type = TRAINING_TYPES[session.type] || TRAINING_TYPES.FORZA_MAX;
  
  return (
    <View style={[styles.sessionCard, { borderLeftColor: type.color, borderLeftWidth: 4 }]}>
      <View style={styles.sessionHeader}>
        <View style={[styles.sessionBadge, { backgroundColor: type.color }]}>
          <Text style={styles.sessionBadgeText}>{type.label}</Text>
        </View>
        <Text style={styles.sessionTitle}>{title}</Text>
      </View>
      <Text style={styles.sessionTime}>⏰ {session.time}</Text>
      <Text style={styles.sessionDescription}>📋 {session.description}</Text>
      
      {/* Dettagli allenamento */}
      <View style={styles.detailsContainer}>
        {session.reps && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🔢 Reps:</Text>
            <Text style={styles.detailValue}>{session.reps}</Text>
          </View>
        )}
        {session.execution && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⚙️ Esecuzione:</Text>
            <Text style={styles.detailValue}>{session.execution}</Text>
          </View>
        )}
        {session.focus && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🎯 Focus:</Text>
            <Text style={styles.detailValue}>{session.focus}</Text>
          </View>
        )}
        {session.recovery && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⏱️ Recupero:</Text>
            <Text style={styles.detailValue}>{session.recovery}</Text>
          </View>
        )}
      </View>
      
      {session.rpe && (
        <View style={styles.rpeContainer}>
          <Text style={styles.sessionRpe}>💪 RPE: {session.rpe}/10</Text>
          <View style={styles.rpeBar}>
            <View style={[styles.rpeBarFill, { width: `${session.rpe * 10}%`, backgroundColor: type.color }]} />
          </View>
        </View>
      )}
    </View>
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
    paddingVertical: 4,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    minWidth: 50,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  weekButtonActive: {
    borderColor: colors.accent,
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
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
  dayIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  sessionCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 10,
  },
  sessionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  sessionDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    width: 100,
  },
  detailValue: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  rpeContainer: {
    marginTop: 8,
  },
  sessionRpe: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 6,
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
  addButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  notesSection: {
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
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
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
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
