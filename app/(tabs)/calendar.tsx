
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function CalendarScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getWeekDates = (weekNumber: number) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(selectedWeek);

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
          <View style={[commonStyles.card, styles.weekSelector]}>
            <Text style={styles.sectionTitle}>Seleziona Settimana</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekList}
            >
              {weeks.map((week) => (
                <Pressable
                  key={week}
                  style={[
                    styles.weekButton,
                    selectedWeek === week && styles.weekButtonActive,
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
              ))}
            </ScrollView>
          </View>

          <View style={[commonStyles.card]}>
            <View style={styles.weekHeader}>
              <Text style={styles.sectionTitle}>Settimana {selectedWeek}</Text>
              <Text style={styles.weekDates}>
                {weekDates[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - {' '}
                {weekDates[6].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
              </Text>
            </View>

            <View style={styles.daysGrid}>
              {daysOfWeek.map((day, index) => {
                const date = weekDates[index];
                const isSelected = selectedDay === index;
                const isToday = date.toDateString() === new Date().toDateString();
                
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
                    <View style={[
                      styles.dayIndicator,
                      { backgroundColor: index === 6 ? colors.accent : colors.primary }
                    ]} />
                  </Pressable>
                );
              })}
            </View>
          </View>

          {selectedDay !== null && (
            <View style={[commonStyles.card]}>
              <Text style={styles.sectionTitle}>
                {daysOfWeek[selectedDay]} - {weekDates[selectedDay].toLocaleDateString('it-IT')}
              </Text>
              
              <View style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <IconSymbol name="sunrise.fill" size={24} color={colors.warning} />
                  <Text style={styles.sessionTitle}>Mattutina</Text>
                </View>
                <Text style={styles.sessionTime}>07:00 - 07:30</Text>
                <Text style={styles.sessionDescription}>Routine mattutina e valutazione</Text>
              </View>

              {selectedDay !== 6 ? (
                <>
                  <View style={styles.sessionCard}>
                    <View style={styles.sessionHeader}>
                      <IconSymbol name="flame.fill" size={24} color={colors.primary} />
                      <Text style={styles.sessionTitle}>Allenamento Principale</Text>
                    </View>
                    <Text style={styles.sessionTime}>10:00 - 12:00</Text>
                    <Text style={styles.sessionDescription}>
                      Forza, resistenza e tecnica specifica
                    </Text>
                  </View>

                  <View style={styles.sessionCard}>
                    <View style={styles.sessionHeader}>
                      <IconSymbol name="figure.cooldown" size={24} color={colors.accent} />
                      <Text style={styles.sessionTitle}>Recupero</Text>
                    </View>
                    <Text style={styles.sessionTime}>18:00 - 18:30</Text>
                    <Text style={styles.sessionDescription}>
                      Stretching e foam rolling
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.sessionCard}>
                  <View style={styles.sessionHeader}>
                    <IconSymbol name="bed.double.fill" size={24} color={colors.accent} />
                    <Text style={styles.sessionTitle}>Giorno di Riposo</Text>
                  </View>
                  <Text style={styles.sessionDescription}>
                    Recupero attivo: stretching leggero e mobilità
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={[commonStyles.card, styles.legendCard]}>
            <Text style={styles.sectionTitle}>Legenda</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Giorno di allenamento</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.legendText}>Giorno di riposo</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  weekList: {
    paddingVertical: 4,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  weekButtonActive: {
    backgroundColor: colors.primary,
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCardSelected: {
    backgroundColor: colors.primary,
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
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  sessionCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
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
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: colors.text,
  },
});
