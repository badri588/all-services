import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';
const PURPLE = '#5c35e8';

const SERVICES = [
  { id: 1, icon: '🏠', title: 'Household', desc: 'Cleaning, Cooking, Maid, etc.' },
  { id: 2, icon: '🔧', title: 'Repairs', desc: 'Plumbing, Carpentry, Painting, etc.' },
  { id: 3, icon: '💇', title: 'Personal Care', desc: 'Salon, Massage, Grooming, etc.' },
  { id: 4, icon: '🏥', title: 'Healthcare', desc: 'Nursing, Physiotherapy, Elder Care, etc.' },
  { id: 5, icon: '🚗', title: 'Transport', desc: 'Driver, Delivery, Courier, etc.' },
  { id: 6, icon: '🐾', title: 'Pet & Lifestyle', desc: 'Pet Care, Training, Walking, etc.' },
  { id: 7, icon: '💻', title: 'Tech & Support', desc: 'AC Repair, Computer, Mobile Repair, etc.' },
  { id: 8, icon: '🎉', title: 'Events', desc: 'Catering, Decor, Photography, etc.' },
  { id: 9, icon: '🌿', title: 'Outdoor & Safety', desc: 'Pest Control, Home Security, Gardening, etc.' },
  { id: 10, icon: '🏊', title: 'Pool Cleaning', desc: 'Swimming Pool Cleaning & Maintenance' },
];

export default function SelectServicesScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearAll = () => setSelected([]);

  const selectedNames = SERVICES.filter((s) => selected.includes(s.id))
    .map((s) => s.title)
    .join(', ');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Title */}
        <Text style={styles.mainTitle}>Select Your Services</Text>
        <Text style={styles.mainSub}>
          Choose the services you are skilled in and want to offer.
        </Text>

        {/* Dropdown Trigger */}
        <Text style={styles.fieldLabel}>Select Service(s)</Text>
        <TouchableOpacity
          style={[styles.dropdown, dropdownOpen && styles.dropdownOpen]}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.8}
        >
          <Text style={[styles.dropdownText, selectedNames && { color: '#333' }]}>
            {selectedNames || 'Select one or more services'}
          </Text>
          <Text style={{ fontSize: 18, color: '#888' }}>{dropdownOpen ? '⌃' : '⌄'}</Text>
        </TouchableOpacity>

        {/* Services List */}
        <View style={styles.listCard}>
          {SERVICES.map((item, index) => {
            const isSelected = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.serviceRow,
                  index === SERVICES.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => toggleService(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.serviceLeft}>
                  <View style={styles.serviceIconWrap}>
                    <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.serviceTitle}>{item.title}</Text>
                    <Text style={styles.serviceDesc}>{item.desc}</Text>
                  </View>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer Row */}
        {selected.length > 0 && (
          <View style={styles.footerRow}>
            <Text style={styles.selectedCount}>
              Selected <Text style={{ color: GREEN, fontWeight: '700' }}>{selected.length}</Text> service{selected.length > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, selected.length === 0 && styles.continueBtnDisabled]}
          onPress={() => selected.length > 0 && navigation.navigate('RegistrationSuccess')}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  scroll: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 32 },

  mainTitle: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 6 },
  mainSub: { fontSize: 14, color: '#777', marginBottom: 22, lineHeight: 20 },

  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dropdownOpen: { borderColor: PURPLE },
  dropdownText: { fontSize: 14, color: '#aaa', flex: 1, marginRight: 8 },

  listCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  serviceLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  serviceIconWrap: {
    width: 42, height: 42, borderRadius: 10,
    backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center',
  },
  serviceTitle: { fontSize: 14, fontWeight: '700', color: '#222', marginBottom: 2 },
  serviceDesc: { fontSize: 12, color: '#888' },

  checkbox: {
    width: 22, height: 22, borderRadius: 4,
    borderWidth: 1.5, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: { backgroundColor: PURPLE, borderColor: PURPLE },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  selectedCount: { fontSize: 13, color: '#555' },
  clearAll: { fontSize: 13, color: PURPLE, fontWeight: '600' },

  continueBtn: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueBtnDisabled: { backgroundColor: '#999' },
  continueBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});