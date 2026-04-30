import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

const MENU_ITEMS = [
  { icon: '👤', label: 'Personal Information', chevron: true },
  { icon: '📄', label: 'Documents', tag: 'Verified', tagColor: GREEN, chevron: true },
  { icon: '🛠️', label: 'Services Offered', chevron: true },
  { icon: '🏦', label: 'Bank Details', chevron: true },
  { icon: '📅', label: 'Availability', tag: 'Online', tagColor: GREEN, chevron: true },
  { icon: '🔒', label: 'Change Password', chevron: true },
];

export default function Profile({ navigation }) {
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
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={{ fontSize: 44 }}>👷</Text>
          </View>
          <Text style={styles.profileName}>Rajesh Kumar</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Text style={{ color: '#f59e0b', fontSize: 14 }}>⭐ 4.8</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={{ fontSize: 12 }}>✅</Text>
            <Text style={styles.verifiedText}>Verified Worker</Text>
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
              onPress={() => item.label === 'Availability' && navigation.navigate('ProviderSchedule')}
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
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.reset('Login')}>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },

  profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', marginTop: 16, marginBottom: 12, elevation: 2 },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: LIGHT_GREEN, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  profileName: { fontSize: 20, fontWeight: '800', color: '#111' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: LIGHT_GREEN, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 },
  verifiedText: { color: GREEN, fontSize: 12, fontWeight: '600' },

  completionCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, elevation: 2 },
  completionLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
  completionPct: { fontSize: 14, fontWeight: '700', color: GREEN },
  progressBg: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: GREEN, borderRadius: 4 },

  menuCard: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 16, elevation: 2, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuLabel: { fontSize: 14, color: '#222', fontWeight: '500' },
  menuTag: { fontSize: 12, fontWeight: '600' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, backgroundColor: '#fff0f0', borderRadius: 14 },
  logoutText: { color: '#e53935', fontWeight: '700', fontSize: 15 },
});
