import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  Switch, StyleSheet, SafeAreaView,
} from 'react-native';
import { BottomNav } from './HomeScreen';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MyScheduleScreen({ navigation }) {
  const [availability, setAvailability] = useState(true);
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('08:00 PM');
  const [breakEnabled, setBreakEnabled] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
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
            <Switch value={availability} onValueChange={setAvailability}
              trackColor={{ false: '#ccc', true: GREEN }} thumbColor="#fff" />
          </View>
        </View>

        {/* Working Days */}
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

        {/* Working Hours */}
        <Text style={styles.sectionTitle}>Working Hours</Text>
        <View style={styles.card}>
          <Text style={styles.timeLabel}>Start Time</Text>
          <TouchableOpacity style={styles.timeDropdown}>
            <Text style={styles.timeValue}>{startTime}</Text>
            <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
          </TouchableOpacity>

          <Text style={[styles.timeLabel, { marginTop: 16 }]}>End Time</Text>
          <TouchableOpacity style={styles.timeDropdown}>
            <Text style={styles.timeValue}>{endTime}</Text>
            <Text style={{ color: '#888', fontSize: 18 }}>⌄</Text>
          </TouchableOpacity>
        </View>

        {/* Break Time */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.cardTitle}>Break Time <Text style={styles.optionalTag}>(Optional)</Text></Text>
              <Text style={styles.cardSub}>Add break time</Text>
            </View>
            <Switch value={breakEnabled} onValueChange={setBreakEnabled}
              trackColor={{ false: '#ccc', true: GREEN }} thumbColor="#fff" />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>Save Schedule</Text>
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
});