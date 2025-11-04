
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles, shadows, gradients } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

const STORAGE_KEY = '@moto3_calendar_data';

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

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const MONTHS = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
                'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

interface TrainingSession {
  id: string;
  date: string;
  type: keyof typeof TRAINING_TYPES;
  title: string;
  description?: string;
  duration?: string;
  completed?: boolean;
  notes?: string;
}

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [newSession, setNewSession] = useState<Partial<TrainingSession>>({});
  const [uploadContent, setUploadContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading calendar data:', error);
    }
  };

  const saveSessions = async (newSessions: TrainingSession[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
      setSessions(newSessions);
    } catch (error) {
      console.log('Error saving calendar data:', error);
    }
  };

  const parseCalendarContent = (text: string): TrainingSession[] => {
    const parsedSessions: TrainingSession[] = [];
    const lines = text.split('\n');
    
    let currentDate: string | null = null;
    let currentSession: Partial<TrainingSession> = {};
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      // Detect date patterns (various formats)
      const datePatterns = [
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/,  // DD/MM/YYYY
        /(\d{4})-(\d{1,2})-(\d{1,2})/,    // YYYY-MM-DD
        /(\d{1,2})\s+(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i,
        /(lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica)\s+(\d{1,2})/i,
      ];
      
      let dateMatch = null;
      for (const pattern of datePatterns) {
        dateMatch = trimmed.match(pattern);
        if (dateMatch) break;
      }
      
      if (dateMatch) {
        // Save previous session if exists
        if (currentDate && currentSession.title) {
          parsedSessions.push({
            id: `imported_${Date.now()}_${Math.random()}`,
            date: currentDate,
            type: currentSession.type || 'TECNICO',
            title: currentSession.title,
            description: currentSession.description,
            duration: currentSession.duration,
            completed: false,
          } as TrainingSession);
        }
        
        // Parse new date
        if (dateMatch[0].includes('-')) {
          // YYYY-MM-DD format
          currentDate = dateMatch[0];
        } else if (dateMatch[0].includes('/')) {
          // DD/MM/YYYY format
          const [, day, month, year] = dateMatch;
          currentDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else {
          // Use current year and try to parse month/day
          const today = new Date();
          const monthNames = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 
                             'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
          const monthMatch = trimmed.toLowerCase().match(new RegExp(monthNames.join('|')));
          if (monthMatch) {
            const monthIndex = monthNames.indexOf(monthMatch[0]);
            const dayMatch = trimmed.match(/\d{1,2}/);
            if (dayMatch) {
              const day = dayMatch[0];
              currentDate = `${today.getFullYear()}-${String(monthIndex + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
          }
        }
        
        currentSession = {};
        return;
      }
      
      // Detect training type
      const typeKeywords = {
        FORZA_MAX: ['forza massimale', 'forza max', 'max strength', 'strength'],
        POTENZA: ['potenza', 'power', 'esplosiv'],
        RESISTENZA: ['resistenza', 'endurance', 'cardio', 'aerobic'],
        TECNICO: ['tecnico', 'technical', 'skill', 'abilità'],
        MOBILITA: ['mobilità', 'mobility', 'flessibilità', 'flexibility', 'stretching'],
        RECUPERO: ['recupero', 'recovery', 'active recovery'],
        RIPOSO: ['riposo', 'rest', 'off'],
        DELOAD: ['deload', 'scarico'],
        GARA: ['gara', 'race', 'competizione', 'competition'],
      };
      
      for (const [type, keywords] of Object.entries(typeKeywords)) {
        if (keywords.some(keyword => trimmed.toLowerCase().includes(keyword))) {
          currentSession.type = type as keyof typeof TRAINING_TYPES;
          break;
        }
      }
      
      // Detect duration
      const durationMatch = trimmed.match(/(\d+)\s*(min|minuti|ore|hours|h)/i);
      if (durationMatch) {
        currentSession.duration = durationMatch[0];
      }
      
      // If line looks like a title (short, capitalized, or has special markers)
      const isTitle = 
        /^[A-Z]/.test(trimmed) ||
        /^[-•]\s*/.test(trimmed) ||
        /^\d+\.\s*/.test(trimmed);
      
      if (isTitle && trimmed.length < 100 && !currentSession.title) {
        currentSession.title = trimmed
          .replace(/^[-•]\s*/, '')
          .replace(/^\d+\.\s*/, '')
          .trim();
      } else if (currentSession.title && trimmed.length > 0) {
        // Add to description
        currentSession.description = currentSession.description 
          ? `${currentSession.description}\n${trimmed}`
          : trimmed;
      }
    });
    
    // Save last session
    if (currentDate && currentSession.title) {
      parsedSessions.push({
        id: `imported_${Date.now()}_${Math.random()}`,
        date: currentDate,
        type: currentSession.type || 'TECNICO',
        title: currentSession.title,
        description: currentSession.description,
        duration: currentSession.duration,
        completed: false,
      } as TrainingSession);
    }
    
    return parsedSessions;
  };

  const handleImportContent = () => {
    if (!uploadContent.trim()) {
      Alert.alert('Errore', 'Inserisci del contenuto da importare');
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newSessions = parseCalendarContent(uploadContent);
      
      if (newSessions.length === 0) {
        Alert.alert(
          'Nessuna Sessione Trovata',
          'Non sono state trovate sessioni valide nel contenuto. Assicurati di includere date e titoli delle sessioni.'
        );
        setIsAnalyzing(false);
        return;
      }
      
      // Merge with existing sessions (avoid duplicates by date+title)
      const mergedSessions = [...sessions];
      let addedCount = 0;
      let updatedCount = 0;
      
      newSessions.forEach(newSession => {
        const existingIndex = mergedSessions.findIndex(
          s => s.date === newSession.date && 
               s.title.toLowerCase() === newSession.title.toLowerCase()
        );
        
        if (existingIndex >= 0) {
          // Update existing session
          mergedSessions[existingIndex] = {
            ...mergedSessions[existingIndex],
            ...newSession,
            id: mergedSessions[existingIndex].id, // Keep original ID
            completed: mergedSessions[existingIndex].completed, // Keep completion status
          };
          updatedCount++;
        } else {
          // Add new session
          mergedSessions.push(newSession);
          addedCount++;
        }
      });
      
      saveSessions(mergedSessions);
      setUploadContent('');
      setShowUploadModal(false);
      setIsAnalyzing(false);
      
      Alert.alert(
        'Importazione Completata',
        `✅ ${addedCount} nuove sessioni aggiunte\n🔄 ${updatedCount} sessioni aggiornate\n\nTotale sessioni: ${mergedSessions.length}`
      );
    }, 1000);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/*',
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        console.log('Document picking cancelled');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        console.log('File picked:', file.name);
        
        Alert.alert(
          'File Selezionato',
          `File: ${file.name}\n\nIncolla il contenuto del file nell'area di testo sottostante.`
        );
      }
    } catch (error) {
      console.log('Error picking document:', error);
      Alert.alert('Errore', 'Impossibile selezionare il file');
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(s => s.date === dateStr);
  };

  const handlePreviousMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDatePress = (date: Date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedDate(date);
  };

  const handleAddSession = () => {
    if (!selectedDate) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNewSession({
      date: selectedDate.toISOString().split('T')[0],
      type: 'FORZA_MAX',
      title: '',
      description: '',
      duration: '',
    });
    setShowAddModal(true);
  };

  const handleSaveSession = () => {
    if (!newSession.title || !newSession.type) {
      Alert.alert('Errore', 'Inserisci almeno un titolo e un tipo di allenamento');
      return;
    }

    const session: TrainingSession = {
      id: Date.now().toString(),
      date: newSession.date!,
      type: newSession.type as keyof typeof TRAINING_TYPES,
      title: newSession.title,
      description: newSession.description,
      duration: newSession.duration,
      completed: false,
    };

    saveSessions([...sessions, session]);
    setShowAddModal(false);
    setNewSession({});
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleSessionPress = (session: TrainingSession) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedSession(session);
    setShowDetailModal(true);
  };

  const handleToggleComplete = (session: TrainingSession) => {
    const updated = sessions.map(s => 
      s.id === session.id ? { ...s, completed: !s.completed } : s
    );
    saveSessions(updated);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDeleteSession = (sessionId: string) => {
    Alert.alert(
      'Elimina Sessione',
      'Sei sicuro di voler eliminare questa sessione?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            saveSessions(sessions.filter(s => s.id !== sessionId));
            setShowDetailModal(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateSessions = selectedDate ? getSessionsForDate(selectedDate) : [];
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Calendario 18 Settimane',
          headerShown: true,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Header */}
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsCard}
          >
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalSessions}</Text>
                <Text style={styles.statLabel}>Sessioni</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedSessions}</Text>
                <Text style={styles.statLabel}>Completate</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completionRate}%</Text>
                <Text style={styles.statLabel}>Aderenza</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Import Button */}
          <Pressable
            style={styles.importButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowUploadModal(true);
            }}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.importButtonGradient}
            >
              <IconSymbol name="arrow.down.doc.fill" size={24} color="#FFFFFF" />
              <Text style={styles.importButtonText}>Importa Calendario</Text>
            </LinearGradient>
          </Pressable>

          {/* Calendar Navigation */}
          <View style={styles.calendarHeader}>
            <Pressable style={styles.navButton} onPress={handlePreviousMonth}>
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </Pressable>
            
            <View style={styles.monthYearContainer}>
              <Text style={styles.monthText}>
                {MONTHS[currentDate.getMonth()]}
              </Text>
              <Text style={styles.yearText}>
                {currentDate.getFullYear()}
              </Text>
            </View>
            
            <Pressable style={styles.navButton} onPress={handleNextMonth}>
              <IconSymbol name="chevron.right" size={24} color={colors.primary} />
            </Pressable>
          </View>

          {/* Day Headers */}
          <View style={styles.dayHeadersContainer}>
            {DAYS.map((day, index) => (
              <View key={index} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {days.map((day, index) => {
              if (!day) {
                return <View key={`empty-${index}`} style={styles.emptyDay} />;
              }

              const daySessions = getSessionsForDate(day);
              const isSelected = selectedDate?.toDateString() === day.toDateString();
              const isToday = new Date().toDateString() === day.toDateString();
              const hasCompleted = daySessions.some(s => s.completed);
              const hasSessions = daySessions.length > 0;

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.dayCell,
                    isSelected && styles.dayCellSelected,
                    isToday && styles.dayCellToday,
                  ]}
                  onPress={() => handleDatePress(day)}
                >
                  <Text style={[
                    styles.dayNumber,
                    isSelected && styles.dayNumberSelected,
                    isToday && styles.dayNumberToday,
                  ]}>
                    {day.getDate()}
                  </Text>
                  
                  {hasSessions && (
                    <View style={styles.sessionIndicators}>
                      {daySessions.slice(0, 3).map((session, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.sessionDot,
                            { backgroundColor: TRAINING_TYPES[session.type].color },
                            session.completed && styles.sessionDotCompleted,
                          ]}
                        />
                      ))}
                    </View>
                  )}
                  
                  {hasCompleted && (
                    <View style={styles.completedBadge}>
                      <IconSymbol name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Selected Date Sessions */}
          {selectedDate && (
            <View style={styles.selectedDateSection}>
              <View style={styles.selectedDateHeader}>
                <View>
                  <Text style={styles.selectedDateTitle}>
                    {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
                  </Text>
                  <Text style={styles.selectedDateSubtitle}>
                    {DAYS[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]}
                  </Text>
                </View>
                
                <Pressable style={styles.addButton} onPress={handleAddSession}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.addButtonGradient}
                  >
                    <IconSymbol name="plus" size={20} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Aggiungi</Text>
                  </LinearGradient>
                </Pressable>
              </View>

              {selectedDateSessions.length === 0 ? (
                <View style={styles.emptyState}>
                  <IconSymbol name="calendar.badge.plus" size={48} color={colors.textLight} />
                  <Text style={styles.emptyStateText}>
                    Nessuna sessione programmata
                  </Text>
                  <Text style={styles.emptyStateSubtext}>
                    Tocca &quot;Aggiungi&quot; per creare una nuova sessione
                  </Text>
                </View>
              ) : (
                <View style={styles.sessionsList}>
                  {selectedDateSessions.map((session) => (
                    <Pressable
                      key={session.id}
                      style={[
                        styles.sessionCard,
                        session.completed && styles.sessionCardCompleted,
                      ]}
                      onPress={() => handleSessionPress(session)}
                    >
                      <View style={styles.sessionCardHeader}>
                        <View style={[
                          styles.sessionTypeIndicator,
                          { backgroundColor: TRAINING_TYPES[session.type].color },
                        ]} />
                        
                        <View style={styles.sessionCardContent}>
                          <Text style={[
                            styles.sessionCardTitle,
                            session.completed && styles.sessionCardTitleCompleted,
                          ]}>
                            {session.title}
                          </Text>
                          <Text style={styles.sessionCardType}>
                            {TRAINING_TYPES[session.type].label}
                          </Text>
                          {session.duration && (
                            <View style={styles.sessionDurationBadge}>
                              <IconSymbol name="clock.fill" size={12} color={colors.textSecondary} />
                              <Text style={styles.sessionDurationText}>{session.duration}</Text>
                            </View>
                          )}
                        </View>

                        <Pressable
                          style={[
                            styles.sessionCheckbox,
                            session.completed && styles.sessionCheckboxCompleted,
                          ]}
                          onPress={() => handleToggleComplete(session)}
                        >
                          {session.completed && (
                            <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                          )}
                        </Pressable>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Legend */}
          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>Tipi di Allenamento</Text>
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

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Importa Calendario</Text>
              <Pressable onPress={() => setShowUploadModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Info Card */}
              <View style={styles.uploadInfoCard}>
                <View style={styles.uploadInfoHeader}>
                  <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
                  <Text style={styles.uploadInfoTitle}>Come Funziona</Text>
                </View>
                <Text style={styles.uploadInfoText}>
                  Carica o incolla il tuo calendario di allenamento. Il sistema identificherà automaticamente:
                </Text>
                <View style={styles.uploadInfoList}>
                  <Text style={styles.uploadInfoItem}>• Date delle sessioni</Text>
                  <Text style={styles.uploadInfoItem}>• Tipi di allenamento</Text>
                  <Text style={styles.uploadInfoItem}>• Durata delle sessioni</Text>
                  <Text style={styles.uploadInfoItem}>• Descrizioni e dettagli</Text>
                </View>
              </View>

              {/* Upload Button */}
              <Pressable
                style={styles.uploadFileButton}
                onPress={pickDocument}
              >
                <IconSymbol name="doc.badge.plus" size={24} color={colors.primary} />
                <Text style={styles.uploadFileButtonText}>Seleziona File</Text>
              </Pressable>

              <Text style={styles.orText}>oppure</Text>

              {/* Text Input */}
              <View style={styles.textInputCard}>
                <Text style={styles.inputLabel}>Incolla il contenuto del calendario:</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder="Esempio:&#10;&#10;15/03/2024&#10;Forza Massimale - Lower Body&#10;90 minuti&#10;Squat, Deadlift, Leg Press&#10;&#10;16/03/2024&#10;Recupero Attivo&#10;45 minuti"
                  placeholderTextColor={colors.textLight}
                  value={uploadContent}
                  onChangeText={setUploadContent}
                  textAlignVertical="top"
                />
                <Text style={styles.inputHint}>
                  💡 Suggerimento: Includi date, titoli e tipi di allenamento per risultati migliori
                </Text>
              </View>

              {/* Import Button */}
              <Pressable
                style={styles.importActionButton}
                onPress={handleImportContent}
                disabled={isAnalyzing || !uploadContent.trim()}
              >
                <LinearGradient
                  colors={isAnalyzing ? ['#9CA3AF', '#6B7280'] : ['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.importActionGradient}
                >
                  {isAnalyzing ? (
                    <>
                      <IconSymbol name="arrow.triangle.2.circlepath" size={24} color="#FFFFFF" />
                      <Text style={styles.importActionText}>Analisi in corso...</Text>
                    </>
                  ) : (
                    <>
                      <IconSymbol name="arrow.down.circle.fill" size={24} color="#FFFFFF" />
                      <Text style={styles.importActionText}>Importa Sessioni</Text>
                    </>
                  )}
                </LinearGradient>
              </Pressable>

              {/* Example Card */}
              <View style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>📋 Formato Esempio</Text>
                <View style={styles.exampleContent}>
                  <Text style={styles.exampleText}>
                    15/03/2024{'\n'}
                    Forza Massimale - Lower Body{'\n'}
                    90 minuti{'\n'}
                    Squat, Deadlift, Leg Press{'\n'}
                    {'\n'}
                    16/03/2024{'\n'}
                    Recupero Attivo{'\n'}
                    45 minuti{'\n'}
                    Yoga e stretching leggero
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Session Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuova Sessione</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Titolo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Es: Lower Body + Core"
                value={newSession.title}
                onChangeText={(text) => setNewSession({ ...newSession, title: text })}
              />

              <Text style={styles.inputLabel}>Tipo di Allenamento *</Text>
              <View style={styles.typeGrid}>
                {Object.entries(TRAINING_TYPES).map(([key, value]) => (
                  <Pressable
                    key={key}
                    style={[
                      styles.typeButton,
                      newSession.type === key && styles.typeButtonSelected,
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setNewSession({ ...newSession, type: key as keyof typeof TRAINING_TYPES });
                    }}
                  >
                    <View style={[styles.typeDot, { backgroundColor: value.color }]} />
                    <Text style={[
                      styles.typeButtonText,
                      newSession.type === key && styles.typeButtonTextSelected,
                    ]}>
                      {value.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.inputLabel}>Durata</Text>
              <TextInput
                style={styles.input}
                placeholder="Es: 90 min"
                value={newSession.duration}
                onChangeText={(text) => setNewSession({ ...newSession, duration: text })}
              />

              <Text style={styles.inputLabel}>Descrizione</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Dettagli della sessione..."
                value={newSession.description}
                onChangeText={(text) => setNewSession({ ...newSession, description: text })}
                multiline
                numberOfLines={4}
              />

              <Pressable style={styles.saveButton} onPress={handleSaveSession}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.saveButtonGradient}
                >
                  <IconSymbol name="checkmark.circle.fill" size={24} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Salva Sessione</Text>
                </LinearGradient>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Session Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowDetailModal(false)}
        >
          <Pressable style={styles.detailModalContent} onPress={(e) => e.stopPropagation()}>
            {selectedSession && (
              <>
                <View style={styles.detailHeader}>
                  <View style={[
                    styles.detailTypeIndicator,
                    { backgroundColor: TRAINING_TYPES[selectedSession.type].color },
                  ]}>
                    <IconSymbol 
                      name={TRAINING_TYPES[selectedSession.type].icon as any} 
                      size={32} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <Pressable 
                    style={styles.detailCloseButton}
                    onPress={() => setShowDetailModal(false)}
                  >
                    <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <Text style={styles.detailTitle}>{selectedSession.title}</Text>
                <Text style={styles.detailType}>
                  {TRAINING_TYPES[selectedSession.type].label}
                </Text>

                {selectedSession.duration && (
                  <View style={styles.detailDurationBadge}>
                    <IconSymbol name="clock.fill" size={16} color={colors.primary} />
                    <Text style={styles.detailDurationText}>{selectedSession.duration}</Text>
                  </View>
                )}

                {selectedSession.description && (
                  <View style={styles.detailDescriptionContainer}>
                    <Text style={styles.detailDescriptionLabel}>Descrizione</Text>
                    <Text style={styles.detailDescription}>{selectedSession.description}</Text>
                  </View>
                )}

                <View style={styles.detailActions}>
                  <Pressable
                    style={[
                      styles.detailActionButton,
                      selectedSession.completed && styles.detailActionButtonCompleted,
                    ]}
                    onPress={() => {
                      handleToggleComplete(selectedSession);
                      setShowDetailModal(false);
                    }}
                  >
                    <IconSymbol 
                      name={selectedSession.completed ? "checkmark.circle.fill" : "circle"} 
                      size={24} 
                      color={selectedSession.completed ? colors.success : colors.textSecondary} 
                    />
                    <Text style={styles.detailActionText}>
                      {selectedSession.completed ? 'Completata' : 'Segna come completata'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.detailDeleteButton}
                    onPress={() => handleDeleteSession(selectedSession.id)}
                  >
                    <IconSymbol name="trash.fill" size={20} color={colors.error} />
                    <Text style={styles.detailDeleteText}>Elimina</Text>
                  </Pressable>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    ...shadows.large,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  importButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...shadows.medium,
  },
  importButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  importButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  monthYearContainer: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  yearText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  dayHeadersContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  emptyDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayCellSelected: {
    backgroundColor: colors.highlightBlue,
    borderRadius: 12,
  },
  dayCellToday: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  dayNumberSelected: {
    color: colors.primary,
    fontWeight: '800',
  },
  dayNumberToday: {
    color: colors.primary,
  },
  sessionIndicators: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  sessionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sessionDotCompleted: {
    borderWidth: 1,
    borderColor: colors.success,
  },
  completedBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateSection: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...shadows.medium,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedDateTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  selectedDateSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  addButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.small,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  sessionsList: {
    gap: 12,
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    ...shadows.small,
  },
  sessionCardCompleted: {
    opacity: 0.7,
    backgroundColor: colors.highlightGreen,
  },
  sessionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTypeIndicator: {
    width: 4,
    height: 48,
    borderRadius: 2,
    marginRight: 12,
  },
  sessionCardContent: {
    flex: 1,
  },
  sessionCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sessionCardTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  sessionCardType: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  sessionDurationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionDurationText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sessionCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  sessionCheckboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  legendCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    ...shadows.medium,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
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
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  modalScroll: {
    maxHeight: 500,
  },
  uploadInfoCard: {
    backgroundColor: colors.highlightBlue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  uploadInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  uploadInfoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  uploadInfoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  uploadInfoList: {
    gap: 6,
  },
  uploadInfoItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  uploadFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    gap: 12,
    marginBottom: 16,
  },
  uploadFileButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textLight,
    marginVertical: 12,
  },
  textInputCard: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: colors.text,
    minHeight: 200,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputHint: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 8,
    fontStyle: 'italic',
  },
  importActionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...shadows.medium,
  },
  importActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  importActionText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  exampleCard: {
    backgroundColor: colors.highlightGold,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  exampleContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
  },
  exampleText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  typeButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlightBlue,
  },
  typeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  typeButtonText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  typeButtonTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 16,
    ...shadows.medium,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  detailModalContent: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 28,
    margin: 20,
    maxHeight: '80%',
    ...shadows.large,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailTypeIndicator: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  detailCloseButton: {
    padding: 4,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  detailType: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailDurationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  detailDurationText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  detailDescriptionContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  detailDescriptionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  detailActions: {
    gap: 12,
  },
  detailActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  detailActionButtonCompleted: {
    backgroundColor: colors.highlightGreen,
  },
  detailActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  detailDeleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.highlightRed,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  detailDeleteText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
  },
});
