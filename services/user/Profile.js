// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView,
//   StyleSheet, SafeAreaView,
// } from 'react-native';
// import { BottomNav } from './HomeScreen';
// import { providerApi } from '../api/providerApi';
// import { useFocusEffect } from '@react-navigation/native';


// const GREEN = '#2e7d32';
// const LIGHT_GREEN = '#e8f5e9';

// // Remove MENU_ITEMS from the top-level constant and put this INSIDE the component,
// // after the state declarations:


// export default function Profile({ navigation }) {
//   const [provider, setProvider] = useState(null);
//   const [isOnline, setIsOnline] = useState(true); // ← new
//   const MENU_ITEMS = [
//     { icon: '👤', label: 'Personal Information', chevron: true },
//     { icon: '📄', label: 'Documents', tag: 'Verified', tagColor: GREEN, chevron: true },
//     { icon: '🛠️', label: 'Services Offered', chevron: true },
//     { icon: '🏦', label: 'Bank Details', chevron: true },
//     {
//       icon: '📅',
//       label: 'Availability',
//       // ↓ THIS LINE CHANGES — dynamically reflects saved state
//       tag: isOnline ? 'Online' : 'Offline',
//       tagColor: isOnline ? GREEN : '#e53935',
//       chevron: true,
//     },
//     { icon: '🔒', label: 'Change Password', chevron: true },
//   ];


//   useEffect(() => {
//     const load = () => {
//       providerApi.getProvider().then((p) => { if (p) setProvider(p); });
//       providerApi.getAvailability().then((avail) => {
//         if (avail != null) setIsOnline(avail.isOnline ?? true);
//       });
//     };
//     load();
//     const unsub = navigation.addListener('focus', load);
//     return unsub;
//   }, [navigation]);

//   const fullName = provider?.fullName || 'Provider';
//   const rating = provider?.rating != null ? provider.rating.toFixed(1) : '—';
//   const initials = provider?.initials || '👷';

//   // Handle logout — clear storage and go back to Login
//   const handleLogout = async () => {
//     await providerApi.signout();
//     navigation.reset('Login');
//   };
//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{ fontSize: 22 }}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Profile</Text>
//         <TouchableOpacity>
//           <Text style={{ fontSize: 20 }}>✏️</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
//         {/* Profile Info */}
//         <View style={styles.profileCard}>
//           <View style={styles.avatarWrap}>
//             <Text style={{ fontSize: 44 }}>{initials}</Text>
//           </View>
//           <Text style={styles.profileName}>{fullName}</Text>
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
//             <Text style={{ color: '#f59e0b', fontSize: 14 }}>⭐ {rating}</Text>
//           </View>
//           <View style={styles.verifiedBadge}>
//             <Text style={{ fontSize: 12 }}>✅</Text>
//             <Text style={styles.verifiedText}>Verified Worker</Text>
//           </View>
//         </View>

//         {/* Profile Completion */}
//         <View style={styles.completionCard}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
//             <Text style={styles.completionLabel}>Profile Completion</Text>
//             <Text style={styles.completionPct}>80%</Text>
//           </View>
//           <View style={styles.progressBg}>
//             <View style={[styles.progressFill, { width: '80%' }]} />
//           </View>
//         </View>

