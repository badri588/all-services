// import React, { useState } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView,
//   Switch, StyleSheet, SafeAreaView,
// } from 'react-native';
// import { BottomNav } from './HomeScreen';

// const GREEN = '#2e7d32';
// const LIGHT_GREEN = '#e8f5e9';

// const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// export default function MyScheduleScreen({ navigation }) {
//   const [availability, setAvailability] = useState(true);
//   const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
//   const [startTime, setStartTime] = useState('09:00 AM');
//   const [endTime, setEndTime] = useState('08:00 PM');
//   const [breakEnabled, setBreakEnabled] = useState(false);

//   const toggleDay = (day) => {
//     setSelectedDays(prev =>
//       prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{ fontSize: 22 }}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Schedule</Text>
//         <View style={{ width: 32 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
//         {/* Availability Toggle */}
//         <View style={styles.card}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View>
//               <Text style={styles.cardTitle}>Availability</Text>
//               <Text style={styles.cardSub}>Set your working hours and days</Text>
//             </View>
//             <Switch value={availability} onValueChange={setAvailability}
//               trackColor={{ false: '#ccc', true: GREEN }} thumbColor="#fff" />
//           </View>
//         </View>

//         {/* Working Days */}
//         <Text style={styles.sectionTitle}>Working Days</Text>
//         <View style={styles.daysCard}>
//           <View style={styles.daysRow}>
//             {DAYS.map((day) => (
//               <TouchableOpacity
//                 key={day}
//                 style={[styles.dayBtn, selectedDays.includes(day) && styles.dayBtnActive]}
//                 onPress={() => toggleDay(day)}
//               >
//                 <Text style={[styles.dayText, selectedDays.includes(day) && styles.dayTextActive]}>
//                   {day}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Working Hours */}
//         <Text style={styles.sectionTitle}>Working Hours</Text>
//         <View style={styles.card}>
//           <Text style={styles.timeLabel}>Start Time</Text>
//           <TouchableOpacity style={styles.timeDropdown}>
//             <Text style={styles.timeValue}>{startTime}</Text>
//             <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//           </TouchableOpacity>

//           <Text style={[styles.timeLabel, { marginTop: 16 }]}>End Time</Text>
//           <TouchableOpacity style={styles.timeDropdown}>
//             <Text style={styles.timeValue}>{endTime}</Text>
//             <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Break Time */}
//         <View style={styles.card}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View>
//               <Text style={styles.cardTitle}>Break Time <Text style={styles.optionalTag}>(Optional)</Text></Text>
//               <Text style={styles.cardSub}>Add break time</Text>
//             </View>
//             <Switch value={breakEnabled} onValueChange={setBreakEnabled}
//               trackColor={{ false: '#ccc', true: GREEN }} thumbColor="#fff" />
//           </View>
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
//           <Text style={styles.saveBtnText}>Save Schedule</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <BottomNav navigation={navigation} active="Profile" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#f5f5f5' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
//   headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
//   scroll: { paddingHorizontal: 16, paddingBottom: 24 },

//   sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 10 },
//   card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 8, elevation: 2 },
//   cardTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
//   cardSub: { fontSize: 12, color: '#888', marginTop: 3 },
//   optionalTag: { fontSize: 12, color: '#aaa', fontWeight: '400' },

//   daysCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, elevation: 2 },
//   daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
//   dayBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
//   dayBtnActive: { backgroundColor: GREEN },
//   dayText: { fontSize: 12, fontWeight: '600', color: '#555' },
//   dayTextActive: { color: '#fff' },

//   timeLabel: { fontSize: 13, color: '#888', marginBottom: 8, fontWeight: '500' },
//   timeDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12 },
//   timeValue: { fontSize: 14, fontWeight: '600', color: '#222' },

//   saveBtn: { backgroundColor: GREEN, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
//   saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// });





