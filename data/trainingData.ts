
import { MorningRoutineItem, Exercise, WeekPlan } from '@/types/training';

export const defaultMorningRoutine: MorningRoutineItem[] = [
  { id: '1', title: 'Controllo peso corporeo', completed: false },
  { id: '2', title: 'Misurazione HRV', completed: false },
  { id: '3', title: 'Valutazione rigidità muscolare', completed: false },
  { id: '4', title: 'Idratazione (500ml acqua)', completed: false },
  { id: '5', title: 'Colazione bilanciata', completed: false },
  { id: '6', title: 'Mobilità articolare (10 min)', completed: false, time: 600 },
];

export const warmupExercises: Exercise[] = [
  { id: 'w1', name: 'Jogging leggero', duration: 300, notes: '5 minuti' },
  { id: 'w2', name: 'Rotazioni cervicali', sets: 2, reps: 10 },
  { id: 'w3', name: 'Rotazioni spalle', sets: 2, reps: 15 },
  { id: 'w4', name: 'Rotazioni bacino', sets: 2, reps: 10 },
  { id: 'w5', name: 'Affondi dinamici', sets: 2, reps: 10 },
  { id: 'w6', name: 'Squat a corpo libero', sets: 2, reps: 15 },
  { id: 'w7', name: 'Plank dinamico', duration: 60, notes: '2 serie da 30 secondi' },
];

export const cooldownExercises: Exercise[] = [
  { id: 'c1', name: 'Camminata lenta', duration: 300, notes: '5 minuti' },
  { id: 'c2', name: 'Respirazione profonda', duration: 180, notes: '3 minuti' },
  { id: 'c3', name: 'Stretching gambe', duration: 120 },
  { id: 'c4', name: 'Stretching schiena', duration: 120 },
  { id: 'c5', name: 'Stretching collo e spalle', duration: 120 },
];

export const stretchingExercises: Exercise[] = [
  { id: 's1', name: 'Stretching quadricipiti', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's2', name: 'Stretching ischiocrurali', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's3', name: 'Stretching adduttori', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's4', name: 'Stretching glutei', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's5', name: 'Stretching flessori anca', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's6', name: 'Stretching dorsali', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's7', name: 'Stretching pettorali', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's8', name: 'Stretching trapezi', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's9', name: 'Stretching cervicale', duration: 60, notes: 'Mantieni 30 sec per lato' },
  { id: 's10', name: 'Stretching polsi e avambracci', duration: 60, notes: 'Mantieni 30 sec per lato' },
];

export const foamRollingExercises: Exercise[] = [
  { id: 'f1', name: 'Foam rolling quadricipiti', duration: 90, notes: '45 sec per lato' },
  { id: 'f2', name: 'Foam rolling ischiocrurali', duration: 90, notes: '45 sec per lato' },
  { id: 'f3', name: 'Foam rolling IT band', duration: 90, notes: '45 sec per lato' },
  { id: 'f4', name: 'Foam rolling glutei', duration: 90, notes: '45 sec per lato' },
  { id: 'f5', name: 'Foam rolling dorsali', duration: 90, notes: '45 sec per lato' },
  { id: 'f6', name: 'Foam rolling polpacci', duration: 90, notes: '45 sec per lato' },
];

export const quickReference = {
  hydration: 'Bere almeno 3L di acqua al giorno. Aumentare durante allenamenti intensi.',
  nutrition: 'Carboidrati: 6-8g/kg, Proteine: 1.6-2g/kg, Grassi: 1g/kg',
  sleep: 'Minimo 8 ore per notte. Mantenere orari regolari.',
  recovery: 'Almeno 1 giorno di riposo completo a settimana.',
  redFlags: 'Dolore persistente, affaticamento estremo, calo prestazioni, disturbi del sonno.',
};
