import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Clipboard,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const COLORS = {
  navy:   '#1D2F53',
  cream:  '#FDF6EE',
  accent: '#B0703A',
  green:  '#16A05D',
  red:    '#EF4444',
  border: '#EEF0F4',
  muted:  '#6B7280',
  text:   '#111827',
};

/* ─────────────────────────────────────────────
   BOOKING DETAILS SCREEN
   NEW SCREEN — navigated from MyBookingsScreen
   Shows full booking info + OTP box prominently
───────────────────────────────────────────── */
export default function BookingDetailsScreen({ route, navigation }) {
  const booking = route?.params?.booking || {
    id: '#BK12345',
    title: 'Deep Cleaning',
    date: '15 May 2024',
    time: '10:00 AM',
    price: '₹499',
    provider: 'Rajesh Kumar',
    rating: '4.8',
    bg: '#DDF5E6',
    icon: 'broom',
    iconColor: '#16A05D',
    otp: '4821',
    address: 'Block A, Flat 102, Karimnagar Colony',
    tracking: {
      trackColor: '#16A05D',
      trackBg: '#F0FDF7',
      borderColor: '#16A05D',
      message: 'Rajesh Kumar is confirmed',
      eta: null,
      distance: 'Will arrive by 9:50 AM',
    },
  };

  const [copied, setCopied] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const trackColor = booking?.tracking?.trackColor || COLORS.green;

  const handleCopyOTP = () => {
    Clipboard.setString(booking.otp || '');
    setCopied(true);
    // Bounce animation on copy
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.06, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1,    duration: 100, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? Cancellation charges may apply.',
      [
        { text: 'No, Keep it', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.');
            navigation?.goBack();
          },
        },
      ]
    );
  };

  const handleTrack = () => {
    navigation?.navigate('TrackBooking', { booking });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Service Card */}
        <View style={styles.serviceCard}>
          <View style={[styles.serviceIcon, { backgroundColor: booking.bg }]}>
            <MaterialCommunityIcons name={booking.icon} size={36} color={booking.iconColor} />
          </View>
          <View style={styles.serviceInfo}>
            <View style={styles.serviceTopRow}>
              <Text style={styles.serviceTitle}>{booking.title}</Text>
              <View style={styles.upcomingPill}>
                <Text style={styles.upcomingText}>Upcoming</Text>
              </View>
            </View>
            <Text style={styles.bookingId}>Booking ID: {booking.id}</Text>
          </View>
        </View>

        {/* Booking Meta */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={16} color={COLORS.muted} />
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{booking.date}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Feather name="clock" size={16} color={COLORS.muted} />
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{booking.time}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Feather name="map-pin" size={16} color={COLORS.muted} />
            <Text style={styles.metaLabel}>Address</Text>
            <Text style={[styles.metaValue, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>
              {booking.address || 'N/A'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Feather name="dollar-sign" size={16} color={COLORS.muted} />
            <Text style={styles.metaLabel}>Amount</Text>
            <Text style={[styles.metaValue, { color: COLORS.accent }]}>{booking.price}</Text>
          </View>
        </View>

        {/* Provider */}
        <View style={styles.providerCard}>
          <View style={styles.providerAvatar}>
            <MaterialCommunityIcons name="account" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.providerName}>{booking.provider}</Text>
            <View style={styles.providerMeta}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.providerRating}>{booking.rating}</Text>
              <Text style={styles.providerSep}>·</Text>
              <Text style={styles.providerRole}>Service Professional</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Feather name="phone" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* ── OTP BOX (MAIN FEATURE) ── */}
        <View style={styles.otpSection}>
          <Text style={styles.sectionLabel}>SERVICE OTP</Text>
          <Animated.View style={[styles.otpCard, { transform: [{ scale: scaleAnim }] }]}>
            {/* How it works */}
            <View style={styles.otpHeader}>
              <View style={styles.otpIconWrap}>
                <MaterialCommunityIcons name="shield-key" size={22} color={COLORS.navy} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.otpTitle}>Share OTP to start service</Text>
                <Text style={styles.otpSubtitle}>Give this code to your worker when they arrive</Text>
              </View>
            </View>

            {/* OTP digits */}
            <View style={styles.otpDigitsRow}>
              {(booking.otp || '----').split('').map((digit, i) => (
                <View key={i} style={styles.otpDigitBox}>
                  <Text style={styles.otpDigit}>{digit}</Text>
                </View>
              ))}
            </View>

            {/* Copy button */}
            <TouchableOpacity style={[styles.copyBtn, copied && styles.copyBtnDone]} onPress={handleCopyOTP} activeOpacity={0.8}>
              <Feather name={copied ? 'check' : 'copy'} size={16} color={copied ? '#fff' : COLORS.navy} />
              <Text style={[styles.copyBtnText, copied && styles.copyBtnTextDone]}>
                {copied ? 'Copied!' : 'Copy OTP'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* How it works steps */}
          <View style={styles.howItWorks}>
            <Text style={styles.howTitle}>How it works?</Text>
            {[
              'Share this OTP with your worker',
              'Worker enters OTP in their app',
              'Once verified, the service will start',
            ].map((step, i) => (
              <View key={i} style={styles.howStep}>
                <View style={styles.howNum}><Text style={styles.howNumText}>{i + 1}</Text></View>
                <Text style={styles.howText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Track Button */}
        <TouchableOpacity style={[styles.trackBtn, { borderColor: trackColor }]} onPress={handleTrack} activeOpacity={0.85}>
          <MaterialCommunityIcons name="motorbike" size={20} color={trackColor} />
          <Text style={[styles.trackBtnText, { color: trackColor }]}>Track Your Service</Text>
          <Ionicons name="chevron-forward" size={18} color={trackColor} />
        </TouchableOpacity>

        {/* Cancel Booking */}
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelBooking} activeOpacity={0.85}>
          <Text style={styles.cancelBtnText}>Cancel Booking</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.navy,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },

  scroll: { flex: 1, backgroundColor: COLORS.cream },
  scrollContent: { padding: 16 },

  // Service card
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  serviceIcon: {
    width: 64, height: 64, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  serviceInfo: { flex: 1 },
  serviceTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  serviceTitle: { fontSize: 17, fontWeight: '900', color: COLORS.text, flex: 1 },
  upcomingPill: { backgroundColor: '#E5F8EF', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  upcomingText: { fontSize: 11, fontWeight: '800', color: COLORS.green },
  bookingId: { fontSize: 12, color: COLORS.muted },

  // Meta card
  metaCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  metaLabel: { fontSize: 13, color: COLORS.muted, marginLeft: 10, flex: 1 },
  metaValue: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 2 },

  // Provider
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  providerAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#77B6EA',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  providerName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  providerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  providerRating: { fontSize: 12, fontWeight: '700', color: COLORS.text, marginLeft: 3 },
  providerSep: { fontSize: 12, color: COLORS.muted, marginHorizontal: 5 },
  providerRole: { fontSize: 12, color: COLORS.muted },
  callBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // OTP section
  otpSection: { marginBottom: 16 },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: COLORS.accent,
    letterSpacing: 1, marginBottom: 10,
  },
  otpCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.navy,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  otpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  otpIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  otpTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  otpSubtitle: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

  // OTP digit boxes
  otpDigitsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  otpDigitBox: {
    width: 56, height: 64,
    backgroundColor: '#F4F6FF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.navy,
    letterSpacing: 0,
  },

  // Copy button
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  copyBtnDone: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  copyBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  copyBtnTextDone: { color: '#fff' },

  // How it works
  howItWorks: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    elevation: 1,
  },
  howTitle: { fontSize: 13, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  howStep: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  howNum: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: COLORS.navy,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 10,
  },
  howNumText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  howText: { fontSize: 13, color: COLORS.muted, flex: 1 },

  // Track button
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  trackBtnText: { fontSize: 15, fontWeight: '800' },

  // Cancel button
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 50,
    backgroundColor: '#FFF5F5',
  },
  cancelBtnText: { fontSize: 15, fontWeight: '700', color: '#EF4444' },
});