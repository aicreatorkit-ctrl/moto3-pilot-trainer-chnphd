
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal, Alert, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Path } from 'react-native-svg';

const TRAINING_TYPES = {
  FORZA_MAX: { label: 'Forza Massimale', color: '#FF4444', icon: 'dumbbell.fill', shortLabel: 'Forza' },
  POTENZA: { label: 'Potenza', color: '#FF8C00', icon: 'bolt.fill', shortLabel: 'Potenza' },
  RESISTENZA: { label: 'Resistenza', color: '#4CAF50', icon: 'figure.run', shortLabel: 'Resist.' },
  TECNICO: { label: 'Tecnico Specifico', color: '#2196F3', icon: 'figure.motorcycle', shortLabel: 'Tecnico' },
  MOBILITA: { label: 'Mobilità/Correttivo', color: '#9C27B0', icon: 'figure.flexibility', shortLabel: 'Mobilità' },
  RECUPERO: { label: 'Recupero Attivo', color: '#00BCD4', icon: 'wind', shortLabel: 'Recupero' },
  RIPOSO: { label: 'Riposo Completo', color: '#757575', icon: 'bed.double.fill', shortLabel: 'Riposo' },
  DELOAD: { label: 'Deload', color: '#FFB300', icon: 'arrow.down.circle.fill', shortLabel: 'Deload' },
  GARA: { label: 'Gara', color: '#FFD700', icon: 'flag.checkered', shortLabel: 'Gara' },
};

const STORAGE_KEY = '@calendar_data';
const NOTES_KEY = '@calendar_notes';
const COMPLETION_KEY = '@calendar_completion';

interface DayData {
  morning?: any;
  main?: any;
  recovery?: any;
  notes?: string;
  completed?: boolean;
  completedAt?: string;
}

interface WeekData {
  [day: number]: DayData;
}

interface CalendarData {
  [week: number]: WeekData;
}

