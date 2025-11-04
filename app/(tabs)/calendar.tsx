
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, TextInput, Modal, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const NOTES_KEY = '@calendar_notes';

interface DayData {
  morning?: any;
  main?: any;
  recovery?: any;
  notes?: string;
}

interface WeekData {
  [day: number]: DayData;
}

interface CalendarData {
  [week: number]: WeekData;
}

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

  useEffect(() => {
    loadCalendarData();
    loadNotes();
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

  const saveNotes = async (notes: Record<string, string>) => {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      setDayNotes(notes);
    } catch (error) {
      console.error('Error saving notes:', error);
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
      
      // Simulate file processing
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

  const renderWeekSelector = () => (
    <View style={styles.weekSelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekSelector}
      >
        {weeks.map((week) => {
          const isSelected = selectedWeek === week;
          const isCompleted = week < selectedWeek;
          const isCurrent = week === Math.ceil(new Date().getDate() / 7);
          
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
                  <IconSymbol name="checkmark" size={12} color="#FFFFFF" />
                </View>
              )}
              <Text style={[
                styles.weekButtonText,
                isSelected && styles.weekButtonTextActive,
                isCompleted && styles.weekButtonTextCompleted,
              ]}>
                S{week}
              </Text>
              {isCurrent && (
                <View style={styles.currentWeekDot} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderDayGrid = () => (
    <View style={styles.dayGrid}>
      {weekDays.map((dayName, index) => {
        const dayType = getDayType(selectedWeek, index);
        const typeInfo = TRAINING_TYPES[dayType as keyof typeof TRAINING_TYPES] || TRAINING_TYPES.RIPOSO;
        const hasNotes = dayNotes[`${selectedWeek}-${index}`];
        
        return (
          <Pressable
            key={index}
            style={[
              styles.dayCard,
              { borderLeftColor: typeInfo.color, borderLeftWidth: 4 }
            ]}
            onPress={() => handleDayPress(selectedWeek, index)}
          >
            <View style={styles.dayHeader}>
              <Text style={styles.dayName}>{dayName}</Text>
              {hasNotes && (
                <IconSymbol name="note.text" size={14} color={colors.primary} />
              )}
            </View>
            <View style={[styles.dayTypeIcon, { backgroundColor: typeInfo.color + '20' }]}>
              <IconSymbol name={typeInfo.icon as any} size={24} color={typeInfo.color} />
            </View>
            <Text style={styles.dayTypeLabel} numberOfLines={2}>
              {typeInfo.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const renderDayDetailModal = () => {
    const dayData = getDayData(selectedWeek, selectedDay);
    const dayName = weekDays[selectedDay];
    const noteKey = `${selectedWeek}-${selectedDay}`;
    const currentNote = dayNotes[noteKey] || '';

    return (
      <Modal
        visible={showDayDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDayDetail(false)}
      >
        <View style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>
                Settimana {selectedWeek} - {dayName}
              </Text>
              <Text style={styles.modalSubtitle}>
                {new Date(2025, 10, 16 + (selectedWeek - 1) * 7 + selectedDay).toLocaleDateString('it-IT', {
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
      {renderUploadModal()}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  weekSelectorContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 8,
    ...shadows.small,
  },
  weekSelector: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
  },
  weekButtonTextCompleted: {
    color: colors.success,
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
    marginBottom: 24,
    marginTop: 8,
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
  dayGrid: {
    gap: 12,
  },
  dayCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    ...shadows.small,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
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
