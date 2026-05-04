import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const COLORS = {
  green:     '#16A05D',
  greenLight:'#E5F8EF',
  text:      '#111827',
  muted:     '#6B7280',
  border:    '#EEF0F4',
  orange:    '#F59E0B',
  white:     '#FFFFFF',
  bgLight:   '#F9FAFB',
  navy:      '#1D2F53',
};

/* ─── MAP PLACEHOLDER (unchanged) ─── */
function MapPlaceholder({ providerColor = '#16A05D' }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={mapStyles.container}>
      {[...Array(8)].map((_, i) => <View key={`h${i}`} style={[mapStyles.gridLineH, { top: `${(i + 1) * 11}%` }]} />)}
      {[...Array(6)].map((_, i) => <View key={`v${i}`} style={[mapStyles.gridLineV, { left: `${(i + 1) * 14}%` }]} />)}
      <View style={mapStyles.road1} />
      <View style={mapStyles.road2} />
      <View style={[mapStyles.routeLine, { borderColor: providerColor }]} />
      <View style={[mapStyles.homePin, { backgroundColor: providerColor }]}>
        <Ionicons name="home" size={16} color="#fff" />
      </View>
      <Animated.View style={[mapStyles.scooterMarker, { transform: [{ scale: pulse }] }]}>
        <View style={[mapStyles.scooterOuter, { borderColor: providerColor }]}>
          <MaterialCommunityIcons name="motorbike" size={22} color={providerColor} />
        </View>
      </Animated.View>
      <View style={mapStyles.etaPopup}>
        <Text style={mapStyles.etaPopupTitle}>Provider is on the way</Text>
        <Text style={mapStyles.etaPopupSub}>ETA: 15 mins  •  2.4 km away</Text>
      </View>
      <TouchableOpacity style={mapStyles.locateBtn} activeOpacity={0.85}>
        <Ionicons name="locate" size={22} color={COLORS.text} />
      </TouchableOpacity>
      <View style={mapStyles.googleWatermark}>
        <Text style={mapStyles.googleG}>
          <Text style={{ color: '#4285F4' }}>G</Text>
          <Text style={{ color: '#EA4335' }}>o</Text>
          <Text style={{ color: '#FBBC05' }}>o</Text>
          <Text style={{ color: '#4285F4' }}>g</Text>
          <Text style={{ color: '#34A853' }}>l</Text>
          <Text style={{ color: '#EA4335' }}>e</Text>
        </Text>
      </View>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EFDA', position: 'relative', overflow: 'hidden' },
  gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#D0D9C3' },
  gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#D0D9C3' },
  road1: { position: 'absolute', top: '30%', left: 0, right: 0, height: 8, backgroundColor: '#fff', opacity: 0.9 },
  road2: { position: 'absolute', top: 0, bottom: 0, left: '35%', width: 8, backgroundColor: '#fff', opacity: 0.9 },
  routeLine: { position: 'absolute', top: '28%', left: '22%', width: 160, height: 90, borderTopWidth: 3, borderRightWidth: 3, borderStyle: 'solid', borderTopRightRadius: 4, opacity: 0.9, transform: [{ rotate: '20deg' }] },
  homePin: { position: 'absolute', top: '15%', right: '22%', width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  scooterMarker: { position: 'absolute', bottom: '28%', left: '18%' },
  scooterOuter: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', borderWidth: 2.5, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  etaPopup: { position: 'absolute', bottom: '36%', left: '28%', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 5, minWidth: 180 },
  etaPopupTitle: { fontSize: 12, fontWeight: '700', color: COLORS.text },
  etaPopupSub: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  locateBtn: { position: 'absolute', bottom: 14, right: 14, width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  googleWatermark: { position: 'absolute', bottom: 10, left: 10 },
  googleG: { fontSize: 13, fontWeight: '700' },
});

/* ─────────────────────────────────────────────
   TRACK BOOKING SCREEN
   ✅ CHANGED:
     1. Added serviceStarted state (false = waiting for OTP, true = in progress)
     2. Added OTP status banner at bottom (shows OTP when waiting, "started" when verified)
     3. Status pill changes from "Upcoming" to "In Progress" after OTP
     4. Added "Service Completed" button once in progress (for demo)
───────────────────────────────────────────── */
export default function TrackBookingScreen({ route, navigation }) {
  const booking = route?.params?.booking || {
    id: '#BK12345',
    title: 'Deep Cleaning',
    time: '10:00 AM',
    bg: '#DDF5E6',
    icon: 'broom',
    iconColor: '#16A05D',
    provider: 'Rajesh Kumar',
    rating: '4.8',
    otp: '4821',
    tracking: {
      trackColor: '#16A05D',
      eta: '15 mins',
      distance: '2.4 km away',
      message: 'Rajesh Kumar is on the way',
    },
  };

  const trackColor = booking?.tracking?.trackColor || COLORS.green;

  // ── ✅ NEW STATE: tracks whether OTP has been verified ──
  const [serviceStarted, setServiceStarted] = useState(false);
  const [startedAt, setStartedAt] = useState('');

  const statusPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!serviceStarted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(statusPulse, { toValue: 1.02, duration: 900, useNativeDriver: true }),
          Animated.timing(statusPulse, { toValue: 1,    duration: 900, useNativeDriver: true }),
        ])
      ).start();
    } else {
      statusPulse.stopAnimation();
    }
  }, [serviceStarted]);

  const handleOTPVerified = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setStartedAt(timeStr);
    setServiceStarted(true);
  };

  const handleServiceCompleted = () => {
    navigation?.navigate('ServiceCompleted', { booking, startedAt });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Booking</Text>
        <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8}>
          <Ionicons name="headset-outline" size={20} color={COLORS.text} />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Summary Card */}
      <View style={styles.summaryCard}>
        <View style={[styles.summaryIcon, { backgroundColor: booking.bg }]}>
          <MaterialCommunityIcons name={booking.icon} size={32} color={booking.iconColor} />
        </View>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryTitle}>{booking.title}</Text>
          <Text style={styles.summaryId}>Booking ID: {booking.id}</Text>
        </View>
        <View style={styles.summaryRight}>
          {/* ── ✅ CHANGED: pill changes based on serviceStarted ── */}
          <View style={[
            styles.statusPill,
            { backgroundColor: serviceStarted ? '#FFF3E0' : COLORS.greenLight }
          ]}>
            <Text style={[
              styles.statusText,
              { color: serviceStarted ? '#E65100' : COLORS.green }
            ]}>
              {serviceStarted ? 'In Progress' : 'Upcoming'}
            </Text>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={13} color={COLORS.muted} />
            <Text style={styles.timeText}>Today, {booking.time}</Text>
          </View>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapPlaceholder providerColor={trackColor} />
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        {/* Provider Row */}
        <View style={styles.providerRow}>
          <View style={styles.providerAvatarWrapper}>
            <View style={[styles.providerAvatar, { backgroundColor: '#77B6EA' }]}>
              <MaterialCommunityIcons name="account" size={28} color="#fff" />
            </View>
            <View style={[styles.activeDot, { backgroundColor: COLORS.green }]} />
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{booking.provider}</Text>
            <Text style={styles.providerRole}>Your Service Professional</Text>
            <View style={styles.providerMeta}>
              <MaterialCommunityIcons name="motorbike" size={14} color={COLORS.green} />
              <Text style={[styles.activeLabel, { color: COLORS.green }]}>Active</Text>
              <View style={styles.dot} />
              <View style={styles.vehicleTag}>
                <Text style={styles.vehicleText}>KA 05 JK 1234</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
            <Feather name="phone" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: trackColor }]}>
              {serviceStarted ? '0 mins' : (booking?.tracking?.eta || '—')}
            </Text>
            <Text style={styles.statLabel}>ETA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: trackColor }]}>
              {serviceStarted ? 'Arrived' : (booking?.tracking?.distance?.replace(' away', '') || '—')}
            </Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: serviceStarted ? '#E65100' : trackColor }]}>
              {serviceStarted ? 'Active' : 'Live'}
            </Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* ── ✅ NEW: OTP STATUS BANNER ── */}
        {!serviceStarted ? (
          /* Waiting for OTP verification */
          <Animated.View style={[
            styles.otpBanner,
            { backgroundColor: '#FFFBF0', borderColor: '#F59E0B', transform: [{ scale: statusPulse }] }
          ]}>
            <View style={styles.otpBannerLeft}>
              <MaterialCommunityIcons name="shield-key-outline" size={26} color="#D97706" />
              <View style={styles.otpBannerText}>
                <Text style={styles.otpBannerTitle}>Waiting for worker to start</Text>
                <Text style={styles.otpBannerSub}>
                  Share your OTP: <Text style={styles.otpBannerCode}>{booking.otp || '----'}</Text>
                </Text>
              </View>
            </View>
            {/* For demo: simulate worker verifying OTP */}
            <TouchableOpacity style={styles.simulateBtn} onPress={handleOTPVerified} activeOpacity={0.8}>
              <Text style={styles.simulateBtnText}>Simulate{'\n'}OTP ✓</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          /* OTP verified — service in progress */
          <View style={[styles.otpBanner, { backgroundColor: '#F0FDF7', borderColor: COLORS.green }]}>
            <MaterialCommunityIcons name="shield-check" size={28} color={COLORS.green} />
            <View style={styles.otpBannerText}>
              <Text style={[styles.otpBannerTitle, { color: COLORS.green }]}>
                Service Started ✓
              </Text>
              <Text style={styles.otpBannerSub}>
                OTP verified successfully · Started at {startedAt}
              </Text>
            </View>
          </View>
        )}

        {/* Service Completed button (visible once started) */}
        {serviceStarted && (
          <TouchableOpacity style={styles.completedBtn} onPress={handleServiceCompleted} activeOpacity={0.85}>
            <Text style={styles.completedBtnText}>Mark as Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  header: {
    height: 64, paddingHorizontal: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.white,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  helpBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  helpText: { fontSize: 14, fontWeight: '600', color: COLORS.text },

  summaryCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  summaryIcon: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  summaryInfo: { flex: 1 },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  summaryId: { fontSize: 12, color: COLORS.muted, marginTop: 3 },
  summaryRight: { alignItems: 'flex-end' },
  statusPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginBottom: 6 },
  statusText: { fontSize: 11, fontWeight: '800' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12, color: COLORS.muted, fontWeight: '500' },

  mapContainer: { flex: 1 },

  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    paddingTop: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 }, elevation: 10,
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#D1D5DB', alignSelf: 'center', marginBottom: 14 },

  providerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  providerAvatarWrapper: { position: 'relative', marginRight: 12 },
  providerAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  activeDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#fff' },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  providerRole: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  providerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 6 },
  activeLabel: { fontSize: 12, fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.muted },
  vehicleTag: { backgroundColor: COLORS.bgLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: COLORS.border },
  vehicleText: { fontSize: 11, fontWeight: '600', color: COLORS.text },
  callBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },

  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgLight, borderRadius: 14, paddingVertical: 12, marginBottom: 12 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '900' },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 3, fontWeight: '500' },
  statDivider: { width: 1, height: 36, backgroundColor: COLORS.border },

  // ── OTP Banner (NEW) ──
  otpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    gap: 10,
  },
  otpBannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  otpBannerText: { flex: 1 },
  otpBannerTitle: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  otpBannerSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  otpBannerCode: { fontSize: 14, fontWeight: '900', color: '#D97706', letterSpacing: 3 },

  // Simulate button (for demo only — remove in production)
  simulateBtn: {
    backgroundColor: '#D97706',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  simulateBtnText: { fontSize: 10, fontWeight: '800', color: '#fff', textAlign: 'center' },

  // Completed button
  completedBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 50,
    paddingVertical: 13,
    alignItems: 'center',
  },
  completedBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
});