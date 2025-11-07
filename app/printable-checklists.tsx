
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Alert, Share } from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, commonStyles, shadows, gradients, spacing, borderRadius, typography } from '@/styles/commonStyles';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Checklist {
  id: string;
  title: string;
  category: 'pre-training' | 'post-training' | 'race-day' | 'weekly' | 'custom';
  icon: string;
  gradient: string[];
  items: ChecklistItem[];
  createdAt: string;
  lastUsed?: string;
}

const STORAGE_KEY = '@printable_checklists';

const DEFAULT_CHECKLISTS: Checklist[] = [
  {
    id: 'pre-training',
    title: 'Pre-Allenamento',
    category: 'pre-training',
    icon: 'checkmark.circle.fill',
    gradient: gradients.racing,
    createdAt: new Date().toISOString(),
    items: [
      { id: '1', text: 'Controllo prontezza fisica', completed: false },
      { id: '2', text: 'Idratazione (500ml acqua)', completed: false },
      { id: '3', text: 'Riscaldamento dinamico (10 min)', completed: false },
      { id: '4', text: 'Mobilità articolare', completed: false },
      { id: '5', text: 'Attivazione muscolare', completed: false },
      { id: '6', text: 'Controllo attrezzatura', completed: false },
      { id: '7', text: 'Visualizzazione obiettivi', completed: false },
      { id: '8', text: 'Respirazione e focus mentale', completed: false },
    ],
  },
  {
    id: 'post-training',
    title: 'Post-Allenamento',
    category: 'post-training',
    icon: 'checkmark.shield.fill',
    gradient: gradients.success,
    createdAt: new Date().toISOString(),
    items: [
      { id: '1', text: 'Raffreddamento attivo (10 min)', completed: false },
      { id: '2', text: 'Stretching completo', completed: false },
      { id: '3', text: 'Foam rolling', completed: false },
      { id: '4', text: 'Idratazione (750ml)', completed: false },
      { id: '5', text: 'Nutrizione post-workout', completed: false },
      { id: '6', text: 'Doccia fredda/calda alternata', completed: false },
      { id: '7', text: 'Registrazione dati allenamento', completed: false },
      { id: '8', text: 'Valutazione RPE e note', completed: false },
    ],
  },
  {
    id: 'race-day',
    title: 'Giorno Gara',
    category: 'race-day',
    icon: 'flag.checkered.2.crossed',
    gradient: gradients.championship,
    createdAt: new Date().toISOString(),
    items: [
      { id: '1', text: 'Colazione 3 ore prima', completed: false },
      { id: '2', text: 'Controllo equipaggiamento completo', completed: false },
      { id: '3', text: 'Riscaldamento specifico', completed: false },
      { id: '4', text: 'Idratazione programmata', completed: false },
      { id: '5', text: 'Visualizzazione tracciato', completed: false },
      { id: '6', text: 'Routine mentale pre-gara', completed: false },
      { id: '7', text: 'Controllo setup moto', completed: false },
      { id: '8', text: 'Briefing tecnico', completed: false },
      { id: '9', text: 'Attivazione neuromuscolare', completed: false },
      { id: '10', text: 'Focus e concentrazione finale', completed: false },
    ],
  },
  {
    id: 'weekly-check',
    title: 'Controllo Settimanale',
    category: 'weekly',
    icon: 'calendar.badge.checkmark',
    gradient: gradients.blue,
    createdAt: new Date().toISOString(),
    items: [
      { id: '1', text: 'Revisione obiettivi settimana', completed: false },
      { id: '2', text: 'Analisi carico allenamento', completed: false },
      { id: '3', text: 'Controllo peso corporeo', completed: false },
      { id: '4', text: 'Valutazione HRV media', completed: false },
      { id: '5', text: 'Check rigidità muscolare', completed: false },
      { id: '6', text: 'Pianificazione settimana successiva', completed: false },
      { id: '7', text: 'Aggiornamento progressi', completed: false },
      { id: '8', text: 'Identificazione aree miglioramento', completed: false },
    ],
  },
];