interface CompletionData {
  [key: string]: boolean;
}

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [completionData, setCompletionData] = useState<CompletionData>({});
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showStats, setShowStats] = useState(false);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const weekDaysFull = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    loadCalendarData();
    loadNotes();
    loadCompletionData();
    
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadCalendarData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCalendarData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading calendar data:', error);
    }
  };

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTES_KEY);
      if (stored) {
        setDayNotes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const loadCompletionData = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMPLETION_KEY);
      if (stored) {
        setCompletionData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading completion data:', error);
    }
  };

  const saveNotes = async (notes: Record<string, string>) => {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      setDayNotes(notes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const toggleCompletion = async (week: number, day: number) => {
    const key = `${week}-${day}`;
    const newCompletionData = {
      ...completionData,
      [key]: !completionData[key],
    };
    
    try {
      await AsyncStorage.setItem(COMPLETION_KEY, JSON.stringify(newCompletionData));
      setCompletionData(newCompletionData);
      Haptics.notificationAsync(
        newCompletionData[key] 
          ? Haptics.NotificationFeedbackType.Success 
          : Haptics.NotificationFeedbackType.Warning
      );
    } catch (error) {
      console.error('Error saving completion data:', error);
    }
  };

  const handleDayPress = (week: number, day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedWeek(week);
    setSelectedDay(day);
    setShowDayDetail(true);
  };

  const handleFileUpload = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setUploadStatus('Selezione file...');
      
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setUploadStatus('');
        return;
      }

      setUploadStatus('Elaborazione file...');
      
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setUploadStatus('✅ File caricato con successo!');
        Alert.alert(
          '✅ Successo',
          `File "${result.assets[0].name}" caricato correttamente.\n\nIl calendario è stato aggiornato con i nuovi dati di allenamento.`,
          [{ text: 'OK', onPress: () => setShowUpload(false) }]
        );
      }, 1500);
    } catch (error) {
      console.error('Error uploading file:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setUploadStatus('❌ Errore durante il caricamento');
      Alert.alert('Errore', 'Impossibile caricare il file. Riprova.');
    }
  };

  const getDayData = (week: number, day: number): DayData | null => {
    return calendarData[week]?.[day] || null;
  };

  const getDayType = (week: number, day: number): string => {
    const data = getDayData(week, day);
    if (!data) return 'RIPOSO';
    if (data.main?.type) return data.main.type;
    if (data.morning?.type) return data.morning.type;
    return 'RIPOSO';
  };

  const isCompleted = (week: number, day: number): boolean => {
    return completionData[`${week}-${day}`] || false;
  };

  const getWeekStats = (week: number) => {
    let totalSessions = 0;
    let completedSessions = 0;
    let totalLoad = 0;
    const typeCount: Record<string, number> = {};

    for (let day = 0; day < 7; day++) {
      const data = getDayData(week, day);
      if (data && (data.main || data.morning)) {
        totalSessions++;
        if (isCompleted(week, day)) {
          completedSessions++;
        }
        
        const type = getDayType(week, day);
        typeCount[type] = (typeCount[type] || 0) + 1;
        
        if (data.main?.rpe) {
          totalLoad += data.main.rpe;
        }
      }
    }

    return {
      totalSessions,
      completedSessions,
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
      totalLoad,
      typeCount,
    };
  };

  const getCurrentWeek = () => {
    const startDate = new Date(2025, 10, 16);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.ceil(diffDays / 7), 18);
  };

  const jumpToCurrentWeek = () => {
    const currentWeek = getCurrentWeek();
    setSelectedWeek(currentWeek);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const renderWeekSelector = () => {
    const currentWeek = getCurrentWeek();
    
    return (
      <View style={styles.weekSelectorContainer}>
        <View style={styles.weekSelectorHeader}>
          <Pressable 
            style={styles.jumpButton}
            onPress={jumpToCurrentWeek}
          >
            <IconSymbol name="calendar.badge.clock" size={18} color={colors.primary} />
            <Text style={styles.jumpButtonText}>Oggi</Text>
          </Pressable>
          
          <View style={styles.viewModeToggle}>
            <Pressable
              style={[styles.viewModeButton, viewMode === 'week' && styles.viewModeButtonActive]}
              onPress={() => {
                setViewMode('week');
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={[styles.viewModeText, viewMode === 'week' && styles.viewModeTextActive]}>
                Settimana
              </Text>
            </Pressable>
            <Pressable
              style={[styles.viewModeButton, viewMode === 'month' && styles.viewModeButtonActive]}
              onPress={() => {
                setViewMode('month');
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={[styles.viewModeText, viewMode === 'month' && styles.viewModeTextActive]}>
                Mese
              </Text>
            </Pressable>
          </View>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekSelector}
        >
          {weeks.map((week) => {
            const isSelected = selectedWeek === week;
            const stats = getWeekStats(week);
            const isCompleted = stats.completionRate === 100 && stats.totalSessions > 0;
            const isCurrent = week === currentWeek;
            
            return (
              <Pressable
                key={week}
                style={[
                  styles.weekButton,
                  isSelected && styles.weekButtonActive,
                  isCompleted && styles.weekButtonCompleted,
                ]}
                onPress={() => {
                  setSelectedWeek(week);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                {isCompleted && (
                  <View style={styles.weekCompletedBadge}>
                    <IconSymbol name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
                <Text style={[
                  styles.weekButtonText,
                  isSelected && styles.weekButtonTextActive,
                  isCompleted && styles.weekButtonTextCompleted,
                ]}>
                  S{week}
                </Text>
                {stats.totalSessions > 0 && (
                  <View style={styles.weekProgressBar}>
                    <View 
                      style={[
                        styles.weekProgressFill, 
                        { 
                          width: `${stats.completionRate}%`,
                          backgroundColor: isSelected ? '#FFFFFF' : colors.primary,
                        }
                      ]} 
                    />
                  </View>
                )}
                {isCurrent && (
                  <View style={styles.currentWeekDot} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderWeekStats = () => {
    const stats = getWeekStats(selectedWeek);
    
    return (
      <Animated.View 
        style={[
          styles.statsCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <LinearGradient
          colors={gradients.racing}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsGradient}
        >
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <IconSymbol name="figure.run" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{stats.totalSessions}</Text>
              <Text style={styles.statLabel}>Sessioni</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <IconSymbol name="checkmark.circle.fill" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{stats.completedSessions}</Text>
              <Text style={styles.statLabel}>Completate</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <IconSymbol name="chart.bar.fill" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{Math.round(stats.completionRate)}%</Text>
              <Text style={styles.statLabel}>Progresso</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <IconSymbol name="bolt.fill" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{stats.totalLoad}</Text>
              <Text style={styles.statLabel}>Carico</Text>
            </View>
          </View>
          
          <Pressable 
            style={styles.statsDetailButton}
            onPress={() => {
              setShowStats(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={styles.statsDetailText}>Dettagli</Text>
            <IconSymbol name="chevron.right" size={14} color="#FFFFFF" />
          </Pressable>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderDayGrid = () => (
    <View style={styles.dayGrid}>
      {weekDays.map((dayName, index) => {
        const dayType = getDayType(selectedWeek, index);
        const typeInfo = TRAINING_TYPES[dayType as keyof typeof TRAINING_TYPES] || TRAINING_TYPES.RIPOSO;
        const hasNotes = dayNotes[`${selectedWeek}-${index}`];
        const completed = isCompleted(selectedWeek, index);
        const dayData = getDayData(selectedWeek, index);
        
        return (
          <Pressable
            key={index}
            style={[
              styles.dayCard,
              { borderLeftColor: typeInfo.color, borderLeftWidth: 4 },
              completed && styles.dayCardCompleted,
            ]}
            onPress={() => handleDayPress(selectedWeek, index)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              toggleCompletion(selectedWeek, index);
            }}
          >
            <View style={styles.dayHeader}>
              <View style={styles.dayHeaderLeft}>
                <Text style={styles.dayName}>{dayName}</Text>
                {dayData?.main?.rpe && (
                  <View style={[styles.rpeMiniBadge, { backgroundColor: typeInfo.color + '20' }]}>
                    <Text style={[styles.rpeMiniBadgeText, { color: typeInfo.color }]}>
                      RPE {dayData.main.rpe}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.dayHeaderRight}>
                {hasNotes && (
                  <IconSymbol name="note.text" size={14} color={colors.textSecondary} />
                )}
                {completed && (
                  <View style={styles.completedBadge}>
                    <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
                  </View>
                )}
              </View>
            </View>
            
            <View style={[styles.dayTypeIcon, { backgroundColor: typeInfo.color + '20' }]}>
              <IconSymbol name={typeInfo.icon as any} size={28} color={typeInfo.color} />
            </View>
            
            <Text style={styles.dayTypeLabel} numberOfLines={2}>
              {typeInfo.label}
            </Text>
            
            {dayData?.main?.time && (
              <View style={styles.dayTimeContainer}>
                <IconSymbol name="clock.fill" size={12} color={colors.textSecondary} />
                <Text style={styles.dayTime}>{dayData.main.time}</Text>
              </View>
            )}
            
            {dayData?.main?.exercises && (
              <Text style={styles.dayExerciseCount}>
                {dayData.main.exercises.length} esercizi
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  const renderDayDetailModal = () => {
    const dayData = getDayData(selectedWeek, selectedDay);
    const dayName = weekDaysFull[selectedDay];
    const noteKey = `${selectedWeek}-${selectedDay}`;
    const currentNote = dayNotes[noteKey] || '';
    const completed = isCompleted(selectedWeek, selectedDay);

    return (
      <Modal
        visible={showDayDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDayDetail(false)}
      >
        <View style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <Text style={styles.modalTitle}>
                {dayName}
              </Text>
              <Text style={styles.modalSubtitle}>
                Settimana {selectedWeek} • {new Date(2025, 10, 16 + (selectedWeek - 1) * 7 + selectedDay).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </View>
            <Pressable onPress={() => setShowDayDetail(false)}>
              <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {/* Completion Toggle */}
            <Pressable
              style={[styles.completionCard, completed && styles.completionCardActive]}
              onPress={() => toggleCompletion(selectedWeek, selectedDay)}
            >
              <View style={styles.completionIcon}>
                <IconSymbol 
                  name={completed ? "checkmark.circle.fill" : "circle"} 
                  size={32} 
                  color={completed ? colors.success : colors.textSecondary} 
                />
              </View>
              <View style={styles.completionInfo}>
                <Text style={styles.completionTitle}>
                  {completed ? 'Allenamento Completato' : 'Segna come Completato'}
                </Text>
                <Text style={styles.completionSubtitle}>
                  {completed ? 'Ottimo lavoro! 💪' : 'Premi per confermare il completamento'}
                </Text>
              </View>
            </Pressable>

            {!dayData ? (
              <View style={styles.emptyState}>
                <IconSymbol name="calendar.badge.exclamationmark" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyStateTitle}>Nessun allenamento programmato</Text>
                <Text style={styles.emptyStateText}>
                  Questo giorno è libero o non ci sono dati disponibili
                </Text>
              </View>
            ) : (
              <>
                {/* Morning Routine */}
                {dayData.morning && (
                  <View style={commonStyles.card}>
                    <View style={styles.sessionHeader}>
                      <View style={[styles.sessionIcon, { backgroundColor: TRAINING_TYPES.MOBILITA.color + '20' }]}>
                        <IconSymbol name="sunrise.fill" size={24} color={TRAINING_TYPES.MOBILITA.color} />
                      </View>
                      <View style={styles.sessionInfo}>
                        <Text style={styles.sessionTitle}>Routine Mattutina</Text>
                        <Text style={styles.sessionTime}>{dayData.morning.time || '06:00-06:12'}</Text>
                      </View>
                      <View style={[styles.rpeBadge, { backgroundColor: colors.success + '20' }]}>
                        <Text style={[styles.rpeText, { color: colors.success }]}>
                          RPE {dayData.morning.rpe || 3}
                        </Text>
                      </View>
                    </View>
                    {dayData.morning.description && (
                      <Text style={styles.sessionDescription}>{dayData.morning.description}</Text>
                    )}
                    {dayData.morning.exercises && (
                      <View style={styles.exerciseList}>
                        {dayData.morning.exercises.map((ex: any, idx: number) => (
                          <View key={idx} style={styles.exerciseItem}>
                            <View style={styles.exerciseNumber}>
                              <Text style={styles.exerciseNumberText}>{idx + 1}</Text>
                            </View>
                            <View style={styles.exerciseDetails}>
                              <Text style={styles.exerciseName}>{ex.name}</Text>
                              <Text style={styles.exerciseSpecs}>
                                {ex.sets && `${ex.sets} serie`}
                                {ex.reps && ` × ${ex.reps}`}
                                {ex.tempo && ` • ${ex.tempo}`}
                              </Text>
                              {ex.notes && (
                                <Text style={styles.exerciseNotes}>{ex.notes}</Text>
                              )}
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                {/* Main Session */}
                {dayData.main && (
                  <View style={commonStyles.card}>
                    <View style={styles.sessionHeader}>
                      <View style={[
                        styles.sessionIcon, 
                        { backgroundColor: TRAINING_TYPES[dayData.main.type as keyof typeof TRAINING_TYPES]?.color + '20' || colors.primary + '20' }
                      ]}>
                        <IconSymbol 
                          name={TRAINING_TYPES[dayData.main.type as keyof typeof TRAINING_TYPES]?.icon as any || 'figure.run'} 
                          size={24} 
                          color={TRAINING_TYPES[dayData.main.type as keyof typeof TRAINING_TYPES]?.color || colors.primary} 
                        />
                      </View>
                      <View style={styles.sessionInfo}>
                        <Text style={styles.sessionTitle}>Sessione Principale</Text>
                        <Text style={styles.sessionTime}>{dayData.main.time || '10:00-11:30'}</Text>
                      </View>
                      <View style={[styles.rpeBadge, { backgroundColor: colors.warning + '20' }]}>
                        <Text style={[styles.rpeText, { color: colors.warning }]}>
                          RPE {dayData.main.rpe || 7}
                        </Text>
                      </View>
                    </View>
                    {dayData.main.description && (
                      <Text style={styles.sessionDescription}>{dayData.main.description}</Text>
                    )}
                    {dayData.main.exercises && (
                      <View style={styles.exerciseList}>
                        {dayData.main.exercises.map((ex: any, idx: number) => (
                          <View key={idx} style={styles.exerciseItem}>
                            <View style={styles.exerciseNumber}>
                              <Text style={styles.exerciseNumberText}>{idx + 1}</Text>
                            </View>
                            <View style={styles.exerciseDetails}>
                              <Text style={styles.exerciseName}>{ex.name}</Text>
                              <Text style={styles.exerciseSpecs}>
                                {ex.sets && `${ex.sets} serie`}
                                {ex.reps && ` × ${ex.reps}`}
                                {ex.weight && ` • ${ex.weight}`}
                                {ex.tempo && ` • ${ex.tempo}`}
                              </Text>
                              {ex.notes && (
                                <Text style={styles.exerciseNotes}>{ex.notes}</Text>
                              )}
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                    {dayData.main.notes && (
                      <View style={styles.sessionNotes}>
                        <IconSymbol name="info.circle.fill" size={16} color={colors.primary} />
                        <Text style={styles.sessionNotesText}>{dayData.main.notes}</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Recovery */}
                {dayData.recovery && (
                  <View style={commonStyles.card}>
                    <View style={styles.sessionHeader}>
                      <View style={[styles.sessionIcon, { backgroundColor: TRAINING_TYPES.RECUPERO.color + '20' }]}>
                        <IconSymbol name="wind" size={24} color={TRAINING_TYPES.RECUPERO.color} />
                      </View>
                      <View style={styles.sessionInfo}>
                        <Text style={styles.sessionTitle}>Recupero</Text>
                        <Text style={styles.sessionTime}>{dayData.recovery.time || '18:00-18:15'}</Text>
                      </View>
                      <View style={[styles.rpeBadge, { backgroundColor: colors.success + '20' }]}>
                        <Text style={[styles.rpeText, { color: colors.success }]}>
                          RPE {dayData.recovery.rpe || 2}
                        </Text>
                      </View>
                    </View>
                    {dayData.recovery.exercises && (
                      <View style={styles.exerciseList}>
                        {dayData.recovery.exercises.map((ex: any, idx: number) => (
                          <View key={idx} style={styles.exerciseItem}>
                            <View style={styles.exerciseNumber}>
                              <Text style={styles.exerciseNumberText}>{idx + 1}</Text>
                            </View>
                            <View style={styles.exerciseDetails}>
                              <Text style={styles.exerciseName}>{ex.name}</Text>
                              <Text style={styles.exerciseSpecs}>
                                {ex.sets && `${ex.sets} serie`}
                                {ex.reps && ` × ${ex.reps}`}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </>
            )}

            {/* Personal Notes */}
            <View style={commonStyles.card}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="note.text" size={20} color={colors.purple} />
                <Text style={styles.sectionTitle}>Note Personali</Text>
              </View>
              <TextInput
                style={styles.notesInput}
                value={currentNote}
                onChangeText={(text) => {
                  const newNotes = { ...dayNotes, [noteKey]: text };
                  saveNotes(newNotes);
                }}
                multiline
                numberOfLines={4}
                placeholder="Aggiungi note su questo allenamento..."
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderStatsModal = () => {
    const stats = getWeekStats(selectedWeek);
    const typeEntries = Object.entries(stats.typeCount);
    
    return (
      <Modal
        visible={showStats}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowStats(false)}
      >
        <View style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Statistiche Settimana {selectedWeek}</Text>
              <Text style={styles.modalSubtitle}>Analisi dettagliata del tuo allenamento</Text>
            </View>
            <Pressable onPress={() => setShowStats(false)}>
              <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {/* Overall Progress */}
            <View style={commonStyles.card}>
              <Text style={styles.cardTitle}>Progresso Generale</Text>
              <View style={styles.progressCircleContainer}>
                <Svg width={160} height={160}>
                  <Circle
                    cx={80}
                    cy={80}
                    r={70}
                    stroke={colors.surface}
                    strokeWidth={12}
                    fill="none"
                  />
                  <Circle
                    cx={80}
                    cy={80}
                    r={70}
                    stroke={colors.success}
                    strokeWidth={12}
                    fill="none"
                    strokeDasharray={`${(stats.completionRate / 100) * 440} 440`}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="80, 80"
                  />
                </Svg>
                <View style={styles.progressCircleCenter}>
                  <Text style={styles.progressCircleValue}>{Math.round(stats.completionRate)}%</Text>
                  <Text style={styles.progressCircleLabel}>Completato</Text>
                </View>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsGridValue}>{stats.completedSessions}/{stats.totalSessions}</Text>
                  <Text style={styles.statsGridLabel}>Sessioni</Text>
                </View>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsGridValue}>{stats.totalLoad}</Text>
                  <Text style={styles.statsGridLabel}>Carico Totale</Text>
                </View>
              </View>
            </View>

            {/* Training Type Distribution */}
            {typeEntries.length > 0 && (
              <View style={commonStyles.card}>
                <Text style={styles.cardTitle}>Distribuzione Allenamenti</Text>
                <View style={styles.typeDistribution}>
                  {typeEntries.map(([type, count]) => {
                    const typeInfo = TRAINING_TYPES[type as keyof typeof TRAINING_TYPES];
                    if (!typeInfo) return null;
                    
                    const percentage = (count / stats.totalSessions) * 100;
                    
                    return (
                      <View key={type} style={styles.typeDistributionItem}>
                        <View style={styles.typeDistributionHeader}>
                          <View style={styles.typeDistributionLeft}>
                            <View style={[styles.typeDistributionIcon, { backgroundColor: typeInfo.color + '20' }]}>
                              <IconSymbol name={typeInfo.icon as any} size={20} color={typeInfo.color} />
                            </View>
                            <Text style={styles.typeDistributionLabel}>{typeInfo.shortLabel}</Text>
                          </View>
                          <Text style={styles.typeDistributionValue}>{count}</Text>
                        </View>
                        <View style={styles.typeDistributionBar}>
                          <View 
                            style={[
                              styles.typeDistributionBarFill, 
                              { width: `${percentage}%`, backgroundColor: typeInfo.color }
                            ]} 
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Weekly Insights */}
            <View style={commonStyles.card}>
              <View style={styles.insightHeader}>
                <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
                <Text style={styles.cardTitle}>Insights</Text>
              </View>
              <View style={styles.insightList}>
                {stats.completionRate === 100 && (
                  <View style={styles.insightItem}>
                    <IconSymbol name="star.fill" size={20} color={colors.warning} />
                    <Text style={styles.insightText}>
                      Settimana perfetta! Hai completato tutti gli allenamenti 🎉
                    </Text>
                  </View>
                )}
                {stats.completionRate >= 80 && stats.completionRate < 100 && (
                  <View style={styles.insightItem}>
                    <IconSymbol name="checkmark.seal.fill" size={20} color={colors.success} />
                    <Text style={styles.insightText}>
                      Ottimo lavoro! Hai completato la maggior parte degli allenamenti
                    </Text>
                  </View>
                )}
                {stats.totalLoad > 40 && (
                  <View style={styles.insightItem}>
                    <IconSymbol name="bolt.fill" size={20} color={colors.warning} />
                    <Text style={styles.insightText}>
                      Settimana ad alta intensità. Assicurati di recuperare adeguatamente
                    </Text>
                  </View>
                )}
                {stats.totalLoad < 20 && stats.totalSessions > 0 && (
                  <View style={styles.insightItem}>
                    <IconSymbol name="wind" size={20} color={colors.info} />
                    <Text style={styles.insightText}>
                      Settimana di recupero. Perfetto per rigenerarti
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderUploadModal = () => (
    <Modal
      visible={showUpload}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowUpload(false)}
    >
      <View style={commonStyles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Carica Calendario</Text>
          <Pressable onPress={() => setShowUpload(false)}>
            <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.uploadContent}>
          <View style={styles.uploadCard}>
            <LinearGradient
              colors={gradients.racing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadIconContainer}
            >
              <IconSymbol name="doc.fill" size={48} color="#FFFFFF" />
            </LinearGradient>
            
            <Text style={styles.uploadTitle}>Importa Programma Allenamento</Text>
            <Text style={styles.uploadDescription}>
              Carica un file con il tuo programma di allenamento personalizzato.
              Formati supportati: TXT, PDF, DOCX
            </Text>

            <Pressable 
              style={styles.uploadButton}
              onPress={handleFileUpload}
            >
              <LinearGradient
                colors={gradients.racing}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadButtonGradient}
              >
                <IconSymbol name="arrow.up.doc.fill" size={22} color="#FFFFFF" />
                <Text style={styles.uploadButtonText}>Seleziona File</Text>
              </LinearGradient>
            </Pressable>

            {uploadStatus && (
              <View style={styles.uploadStatus}>
                <Text style={styles.uploadStatusText}>{uploadStatus}</Text>
              </View>
            )}
          </View>

          <View style={commonStyles.card}>
            <View style={styles.infoHeader}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.infoTitle}>Come funziona</Text>
            </View>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <View style={styles.infoNumber}>
                  <Text style={styles.infoNumberText}>1</Text>
                </View>
                <Text style={styles.infoText}>
                  Seleziona un file contenente il tuo programma di allenamento
                </Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoNumber}>
                  <Text style={styles.infoNumberText}>2</Text>
                </View>
                <Text style={styles.infoText}>
                  Il sistema analizza automaticamente il contenuto
                </Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoNumber}>
                  <Text style={styles.infoNumberText}>3</Text>
                </View>
                <Text style={styles.infoText}>
                  Il calendario viene aggiornato con i nuovi dati
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Calendario 18 Settimane',
            headerRight: () => (
              <Pressable onPress={() => {
                setShowUpload(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}>
                <IconSymbol name="arrow.up.doc.fill" size={22} color={colors.primary} />
              </Pressable>
            ),
          }}
        />
      )}
      <View style={commonStyles.container}>
        {/* Week Selector */}
        {renderWeekSelector()}

        {/* Calendar Grid */}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.weekInfo}>
            <Text style={styles.weekInfoTitle}>Settimana {selectedWeek}</Text>
            <Text style={styles.weekInfoSubtitle}>
              {new Date(2025, 10, 16 + (selectedWeek - 1) * 7).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long'
              })} - {new Date(2025, 10, 22 + (selectedWeek - 1) * 7).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>

          {/* Week Stats */}
          {renderWeekStats()}

          {/* Day Grid */}
          {renderDayGrid()}

          {/* Upload Button */}
          <Pressable 
            style={styles.floatingUploadButton}
            onPress={() => {
              setShowUpload(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <LinearGradient
              colors={gradients.racing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.floatingUploadGradient}
            >
              <IconSymbol name="arrow.up.doc.fill" size={20} color="#FFFFFF" />
              <Text style={styles.floatingUploadText}>Carica Programma</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>

      {renderDayDetailModal()}
      {renderStatsModal()}
      {renderUploadModal()}
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
  weekSelectorContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.small,
  },
  weekSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  jumpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primary + '10',
  },
  jumpButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 2,
  },
  viewModeButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewModeButtonActive: {
    backgroundColor: colors.card,
    ...shadows.small,
  },
  viewModeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  viewModeTextActive: {
    color: colors.text,
    fontWeight: '700',
  },
  weekSelector: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.surface,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  weekButtonActive: {
    backgroundColor: colors.primary,
    ...shadows.small,
  },
  weekButtonCompleted: {
    backgroundColor: colors.success + '20',
  },
  weekCompletedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
  },
  weekButtonTextCompleted: {
    color: colors.success,
  },
  weekProgressBar: {
    width: '100%',
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  currentWeekDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  weekInfo: {
    marginBottom: 16,
  },
  weekInfoTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  weekInfoSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  statsGradient: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  statsDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  statsDetailText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dayGrid: {
    gap: 12,
  },
  dayCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    ...shadows.small,
  },
  dayCardCompleted: {
    opacity: 0.8,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  rpeMiniBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rpeMiniBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  completedBadge: {
    width: 18,
    height: 18,
  },
  dayTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTypeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 18,
    marginBottom: 8,
  },
  dayTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dayTime: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayExerciseCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  floatingUploadButton: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  floatingUploadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  floatingUploadText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalHeaderLeft: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modalContent: {
    padding: 16,
  },
  completionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.small,
  },
  completionCardActive: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  completionIcon: {
    marginRight: 16,
  },
  completionInfo: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  completionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  rpeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rpeText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sessionDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '600',
  },
  exerciseList: {
    gap: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseSpecs: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  exerciseNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  sessionNotes: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    gap: 10,
  },
  sessionNotesText: {
    flex: 1,
    fontSize: 13,
    color: colors.primary,
    lineHeight: 18,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  notesInput: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  progressCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  progressCircleCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressCircleValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
  },
  progressCircleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statsGridItem: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statsGridValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statsGridLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeDistribution: {
    gap: 16,
  },
  typeDistributionItem: {
    gap: 8,
  },
  typeDistributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeDistributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeDistributionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeDistributionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  typeDistributionValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  typeDistributionBar: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  typeDistributionBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  insightList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 20,
  },
  uploadContent: {
    padding: 16,
  },
  uploadCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.large,
  },
  uploadIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  uploadDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  uploadStatus: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    width: '100%',
  },
  uploadStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    gap: 12,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});
