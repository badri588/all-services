


import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  Switch, StyleSheet, SafeAreaView,
} from 'react-native';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';
const RED = '#ff3b3b';

const INITIAL_JOB_REQUESTS = [
  {
    id: 'job-1',
    icon: '🧽',
    title: 'Deep Cleaning',
    location: 'Banjara Hills, Hyderabad',
    time: 'Today, 10:00 AM',
    price: '₹499',
    countdown: '00:25',
    bg: '#fff0f0',
  },
  {
    id: 'job-2',
    icon: '💇',
    title: 'Salon at Home',
    location: 'Jubilee Hills, Hyderabad',
    time: 'Today, 02:00 PM',
    price: '₹299',
    countdown: '00:28',
    bg: '#f2eaff',
  },
];

export default function HomeScreen({ navigation }) {
  const [isOnline, setIsOnline] = useState(true);
  const [jobRequests, setJobRequests] = useState(INITIAL_JOB_REQUESTS);
  const [ownerNotice, setOwnerNotice] = useState('');

  const handleAcceptJob = (job) => {
    setJobRequests((prev) => prev.filter((item) => item.id !== job.id));
    setOwnerNotice(`${job.title} accepted. Confirmation sent to owner.`);
  };

  const handleRejectJob = (job) => {
    setJobRequests((prev) => prev.filter((item) => item.id !== job.id));
    setOwnerNotice(`${job.title} request rejected.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.greeting}>Hi, Rajesh 👋</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.dot} />
              <Text style={styles.onlineBadgeText}>Online</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderNotifications')}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsAmount}>₹1,250</Text>
            <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('ProviderEarnings')}>
              <Text style={styles.viewBtnText}>View Earnings</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 60 }}>👜</Text>
        </View>

        {/* Online Toggle */}
        <View style={styles.toggleCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <Text style={{ fontSize: 22 }}>🕐</Text>
            <View>
              <Text style={styles.toggleTitle}>You are Online</Text>
              <Text style={styles.toggleSub}>You will receive new booking requests</Text>
            </View>
          </View>
          <Switch value={isOnline} onValueChange={setIsOnline}
            trackColor={{ false: '#ccc', true: GREEN }} thumbColor="#fff" />
        </View>

        {/* Today's Overview */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewRow}>
          {[
            { icon: '📋', value: '4', label: 'Bookings', color: '#111' },
            { icon: '✅', value: '3', label: 'Completed', color: '#111' },
            { icon: '⭐', value: '4.8', label: 'Rating', color: '#f59e0b' },
          ].map((item) => (
            <View key={item.label} style={styles.overviewCard}>
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              <Text style={[styles.overviewValue, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.overviewLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* New Job Requests */}
        <View style={styles.jobHeader}>
          <View style={styles.jobHeaderLeft}>
            <Text style={styles.sectionTitle}>New Job Requests</Text>
            <View style={styles.requestCountBadge}>
              <Text style={styles.requestCountText}>{jobRequests.length}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderBookings')}>
            <Text style={styles.viewAllBlue}>View All</Text>
          </TouchableOpacity>
        </View>

        {ownerNotice ? (
          <View style={styles.ownerNotice}>
            <Text style={styles.ownerNoticeText}>{ownerNotice}</Text>
          </View>
        ) : null}

        {jobRequests.length === 0 ? (
          <View style={styles.emptyRequestsCard}>
            <Text style={styles.emptyRequestsTitle}>No new job requests</Text>
            <Text style={styles.emptyRequestsSub}>Accepted jobs will appear in your bookings.</Text>
          </View>
        ) : (
          jobRequests.map((job) => (
            <View key={job.id} style={styles.jobRequestCard}>
              <View style={styles.jobRequestTop}>
                <View style={[styles.jobIconWrap, { backgroundColor: job.bg }]}>
                  <Text style={styles.jobIcon}>{job.icon}</Text>
                </View>

                <View style={styles.jobDetails}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={styles.jobMetaRow}>
                    <Text style={styles.jobMetaIcon}>📍</Text>
                    <Text style={styles.jobMetaText}>{job.location}</Text>
                  </View>
                  <View style={styles.jobMetaRow}>
                    <Text style={styles.jobMetaIcon}>🕒</Text>
                    <Text style={styles.jobMetaText}>{job.time}</Text>
                  </View>
                </View>

                <View style={styles.jobSide}>
                  <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>⏱ {job.countdown}</Text>
                  </View>
                  <Text style={styles.jobPrice}>{job.price}</Text>
                </View>
              </View>

              <View style={styles.jobActions}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleRejectJob(job)}
                >
                  <Text style={styles.rejectBtnText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => handleAcceptJob(job)}
                >
                  <Text style={styles.acceptBtnText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Current Booking */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Booking</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderBookings')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.bookingTitle}>Deep Cleaning</Text>
            <View style={styles.inProgressBadge}>
              <Text style={styles.inProgressText}>In Progress</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Text>👤</Text><Text style={styles.bookingInfo}>Priya Sharma</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Text>📍</Text><Text style={styles.bookingInfo}>Banjara Hills, Hyd</Text>
          </View>
          <View style={{ alignItems: 'flex-end', marginBottom: 14 }}>
            <Text style={{ fontSize: 11, color: '#888' }}>Arriving in</Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111' }}>8 mins</Text>
          </View>
          <TouchableOpacity style={styles.openBtn}
            onPress={() => navigation.navigate('ProviderBookingDetails')}>
            <Text style={styles.openBtnText}>Open Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="Home" />
    </SafeAreaView>
  );
}

export function BottomNav({ navigation, active }) {
  const tabs = [
    { icon: '🏠', label: 'Home', screen: 'ProviderHome' },
    { icon: '📅', label: 'Bookings', screen: 'ProviderBookings' },
    { icon: '💳', label: 'Earnings', screen: 'ProviderEarnings' },
    { icon: '👤', label: 'Profile', screen: 'ProviderProfile' },
  ];
  return (
    <View style={navStyles.nav}>
      {tabs.map((t) => (
        <TouchableOpacity key={t.label} style={navStyles.item} onPress={() => navigation.navigate(t.screen)}>
          <Text style={{ fontSize: 22 }}>{t.icon}</Text>
          <Text style={[navStyles.label, active === t.label && navStyles.active]}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const navStyles = StyleSheet.create({
  nav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 8, paddingBottom: 12 },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  label: { fontSize: 11, color: '#888' },
  active: { color: GREEN, fontWeight: '700' },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 16 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#111' },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: LIGHT_GREEN, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, gap: 4 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  onlineBadgeText: { color: GREEN, fontSize: 12, fontWeight: '600' },
  earningsCard: { backgroundColor: GREEN, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  earningsLabel: { color: '#c8e6c9', fontSize: 13, marginBottom: 4 },
  earningsAmount: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 14 },
  viewBtn: { backgroundColor: '#fff', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start' },
  viewBtnText: { color: GREEN, fontWeight: '600', fontSize: 13 },
  toggleCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, elevation: 2 },
  toggleTitle: { fontSize: 14, fontWeight: '600', color: '#111' },
  toggleSub: { fontSize: 11, color: '#888', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  viewAll: { color: GREEN, fontSize: 13, fontWeight: '600' },
  overviewRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  overviewCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center', elevation: 2 },
  overviewValue: { fontSize: 20, fontWeight: '800' },
  overviewLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  jobHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  requestCountBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: RED, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  requestCountText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  viewAllBlue: { color: '#1677ff', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  ownerNotice: { backgroundColor: LIGHT_GREEN, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: '#c8e6c9' },
  ownerNoticeText: { color: GREEN, fontSize: 13, fontWeight: '700' },
  emptyRequestsCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 20, alignItems: 'center', elevation: 2 },
  emptyRequestsTitle: { fontSize: 15, fontWeight: '800', color: '#111' },
  emptyRequestsSub: { fontSize: 12, color: '#777', marginTop: 4 },
  jobRequestCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 18, elevation: 3 },
  jobRequestTop: { flexDirection: 'row', alignItems: 'flex-start' },
  jobIconWrap: { width: 90, height: 90, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  jobIcon: { fontSize: 46 },
  jobDetails: { flex: 1, paddingTop: 4 },
  jobTitle: { fontSize: 19, fontWeight: '800', color: '#111', marginBottom: 8 },
  jobMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  jobMetaIcon: { fontSize: 15, width: 22 },
  jobMetaText: { flex: 1, color: '#666', fontSize: 14, fontWeight: '500' },
  jobSide: { alignItems: 'flex-end', justifyContent: 'space-between', minHeight: 88, marginLeft: 8 },
  timerBadge: { backgroundColor: '#fff1f1', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  timerText: { color: RED, fontSize: 13, fontWeight: '800' },
  jobPrice: { color: GREEN, fontSize: 20, fontWeight: '900' },
  jobActions: { flexDirection: 'row', gap: 12, marginTop: 14 },
  rejectBtn: { flex: 1, borderWidth: 1.5, borderColor: RED, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  rejectBtnText: { color: RED, fontSize: 16, fontWeight: '800' },
  acceptBtn: { flex: 1, backgroundColor: '#219653', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  acceptBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  bookingCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, elevation: 3 },
  bookingTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  inProgressBadge: { backgroundColor: LIGHT_GREEN, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  inProgressText: { color: GREEN, fontSize: 12, fontWeight: '600' },
  bookingInfo: { fontSize: 13, color: '#555' },
  openBtn: { backgroundColor: GREEN, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  openBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
