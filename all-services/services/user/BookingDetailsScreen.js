import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

export default function BookingDetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 22 }}>📞</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusLeft}>
            <Text style={{ fontSize: 18 }}>🕐</Text>
            <View>
              <Text style={styles.statusBadgeText}>In Progress</Text>
              <Text style={styles.statusMeta}>Booking ID: #BK12345</Text>
            </View>
          </View>
          <View style={styles.serviceTag}>
            <Text style={{ fontSize: 14 }}>🧹</Text>
            <View>
              <Text style={styles.serviceTitle}>Deep Cleaning</Text>
              <Text style={styles.serviceTime}>Today, 10:00 AM</Text>
            </View>
          </View>
        </View>

        {/* Customer Details */}
        <Text style={styles.sectionTitle}>Customer Details</Text>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 28 }}>👤</Text>
              </View>
              <View>
                <Text style={styles.customerName}>Priya Sharma</Text>
                <Text style={styles.customerPhone}>+91 98765 43210</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 18 }}>📞</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 18 }}>💬</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Service Address */}
        <Text style={styles.sectionTitle}>Service Address</Text>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Text style={{ fontSize: 16, marginTop: 2 }}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressText}>H.No. 12-3-45/6, Street No. 5,</Text>
              <Text style={styles.addressText}>Banjara Hills, Hyderabad,</Text>
              <Text style={styles.addressText}>Telangana - 500034</Text>
              <TouchableOpacity style={{ marginTop: 8 }}>
                <Text style={styles.mapLink}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Price Details */}
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={styles.card}>
          {[
            { label: 'Service Charges', value: '₹699' },
            { label: 'Platform Fee', value: '₹30' },
          ].map((row) => (
            <View key={row.label} style={styles.priceRow}>
              <Text style={styles.priceLabel}>{row.label}</Text>
              <Text style={styles.priceValue}>{row.value}</Text>
            </View>
          ))}
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹729</Text>
          </View>
        </View>

        {/* Start Service Button */}
        <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('ProviderLiveTracking')}>
          <Text style={styles.startBtnText}>Start Service</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} active="Bookings" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },
  statusBanner: { backgroundColor: GREEN, borderRadius: 14, padding: 16, marginTop: 16, gap: 12 },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  statusBadgeText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  statusMeta: { color: '#c8e6c9', fontSize: 12 },
  serviceTag: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: 10 },
  serviceTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  serviceTime: { color: '#c8e6c9', fontSize: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, elevation: 2 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center' },
  customerName: { fontSize: 15, fontWeight: '700', color: '#111' },
  customerPhone: { fontSize: 13, color: '#666', marginTop: 2 },
  actionBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center' },
  addressText: { fontSize: 13, color: '#555', lineHeight: 20 },
  mapLink: { color: GREEN, fontWeight: '600', fontSize: 13 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  priceLabel: { fontSize: 13, color: '#666' },
  priceValue: { fontSize: 13, color: '#333', fontWeight: '500' },
  totalRow: { borderBottomWidth: 0, marginTop: 4 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#111' },
  totalValue: { fontSize: 15, fontWeight: '800', color: '#111' },
  startBtn: { backgroundColor: GREEN, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  startBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