// import React, { useState, useCallback } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView,
//   Switch, StyleSheet, SafeAreaView, Modal,
//   FlatList,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { BottomNav } from './HomeScreen';
// import { providerApi } from '../api/providerApi';

// const GREEN = '#2e7d32';
// const LIGHT_GREEN = '#e8f5e9';

// const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// // ── Time picker options ──────────────────────────────────────────────────────
// // Matches how Swiggy/Urban Company style apps present time slots:
// // every 30 min from 12:00 AM to 11:30 PM
// const TIME_OPTIONS = (() => {
//   const times = [];
//   for (let h = 0; h < 24; h++) {
//     for (let m of [0, 30]) {
//       const period = h < 12 ? 'AM' : 'PM';
//       const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
//       const displayM = m === 0 ? '00' : '30';
//       times.push(`${displayH}:${displayM} ${period}`);
//     }
//   }
//   return times;
// })();

// // ── Default state ────────────────────────────────────────────────────────────
// const DEFAULT_AVAILABILITY = {
//   isOnline: true,
//   selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//   startTime: '09:00 AM',
//   endTime: '08:00 PM',
//   breakEnabled: false,
//   breakStart: '01:00 PM',
//   breakEnd: '02:00 PM',
// };

// export default function MyScheduleScreen({ navigation }) {
//   const [isOnline, setIsOnline] = useState(DEFAULT_AVAILABILITY.isOnline);
//   const [selectedDays, setSelectedDays] = useState(DEFAULT_AVAILABILITY.selectedDays);
//   const [startTime, setStartTime] = useState(DEFAULT_AVAILABILITY.startTime);
//   const [endTime, setEndTime] = useState(DEFAULT_AVAILABILITY.endTime);
//   const [breakEnabled, setBreakEnabled] = useState(DEFAULT_AVAILABILITY.breakEnabled);
//   const [breakStart, setBreakStart] = useState(DEFAULT_AVAILABILITY.breakStart);
//   const [breakEnd, setBreakEnd] = useState(DEFAULT_AVAILABILITY.breakEnd);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // ── Time picker modal state ──────────────────────────────────────────────
//   const [pickerVisible, setPickerVisible] = useState(false);
//   const [pickerTarget, setPickerTarget] = useState(null); // 'start'|'end'|'breakStart'|'breakEnd'

//   // ── Load saved settings whenever screen comes into focus ──────────────────
//   useFocusEffect(
//     useCallback(() => {
//       providerApi.getAvailability().then((saved) => {
//         if (saved) {
//           setIsOnline(saved.isOnline ?? DEFAULT_AVAILABILITY.isOnline);
//           setSelectedDays(saved.selectedDays ?? DEFAULT_AVAILABILITY.selectedDays);
//           setStartTime(saved.startTime ?? DEFAULT_AVAILABILITY.startTime);
//           setEndTime(saved.endTime ?? DEFAULT_AVAILABILITY.endTime);
//           setBreakEnabled(saved.breakEnabled ?? DEFAULT_AVAILABILITY.breakEnabled);
//           setBreakStart(saved.breakStart ?? DEFAULT_AVAILABILITY.breakStart);
//           setBreakEnd(saved.breakEnd ?? DEFAULT_AVAILABILITY.breakEnd);
//         }
//       });
//     }, [])
//   );

//   const toggleDay = (day) => {
//     setSelectedDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   const openPicker = (target) => {
//     setPickerTarget(target);
//     setPickerVisible(true);
//   };

//   const selectTime = (time) => {
//     if (pickerTarget === 'start') setStartTime(time);
//     else if (pickerTarget === 'end') setEndTime(time);
//     else if (pickerTarget === 'breakStart') setBreakStart(time);
//     else if (pickerTarget === 'breakEnd') setBreakEnd(time);
//     setPickerVisible(false);
//     setPickerTarget(null);
//   };

