// ═══════════════════════════════════════════════════════
// COMPLETE_TRAINING_DATA - 46 SETTIMANE ESTESE
// Da 18 settimane originali → 46 settimane complete
// ═══════════════════════════════════════════════════════

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
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 7 },
        ],
        rpe: 6,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 6 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 6 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 6 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 6 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 7 },
        ],
        rpe: 6,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 2
  2: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 7 },
        ],
        rpe: 6,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 6 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 6 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 6 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 6 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 7 },
        ],
        rpe: 6,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 3
  3: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 6 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 6 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 7 },
        ],
        rpe: 6,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 6 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 6 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 6 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 6 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 7 },
        ],
        rpe: 6,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 4
  4: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 5
  5: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 6
  6: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 7
  7: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 8
  8: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 9
  9: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 8 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 8 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 9 },
        ],
        rpe: 8,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 8 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 8 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 8 },
        ],
        rpe: 8,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 8 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 8 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 9 },
        ],
        rpe: 8,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 10
  10: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 8 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 8 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 9 },
        ],
        rpe: 8,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 8 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 8 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 8 },
        ],
        rpe: 8,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 8 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 8 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 9 },
        ],
        rpe: 8,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 11
  11: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 8 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 8 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 9 },
        ],
        rpe: 8,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 8 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 8 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 8 },
        ],
        rpe: 8,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 8 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 8 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 9 },
        ],
        rpe: 8,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 12
  12: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 13
  13: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 9 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 9 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 10 },
        ],
        rpe: 9,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 9 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 9 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 9 },
        ],
        rpe: 9,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 9 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 9 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 10 },
        ],
        rpe: 9,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 14
  14: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 9 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 9 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 10 },
        ],
        rpe: 9,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 9 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 9 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 9 },
        ],
        rpe: 9,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 9 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 9 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 10 },
        ],
        rpe: 9,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 15
  15: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 9 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 9 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 10 },
        ],
        rpe: 9,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 9 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 9 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 9 },
        ],
        rpe: 9,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 9 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 9 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 10 },
        ],
        rpe: 9,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 16
  16: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 17
  17: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 1 - Lignano Circuit',
        exercises: [
          { name: 'GARA 1', reps: 'Qualifiche + Gara', notes: '17-19 Aprile - Lignano Circuit', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 1!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 18
  18: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 19
  19: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 20
  20: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 21
  21: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 2 - Franciacorta',
        exercises: [
          { name: 'GARA 2', reps: 'Qualifiche + Gara', notes: '22-24 Maggio - Franciacorta', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 2!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 22
  22: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 23
  23: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 24
  24: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 25
  25: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 3 - Ala Karting',
        exercises: [
          { name: 'GARA 3', reps: 'Qualifiche + Gara', notes: '19-21 Giugno - Ala Karting', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 3!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 26
  26: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 27
  27: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 28
  28: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 29
  29: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 4 - 7 Laghi',
        exercises: [
          { name: 'GARA 4', reps: 'Qualifiche + Gara', notes: '17-19 Luglio - 7 Laghi', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 4!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 30
  30: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 31
  31: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 32
  32: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 33
  33: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 34
  34: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 35
  35: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 36
  36: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 37
  37: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 5 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 5 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 6 },
        ],
        rpe: 5,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 5 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 5 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 5 },
        ],
        rpe: 5,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 5 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 5 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 6 },
        ],
        rpe: 5,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 38
  38: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 39
  39: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 40
  40: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 41
  41: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 5 - Pomposa',
        exercises: [
          { name: 'GARA 5', reps: 'Qualifiche + Gara', notes: '11-13 Settembre - Pomposa', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 5!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 42
  42: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 43
  43: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 44
  44: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'DELOAD',
        description: 'Deload Light Training',
        exercises: [
          { name: 'Light Training', reps: '40min', notes: '-50% volume', rpe: 4 },
        ],
        rpe: 4,
        volume: '40min',
        notes: 'Deload week - recovery'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 45
  45: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RESISTENZA',
        description: 'Endurance Training',
        exercises: [
          { name: 'Bike Z2', sets: 1, reps: '90min', weight: 'HR 130-145', notes: 'Steady state', rpe: 6 },
        ],
        rpe: 6,
        volume: '90min',
        notes: 'Cardio endurance'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

  // SETTIMANA 46
  46: {
    0: { // Lunedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'RECUPERO',
        description: 'Recovery Mobility',
        exercises: [
          { name: 'Foam Roll', reps: '15min', notes: 'Full body', rpe: 3 },
          { name: 'Stretching', reps: '15min', notes: 'Recovery', rpe: 3 },
        ],
        rpe: 3,
        volume: '40min',
        notes: 'Post-moto recovery'
      },
    },
    1: { // Martedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:15',
        type: 'FORZA_MAX',
        description: 'Upper Body + Neck',
        exercises: [
          { name: 'Panca Manubri', sets: 4, reps: 10, weight: '12kg/hand', tempo: '2-0-1', rest: '90"', notes: 'Scapole retratte', rpe: 7 },
          { name: 'Lat Pull-Down', sets: 4, reps: 10, weight: '40kg', tempo: '2-0-1', rest: '75"', notes: 'Porta a clavicola', rpe: 7 },
          { name: 'Dead-Hang', sets: 4, reps: 'Max', weight: 'BW', rest: '120"', notes: 'Grip training', rpe: 8 },
        ],
        rpe: 7,
        volume: '75min',
        notes: 'Upper body strength'
      },
    },
    2: { // Mercoledì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:30',
        type: 'FORZA_MAX',
        description: 'Lower Body + Core',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: 8, weight: '35kg', tempo: '3-0-1', rest: '90"', notes: 'Tronco verticale', rpe: 7 },
          { name: 'Trap-Bar DL', sets: 4, reps: 8, weight: '60kg', tempo: '3-0-1', rest: '120"', notes: 'Reset ogni rep', rpe: 7 },
          { name: 'Ab Wheel', sets: 4, reps: 10, weight: 'BW', rest: '90"', notes: 'RETROVERSIONE', rpe: 7 },
        ],
        rpe: 7,
        volume: '90min',
        notes: 'Lower body + core'
      },
    },
    3: { // Giovedì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:00',
        type: 'CORE',
        description: 'Core Endurance',
        exercises: [
          { name: 'Wall Sit', sets: 3, reps: '120"', weight: 'BW', rest: '90"', notes: 'Coscia parallela', rpe: 7 },
          { name: 'Plank Hold', sets: 4, reps: '60"', weight: 'BW', rest: '60"', notes: 'Core stability', rpe: 7 },
          { name: '🏍️ Plank Casco', sets: 3, reps: '60"', weight: 'Casco 1.4kg', notes: 'Transfer Moto3', rpe: 8 },
        ],
        rpe: 7,
        volume: '60min',
        notes: 'Core training + transfer'
      },
    },
    4: { // Venerdì
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏁 GARA 6 FINALE - Cremona',
        exercises: [
          { name: 'GARA 6 FINALE', reps: 'Qualifiche + Gara', notes: '16-18 Ottobre - Cremona', rpe: 10 },
        ],
        rpe: 10,
        volume: 'Race day',
        notes: '🏁🏁🏁 GARA 6 FINALE!'
      },
    },
    5: { // Sabato
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
    6: { // Domenica
      morning: {
        time: '06:00-06:12',
        type: 'MOBILITA',
        description: 'Routine Mattutina 12\' - Anti-Iperlordosi',
        exercises: [
          { name: 'Cat-Cow', sets: 2, reps: 15, tempo: '3"', rest: '0"', notes: 'Mobilità TUTTA colonna', rpe: 3 },
          { name: 'Child Pose', sets: 2, reps: '45"', tempo: 'Box 4-2-4', rest: '0"', notes: 'Allungamento lombare', rpe: 3 },
          { name: 'Glute Bridge', sets: 2, reps: 12, tempo: '2" pausa', rest: '0"', notes: 'RETROVERSIONE', rpe: 3 },
          { name: 'Psoas Stretch', sets: 2, reps: '40"/lato', tempo: 'Hold', rest: '0"', notes: 'NO iperestensione', rpe: 3 },
        ],
        rpe: 3,
      },
      main: {
        time: '10:00-11:45',
        type: 'GARA',
        description: '🏍️ MOTO Training/Gare',
        exercises: [
          { name: 'Moto Training', reps: 'Full day', notes: '🏍️ Training/Gare', rpe: 8 },
        ],
        rpe: 8,
        volume: 'Full day',
        notes: 'Weekend MOTO'
      },
    },
  },

};  