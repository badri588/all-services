import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

const TRANSACTIONS = [
  { id: 1, title: 'Deep Cleaning', time: 'Today, 10:30 AM', amount: '+₹699', icon: '🧹' },
  { id: 2, title: 'Home Cleaning', time: 'Today, 9:00 AM', amount: '+₹499', icon: '🏠' },
  { id: 3, title: 'Bathroom Cleaning', time: 'Yesterday, 6:00 PM', amount: '+₹399', icon: '🚿' },
];

export default function Earnings({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>📅</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.totalLabel}>Total Earnings</Text>
            <Text style={styles.totalAmount}>₹18,650</Text>
            <Text style={styles.totalPeriod}>This Month</Text>
          </View>
          <Text style={{ fontSize: 64 }}>💰</Text>
        </View>

        {/* Earnings Summary */}
        <Text style={styles.sectionTitle}>Earnings Summary</Text>
        <View style={styles.card}>
          {[
            { label: 'Today', value: '₹1,250' },
            { label: 'This Week', value: '₹6,450' },
            { label: 'This Month', value: '₹18,650' },
            { label: 'Last Month', value: '₹16,240' },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.summaryRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.summaryLabel}>{row.label}</Text>
              <Text style={styles.summaryValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} style={styles.txCard}>
            <View style={styles.txIcon}>
              <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txTitle}>{tx.title}</Text>
              <Text style={styles.txTime}>{tx.time}</Text>
            </View>
            <Text style={styles.txAmount}>{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomNav navigation={navigation} active="Earnings" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },

  totalCard: { backgroundColor: GREEN, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  totalLabel: { color: '#c8e6c9', fontSize: 13 },
  totalAmount: { color: '#fff', fontSize: 34, fontWeight: '900', marginVertical: 4 },
  totalPeriod: { color: '#c8e6c9', fontSize: 12 },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  viewAll: { color: GREEN, fontSize: 13, fontWeight: '600' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 4, marginBottom: 20, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  summaryLabel: { fontSize: 14, color: '#555' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: '#111' },

  txCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 2, gap: 12 },
  txIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: LIGHT_GREEN, alignItems: 'center', justifyContent: 'center' },
  txTitle: { fontSize: 14, fontWeight: '600', color: '#111' },
  txTime: { fontSize: 12, color: '#888', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '800', color: GREEN },
});