//   const currentPickerValue = () => {
//     if (pickerTarget === 'start') return startTime;
//     if (pickerTarget === 'end') return endTime;
//     if (pickerTarget === 'breakStart') return breakStart;
//     if (pickerTarget === 'breakEnd') return breakEnd;
//     return null;
//   };

//   const pickerTitle = () => {
//     if (pickerTarget === 'start') return 'Select Start Time';
//     if (pickerTarget === 'end') return 'Select End Time';
//     if (pickerTarget === 'breakStart') return 'Break Starts At';
//     if (pickerTarget === 'breakEnd') return 'Break Ends At';
//     return 'Select Time';
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const data = {
//       isOnline,
//       selectedDays,
//       startTime,
//       endTime,
//       breakEnabled,
//       breakStart,
//       breakEnd,
//     };
//     await providerApi.saveAvailability(data);
//     setSaving(false);
//     setSaved(true);
//     setTimeout(() => {
//       setSaved(false);
//       navigation.goBack();
//     }, 800);
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* ── Header (unchanged) ── */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{ fontSize: 22 }}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Schedule</Text>
//         <View style={{ width: 32 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

//         {/* ── Availability Toggle (unchanged layout, wired to state) ── */}
//         <View style={styles.card}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View>
//               <Text style={styles.cardTitle}>Availability</Text>
//               <Text style={styles.cardSub}>Set your working hours and days</Text>
//             </View>
//             <Switch
//               value={isOnline}
//               onValueChange={setIsOnline}
//               trackColor={{ false: '#ccc', true: GREEN }}
//               thumbColor="#fff"
//             />
//           </View>
//         </View>

//         {/* ── Working Days (unchanged layout) ── */}
//         <Text style={styles.sectionTitle}>Working Days</Text>
//         <View style={styles.daysCard}>
//           <View style={styles.daysRow}>
//             {DAYS.map((day) => (
//               <TouchableOpacity
//                 key={day}
//                 style={[styles.dayBtn, selectedDays.includes(day) && styles.dayBtnActive]}
//                 onPress={() => toggleDay(day)}
//               >
//                 <Text style={[styles.dayText, selectedDays.includes(day) && styles.dayTextActive]}>
//                   {day}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* ── Working Hours (now uses real time picker) ── */}
//         <Text style={styles.sectionTitle}>Working Hours</Text>
//         <View style={styles.card}>
//           <Text style={styles.timeLabel}>Start Time</Text>
//           <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('start')}>
//             <Text style={styles.timeValue}>{startTime}</Text>
//             <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//           </TouchableOpacity>

//           <Text style={[styles.timeLabel, { marginTop: 16 }]}>End Time</Text>
//           <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('end')}>
//             <Text style={styles.timeValue}>{endTime}</Text>
//             <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//           </TouchableOpacity>
//         </View>

//         {/* ── Break Time (now fully functional) ── */}
//         <View style={styles.card}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View>
//               <Text style={styles.cardTitle}>
//                 Break Time <Text style={styles.optionalTag}>(Optional)</Text>
//               </Text>
//               <Text style={styles.cardSub}>Add a break during your shift</Text>
//             </View>
//             <Switch
//               value={breakEnabled}
//               onValueChange={setBreakEnabled}
//               trackColor={{ false: '#ccc', true: GREEN }}
//               thumbColor="#fff"
//             />
//           </View>

//           {/* Break pickers — only shown when break is enabled */}
//           {breakEnabled && (
//             <View style={styles.breakTimeRow}>
//               <View style={styles.breakHalf}>
//                 <Text style={styles.timeLabel}>Break Start</Text>
//                 <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('breakStart')}>
//                   <Text style={styles.timeValue}>{breakStart}</Text>
//                   <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.breakSeparator}>
//                 <Text style={{ color: '#aaa', fontSize: 18, marginTop: 24 }}>→</Text>
//               </View>
//               <View style={styles.breakHalf}>
//                 <Text style={styles.timeLabel}>Break End</Text>
//                 <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('breakEnd')}>
//                   <Text style={styles.timeValue}>{breakEnd}</Text>
//                   <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         </View>

