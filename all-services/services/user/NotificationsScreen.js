import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';

const NOTIFICATIONS = [
  { id: 1, icon: '📋', title: 'New booking request', desc: 'Deep Cleaning at Banjara Hills', time: '2m ago', unread: true, bg: '#fff8e1' },
  { id: 2, icon: '✅', title: 'Booking confirmed', desc: 'Your booking has been confirmed', time: '10m ago', unread: true, bg: '#e8f5e9' },
  { id: 3, icon: '💳', title: 'Payment received', desc: 'You earned ₹699', time: '30m ago', unread: true, bg: '#e8f5e9' },
  { id: 4, icon: '⭐', title: 'Customer review', desc: 'Priya Sharma rated you 5 stars', time: '1h ago', unread: false, bg: '#fff8e1' },
  { id: 5, icon: '💬', title: 'New message', desc: 'You have a new message', time: '2h ago', unread: false, bg: '#e3f2fd' },
  { id: 6, icon: '📊', title: 'Weekly summary', desc: 'Your weekly earnings report', time: '1d ago', unread: false, bg: '#f3e5f5' },
];

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((notif) => (
          <TouchableOpacity key={notif.id} style={[styles.notifCard, notif.unread && styles.notifUnread]}>
            <View style={[styles.notifIcon, { backgroundColor: notif.bg }]}>
              <Text style={{ fontSize: 20 }}>{notif.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.notifTitle, notif.unread && { color: '#111' }]}>{notif.title}</Text>
              <Text style={styles.notifDesc}>{notif.desc}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            {notif.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav navigation={navigation} active="Home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  markAll: { color: GREEN, fontSize: 12, fontWeight: '600' },
  scroll: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },

  notifCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2, gap: 12 },
  notifUnread: { backgroundColor: '#f0f9f1' },
  notifIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  notifDesc: { fontSize: 12, color: '#777', marginBottom: 4 },
  notifTime: { fontSize: 11, color: '#aaa' },
  unreadDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: GREEN },
});