export default function PrintableChecklistsScreen() {
  const [checklists, setChecklists] = useState<Checklist[]>(DEFAULT_CHECKLISTS);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newChecklistItems, setNewChecklistItems] = useState<string[]>(['']);

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setChecklists(parsed);
      }
    } catch (error) {
      console.log('Error loading checklists:', error);
    }
  };

  const saveChecklists = async (updatedChecklists: Checklist[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChecklists));
      setChecklists(updatedChecklists);
    } catch (error) {
      console.log('Error saving checklists:', error);
    }
  };

  const handleChecklistPress = (checklist: Checklist) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedChecklist(checklist);
    setShowDetailModal(true);
  };

  const toggleItem = (itemId: string) => {
    if (!selectedChecklist) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const updatedItems = selectedChecklist.items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    const updatedChecklist = {
      ...selectedChecklist,
      items: updatedItems,
      lastUsed: new Date().toISOString(),
    };
    
    setSelectedChecklist(updatedChecklist);
    
    const updatedChecklists = checklists.map(c =>
      c.id === updatedChecklist.id ? updatedChecklist : c
    );
    
    saveChecklists(updatedChecklists);
  };

  const resetChecklist = () => {
    if (!selectedChecklist) return;
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    const resetItems = selectedChecklist.items.map(item => ({
      ...item,
      completed: false,
    }));
    
    const updatedChecklist = {
      ...selectedChecklist,
      items: resetItems,
    };
    
    setSelectedChecklist(updatedChecklist);
    
    const updatedChecklists = checklists.map(c =>
      c.id === updatedChecklist.id ? updatedChecklist : c
    );
    
    saveChecklists(updatedChecklists);
  };

  const exportChecklist = async () => {
    if (!selectedChecklist) return;
    
    const completedCount = selectedChecklist.items.filter(i => i.completed).length;
    const totalCount = selectedChecklist.items.length;
    
    let text = `📋 ${selectedChecklist.title}\n`;
    text += `Completato: ${completedCount}/${totalCount}\n\n`;
    
    selectedChecklist.items.forEach((item, index) => {
      const status = item.completed ? '✅' : '⬜';
      text += `${status} ${index + 1}. ${item.text}\n`;
    });
    
    text += `\n🏍️ Moto3 Training App`;
    
    try {
      await Share.share({
        message: text,
        title: selectedChecklist.title,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Error sharing checklist:', error);
    }
  };

  const createNewChecklist = () => {
    if (!newChecklistTitle.trim()) {
      Alert.alert('Errore', 'Inserisci un titolo per la checklist');
      return;
    }
    
    const validItems = newChecklistItems.filter(item => item.trim() !== '');
    
    if (validItems.length === 0) {
      Alert.alert('Errore', 'Aggiungi almeno un elemento alla checklist');
      return;
    }
    
    const newChecklist: Checklist = {
      id: `custom-${Date.now()}`,
      title: newChecklistTitle,
      category: 'custom',
      icon: 'list.bullet.clipboard',
      gradient: gradients.purple,
      createdAt: new Date().toISOString(),
      items: validItems.map((text, index) => ({
        id: `${index + 1}`,
        text,
        completed: false,
      })),
    };
    
    const updatedChecklists = [...checklists, newChecklist];
    saveChecklists(updatedChecklists);
    
    setNewChecklistTitle('');
    setNewChecklistItems(['']);
    setShowCreateModal(false);
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Successo', 'Checklist creata con successo!');
  };

  const deleteChecklist = (checklistId: string) => {
    Alert.alert(
      'Elimina Checklist',
      'Sei sicuro di voler eliminare questa checklist?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            const updatedChecklists = checklists.filter(c => c.id !== checklistId);
            saveChecklists(updatedChecklists);
            setShowDetailModal(false);
            setSelectedChecklist(null);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const addNewItemField = () => {
    setNewChecklistItems([...newChecklistItems, '']);
  };

  const updateNewItemField = (index: number, value: string) => {
    const updated = [...newChecklistItems];
    updated[index] = value;
    setNewChecklistItems(updated);
  };

  const removeNewItemField = (index: number) => {
    if (newChecklistItems.length > 1) {
      const updated = newChecklistItems.filter((_, i) => i !== index);
      setNewChecklistItems(updated);
    }
  };

  const getCategoryLabel = (category: Checklist['category']) => {
    const labels = {
      'pre-training': 'Pre-Allenamento',
      'post-training': 'Post-Allenamento',
      'race-day': 'Giorno Gara',
      'weekly': 'Settimanale',
      'custom': 'Personalizzata',
    };
    return labels[category];
  };

  const getCompletionPercentage = (checklist: Checklist) => {
    const completed = checklist.items.filter(i => i.completed).length;
    return Math.round((completed / checklist.items.length) * 100);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Checklist Stampabili',
          headerLargeTitle: true,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Card */}
          <LinearGradient
            colors={gradients.racing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerCard}
          >
            <View style={styles.headerIconContainer}>
              <IconSymbol name="list.clipboard.fill" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Checklist Stampabili</Text>
            <Text style={styles.headerSubtitle}>
              Organizza e traccia le tue routine con checklist personalizzabili
            </Text>
          </LinearGradient>

          {/* Create New Button */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.createButtonPressed,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowCreateModal(true);
            }}
          >
            <LinearGradient
              colors={gradients.purple}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createButtonGradient}
            >
              <IconSymbol name="plus.circle.fill" size={24} color="#FFFFFF" />
              <Text style={styles.createButtonText}>Crea Nuova Checklist</Text>
            </LinearGradient>
          </Pressable>

          {/* Checklists Grid */}
          <View style={styles.checklistsGrid}>
            {checklists.map((checklist) => {
              const percentage = getCompletionPercentage(checklist);
              const completedCount = checklist.items.filter(i => i.completed).length;
              
              return (
                <Pressable
                  key={checklist.id}
                  style={({ pressed }) => [
                    styles.checklistCard,
                    pressed && styles.checklistCardPressed,
                  ]}
                  onPress={() => handleChecklistPress(checklist)}
                >
                  <LinearGradient
                    colors={checklist.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.checklistIconContainer}
                  >
                    <IconSymbol name={checklist.icon as any} size={32} color="#FFFFFF" />
                  </LinearGradient>
                  
                  <View style={styles.checklistContent}>
                    <Text style={styles.checklistTitle}>{checklist.title}</Text>
                    <Text style={styles.checklistCategory}>
                      {getCategoryLabel(checklist.category)}
                    </Text>
                    
                    <View style={styles.checklistStats}>
                      <View style={styles.checklistStat}>
                        <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                        <Text style={styles.checklistStatText}>
                          {completedCount}/{checklist.items.length}
                        </Text>
                      </View>
                      
                      <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressBarFill,
                              { width: `${percentage}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>{percentage}%</Text>
                      </View>
                    </View>
                  </View>
                  
                  <IconSymbol name="chevron.right" size={20} color={colors.textLight} />
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Detail Modal */}
        <Modal
          visible={showDetailModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowDetailModal(false)}
        >
          {selectedChecklist && (
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Pressable
                  onPress={() => setShowDetailModal(false)}
                  style={styles.modalCloseButton}
                >
                  <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
                </Pressable>
                
                <LinearGradient
                  colors={selectedChecklist.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalIconContainer}
                >
                  <IconSymbol name={selectedChecklist.icon as any} size={48} color="#FFFFFF" />
                </LinearGradient>
                
                <Text style={styles.modalTitle}>{selectedChecklist.title}</Text>
                <Text style={styles.modalCategory}>
                  {getCategoryLabel(selectedChecklist.category)}
                </Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>
                      {selectedChecklist.items.filter(i => i.completed).length}
                    </Text>
                    <Text style={styles.modalStatLabel}>Completati</Text>
                  </View>
                  <View style={styles.modalStatDivider} />
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>
                      {selectedChecklist.items.length}
                    </Text>
                    <Text style={styles.modalStatLabel}>Totali</Text>
                  </View>
                  <View style={styles.modalStatDivider} />
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>
                      {getCompletionPercentage(selectedChecklist)}%
                    </Text>
                    <Text style={styles.modalStatLabel}>Progresso</Text>
                  </View>
                </View>
              </View>
              
              <ScrollView
                style={styles.modalContent}
                contentContainerStyle={styles.modalContentContainer}
                showsVerticalScrollIndicator={false}
              >
                {selectedChecklist.items.map((item, index) => (
                  <Pressable
                    key={item.id}
                    style={({ pressed }) => [
                      styles.checklistItem,
                      item.completed && styles.checklistItemCompleted,
                      pressed && styles.checklistItemPressed,
                    ]}
                    onPress={() => toggleItem(item.id)}
                  >
                    <View style={styles.checklistItemNumber}>
                      <Text style={styles.checklistItemNumberText}>{index + 1}</Text>
                    </View>
                    
                    <Text
                      style={[
                        styles.checklistItemText,
                        item.completed && styles.checklistItemTextCompleted,
                      ]}
                    >
                      {item.text}
                    </Text>
                    
                    <View
                      style={[
                        styles.checkbox,
                        item.completed && styles.checkboxChecked,
                      ]}
                    >
                      {item.completed && (
                        <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
                      )}
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
              
              <View style={styles.modalActions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={resetChecklist}
                >
                  <IconSymbol name="arrow.counterclockwise" size={20} color={colors.warning} />
                  <Text style={styles.actionButtonText}>Reset</Text>
                </Pressable>
                
                <Pressable
                  style={styles.actionButton}
                  onPress={exportChecklist}
                >
                  <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Esporta</Text>
                </Pressable>
                
                {selectedChecklist.category === 'custom' && (
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => deleteChecklist(selectedChecklist.id)}
                  >
                    <IconSymbol name="trash" size={20} color={colors.error} />
                    <Text style={styles.actionButtonText}>Elimina</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </Modal>

        {/* Create Modal */}
        <Modal
          visible={showCreateModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowCreateModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable
                onPress={() => setShowCreateModal(false)}
                style={styles.modalCloseButton}
              >
                <IconSymbol name="xmark.circle.fill" size={32} color={colors.textSecondary} />
              </Pressable>
              
              <LinearGradient
                colors={gradients.purple}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalIconContainer}
              >
                <IconSymbol name="plus.circle.fill" size={48} color="#FFFFFF" />
              </LinearGradient>
              
              <Text style={styles.modalTitle}>Nuova Checklist</Text>
              <Text style={styles.modalCategory}>Crea una checklist personalizzata</Text>
            </View>
            
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Titolo Checklist</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Es: Routine Pre-Gara"
                  placeholderTextColor={colors.textLight}
                  value={newChecklistTitle}
                  onChangeText={setNewChecklistTitle}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Elementi Checklist</Text>
                {newChecklistItems.map((item, index) => (
                  <View key={index} style={styles.itemInputRow}>
                    <Text style={styles.itemNumber}>{index + 1}.</Text>
                    <TextInput
                      style={styles.itemInput}
                      placeholder="Inserisci elemento"
                      placeholderTextColor={colors.textLight}
                      value={item}
                      onChangeText={(value) => updateNewItemField(index, value)}
                    />
                    {newChecklistItems.length > 1 && (
                      <Pressable
                        onPress={() => removeNewItemField(index)}
                        style={styles.removeItemButton}
                      >
                        <IconSymbol name="minus.circle.fill" size={24} color={colors.error} />
                      </Pressable>
                    )}
                  </View>
                ))}
                
                <Pressable
                  style={styles.addItemButton}
                  onPress={addNewItemField}
                >
                  <IconSymbol name="plus.circle" size={20} color={colors.primary} />
                  <Text style={styles.addItemButtonText}>Aggiungi Elemento</Text>
                </Pressable>
              </View>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.actionButtonLarge, styles.actionButtonSecondary]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.actionButtonLargeTextSecondary}>Annulla</Text>
              </Pressable>
              
              <Pressable
                style={styles.actionButtonLarge}
                onPress={createNewChecklist}
              >
                <LinearGradient
                  colors={gradients.purple}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionButtonLargeGradient}
                >
                  <Text style={styles.actionButtonLargeText}>Crea Checklist</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.lg,
  },
  headerCard: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xxxl,
    marginBottom: spacing.xl,
    alignItems: 'center',
    ...shadows.large,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.title,
    color: colors.textInverse,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
  },
  createButton: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  createButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  createButtonText: {
    ...typography.heading,
    color: colors.textInverse,
  },
  checklistsGrid: {
    gap: spacing.md,
  },
  checklistCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  checklistCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  checklistIconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checklistContent: {
    flex: 1,
  },
  checklistTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  checklistCategory: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  checklistStats: {
    gap: spacing.sm,
  },
  checklistStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  checklistStatText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: borderRadius.round,
  },
  progressText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalCloseButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  modalIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  modalCategory: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    justifyContent: 'space-around',
  },
  modalStat: {
    alignItems: 'center',
    flex: 1,
  },
  modalStatValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  modalStatLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  modalStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    padding: spacing.lg,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    ...shadows.small,
  },
  checklistItemCompleted: {
    backgroundColor: colors.highlightGreen,
  },
  checklistItemPressed: {
    opacity: 0.7,
  },
  checklistItemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checklistItemNumberText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700',
  },
  checklistItemText: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  checklistItemTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  modalActions: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700',
  },
  actionButtonLarge: {
    flex: 1,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  actionButtonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  actionButtonLargeGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  actionButtonLargeText: {
    ...typography.heading,
    color: colors.textInverse,
  },
  actionButtonLargeTextSecondary: {
    ...typography.heading,
    color: colors.text,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    fontSize: 17,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
  },
  itemInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  itemNumber: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
    width: 24,
  },
  itemInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
  },
  removeItemButton: {
    padding: spacing.xs,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addItemButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
});
