import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NEW_COLOR = '#1D2F53'; // Navy
const BG = '#FDF6EE';        // Cream
const ACCENT = '#B0703A';    // Gold/Accent

const MEMBERS_DATA = {
  Cleaning: [
    { id: 'c1', name: 'Sunita B.', role: 'Deep Clean Specialist', rating: 4.8, jobs: 124, price: 1499, icon: 'broom', color: '#E57373' },
    { id: 'c2', name: 'Ramesh M.', role: 'Sofa & Carpet Expert', rating: 4.9, jobs: 89, price: 1299, icon: 'vacuum', color: '#64B5F6' },
    { id: 'c3', name: 'Anita P.', role: 'Sanitization Pro', rating: 4.7, jobs: 210, price: 1599, icon: 'spray-bottle', color: '#81C784' },
  ],
  Tuition: [
    { id: 't1', name: 'Dr. Ramesh K.', role: 'Mathematics Ph.D.', rating: 5.0, jobs: 450, price: 800, icon: 'calculator', color: '#BA68C8' },
    { id: 't2', name: 'Sneha S.', role: 'English Expert', rating: 4.9, jobs: 320, price: 600, icon: 'book-open-variant', color: '#FFD54F' },
    { id: 't3', name: 'Vivek G.', role: 'Physics Faculty', rating: 4.8, jobs: 180, price: 1000, icon: 'atom', color: '#4DB6AC' },
  ],
  Cook: [
    { id: 'k1', name: 'Chef Rajesh', role: 'North Indian Specialist', rating: 4.9, jobs: 205, price: 499, icon: 'chef-hat', color: '#FF8A65' },
    { id: 'k2', name: 'Chef Anita', role: 'South Indian & Multi-Cuisine', rating: 4.8, jobs: 156, price: 549, icon: 'pot-steam', color: '#D4E157' },
    { id: 'k3', name: 'Chef Vikram', role: 'Event & Party Special', rating: 4.7, jobs: 92, price: 3499, icon: 'silverware-fork-knife', color: '#A1887F' },
  ],
  Salon: [
    { id: 's1', name: 'Priya S.', role: 'Senior Stylist & Hair Expert', rating: 4.9, jobs: 420, price: 599, icon: 'content-cut', color: '#EC407A' },
    { id: 's2', name: 'Amit K.', role: 'Massage & Spa Specialist', rating: 4.8, jobs: 180, price: 2999, icon: 'hand-back-left', color: '#7E57C2' },
    { id: 's3', name: 'Sonia R.', role: 'Facial & Skincare pro', rating: 4.7, jobs: 310, price: 1299, icon: 'face-woman', color: '#26A69A' },
  ],
  Gardening: [
    { id: 'g1', name: 'Manoj K.', role: 'Lawn & Mowing Expert', rating: 4.9, jobs: 420, price: 399, icon: 'clover', color: '#4CAF50' },
    { id: 'g2', name: 'Rashmi V.', role: 'Organic Terrace specialist', rating: 4.8, jobs: 180, price: 2499, icon: 'flower-outline', color: '#8BC34A' },
    { id: 'g3', name: 'Gopal S.', role: 'Landscape & Pruning pro', rating: 4.7, jobs: 310, price: 899, icon: 'shovel', color: '#689F38' },
  ],
  Laundry: [
    { id: 'l1', name: 'Suresh L.', role: 'Premium Wash & Iron', rating: 4.8, jobs: 320, price: 499, icon: 'washing-machine', color: '#4FC3F7' },
    { id: 'l2', name: 'Meena R.', role: 'Dry Cleaning Expert', rating: 4.9, jobs: 150, price: 1499, icon: 'hanger', color: '#9575CD' },
    { id: 'l3', name: 'Rajesh V.', role: 'Express Laundry Service', rating: 4.7, jobs: 240, price: 899, icon: 'tshirt-crew', color: '#4DB6AC' },
  ],
  ACRepair: [
    { id: 'a1', name: 'Vikram A.', role: 'Senior AC Technician', rating: 4.9, jobs: 450, price: 599, icon: 'air-conditioner', color: '#81C784' },
    { id: 'a2', name: 'Karan J.', role: 'Cooling System Expert', rating: 4.8, jobs: 210, price: 2499, icon: 'tools', color: '#64B5F6' },
    { id: 'a3', name: 'Sameer S.', role: 'Gas Refill Specialist', rating: 4.7, jobs: 180, price: 899, icon: 'snowflake', color: '#FFD54F' },
  ],
  CarWash: [
    { id: 'w1', name: 'Rahul S.', role: 'Exterior Wash Pro', rating: 4.8, jobs: 520, price: 299, icon: 'car-wash', color: '#4FC3F7' },
    { id: 'w2', name: 'Amit V.', role: 'Interior & Detailing', rating: 4.9, jobs: 310, price: 799, icon: 'car-cog', color: '#9575CD' },
    { id: 'w3', name: 'Sandeep K.', role: 'Premium Ceramic Coating', rating: 4.7, jobs: 140, price: 1999, icon: 'sparkles', color: '#4DB6AC' },
  ],
  Carpenter: [
    { id: 'p1', name: 'Ravi C.', role: 'Furniture Repair Expert', rating: 4.9, jobs: 320, price: 199, icon: 'hammer', color: '#A1887F' },
    { id: 'p2', name: 'Mohan L.', role: 'Custom Woodwork Pro', rating: 4.8, jobs: 215, price: 999, icon: 'saw-blade', color: '#8D6E63' },
    { id: 'p3', name: 'Vijay S.', role: 'Door & Lock Specialist', rating: 4.7, jobs: 180, price: 499, icon: 'door-open', color: '#795548' },
  ],
  Painting: [
    { id: 'pa1', name: 'Anil P.', role: 'Interior Wall Expert', rating: 4.9, jobs: 410, price: 2499, icon: 'format-paint', color: '#FF8A65' },
    { id: 'pa2', name: 'Sunil R.', role: 'Texture & Design Pro', rating: 4.8, jobs: 280, price: 4999, icon: 'palette', color: '#FF7043' },
    { id: 'pa3', name: 'Kiran M.', role: 'Full House Painting', rating: 4.7, jobs: 150, price: 14999, icon: 'home-variant', color: '#F4511E' },
  ],
  PestControl: [
    { id: 'pc1', name: 'Deepak S.', role: 'General Pest Specialist', rating: 4.9, jobs: 340, price: 899, icon: 'bug', color: '#66BB6A' },
    { id: 'pc2', name: 'Manoj G.', role: 'Termite Control Expert', rating: 4.8, jobs: 210, price: 2999, icon: 'shield-check', color: '#43A047' },
    { id: 'pc3', name: 'Rahul V.', role: 'Bed Bug Treatment', rating: 4.7, jobs: 190, price: 1499, icon: 'spray-bottle', color: '#2E7D32' },
  ],
  Tiling: [
    { id: 't1', name: 'Suresh M.', role: 'Floor Tiling Expert', rating: 4.9, jobs: 420, price: 599, icon: 'grid', color: '#78909C' },
    { id: 't2', name: 'Ramesh K.', role: 'Wall & Bath Tiler', rating: 4.8, jobs: 310, price: 899, icon: 'border-all', color: '#546E7A' },
    { id: 't3', name: 'Arjun P.', role: 'Grouting & Repair', rating: 4.7, jobs: 250, price: 299, icon: 'format-color-fill', color: '#455A64' },
  ],
  Roofing: [
    { id: 'r1', name: 'Vikram S.', role: 'Roof Repair Pro', rating: 4.9, jobs: 280, price: 1499, icon: 'home-roof', color: '#EF5350' },
    { id: 'r2', name: 'Sanjay D.', role: 'Leakage Specialist', rating: 4.8, jobs: 215, price: 2499, icon: 'water-off', color: '#E53935' },
    { id: 'r3', name: 'Karan J.', role: 'New Installation', rating: 4.7, jobs: 140, price: 9999, icon: 'hammer-wrench', color: '#C62828' },
  ],
  Shifting: [
    { id: 's1', name: 'GoPackers', role: 'Local Shifting Pro', rating: 4.9, jobs: 850, price: 4999, icon: 'truck-delivery', color: '#FFA726' },
    { id: 's2', name: 'SafeMove', role: 'Intercity Expert', rating: 4.8, jobs: 620, price: 12999, icon: 'map-marker-distance', color: '#FB8C00' },
    { id: 's3', name: 'ReloSmart', role: 'Packing Only', rating: 4.7, jobs: 430, price: 1999, icon: 'package-variant', color: '#F57C00' },
  ],
  WaterTank: [
    { id: 'wt1', name: 'PureAqua', role: 'Overhead Tank Pro', rating: 4.9, jobs: 510, price: 799, icon: 'water-boiler', color: '#26C6DA' },
    { id: 'wt2', name: 'CleanTanks', role: 'Sump Cleaning Expert', rating: 4.8, jobs: 380, price: 1499, icon: 'waves', color: '#00ACC1' },
    { id: 'wt3', name: 'HydroBlast', role: 'UV Sterilization', rating: 4.7, jobs: 220, price: 499, icon: 'radiology', color: '#0097A7' },
  ],
  Sewage: [
    { id: 'sw1', name: 'EcoFlow', role: 'STP Maintenance', rating: 4.9, jobs: 190, price: 4999, icon: 'filter-variant', color: '#8D6E63' },
    { id: 'sw2', name: 'DrainCare', role: 'Blockage Removal', rating: 4.8, jobs: 340, price: 1999, icon: 'pipe-leak', color: '#6D4C41' },
    { id: 'sw3', name: 'SepticPro', role: 'Septic Tank Cleaning', rating: 4.7, jobs: 160, price: 3499, icon: 'delete-sweep', color: '#5D4037' },
  ],
};