//         {/* Menu Items */}
//         <View style={styles.menuCard}>
//           {MENU_ITEMS.map((item, i) => (
//             <TouchableOpacity
//               key={item.label}
//               style={[styles.menuItem, i === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
//               onPress={() => item.label === 'Availability' && navigation.navigate('ProviderSchedule')}
//             >
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
//                 <Text style={{ fontSize: 20 }}>{item.icon}</Text>
//                 <Text style={styles.menuLabel}>{item.label}</Text>
//               </View>
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                 {item.tag && (
//                   <Text style={[styles.menuTag, { color: item.tagColor }]}>{item.tag}</Text>
//                 )}
//                 {item.chevron && <Text style={{ color: '#ccc', fontSize: 18 }}>›</Text>}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Log Out */}
//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Text style={{ fontSize: 18 }}>🚪</Text>
//           <Text style={styles.logoutText}>Log Out</Text>
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

//   profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', marginTop: 16, marginBottom: 12, elevation: 2 },
//   avatarWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: LIGHT_GREEN, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   profileName: { fontSize: 20, fontWeight: '800', color: '#111' },
//   verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: LIGHT_GREEN, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 },
//   verifiedText: { color: GREEN, fontSize: 12, fontWeight: '600' },

//   completionCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, elevation: 2 },
//   completionLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
//   completionPct: { fontSize: 14, fontWeight: '700', color: GREEN },
//   progressBg: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 },
//   progressFill: { height: 8, backgroundColor: GREEN, borderRadius: 4 },

//   menuCard: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 16, elevation: 2, overflow: 'hidden' },
//   menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
//   menuLabel: { fontSize: 14, color: '#222', fontWeight: '500' },
//   menuTag: { fontSize: 12, fontWeight: '600' },

//   logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, backgroundColor: '#fff0f0', borderRadius: 14 },
//   logoutText: { color: '#e53935', fontWeight: '700', fontSize: 15 },
// });



























import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';
import { providerApi } from '../api/providerApi';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

// ── Helper: get a human-readable status message based on schedule ─────────────
const getScheduleStatusMessage = (availability) => {
  if (!availability) {
    return { isOnline: false, message: 'No schedule set. Tap Availability to set your hours.' };
  }

  const {
    isOnline,
    selectedDays = [],
    startTime = '09:00 AM',
    endTime = '08:00 PM',
    breakEnabled = false,
    breakStart = '01:00 PM',
    breakEnd = '02:00 PM',
  } = availability;

  // Manual override — provider explicitly switched off
  if (!isOnline) {
    return {
      isOnline: false,
      message: 'You manually set yourself Offline. Toggle Availability to go Online.',
    };
  }

  if (selectedDays.length === 0) {
    return { isOnline: false, message: 'No working days selected. Update your schedule.' };
  }

  const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = SHORT_DAYS[new Date().getDay()];
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [timePart, period] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const breakStartMinutes = timeToMinutes(breakStart);
  const breakEndMinutes = timeToMinutes(breakEnd);

  // Today is not a working day — find next working day
  if (!selectedDays.includes(today)) {
    let nextDayIndex = -1;
    for (let i = 1; i <= 7; i++) {
      const checkDay = SHORT_DAYS[(new Date().getDay() + i) % 7];
      if (selectedDays.includes(checkDay)) {
        nextDayIndex = i;
        break;
      }
    }
    const nextDay = nextDayIndex === 1
      ? 'Tomorrow'
      : SHORT_DAYS[(new Date().getDay() + nextDayIndex) % 7];
    return {
      isOnline: false,
      message: `Today (${today}) is not a working day.\nYou'll go Online ${nextDay} at ${startTime}.`,
    };
  }

  // Today IS a working day — before shift starts
  if (nowMinutes < startMinutes) {
    const minsUntil = startMinutes - nowMinutes;
    const hoursUntil = Math.floor(minsUntil / 60);
    const minsRemainder = minsUntil % 60;
    const timeLeft = hoursUntil > 0
      ? `${hoursUntil}h ${minsRemainder}m`
      : `${minsRemainder} min`;
    return {
      isOnline: false,
      message: `⏰ Schedule saved! You'll go Online today at ${startTime} (in ${timeLeft}).`,
    };
  }

  // After shift ends — find next working day
  if (nowMinutes >= endMinutes) {
    let nextDayIndex = -1;
    for (let i = 1; i <= 7; i++) {
      const checkDay = SHORT_DAYS[(new Date().getDay() + i) % 7];
      if (selectedDays.includes(checkDay)) {
        nextDayIndex = i;
        break;
      }
    }
    const nextDay = nextDayIndex === 1
      ? 'Tomorrow'
      : SHORT_DAYS[(new Date().getDay() + nextDayIndex) % 7];
    return {
      isOnline: false,
      message: `Today's shift ended at ${endTime}.\nNext Online: ${nextDay} at ${startTime}.`,
    };
  }

  // Inside break window
  if (breakEnabled && nowMinutes >= breakStartMinutes && nowMinutes < breakEndMinutes) {
    const minsUntil = breakEndMinutes - nowMinutes;
    return {
      isOnline: false,
      message: `☕ Break time! You'll go Online again at ${breakEnd} (in ${minsUntil} min).`,
    };
  }

  // ✅ All checks passed — currently online
  const minsLeft = endMinutes - nowMinutes;
  const hoursLeft = Math.floor(minsLeft / 60);
  const minsRemainder = minsLeft % 60;
  const timeLeft = hoursLeft > 0
    ? `${hoursLeft}h ${minsRemainder}m`
    : `${minsRemainder} min`;
  return {
    isOnline: true,
    message: `🟢 You are Online until ${endTime} (${timeLeft} remaining).`,
  };
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Profile({ navigation }) {
  const [provider, setProvider] = useState(null);
  const [scheduleStatus, setScheduleStatus] = useState({
    isOnline: false,
    message: 'Checking schedule…',
  });

  const refreshStatus = async () => {
    const availability = await providerApi.getAvailability();
    const status = getScheduleStatusMessage(availability);
    setScheduleStatus(status);
  };

  // ── Load provider profile on mount ──────────────────────────
  useEffect(() => {
    providerApi.getProvider().then((p) => { if (p) setProvider(p); });
  }, []);

  // ── Real-time status — check every 60 seconds ────────────────
  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Re-check when screen comes back into focus ───────────────
  // Fires immediately when navigating back from MyScheduleScreen
  // so the banner updates right away without waiting 60 seconds
  useEffect(() => {
    const unsubscribe = navigation.addListener
      ? navigation.addListener('focus', () => {
        refreshStatus();
        providerApi.getProvider().then((p) => { if (p) setProvider(p); });
      })
      : null;
    return () => { if (unsubscribe) unsubscribe(); };
  }, [navigation]);

  const { isOnline} = scheduleStatus;

  const MENU_ITEMS = [
    { icon: '👤', label: 'Personal Information', chevron: true },
    { icon: '📄', label: 'Documents', tag: 'Verified', tagColor: GREEN, chevron: true },
    { icon: '🛠️', label: 'Services Offered', chevron: true },
    { icon: '🏦', label: 'Bank Details', chevron: true },
    {
      icon: '📅',
      label: 'Availability',
      tag: isOnline ? 'Online' : 'Offline',
      tagColor: isOnline ? GREEN : '#e53935',
      chevron: true,
    },
    { icon: '🔒', label: 'Change Password', chevron: true },
  ];

  const fullName = provider?.fullName || 'Provider';
  const rating = provider?.rating != null ? provider.rating.toFixed(1) : '—';
  const initials = provider?.initials || '👷';

  const handleLogout = async () => {
    await providerApi.signout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 20 }}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={{ fontSize: 44 }}>{initials}</Text>
          </View>
          <Text style={styles.profileName}>{fullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Text style={{ color: '#f59e0b', fontSize: 14 }}>⭐ {rating}</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={{ fontSize: 12 }}>✅</Text>
            <Text style={styles.verifiedText}>Verified Worker</Text>
          </View>

          {/* Online / Offline pill */}
          <View style={[styles.onlinePill, { backgroundColor: isOnline ? LIGHT_GREEN : '#ffeaea' }]}>
            <View style={[styles.onlineDot, { backgroundColor: isOnline ? GREEN : '#e53935' }]} />
            <Text style={[styles.onlinePillText, { color: isOnline ? GREEN : '#e53935' }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        {/* Profile Completion */}
        <View style={styles.completionCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={styles.completionLabel}>Profile Completion</Text>
            <Text style={styles.completionPct}>80%</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => {
                if (item.label === 'Availability') navigation.navigate('ProviderSchedule');
                if (item.label === 'Personal Information') navigation.navigate('PersonalInformation');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {item.tag && (
                  <Text style={[styles.menuTag, { color: item.tagColor }]}>{item.tag}</Text>
                )}
                {item.chevron && <Text style={{ color: '#ccc', fontSize: 18 }}>›</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ fontSize: 18 }}>🚪</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },
  profileCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 24,
    alignItems: 'center', marginTop: 16, marginBottom: 12, elevation: 2,
  },
  avatarWrap: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: LIGHT_GREEN,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  profileName: { fontSize: 20, fontWeight: '800', color: '#111' },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: LIGHT_GREEN, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4, marginTop: 8,
  },
  verifiedText: { color: GREEN, fontSize: 12, fontWeight: '600' },
  onlinePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginTop: 10,
  },
  onlineDot: { width: 8, height: 8, borderRadius: 4 },
  onlinePillText: { fontSize: 13, fontWeight: '700' },
  completionCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 12, elevation: 2,
  },
  completionLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
  completionPct: { fontSize: 14, fontWeight: '700', color: GREEN },
  progressBg: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: GREEN, borderRadius: 4 },
  menuCard: {
    backgroundColor: '#fff', borderRadius: 14,
    marginBottom: 16, elevation: 2, overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5',
  },
  menuLabel: { fontSize: 14, color: '#222', fontWeight: '500' },
  menuTag: { fontSize: 12, fontWeight: '600' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, backgroundColor: '#fff0f0', borderRadius: 14,
  },
  logoutText: { color: '#e53935', fontWeight: '700', fontSize: 15 },
});