//         {/* ── Summary chip — shows active hours cleanly (like Urban Company) ── */}
//         {isOnline && selectedDays.length > 0 && (
//           <View style={styles.summaryChip}>
//             <Text style={styles.summaryText}>
//               🕒 {selectedDays.join(', ')} · {startTime} – {endTime}
//               {breakEnabled ? `  (Break: ${breakStart} – ${breakEnd})` : ''}
//             </Text>
//           </View>
//         )}

//         {/* ── Save Button ── */}
//         <TouchableOpacity
//           style={[styles.saveBtn, saving && { opacity: 0.7 }]}
//           onPress={handleSave}
//           disabled={saving}
//         >
//           <Text style={styles.saveBtnText}>
//             {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Schedule'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* ── Time Picker Modal ── */}
//       <Modal
//         visible={pickerVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setPickerVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setPickerVisible(false)}
//         >
//           <View style={styles.modalSheet}>
//             <View style={styles.modalHandle} />
//             <Text style={styles.modalTitle}>{pickerTitle()}</Text>
//             <FlatList
//               data={TIME_OPTIONS}
//               keyExtractor={(item) => item}
//               style={{ maxHeight: 320 }}
//               showsVerticalScrollIndicator={false}
//               getItemLayout={(_, index) => ({ length: 52, offset: 52 * index, index })}
//               initialScrollIndex={Math.max(
//                 0,
//                 TIME_OPTIONS.indexOf(currentPickerValue()) - 3
//               )}
//               renderItem={({ item }) => {
//                 const isSelected = item === currentPickerValue();
//                 return (
//                   <TouchableOpacity
//                     style={[styles.timeOption, isSelected && styles.timeOptionSelected]}
//                     onPress={() => selectTime(item)}
//                   >
//                     <Text style={[styles.timeOptionText, isSelected && styles.timeOptionTextSelected]}>
//                       {item}
//                     </Text>
//                     {isSelected && <Text style={{ color: GREEN, fontSize: 18 }}>✓</Text>}
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <BottomNav navigation={navigation} active="Profile" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   // ── All original styles preserved exactly ──────────────────────────────────
//   safe: { flex: 1, backgroundColor: '#f5f5f5' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
//   headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
//   scroll: { paddingHorizontal: 16, paddingBottom: 24 },
//   sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 10 },
//   card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 8, elevation: 2 },
//   cardTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
//   cardSub: { fontSize: 12, color: '#888', marginTop: 3 },
//   optionalTag: { fontSize: 12, color: '#aaa', fontWeight: '400' },
//   daysCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, elevation: 2 },
//   daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
//   dayBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
//   dayBtnActive: { backgroundColor: GREEN },
//   dayText: { fontSize: 12, fontWeight: '600', color: '#555' },
//   dayTextActive: { color: '#fff' },
//   timeLabel: { fontSize: 13, color: '#888', marginBottom: 8, fontWeight: '500' },
//   timeDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12 },
//   timeValue: { fontSize: 14, fontWeight: '600', color: '#222' },
//   saveBtn: { backgroundColor: GREEN, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
//   saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

//   // ── New styles (break time row, summary chip, modal) ──────────────────────
//   breakTimeRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 16, gap: 8 },
//   breakHalf: { flex: 1 },
//   breakSeparator: { alignItems: 'center', paddingHorizontal: 4 },

//   summaryChip: {
//     backgroundColor: LIGHT_GREEN,
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: '#c8e6c9',
//   },
//   summaryText: { color: GREEN, fontSize: 12, fontWeight: '600', lineHeight: 18 },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.35)',
//     justifyContent: 'flex-end',
//   },
//   modalSheet: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 32,
//     paddingTop: 12,
//     paddingHorizontal: 16,
//   },
//   modalHandle: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#ddd',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   timeOption: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     height: 52,
//   },
//   timeOptionSelected: { backgroundColor: LIGHT_GREEN },
//   timeOptionText: { fontSize: 15, color: '#333' },
//   timeOptionTextSelected: { color: GREEN, fontWeight: '700' },
// });