const ServiceMembersScreen = ({ route, navigation }) => {
  const { serviceType } = route.params || { serviceType: 'Cleaning' };
  const members = MEMBERS_DATA[serviceType] || [];

  const handleSelectMember = (member) => {
    // Navigate to the specific detail screen based on service type
    const screenMap = {
      Cleaning: 'HomeCleaning',
      Tuition: 'HomeTution',
      Cook: 'HomeCook',
      Salon: 'HomeSalon',
      Gardening: 'HomeGarden',
      Laundry: 'HomeLaundry',
      ACRepair: 'HomeACRepair',
      CarWash: 'HomeCarWash',
      Carpenter: 'HomeCarpenter',
      Painting: 'HomePainting',
      PestControl: 'HomePestControl',
      Tiling: 'HomeTiling',
      Roofing: 'HomeRoofing',
      Shifting: 'HomeShifting',
      WaterTank: 'HomeWaterTank',
      Sewage: 'HomeSewage',
    };
    const targetScreen = screenMap[serviceType];

    if (!targetScreen) {
      return;
    }

    navigation.navigate(targetScreen, { memberData: member });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{serviceType} Professionals</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Top Rated {serviceType} Experts</Text>
          <Text style={styles.heroSub}>Choose a verified professional for your home</Text>
        </View>

        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {members.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={styles.card}
              onPress={() => handleSelectMember(member)}
              activeOpacity={0.8}
            >
              <View style={[styles.avatarBox, { backgroundColor: member.color }]}>
                <MaterialCommunityIcons name={member.icon} size={32} color="#fff" />
              </View>

              <View style={styles.infoBox}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{member.name}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>VERIFIED</Text>
                  </View>
                </View>
                <Text style={styles.role}>{member.role}</Text>
                
                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <MaterialCommunityIcons name="star" size={14} color="#F2994A" />
                    <Text style={styles.statText}>{member.rating}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.stat}>
                    <MaterialCommunityIcons name="briefcase-check" size={14} color="#999" />
                    <Text style={styles.statText}>{member.jobs} Jobs</Text>
                  </View>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Starts at</Text>
                  <Text style={styles.priceValue}>₹{member.price}{serviceType === 'Tuition' ? '/hr' : ''}</Text>
                </View>
              </View>

              <View style={styles.arrowBox}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#CCC" />
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: NEW_COLOR, height: Platform.OS === 'web' ? '100vh' : '100%' },
  container: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NEW_COLOR,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 20
  },
  backButton: { padding: 4 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#fff' },
  heroSection: {
    backgroundColor: NEW_COLOR,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center'
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 6 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  scrollBody: { flex: 1 },
  scrollContent: { padding: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoBox: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  name: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginRight: 6 },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { fontSize: 8, fontWeight: '900', color: '#2E7D32' },
  role: { fontSize: 12, color: '#666', marginBottom: 8, fontWeight: '500' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statText: { fontSize: 12, color: '#444', fontWeight: '700', marginLeft: 4 },
  divider: { width: 1, height: 12, backgroundColor: '#EEE', marginHorizontal: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  priceLabel: { fontSize: 11, color: '#999', marginRight: 4 },
  priceValue: { fontSize: 15, fontWeight: '900', color: ACCENT },
  arrowBox: { marginLeft: 8 },
});

export default ServiceMembersScreen;
