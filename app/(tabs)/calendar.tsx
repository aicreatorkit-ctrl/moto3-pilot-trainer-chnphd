
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

const STORAGE_KEY_CALENDAR = '@moto3_custom_calendar';
const STORAGE_KEY_COMPLETION = '@moto3_completion_data';

const TRAINING_TYPES = {
  FORZA_MAX: { label: 'Forza Massimale', color: '#FF4444', icon: '💪' },
  POTENZA: { label: 'Potenza', color: '#FF8C00', icon: '⚡' },
  RESISTENZA: { label: 'Resistenza', color: '#4CAF50', icon: '🏃' },
  TECNICO: { label: 'Tecnico Specifico', color: '#2196F3', icon: '🏍️' },
  MOBILITA: { label: 'Mobilità/Correttivo', color: '#9C27B0', icon: '🧘' },
  RECUPERO: { label: 'Recupero Attivo', color: '#00BCD4', icon: '💨' },
  RIPOSO: { label: 'Riposo Completo', color: '#757575', icon: '🛏️' },
  DELOAD: { label: 'Deload', color: '#FFB300', icon: '⬇️' },
  GARA: { label: 'Gara', color: '#FFD700', icon: '🏁' },
};

// Dati completi 18 settimane (mantengo i dati originali come default)
const COMPLETE_TRAINING_DATA = {
  // SETTIMANA 1
  1: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core Forza',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: 10, weight: '16kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 6 },
          { name: 'Trap-Bar Deadlift', sets: 4, reps: 8, weight: '40kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 6 },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10/gamba', weight: 'BW', tempo: '2-0-2', rest: '75"', notes: 'Equilibrio focus', rpe: 5 },
          { name: 'Nordic Curl assistito', sets: 3, reps: '5-6', weight: 'Elastico', tempo: '5" ecc', rest: '90"', notes: 'Femorali attivi', rpe: 7 },
          { name: 'Ab Wheel ginocchia', sets: 4, reps: 8, weight: 'BW', tempo: '4-2-1', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
          { name: 'Hollow Hold', sets: 4, reps: '35"', weight: 'BW', tempo: 'Iso', rest: '75"', notes: 'Schiena piatta terra', rpe: 6 },
        ],
        rpe: 6.5,
        volume: '90min',
        notes: '🎯 BASELINE settimana 1! Registra tutto'
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
      notes: '🎯 PRIMA SESSIONE! Focus: baseline tecnica + tracking rigidità'
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 },
          { name: 'Child\'s Pose', sets: 2, reps: '45"', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, rpe: 3 },
        ],
        rpe: 3
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck Specialist',
        exercises: [
          { name: 'Panca Piana Manubri', sets: 4, reps: 10, weight: '8kg/mano', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '35kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 6 },
          { name: 'Neck Isometrics 4 Dir', sets: 4, reps: '30"/dir', weight: 'Mano', tempo: 'Hold', rest: '45"', notes: 'Forza 70% max', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max tempo', weight: 'BW', tempo: 'Hold', rest: '120"', notes: 'Baseline test', rpe: 9 },
        ],
        rpe: 6.5,
        volume: '75min',
        notes: 'Dead-hang baseline: registra tempo migliore!'
      },
      notes: '💪 Upper body baseline + neck work'
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }],
        rpe: 3
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Bike Z2 Steady State + Core Post-Bike',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '75min', weight: 'HR 130-145', tempo: 'Steady', rest: 'N/A', notes: '🚴 Cadenza 80-90rpm', rpe: 6 },
          { name: 'Plank Hold post-bike', sets: 3, reps: '45"', weight: 'BW', tempo: 'Iso', rest: '30"', notes: 'SOTTO FATICA', rpe: 7 },
        ],
        rpe: 6.5,
        volume: '90min',
        notes: '🎯 Core POST-BIKE = transfer cruciale'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }],
        rpe: 3
      },
      main: {
        time: '10:00-11:15',
        type: 'RESISTENZA',
        description: 'Lower Endurance + Core Specifico',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '45"', weight: 'BW', tempo: 'Iso', rest: '90"', notes: 'BASELINE! Coscia parallela', rpe: 7 },
          { name: 'Step-Up', sets: 3, reps: '12/gamba', weight: 'BW', tempo: '2-0-2', rest: '60"', notes: 'Box 40cm', rpe: 5 },
        ],
        rpe: 6,
        volume: '75min',
        notes: '🎯 Wall Sit BASELINE 45" - target 120"×3'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RESISTENZA',
        description: 'Upper Endurance + Grip Specialist',
        exercises: [
          { name: 'Push-Up Standard', sets: 4, reps: '15-20', weight: 'BW', tempo: '2-0-1', rest: '60"', notes: 'Target 60-80 reps', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', tempo: 'Hold', rest: '120"', notes: 'Tentare battere baseline', rpe: 9 },
        ],
        rpe: 7,
        volume: '60min',
        notes: '💪 Grip focus! Dead-hang baseline'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\'',
        exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }],
        rpe: 3
      },
      main: {
        time: '10:00-11:45',
        type: 'RESISTENZA',
        description: 'Bike Z2 Long + Core + 🍌 +600 KCAL',
        exercises: [
          { name: 'Bike Z2 Extended', sets: 1, reps: '90min', weight: 'HR 130-145', notes: '🍌 +600 KCAL protocol', rpe: 6 },
          { name: 'Plank Hold post-bike', sets: 3, reps: '45"', notes: 'FATICA metabolica', rpe: 7 },
        ],
        rpe: 6,
        volume: '105min',
        notes: '🍌 SABATO +600 KCAL OBBLIGATORIO!'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' (OPZIONALE)',
        exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }],
        rpe: 3
      },
      main: {
        time: '10:00-11:00',
        type: 'RECUPERO',
        description: 'Recovery Attivo + Core Volume',
        exercises: [
          { name: 'Walk Aerobico O Yoga', sets: 1, reps: '30-40min', notes: '🧘 HR <120 bpm', rpe: 3 },
          { name: 'Ab Wheel ginocchia', sets: 3, reps: 8, weight: 'BW', rest: '90"', rpe: 6 },
        ],
        rpe: 6,
        volume: '60min',
        notes: '✅ SETTIMANA 1 COMPLETATA!'
      },
    }
  },
  
  // SETTIMANA 2 - Progressione +5%
  2: {
    0: {
      morning: { time: '06:00-06:12', type: 'MOBILITA', description: 'Routine Mattutina 12\'', exercises: [{ name: 'Cat-Cow', sets: 2, reps: 15, rpe: 3 }], rpe: 3 },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core (Progressione)',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: 10, weight: '18kg', tempo: '3-0-1', rest: '90"', notes: '+2kg vs S1', rpe: 6 },
          { name: 'Trap-Bar Deadlift', sets: 4, reps: 8, weight: '45kg', tempo: '3-0-1', rest: '120"', notes: '+5kg', rpe: 6 },
          { name: 'Bulgarian Split', sets: 3, reps: '10/g', weight: '2×5kg', notes: '+5kg/mano', rpe: 5 },
          { name: 'Nordic Curl', sets: 3, reps: 6, notes: '+1 rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, notes: '+2 reps', rpe: 7 },
          { name: 'Weighted Plank', sets: 4, reps: '40"', weight: '2.5kg', notes: 'Disco su schiena', rpe: 6 },
        ],
        rpe: 6.5,
        notes: '📈 Progressione carichi +5%'
      },
      notes: 'Consolidamento tecnica + volume'
    },
    1: {
      main: {
        type: 'FORZA_MAX',
        description: 'Upper Body Progression',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '10kg/mano', notes: '+2kg', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', notes: '+5kg', rpe: 6 },
          { name: 'Dead-Hang', sets: 3, reps: 'Max', notes: 'Target >baseline', rpe: 9 },
        ],
        rpe: 6.5,
        notes: 'Upper strength building'
      }
    },
    2: { main: { type: 'RESISTENZA', description: 'Bike Z2 80min + Core', exercises: [{ name: 'Bike Z2', reps: '80min', notes: '+5min', rpe: 6 }], rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Wall Sit Progression', exercises: [{ name: 'Wall Sit', sets: 3, reps: '50"', notes: '+5"', rpe: 7 }], rpe: 6 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper Endurance', exercises: [{ name: 'Push-Ups', reps: '160', notes: '+10 totali', rpe: 7 }], rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike Long 95min + +600kcal', exercises: [{ name: 'Bike', reps: '95min', rpe: 6 }], rpe: 6, notes: '🍌 +600 KCAL' }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 55min', exercises: [{ name: 'Core Circuit', reps: '55min', rpe: 6 }], rpe: 6 }},
  },

  // SETTIMANA 3 - Peak Meso 1A
  3: {
    0: {
      main: {
        type: 'FORZA_MAX',
        description: 'Lower Peak Meso 1A',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: 10, weight: '20kg', notes: 'PEAK M1A', rpe: 7 },
          { name: 'Trap-Bar', sets: 4, reps: 8, weight: '50kg', notes: 'PEAK', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 12, notes: 'Consolidamento', rpe: 7 },
          { name: 'Weighted Plank', sets: 4, reps: '45"', weight: '5kg', notes: '+2.5kg', rpe: 7 },
        ],
        rpe: 7,
        notes: '🔥 PEAK settimana Meso 1A'
      }
    },
    1: { main: { type: 'FORZA_MAX', description: 'Upper Peak', exercises: [{ name: 'Panca', weight: '12kg/mano', rpe: 7 }, { name: 'Pull', weight: '45kg', rpe: 7 }], rpe: 7 }},
    2: { main: { type: 'RESISTENZA', description: 'Bike 85min', rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Wall Sit 3×55"', exercises: [{ name: 'Wall Sit', reps: '55"', notes: 'Peak', rpe: 7 }], rpe: 7 }},
    4: { main: { type: 'RESISTENZA', description: 'Push-Ups 170', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 100min PEAK + +600', notes: '🍌 +600 KCAL', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 60min PEAK', rpe: 6 }},
  },

  // SETTIMANA 4 - DELOAD 1
  4: {
    0: { main: { type: 'DELOAD', description: 'Lower Deload -50% volume', exercises: [{ name: 'Goblet', weight: '14kg', sets: 3, reps: 8, notes: '-30% carico', rpe: 4 }], rpe: 4, notes: '🔄 DELOAD Week' }},
    1: { main: { type: 'DELOAD', description: 'Upper Deload', exercises: [{ name: 'Panca', weight: '8kg', sets: 3, reps: 8, rpe: 4 }], rpe: 4 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Z1 55min Recovery', rpe: 3 }},
    3: { main: { type: 'DELOAD', description: 'Lower Light', exercises: [{ name: 'Wall Sit', reps: '50"', rpe: 4 }], rpe: 4 }},
    4: { main: { type: 'RECUPERO', description: 'Upper Light O OFF', rpe: 3 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Z1 65min O Walk', rpe: 3, notes: 'NO +600 kcal' }},
    6: { main: { type: 'RIPOSO', description: 'OFF O Yoga 45min', rpe: 0, notes: '✅ DELOAD 1 completato' }},
  },

  // SETTIMANA 5-7: MESOCICLO 2A HYPERTROPHY
  5: {
    0: {
      main: {
        type: 'FORZA_MAX',
        description: 'Lower Hypertrophy Start',
        exercises: [
          { name: 'Goblet Squat', sets: 5, reps: 12, weight: '18kg', tempo: '3-1-1', notes: 'Volume ↑', rpe: 7 },
          { name: 'Trap-Bar', sets: 5, reps: 10, weight: '48kg', rpe: 7 },
          { name: 'Bulgarian', sets: 4, reps: '12/g', weight: '8kg/m', notes: 'Hypertrophy range', rpe: 7 },
          { name: 'Nordic', sets: 4, reps: 8, rpe: 7 },
          { name: 'Calf Raise Weighted', sets: 4, reps: 20, weight: '60kg', notes: '🆕 Added', rpe: 7 },
          { name: "Farmer's Walk", sets: 4, reps: '50m', weight: '20kg/m', notes: '🆕 Programmed', rpe: 7 },
        ],
        rpe: 7,
        notes: '🆕 Hypertrophy start + Farmer walks'
      }
    },
    1: { main: { type: 'FORZA_MAX', description: 'Upper Hypertrophy', exercises: [{ name: 'Panca', sets: 5, reps: 12, weight: '11kg/m', rpe: 7 }], rpe: 7 }},
    2: { main: { type: 'RESISTENZA', description: 'Bike 85min + 🆕 Propriocezione 15min', notes: '🆕 Balance training', rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Lower Endurance', rpe: 7 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 105min + +600', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 65min', rpe: 6 }},
  },

  6: {
    0: { main: { type: 'FORZA_MAX', description: 'Hypertrophy Progression', exercises: [{ name: 'Goblet', weight: '20kg', sets: 5, reps: 12, rpe: 7 }], rpe: 7 }},
    1: { main: { type: 'FORZA_MAX', description: 'Upper Hypertrophy', rpe: 7 }},
    2: { main: { type: 'RESISTENZA', description: 'Bike + Proprio', rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Lower End', rpe: 7 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 110min +600', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core 70min', rpe: 6 }},
  },

  7: {
    0: { main: { type: 'FORZA_MAX', description: 'Hypertrophy PEAK', exercises: [{ name: 'Goblet', weight: '22kg', notes: 'PEAK M2A', rpe: 8 }], rpe: 8, notes: '🔥 Peak Hypertrophy' }},
    1: { main: { type: 'FORZA_MAX', description: 'Upper Peak', rpe: 8 }},
    2: { main: { type: 'RESISTENZA', description: 'Bike 115min PEAK', rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Lower Peak', rpe: 8 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper Peak', rpe: 8 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 115min +600', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core 75min PEAK', rpe: 7 }},
  },

  // SETTIMANA 8 - DELOAD 2
  8: {
    0: { main: { type: 'DELOAD', description: 'Lower Deload', rpe: 4, notes: '🔄 DELOAD 2' }},
    1: { main: { type: 'DELOAD', description: 'Upper Deload', rpe: 4 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Recovery', rpe: 3 }},
    3: { main: { type: 'DELOAD', description: 'Lower Light', rpe: 4 }},
    4: { main: { type: 'RECUPERO', description: 'Upper Light', rpe: 3 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Easy', rpe: 3 }},
    6: { main: { type: 'RIPOSO', description: 'OFF Completo', rpe: 0, notes: '✅ M2A completato' }},
  },

  // SETTIMANA 9 - MESOCICLO 2B STRENGTH BASE
  9: {
    0: {
      main: {
        type: 'FORZA_MAX',
        description: 'Lower Strength Start',
        exercises: [
          { name: 'Front Squat', sets: 5, reps: 6, weight: '32kg', notes: '🆕 Strength phase', rpe: 8 },
          { name: 'Trap-Bar', sets: 5, reps: 5, weight: '62kg', notes: 'Heavy 5s', rpe: 8 },
          { name: 'Box Jump', sets: 5, reps: 3, weight: '50cm', notes: '🆕 Power', rpe: 7 },
        ],
        rpe: 8,
        notes: '💪 Strength phase start'
      }
    },
    1: { main: { type: 'FORZA_MAX', description: 'Upper Strength', exercises: [{ name: 'Panca', weight: '14kg/m', sets: 5, reps: 6, rpe: 8 }], rpe: 8 }},
    2: { main: { type: 'RESISTENZA', description: 'Bike 100min', rpe: 6 }},
    3: { main: { type: 'RESISTENZA', description: 'Wall Sit 3×70"', exercises: [{ name: 'Wall Sit', reps: '70"', rpe: 7 }], rpe: 7 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 115min +600', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core 50min', rpe: 6 }},
  },

  // SETTIMANE 10-11: MESOCICLO 3 TRANSFER MOTO3
  10: {
    0: {
      main: {
        type: 'POTENZA',
        description: 'Lower Power + 🏍️ Plank Casco',
        exercises: [
          { name: 'Front Squat PAP', sets: 5, reps: 3, weight: '40kg', notes: '85% 1RM', rpe: 8.5 },
          { name: 'Box Jump', sets: 5, reps: 2, weight: '60cm', notes: 'PAP complex', rpe: 8 },
          { name: 'Ab Wheel Piedi 70% ROM', sets: 4, reps: '8-10', notes: '🆕 Da piedi', rpe: 9 },
          { name: '🏍️ Plank con Casco', sets: 4, reps: '45"', notes: '🆕 Transfer Moto3!', rpe: 8 },
        ],
        rpe: 8.5,
        notes: '🏍️ TRANSFER PROTOCOLS START!'
      }
    },
    1: { main: { type: 'POTENZA', description: 'Upper Power + Neck', rpe: 8.5 }},
    2: {
      main: {
        type: 'TECNICO',
        description: '🏍️ RSA Intervals 8×30" Z4-Z5',
        exercises: [
          { name: 'RSA Intervals', sets: 8, reps: '30"', weight: '155-165bpm', notes: '🆕 Race simulation', rpe: 9 },
        ],
        rpe: 9,
        notes: '🏍️ RSA + Dual-Task Cognitive'
      }
    },
    3: { main: { type: 'RESISTENZA', description: 'Lower + 🏍️ Plank Casco', exercises: [{ name: 'Wall Sit', reps: '80"', rpe: 7 }, { name: '🏍️ Plank Casco', reps: '50"', rpe: 8 }], rpe: 7 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 120min + 🏍️ Plank Casco 3×55"', notes: '🍌 +600', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 55min', rpe: 6 }},
  },

  11: {
    0: { main: { type: 'POTENZA', description: 'Lower Power Peak', exercises: [{ name: 'Front Squat', weight: '42kg', rpe: 9 }, { name: '🏍️ Plank Casco', reps: '55"', rpe: 8 }], rpe: 9 }},
    1: { main: { type: 'POTENZA', description: 'Upper Power Peak', rpe: 9 }},
    2: { main: { type: 'TECNICO', description: '🏍️ RSA 10×30" Z5', notes: 'Progression +2 intervals', rpe: 9 }},
    3: { main: { type: 'RESISTENZA', description: 'Lower + 🏍️ Plank 60"', exercises: [{ name: 'Wall Sit', reps: '90"', notes: 'Approaching 120"', rpe: 9 }], rpe: 8 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip Test 75"', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 120min + 🏍️ Plank 65" PEAK', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 55min', rpe: 6 }},
  },

  // SETTIMANA 12 - DELOAD 3
  12: {
    0: { main: { type: 'DELOAD', description: 'Lower Deload', rpe: 4, notes: '🔄 DELOAD 3 pre-peak' }},
    1: { main: { type: 'DELOAD', description: 'Upper Deload', rpe: 4 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Z1 55min', rpe: 3 }},
    3: { main: { type: 'DELOAD', description: 'Lower Maintenance', rpe: 4 }},
    4: { main: { type: 'RECUPERO', description: 'OFF O Upper Light', rpe: 3 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Z1 O Walk', rpe: 3 }},
    6: { main: { type: 'RIPOSO', description: 'OFF O Yoga', rpe: 0, notes: '✅ Ready Meso 3B Peak' }},
  },

  // SETTIMANE 13-15: MESOCICLO 3B PEAK TRANSFER
  13: {
    0: {
      main: {
        type: 'POTENZA',
        description: 'Lower PEAK + 🏍️ Plank Casco 70"',
        exercises: [
          { name: 'Front Squat', sets: 5, reps: 3, weight: '45kg', notes: 'PEAK 88-90% 1RM', rpe: 9 },
          { name: 'Box Jump', sets: 5, reps: 2, weight: '70cm', notes: 'PEAK height', rpe: 9 },
          { name: 'Ab Wheel Piedi 85% ROM', sets: 4, reps: 10, notes: 'Progression', rpe: 9 },
          { name: '🏍️ Plank Casco', sets: 4, reps: '70"', notes: 'Target 90"', rpe: 8.5 },
        ],
        rpe: 9,
        notes: '🔥 PEAK TRANSFER start'
      }
    },
    1: { main: { type: 'POTENZA', description: 'Upper PEAK', exercises: [{ name: 'Panca', weight: '17kg/m', rpe: 9 }, { name: 'Pull-Up', weight: '+7kg', rpe: 9 }], rpe: 9 }},
    2: { main: { type: 'TECNICO', description: '🏍️ RSA 6×30" Z5 PEAK', notes: 'Quality over quantity', rpe: 9 }},
    3: {
      main: {
        type: 'TECNICO',
        description: '🔥 METABOLIC CORE CIRCUIT + Wall Sit 3×120"',
        exercises: [
          { name: '🏍️ Metabolic Circuit', sets: 5, reps: '5 giri', notes: '🆕 Race simulation!', rpe: 9.5 },
          { name: 'Wall Sit', sets: 3, reps: '120"', notes: '🎯 TARGET = 6 min!', rpe: 9 },
        ],
        rpe: 9.5,
        notes: '🏍️🔥 MAJOR MILESTONE DAY!'
      }
    },
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip Test 80"', notes: 'Dead-hang milestone', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 120min + 🏍️ Plank 80"', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 60min PEAK', rpe: 6 }},
  },

  14: {
    0: { main: { type: 'POTENZA', description: 'Lower Consolidamento', exercises: [{ name: 'Front Squat', weight: '46kg', rpe: 9 }, { name: '🏍️ Plank Casco', reps: '75"', rpe: 9 }], rpe: 9 }},
    1: { main: { type: 'POTENZA', description: 'Upper Peak + Neck 9kg', rpe: 9 }},
    2: { main: { type: 'TECNICO', description: '🏍️ RSA Consolidamento', rpe: 9 }},
    3: { main: { type: 'TECNICO', description: '🔥 Metabolic <38min + Wall Sit 3×150"', notes: '7.5 min total!', rpe: 9.5 }},
    4: { main: { type: 'RESISTENZA', description: 'Upper + Grip Test 85"', rpe: 7 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 120min + 🏍️ Plank 85"', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RECUPERO', description: 'Core Volume 60min', rpe: 6 }},
  },

  15: {
    0: {
      main: {
        type: 'POTENZA',
        description: '🏆 ABSOLUTE PEAK + 🏍️ Plank 4×90"',
        exercises: [
          { name: 'Front Squat', sets: 5, reps: 3, weight: '48kg', notes: '🏆 PEAK ASSOLUTO', rpe: 9.5 },
          { name: 'Box Jump', sets: 5, reps: 2, weight: '75cm', notes: '🏆 PEAK', rpe: 9 },
          { name: 'Ab Wheel Piedi FULL ROM', sets: 4, reps: 10, notes: '🏆 100% ROM!', rpe: 10 },
          { name: '🏍️ Plank Casco', sets: 4, reps: '90"', notes: '🏆 TARGET FINALE!', rpe: 10 },
        ],
        rpe: 10,
        notes: '🏆🏆🏆 ABSOLUTE PEAK DAY!'
      }
    },
    1: {
      main: {
        type: 'POTENZA',
        description: '🏆 Upper PEAK + Grip 90"',
        exercises: [
          { name: 'Panca', sets: 5, reps: 4, weight: '18kg/m', notes: '🏆 PEAK', rpe: 9.5 },
          { name: 'Pull-Up', sets: 5, reps: 4, weight: '+8kg', notes: '🏆 PEAK', rpe: 9.5 },
          { name: 'Neck Harness', sets: 4, reps: 10, weight: '10kg', notes: '🏆 TARGET!', rpe: 9 },
          { name: 'Dead-Hang', sets: 3, reps: '90"+', notes: '🏆 TARGET FINALE!', rpe: 10 },
        ],
        rpe: 9.5,
        notes: '🏆 Grip + Neck peak achieved'
      }
    },
    2: { main: { type: 'TECNICO', description: '🏍️ RSA PEAK <4% drop', rpe: 9 }},
    3: {
      main: {
        type: 'TECNICO',
        description: '🏆 METABOLIC <36min + Wall Sit 3×180"',
        exercises: [
          { name: 'Metabolic Circuit', reps: '<36min', notes: '🏆 PEAK tempo', rpe: 10 },
          { name: 'Wall Sit', sets: 3, reps: '180"', notes: '🏆 9 MINUTI TOTALI!', rpe: 10 },
        ],
        rpe: 10,
        notes: '🏆🏆🏆 FINALE TARGETS ACHIEVED!'
      }
    },
    4: { main: { type: 'RECUPERO', description: 'Recovery Active', rpe: 5 }},
    5: { main: { type: 'RESISTENZA', description: 'Bike 120min + 🏍️ Plank 90" consolidamento', notes: '🍌', rpe: 6 }},
    6: { main: { type: 'RIPOSO', description: 'OFF O Core Light 30min', rpe: 0, notes: '✅ MESO 3 COMPLETATO!' }},
  },

  // SETTIMANA 16 - DELOAD 4 + TAPER START
  16: {
    0: { main: { type: 'DELOAD', description: 'Lower Deload/Taper -40%', exercises: [{ name: 'Front Squat', weight: '45kg', sets: 3, reps: 3, notes: 'Intensità mantenuta', rpe: 7 }], rpe: 7, notes: '🏁 TAPER START' }},
    1: { main: { type: 'DELOAD', description: 'Upper Taper', exercises: [{ name: 'Panca', weight: '17kg', sets: 3, reps: 4, rpe: 7 }], rpe: 7 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Z1 60min', rpe: 4 }},
    3: { main: { type: 'DELOAD', description: 'Lower Maintenance', exercises: [{ name: 'Wall Sit', reps: '80"', rpe: 5 }], rpe: 5 }},
    4: { main: { type: 'RIPOSO', description: 'OFF O Upper Very Light', rpe: 0 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Z1 70min + Proprio', notes: 'NO +600 kcal', rpe: 3 }},
    6: { main: { type: 'RIPOSO', description: 'OFF Completo', rpe: 0, notes: '✅ Freshness building' }},
  },

  // SETTIMANA 17 - TAPER DEEP
  17: {
    0: { main: { type: 'DELOAD', description: 'Lower Spot Check', exercises: [{ name: 'Front Squat', weight: '46kg', sets: 2, reps: 2, notes: 'Speed check', rpe: 7 }], rpe: 7, notes: '🏁 Taper deep -65%' }},
    1: { main: { type: 'DELOAD', description: 'Upper Spot Check', exercises: [{ name: 'Panca', weight: '17kg', sets: 2, reps: 3, rpe: 7 }], rpe: 7 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Z1 45min O OFF', rpe: 3 }},
    3: { main: { type: 'DELOAD', description: 'Lower Light + Core 15min', rpe: 5 }},
    4: { main: { type: 'RIPOSO', description: 'OFF O Walk 30min', rpe: 0 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Z1 60min + Proprio 10min', rpe: 3 }},
    6: { main: { type: 'RIPOSO', description: 'OFF Completo', rpe: 0, notes: '✅ Ultra fresh' }},
  },

  // SETTIMANA 18 - PEAK READINESS FINALE
  18: {
    0: { main: { type: 'MOBILITA', description: 'Movement Quality 30min', rpe: 4, notes: '🏁 PEAK READINESS WEEK' }},
    1: { main: { type: 'RIPOSO', description: 'OFF O Walk', rpe: 0 }},
    2: { main: { type: 'RECUPERO', description: 'Bike Short 40min', rpe: 3 }},
    3: {
      main: {
        type: 'GARA',
        description: '🏆 KPI FINALI TEST (22 items)',
        exercises: [
          { name: 'Wall Sit 3×180"', notes: '🎯 9 min target', rpe: 9 },
          { name: '🏍️ Plank Casco 4×90"', notes: '🎯 Target', rpe: 9 },
          { name: 'Dead-Hang >90"', notes: '🎯 Milestone', rpe: 9 },
          { name: 'Ab Wheel Piedi Full ROM', notes: '🎯 10 reps', rpe: 9 },
          { name: 'Front Squat 52kg×5', notes: 'Strength check', rpe: 8 },
          { name: 'Grip + Balance Tests', notes: 'Complete checklist', rpe: 8 },
        ],
        rpe: 9,
        notes: '🏆 GIORNO DELLA VERITÀ - KPI TEST'
      }
    },
    4: { main: { type: 'RIPOSO', description: 'OFF post-test', rpe: 0 }},
    5: { main: { type: 'RECUPERO', description: 'Bike Gentle 50min + Visualization', rpe: 3 }},
    6: { main: { type: 'RIPOSO', description: 'OFF + Prep Race Week', rpe: 0, notes: '🏁🏁🏁 READY TO RACE!' }},
  },
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
          <Text style={styles.sessionIcon}>{typeInfo.icon}</Text>
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
          <Text style={styles.exercisesTitle}>
            Esercizi ({session.exercises.length}):
          </Text>
          {session.exercises.map((exercise, index) => (
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
                  {exercise.rpe && ` - RPE ${exercise.rpe}`}
                </Text>
              )}
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>  → {exercise.notes}</Text>
              )}
            </Pressable>
          ))}
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
        <Text style={styles.completeButtonIcon}>
          {isCompleted ? '✓' : '○'}
        </Text>
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
  const [calendarStartDate, setCalendarStartDate] = useState(new Date('2025-11-16'));

  useEffect(() => {
    loadCalendarData();
    loadCompletionData();
  }, []);

  useEffect(() => {
    saveCompletionData();
  }, [completionData]);

  const loadCalendarData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY_CALENDAR);
      if (stored) {
        setWeekData(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading calendar data:', error);
    }
  };

  const saveCalendarData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_CALENDAR, JSON.stringify(data));
      setWeekData(data);
    } catch (error) {
      console.log('Error saving calendar data:', error);
    }
  };

  const loadCompletionData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY_COMPLETION);
      if (stored) {
        setCompletionData(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading completion data:', error);
    }
  };

  const saveCompletionData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(completionData));
    } catch (error) {
      console.log('Error saving completion data:', error);
    }
  };

  const importFromMarkdown = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      
      const response = await fetch(file.uri);
      const content = await response.text();

      Alert.alert(
        'File Importato',
        `File: ${file.name}\nDimensione: ${(file.size / 1024).toFixed(2)} KB\n\nIl contenuto è stato caricato. Implementa la logica di parsing per il tuo formato MD specifico.`,
        [{ text: 'OK' }]
      );

      console.log('MD Content:', content);

    } catch (error) {
      console.log('Error importing markdown:', error);
      Alert.alert('Errore', 'Impossibile importare il file MD');
    }
  };

  const resetToDefault = () => {
    Alert.alert(
      'Ripristina Calendario',
      'Vuoi ripristinare il calendario ai valori predefiniti? Tutti i dati personalizzati verranno persi.',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Ripristina',
          style: 'destructive',
          onPress: () => {
            saveCalendarData(COMPLETE_TRAINING_DATA);
            setCompletionData({});
          },
        },
      ]
    );
  };

  const toggleSessionComplete = (week, day, sessionType) => {
    const key = `${week}-${day}-${sessionType}`;
    setCompletionData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSessionComplete = (week, day, sessionType) => {
    const key = `${week}-${day}-${sessionType}`;
    return completionData[key] || false;
  };

  const weeks = Array.from({ length: 46 }, (_, i) => i + 1);
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getWeekDates = (weekNumber) => {
    const weekStart = new Date(calendarStartDate);
    weekStart.setDate(calendarStartDate.getDate() + (weekNumber - 1) * 7);
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
    if (week <= 3) return 'M1A';
    if (week === 4) return 'D1';
    if (week <= 7) return 'M2A';
    if (week === 8) return 'D2';
    if (week === 9) return 'M2B';
    if (week <= 11) return 'M3';
    if (week === 12) return 'D3';
    if (week <= 15) return 'M3B';
    if (week === 16) return 'D4';
    if (week === 17) return 'TAP';
    if (week === 18) return 'PEAK';
    
    // Ciclo 2: Settimane 19-36 (ripete la struttura)
    const cycleWeek = ((week - 19) % 18) + 1;
    if (cycleWeek <= 3) return 'M1A';
    if (cycleWeek === 4) return 'D1';
    if (cycleWeek <= 7) return 'M2A';
    if (cycleWeek === 8) return 'D2';
    if (cycleWeek === 9) return 'M2B';
    if (cycleWeek <= 11) return 'M3';
    if (cycleWeek === 12) return 'D3';
    if (cycleWeek <= 15) return 'M3B';
    if (cycleWeek === 16) return 'D4';
    if (cycleWeek === 17) return 'TAP';
    return 'PEAK';
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

  const getCalendarEndDate = () => {
    const endDate = new Date(calendarStartDate);
    endDate.setDate(calendarStartDate.getDate() + (46 * 7));
    return endDate;
  };

  const getTotalWeeksUntilEndOfNextYear = () => {
    const now = new Date();
    const endOfNextYear = new Date(now.getFullYear() + 1, 11, 31);
    const diffTime = endOfNextYear.getTime() - calendarStartDate.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏍️ Training Moto3</Text>
          <Text style={styles.headerSubtitle}>46 Settimane Complete</Text>
          <Text style={styles.headerDates}>
            {calendarStartDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })} - {' '}
            {getCalendarEndDate().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
          
          <View style={styles.actionButtons}>
            <Pressable style={styles.importButton} onPress={importFromMarkdown}>
              <IconSymbol ios_icon_name="doc.text.fill" android_material_icon_name="description" size={20} color="#FFFFFF" />
              <Text style={styles.importButtonText}>Importa MD</Text>
            </Pressable>
            <Pressable style={styles.resetButton} onPress={resetToDefault}>
              <IconSymbol ios_icon_name="arrow.clockwise" android_material_icon_name="refresh" size={20} color={colors.primary} />
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Seleziona Settimana</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weekList}
          >
            {weeks.map((week) => {
              const mesoLabel = getMesoLabel(week);
              // Deload weeks: 4, 8, 12, 16, 22, 26, 30, 34, 40, 44
              const isDeload = [4, 8, 12, 16, 22, 26, 30, 34, 40, 44].includes(week);
              // Taper weeks: 17-18, 35-36
              const isTaper = (week >= 17 && week <= 18) || (week >= 35 && week <= 36);

              return (
                <Pressable
                  key={week}
                  style={[
                    styles.weekButton,
                    selectedWeek === week && styles.weekButtonActive,
                    isDeload && styles.weekButtonDeload,
                    isTaper && styles.weekButtonTaper,
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
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.card}>
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
                  onPress={() => setSelectedDay(index)}
                >
                  <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                    {day}
                  </Text>
                  <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                    {date.getDate()}
                  </Text>
                  <View style={[styles.dayIndicator, { backgroundColor: typeColor }]} />
                  {completion.total > 0 && (
                    <Text style={[styles.completionText, isSelected && styles.completionTextSelected]}>
                      {completion.completed}/{completion.total}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {selectedDay !== null && currentDayData && (
          <>
            <View style={styles.card}>
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

            {selectedWeek >= 10 && selectedWeek <= 15 && (
              <View style={styles.card}>
                <Text style={styles.infoTitle}>🏍️ TRANSFER MOTO3</Text>
                <Text style={styles.infoText}>
                  {selectedWeek <= 11 && '• PAP Complexes\n• Plank con casco introduced\n• RSA intervals start'}
                  {selectedWeek === 12 && '• DELOAD pre-peak transfer\n• Recovery priority'}
                  {selectedWeek >= 13 && selectedWeek <= 15 && '• Metabolic Core Circuit\n• Wall Sit 3×120-180"\n• RSA PEAK protocols\n• Plank casco 90" target'}
                </Text>
              </View>
            )}

            {selectedWeek >= 16 && (
              <View style={styles.card}>
                <Text style={styles.infoTitle}>🏁 TAPER + PEAK</Text>
                <Text style={styles.infoText}>
                  {selectedWeek === 16 && '• Volume -40%, Intensità mantenuta\n• Freshness building start'}
                  {selectedWeek === 17 && '• Volume -65%, Spot checks\n• Deep taper'}
                  {selectedWeek === 18 && '• PEAK READINESS\n• KPI finali test Giovedì\n• Mental prep\n• Ready to race!'}
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Legenda Allenamenti</Text>
          {Object.entries(TRAINING_TYPES).map(([key, value]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: value.color }]} />
              <Text style={styles.legendIcon}>{value.icon}</Text>
              <Text style={styles.legendText}>{value.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Riepilogo Progressione</Text>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Sessioni Completate:</Text>
            <Text style={styles.progressValue}>
              {Object.keys(completionData).filter(k => completionData[k]).length}
            </Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Mesociclo Attuale:</Text>
            <Text style={styles.progressValue}>{getMesoLabel(selectedWeek)}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Focus Periodo:</Text>
            <Text style={styles.progressValue}>
              {selectedWeek <= 3 && 'Anatomical Adaptation'}
              {selectedWeek === 4 && 'Deload Recovery'}
              {selectedWeek >= 5 && selectedWeek <= 7 && 'Hypertrophy'}
              {selectedWeek === 8 && 'Deload Recovery'}
              {selectedWeek === 9 && 'Strength Base'}
              {selectedWeek >= 10 && selectedWeek <= 11 && 'Transfer + Power'}
              {selectedWeek === 12 && 'Deload Pre-Peak'}
              {selectedWeek >= 13 && selectedWeek <= 15 && 'Peak Transfer Moto3 🏍️'}
              {selectedWeek === 16 && 'Deload + Taper Start'}
              {selectedWeek === 17 && 'Taper Deep'}
              {selectedWeek === 18 && 'Peak Readiness 🏁'}
            </Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Calendario esteso fino a:</Text>
            <Text style={styles.progressValue}>
              {getCalendarEndDate().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🎯 Milestone Chiave</Text>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S1:</Text>
            <Text style={styles.milestoneText}>Baseline tecnica (16kg Goblet, 40kg Trap-Bar)</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S3:</Text>
            <Text style={styles.milestoneText}>Peak M1A (20kg Goblet, 50kg Trap-Bar)</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S7:</Text>
            <Text style={styles.milestoneText}>Peak Hypertrophy (22kg Goblet, 58kg Trap-Bar)</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S10:</Text>
            <Text style={styles.milestoneText}>🏍️ Transfer Start: Plank Casco + RSA</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S13:</Text>
            <Text style={styles.milestoneText}>🔥 Metabolic Circuit + Wall Sit 6min</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S15:</Text>
            <Text style={styles.milestoneText}>🏆 ABSOLUTE PEAK: Wall Sit 9min, Plank Casco 90"</Text>
          </View>
          <View style={styles.milestoneItem}>
            <Text style={styles.milestoneWeek}>S18:</Text>
            <Text style={styles.milestoneText}>🏁 KPI Test + Ready to Race!</Text>
          </View>
        </View>
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  headerDates: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  importButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  importButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  resetButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
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
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 70,
    alignItems: 'center',
  },
  weekButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  weekButtonDeload: {
    borderColor: '#FFB300',
    borderWidth: 2,
  },
  weekButtonTaper: {
    borderColor: '#9C27B0',
    borderWidth: 2,
  },
  weekButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  weekButtonTextActive: {
    color: '#fff',
  },
  weekButtonMeso: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
    marginTop: 2,
  },
  weekHeader: {
    marginBottom: 16,
  },
  weekDates: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCardSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  dayCardToday: {
    borderColor: '#FF9800',
    borderWidth: 2,
  },
  dayName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  dayNameSelected: {
    color: '#fff',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  dayDateSelected: {
    color: '#fff',
  },
  dayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  completionText: {
    fontSize: 9,
    color: '#666',
    marginTop: 2,
  },
  completionTextSelected: {
    color: '#fff',
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
    color: '#fff',
  },
  sessionCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  sessionIcon: {
    fontSize: 20,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  sessionTime: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
  },
  exercisesList: {
    marginTop: 8,
  },
  exercisesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  exerciseItem: {
    paddingVertical: 6,
    paddingLeft: 8,
  },
  exerciseName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
    fontWeight: '600',
  },
  exerciseDetails: {
    fontSize: 12,
    color: '#666',
    marginLeft: 12,
  },
  exerciseNotes: {
    fontSize: 11,
    color: '#999',
    marginLeft: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  sessionNotes: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
  },
  sessionNotesText: {
    fontSize: 13,
    color: '#666',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  completeButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  completeButtonIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  completeButtonTextActive: {
    color: '#fff',
  },
  dayNotesCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  dayNotesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 8,
  },
  dayNotesText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
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
  legendIcon: {
    fontSize: 16,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  milestoneItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  milestoneWeek: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196F3',
    width: 40,
  },
  milestoneText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  exerciseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseDetailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  exerciseDetailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  rpeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rpeBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  exerciseNotesSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
  },
  exerciseNotesLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  exerciseNotesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#2196F3',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