import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  Switch, StyleSheet, SafeAreaView, Modal,
  FlatList,
} from 'react-native';
import { BottomNav } from './HomeScreen';
import { providerApi } from '../api/providerApi';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Every 30 min from 12:00 AM to 11:30 PM
const TIME_OPTIONS = (() => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m of [0, 30]) {
      const period = h < 12 ? 'AM' : 'PM';
      const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const displayM = m === 0 ? '00' : '30';
      times.push(`${displayH}:${displayM} ${period}`);
    }
  }
  return times;
})();

const DEFAULT_AVAILABILITY = {
  isOnline: true,
  selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  startTime: '09:00 AM',
  endTime: '08:00 PM',
  breakEnabled: false,
  breakStart: '01:00 PM',
  breakEnd: '02:00 PM',
};

export default function MyScheduleScreen({ navigation }) {
  const [isOnline, setIsOnline] = useState(DEFAULT_AVAILABILITY.isOnline);
  const [selectedDays, setSelectedDays] = useState(DEFAULT_AVAILABILITY.selectedDays);
  const [startTime, setStartTime] = useState(DEFAULT_AVAILABILITY.startTime);
  const [endTime, setEndTime] = useState(DEFAULT_AVAILABILITY.endTime);
  const [breakEnabled, setBreakEnabled] = useState(DEFAULT_AVAILABILITY.breakEnabled);
  const [breakStart, setBreakStart] = useState(DEFAULT_AVAILABILITY.breakStart);
  const [breakEnd, setBreakEnd] = useState(DEFAULT_AVAILABILITY.breakEnd);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null);

  // ── Load saved settings on mount + every time screen comes back into focus ─
  // Uses navigation.addListener('focus') — works with any React Navigation
  // version without needing to import useFocusEffect separately
  useEffect(() => {
    const loadSettings = () => {
      providerApi.getAvailability().then((savedData) => {
        if (savedData) {
          setIsOnline(savedData.isOnline ?? DEFAULT_AVAILABILITY.isOnline);
          setSelectedDays(savedData.selectedDays ?? DEFAULT_AVAILABILITY.selectedDays);
          setStartTime(savedData.startTime ?? DEFAULT_AVAILABILITY.startTime);
          setEndTime(savedData.endTime ?? DEFAULT_AVAILABILITY.endTime);
          setBreakEnabled(savedData.breakEnabled ?? DEFAULT_AVAILABILITY.breakEnabled);
          setBreakStart(savedData.breakStart ?? DEFAULT_AVAILABILITY.breakStart);
          setBreakEnd(savedData.breakEnd ?? DEFAULT_AVAILABILITY.breakEnd);
          // ← Restore confirmation banner if schedule was previously saved
          if (savedData.confirmedOnce) setSaved(true);
        }
      });
    };

    loadSettings();

    // Only attach listener if navigation supports it (avoids crash on custom navigators)
    const unsubscribe = navigation.addListener
      ? navigation.addListener('focus', loadSettings)
      : null;

    return () => { if (unsubscribe) unsubscribe(); };
  }, [navigation]);

  const toggleDay = (day) => {
    setSaved(false);
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const openPicker = (target) => {
    setPickerTarget(target);
    setPickerVisible(true);
  };

  const selectTime = (time) => {
    setSaved(false);
    if (pickerTarget === 'start') setStartTime(time);
    else if (pickerTarget === 'end') setEndTime(time);
    else if (pickerTarget === 'breakStart') setBreakStart(time);
    else if (pickerTarget === 'breakEnd') setBreakEnd(time);
    setPickerVisible(false);
    setPickerTarget(null);
  };

  const currentPickerValue = () => {
    if (pickerTarget === 'start') return startTime;
    if (pickerTarget === 'end') return endTime;
    if (pickerTarget === 'breakStart') return breakStart;
    if (pickerTarget === 'breakEnd') return breakEnd;
    return null;
  };

  const pickerTitle = () => {
    if (pickerTarget === 'start') return 'Select Start Time';
    if (pickerTarget === 'end') return 'Select End Time';
    if (pickerTarget === 'breakStart') return 'Break Starts At';
    if (pickerTarget === 'breakEnd') return 'Break Ends At';
    return 'Select Time';
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      isOnline,
      selectedDays,
      startTime,
      endTime,
      breakEnabled,
      breakStart,
      breakEnd,
      confirmedOnce: true,   // ← included in BOTH saves so it never gets wiped
    };
    await providerApi.saveAvailability(data);

    const actuallyOnline = await providerApi.checkIsOnlineNow();
    await providerApi.saveAvailability({ ...data, isOnline: actuallyOnline });

    setSaving(false);
    setSaved(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header — unchanged */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Schedule</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Availability Toggle */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.cardTitle}>Availability</Text>
              <Text style={styles.cardSub}>Set your working hours and days</Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={(val) => {
                setSaved(false);
                setIsOnline(val);
                if (val && selectedDays.length === 0) {
                  setSelectedDays(['Mon']);
                }
              }}
              trackColor={{ false: '#ccc', true: GREEN }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Working Days — unchanged layout */}
        <Text style={styles.sectionTitle}>Working Days</Text>
        <View style={styles.daysCard}>
          <View style={styles.daysRow}>
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayBtn, selectedDays.includes(day) && styles.dayBtnActive]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayText, selectedDays.includes(day) && styles.dayTextActive]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Working Hours — now opens real time picker */}
        <Text style={styles.sectionTitle}>Working Hours</Text>
        <View style={styles.card}>
          <Text style={styles.timeLabel}>Start Time</Text>
          <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('start')}>
            <Text style={styles.timeValue}>{startTime}</Text>
            <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
          </TouchableOpacity>

          <Text style={[styles.timeLabel, { marginTop: 16 }]}>End Time</Text>
          <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('end')}>
            <Text style={styles.timeValue}>{endTime}</Text>
            <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
          </TouchableOpacity>
        </View>

        {/* Break Time — fully functional */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.cardTitle}>
                Break Time <Text style={styles.optionalTag}>(Optional)</Text>
              </Text>
              <Text style={styles.cardSub}>Add a break during your shift</Text>
            </View>
            <Switch
              value={breakEnabled}
              onValueChange={(val) => { setSaved(false); setBreakEnabled(val); }}
              trackColor={{ false: '#ccc', true: GREEN }}
              thumbColor="#fff"
            />
          </View>

          {/* Break pickers — visible only when break is enabled */}
          {breakEnabled && (
            <View style={styles.breakTimeRow}>
              <View style={styles.breakHalf}>
                <Text style={[styles.timeLabel, { marginTop: 16 }]}>Break Start</Text>
                <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('breakStart')}>
                  <Text style={styles.timeValue}>{breakStart}</Text>
                  <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.breakSeparator}>
                <Text style={{ color: '#aaa', fontSize: 18, marginTop: 40 }}>→</Text>
              </View>
              <View style={styles.breakHalf}>
                <Text style={[styles.timeLabel, { marginTop: 16 }]}>Break End</Text>
                <TouchableOpacity style={styles.timeDropdown} onPress={() => openPicker('breakEnd')}>
                  <Text style={styles.timeValue}>{breakEnd}</Text>
                  <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Summary chip — shows active schedule at a glance */}
        {isOnline && selectedDays.length > 0 && (
          <View style={styles.summaryChip}>
            <Text style={styles.summaryText}>
              🕒  {selectedDays.join(', ')}
            </Text>
            <Text style={styles.summaryText}>
              {startTime} – {endTime}
              {breakEnabled ? `   ·   Break: ${breakStart} – ${breakEnd}` : ''}
            </Text>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveBtnText}>
            {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Schedule'}
          </Text>
        </TouchableOpacity>
        {saved && (
          <View style={styles.confirmBanner}>
            <View style={styles.confirmBannerRow}>
              <Text style={styles.confirmBannerIcon}>✅</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.confirmBannerTitle}>Availability Set!</Text>
                <Text style={styles.confirmBannerText}>
                  {selectedDays.join(', ')}
                </Text>
                <Text style={styles.confirmBannerText}>
                  {startTime} – {endTime}
                  {breakEnabled ? `  ·  Break: ${breakStart} – ${breakEnd}` : ''}
                </Text>
              </View>
            </View>
            <View style={styles.confirmBannerFooter}>
              <Text style={styles.confirmBannerFooterText}>
                🔔 This schedule is active. Edit anytime to make changes.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Time Picker Modal — bottom sheet style */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setPickerVisible(false)}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{pickerTitle()}</Text>
            <FlatList
              data={TIME_OPTIONS}
              keyExtractor={(item) => item}
              style={{ maxHeight: 320 }}
              showsVerticalScrollIndicator={false}
              getItemLayout={(_, index) => ({ length: 52, offset: 52 * index, index })}
              initialScrollIndex={Math.max(
                0,
                TIME_OPTIONS.indexOf(currentPickerValue()) >= 3
                  ? TIME_OPTIONS.indexOf(currentPickerValue()) - 3
                  : 0
              )}
              renderItem={({ item }) => {
                const isSelected = item === currentPickerValue();
                return (
                  <TouchableOpacity
                    style={[styles.timeOption, isSelected && styles.timeOptionSelected]}
                    onPress={() => selectTime(item)}
                  >
                    <Text style={[styles.timeOptionText, isSelected && styles.timeOptionTextSelected]}>
                      {item}
                    </Text>
                    {isSelected && <Text style={{ color: GREEN, fontSize: 18 }}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <BottomNav navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Original styles — not touched
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 8, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  cardSub: { fontSize: 12, color: '#888', marginTop: 3 },
  optionalTag: { fontSize: 12, color: '#aaa', fontWeight: '400' },
  daysCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, elevation: 2 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  dayBtnActive: { backgroundColor: GREEN },
  dayText: { fontSize: 12, fontWeight: '600', color: '#555' },
  dayTextActive: { color: '#fff' },
  timeLabel: { fontSize: 13, color: '#888', marginBottom: 8, fontWeight: '500' },
  timeDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12 },
  timeValue: { fontSize: 14, fontWeight: '600', color: '#222' },
  saveBtn: { backgroundColor: GREEN, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // New styles
  breakTimeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  breakHalf: { flex: 1 },
  breakSeparator: { alignItems: 'center', paddingHorizontal: 4 },
  summaryChip: { backgroundColor: LIGHT_GREEN, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginTop: 16, borderWidth: 1, borderColor: '#c8e6c9' },
  summaryText: { color: GREEN, fontSize: 12, fontWeight: '600', lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 32, paddingTop: 12, paddingHorizontal: 16 },
  modalHandle: { width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12, textAlign: 'center' },
  timeOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, height: 52 },
  timeOptionSelected: { backgroundColor: LIGHT_GREEN },
  timeOptionText: { fontSize: 15, color: '#333' },
  timeOptionTextSelected: { color: GREEN, fontWeight: '700' },

  confirmBanner: {
    backgroundColor: '#1b5e20',
    borderRadius: 14,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  confirmBannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
  },
  confirmBannerIcon: {
    fontSize: 28,
    marginTop: 2,
  },
  confirmBannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  confirmBannerText: {
    color: '#c8e6c9',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
  },
  confirmBannerFooter: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  confirmBannerFooterText: {
    color: '#a5d6a7',
    fontSize: 12,
    fontWeight: '500',
  },
});
