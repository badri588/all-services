import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

const BOOKINGS = [
  {
    section: 'Upcoming',
    data: [
      { id: 1, title: 'Home Cleaning', name: 'Anita Verma', location: 'Gachibowli, Hyderabad', price: '₹499', time: 'Today, 10:00 AM', status: 'Upcoming', statusColor: '#f59e0b', statusBg: '#fff8e1' },
    ],
  },
  {
    section: 'In Progress',
    data: [
      { id: 2, title: 'Deep Cleaning', name: 'Priya Sharma', location: 'Banjara Hills, Hyderabad', price: '₹699', arriving: '8 mins', status: 'In Progress', statusColor: GREEN, statusBg: LIGHT_GREEN, navigate: true },
    ],
  },
  {
    section: 'Completed',
    data: [
      { id: 3, title: 'Bathroom Cleaning', name: 'Karan Mehta', location: 'Madhapur, Hyderabad', price: '₹699', time: 'Today, 9:00 AM', status: 'Completed', statusColor: GREEN, statusBg: LIGHT_GREEN },
    ],
  },
];

const TABS = ['All', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'];

export default function MyBookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' ? BOOKINGS : BOOKINGS.filter(g => g.section === activeTab);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity><Text style={{ fontSize: 20 }}>⚙️</Text></TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {filtered.map((group) => (
          <View key={group.section}>
            <Text style={styles.sectionTitle}>{group.section}</Text>
            {group.data.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}
                onPress={() => navigation.navigate('ProviderBookingDetails', { booking: item })}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.time && <Text style={styles.cardTime}>{item.time}</Text>}
                </View>
                <View style={styles.infoRow}>
                  <Text style={{ fontSize: 13 }}>👤</Text>
                  <Text style={styles.infoText}>{item.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={{ fontSize: 13 }}>📍</Text>
                  <Text style={styles.infoText}>{item.location}</Text>
                </View>
                <View style={[styles.cardRow, { marginTop: 10, alignItems: 'center' }]}>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {item.arriving && (
                      <View>
                        <Text style={{ fontSize: 11, color: '#888' }}>Arriving in</Text>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#111' }}>{item.arriving}</Text>
                      </View>
                    )}
                    {item.navigate ? (
                      <TouchableOpacity style={styles.navigateBtn} onPress={() => navigation.navigate('ProviderLiveTracking')}>
                        <Text style={styles.navigateBtnText}>🧭 Navigate</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                        <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <BottomNav navigation={navigation} active="Bookings" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
  tabBar: { borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  tabItem: { marginRight: 20, paddingVertical: 12, alignItems: 'center' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '500' },
  tabTextActive: { color: GREEN, fontWeight: '700' },
  tabUnderline: { height: 2, backgroundColor: GREEN, borderRadius: 2, width: '100%', marginTop: 4 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, elevation: 2 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  cardTime: { fontSize: 12, color: '#888' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  infoText: { fontSize: 13, color: '#555' },
  price: { fontSize: 16, fontWeight: '800', color: '#111' },
  statusBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  navigateBtn: { backgroundColor: LIGHT_GREEN, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  navigateBtnText: { color: GREEN, fontWeight: '700', fontSize: 13 },
});
