// import React, { useMemo, useState } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, TouchableOpacity,
//   StatusBar, SafeAreaView, TextInput, useWindowDimensions,
// } from 'react-native';
// import { COLORS, SERVICES, JOB_ALERTS } from '../data/serviceData';

// const FEATURED_SERVICE_IDS = [
//   'kitchen',
//   'cleaning',
//   'gardening',
//   'salon',
//   'tutor',
//   'repairs',
//   'driver',
//   'doctor',
// ];

// const HomeScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const { width } = useWindowDimensions();
//   const featuredColumns = width >= 768 ? 4 : 2;

//   const workerListRouteMap = {
//     handyman: { routeName: 'WorkersCategoryList', params: { category: 'Handyman', icon: 'ðŸ› ï¸' } },
//     furnitureAssembly: { routeName: 'WorkersCategoryList', params: { category: 'FurnitureAssembly', icon: 'ðŸª‘' } },
//     homeRenovation: { routeName: 'WorkersCategoryList', params: { category: 'HomeRenovation', icon: 'ðŸ¡' } },
//     electrician: { routeName: 'MedicalWorkersList', params: { category: 'Electrician', icon: 'ðŸ’¡' } },
//     maid: { routeName: 'MedicalWorkersList', params: { category: 'Maid', icon: 'ðŸ§¹' } },
//     poolCleaning: { routeName: 'MedicalWorkersList', params: { category: 'PoolCleaning', icon: 'ðŸŠ' } },
//     doctor: { routeName: 'MedicalWorkersList', params: { category: 'Doctor', icon: '🩺' } },
//     'home-nurse': { routeName: 'MedicalWorkersList', params: { category: 'HomeNurse', icon: '💙' } },
//     driver: { routeName: 'WorkersCategoryList', params: { category: 'Driver', icon: '🚗' } },
//     plumber: { routeName: 'WorkersCategoryList', params: { category: 'Plumber', icon: '🔧' } },
//     repairs: { routeName: 'WorkersCategoryList', params: { category: 'Repairs', icon: '🛠️' } },
//     security: { routeName: 'WorkersCategoryList', params: { category: 'SecurityGuard', icon: '🔒' } },
//   };

//   const serviceLookup = useMemo(() => {
//     const map = new Map();

//     SERVICES.forEach((service) => {
//       map.set(service.id, service);
//     });

//     return map;
//   }, []);

//   const featuredServices = FEATURED_SERVICE_IDS
//     .map((id) => serviceLookup.get(id))
//     .filter(Boolean);

//   const featuredRows = [];
//   for (let i = 0; i < featuredServices.length; i += featuredColumns) {
//     featuredRows.push(featuredServices.slice(i, i + featuredColumns));
//   }

//   const filteredServices = SERVICES.filter((service, index, array) => {
//     const query = searchText.trim().toLowerCase();
//     if (!query) {
//       return false;
//     }

//     const firstIndex = array.findIndex((item) => item.id === service.id);
//     if (firstIndex !== index) {
//       return false;
//     }

//     return (
//       service.name.toLowerCase().includes(query) ||
//       service.id.toLowerCase().includes(query)
//     );
//   });

//   const openService = (service) => {
//     const memberScreenMap = {
//       acRepair: 'ACRepair',
//       carpenter: 'Carpenter',
//       carWash: 'CarWash',
//       kitchen: 'Cook',
//       cleaning: 'Cleaning',
//       gardening: 'Gardening',
//       laundry: 'Laundry',
//       moving: 'Shifting',
//       painting: 'Painting',
//       pestControl: 'PestControl',
//       roofing: 'Roofing',
//       salon: 'Salon',
//       sewageTreatment: 'Sewage',
//       tiling: 'Tiling',
//       tutor: 'Tuition',
//       waterTankCleaning: 'WaterTank',
//     };

//     const serviceType = memberScreenMap[service.id];
//     const workerListRoute = workerListRouteMap[service.id];

//     if (serviceType) {
//       navigation.navigate('ServiceMembers', { serviceType, service });
//       return;
//     }

//     if (workerListRoute) {
//       navigation.navigate(workerListRoute.routeName, {
//         service,
//         ...workerListRoute.params,
//       });
//       return;
//     }

//     navigation.navigate('WorkersList', { service });
//   };

//   const renderServiceTile = (service) => (
//     <TouchableOpacity
//       key={service.id}
//       style={[
//         styles.serviceTile,
//         service.isNew && styles.serviceTileNew,
//       ]}
//       activeOpacity={0.75}
//       onPress={() => openService(service)}
//     >
//       {service.isNew ? (
//         <View style={styles.newBadge}>
//           <Text style={styles.newBadgeText}>NEW</Text>
//         </View>
//       ) : null}
//       <Text style={styles.serviceEmoji}>{service.emoji}</Text>
//       <Text style={[styles.serviceName, service.isNew && { color: '#e8620a' }]}>
//         {service.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.headerLeft}
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('SignIn')}
//         >
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>RS</Text>
//           </View>
//           <View>
//             <Text style={styles.hiText}>Hi, Raju!</Text>
//             <Text style={styles.locationText}>Karimnagar Colony</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.notifBtn}>
//           <Text style={styles.notifIcon}>Bell</Text>
//           <View style={styles.notifDot}>
//             <Text style={styles.notifCount}>5</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         style={styles.scroll}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.searchSection}>
//           <Text style={styles.searchLabel}>Search Services</Text>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search kitchen, cleaning, salon, tutor..."
//             placeholderTextColor={COLORS.lightText}
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//         </View>

//         {searchText.trim() ? (
//           <View style={styles.searchResultsSection}>
//             <Text style={styles.resultsTitle}>Search Results</Text>
//             {filteredServices.length > 0 ? (
//               filteredServices.map((service) => (
//                 <TouchableOpacity
//                   key={service.id}
//                   style={styles.searchResultCard}
//                   activeOpacity={0.8}
//                   onPress={() => openService(service)}
//                 >
//                   <View style={[styles.searchIconWrap, { backgroundColor: service.bg }]}>
//                     <Text style={styles.searchEmoji}>{service.emoji}</Text>
//                   </View>
//                   <View style={styles.searchTextWrap}>
//                     <Text style={styles.searchResultName}>{service.name}</Text>
//                     <Text style={styles.searchResultMeta}>Tap to continue</Text>
//                   </View>
//                   <Text style={[styles.searchArrow, { color: service.color }]}>Go</Text>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <View style={styles.noResultsCard}>
//                 <Text style={styles.noResultsTitle}>No matching services found</Text>
//                 <Text style={styles.noResultsText}>
//                   Try searching with another service name.
//                 </Text>
//               </View>
//             )}
//           </View>
//         ) : null}

//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionHeaderLabel}>BROWSE SERVICES</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('AllServices')}>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         {featuredRows.map((row, rowIndex) => (
//           <View key={rowIndex} style={styles.servicesRow}>
//             {row.map((service) => renderServiceTile(service))}
//             {row.length < featuredColumns
//               ? Array(featuredColumns - row.length).fill(null).map((_, fillerIndex) => (
//                   <View key={`empty-${rowIndex}-${fillerIndex}`} style={styles.serviceTilePlaceholder} />
//                 ))
//               : null}
//           </View>
//         ))}

//         <View style={styles.divider} />

//         <View style={styles.statsRow}>
//           <View style={[styles.statCard, styles.statCardPrimary]}>
//             <Text style={styles.statLabelLight}>Earnings This Month</Text>
//             <Text style={styles.statValueLight}>Rs 8,500</Text>
//           </View>
//           <View style={[styles.statCard, styles.statCardWhite]}>
//             <Text style={styles.statLabelDark}>Active Jobs</Text>
//             <Text style={styles.statValueOrange}>3</Text>
//           </View>
//         </View>

//         <Text style={styles.alertsLabel}>NEW JOB ALERTS</Text>

//         {JOB_ALERTS.map((alert) => (
//           <TouchableOpacity
//             key={alert.id}
//             style={styles.alertCard}
//             activeOpacity={0.8}
//             onPress={() => openService(
//               SERVICES.find((s) =>
//                 alert.title.toLowerCase().includes(s.name.toLowerCase())
//               ) || SERVICES[0]
//             )}
//           >
//             <View style={[styles.alertStripe, { backgroundColor: alert.accentColor }]} />
//             <View style={styles.alertContent}>
//               <Text style={styles.alertTitle}>{alert.title}</Text>
//               <Text style={styles.alertSubtitle}>{alert.subtitle}</Text>
//               <Text style={styles.alertTime}>
//                 {alert.timeAgo}{alert.tag ? ` - ${alert.tag}` : ''}
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={[styles.alertArrow, { backgroundColor: alert.accentColor }]}
//               onPress={() => openService(
//                 SERVICES.find((s) =>
//                   alert.title.toLowerCase().includes(s.name.toLowerCase())
//                 ) || SERVICES[0]
//               )}
//             >
//               <Text style={styles.alertArrowText}>Go</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         ))}

//         <View style={{ height: 24 }} />
//       </ScrollView>

//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navEmoji}>Jobs</Text>
//           <Text style={[styles.navLabel, styles.navLabelActive]}>Jobs</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navEmoji}>Work</Text>
//           <Text style={styles.navLabel}>My Work</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate('SignIn')}
//         >
//           <Text style={styles.navEmoji}>Profile</Text>
//           <Text style={styles.navLabel}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: COLORS.primary },
//   header: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   avatar: {
//     width: 38, height: 38, borderRadius: 19,
//     backgroundColor: '#ff8c3a',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   avatarText: { color: '#fff', fontSize: 13, fontWeight: '800' },
//   hiText: { color: '#fff', fontSize: 15, fontWeight: '700' },
//   locationText: { color: '#ffcda0', fontSize: 11, marginTop: 1 },
//   notifBtn: { position: 'relative' },
//   notifIcon: { fontSize: 12, color: '#fff', fontWeight: '700' },
//   notifDot: {
//     position: 'absolute', top: -4, right: -4,
//     backgroundColor: '#fff', borderRadius: 8,
//     width: 16, height: 16, alignItems: 'center', justifyContent: 'center',
//   },
//   notifCount: { color: COLORS.primary, fontSize: 9, fontWeight: '800' },
//   scroll: { flex: 1, backgroundColor: COLORS.bg },
//   scrollContent: { paddingTop: 4 },
//   searchSection: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 6,
//   },
//   searchLabel: {
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//     color: COLORS.medText,
//     textTransform: 'uppercase',
//     marginBottom: 10,
//   },
//   searchInput: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     fontSize: 14,
//     color: COLORS.darkText,
//   },
//   searchResultsSection: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//     paddingBottom: 8,
//   },
//   resultsTitle: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: COLORS.darkText,
//     marginBottom: 10,
//   },
//   searchResultCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 14,
//     padding: 12,
//     marginBottom: 10,
//   },
//   searchIconWrap: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   searchEmoji: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.darkText,
//   },
//   searchTextWrap: {
//     flex: 1,
//   },
//   searchResultName: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: COLORS.darkText,
//     marginBottom: 2,
//   },
//   searchResultMeta: {
//     fontSize: 11,
//     color: COLORS.medText,
//   },
//   searchArrow: {
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   noResultsCard: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 14,
//     padding: 14,
//   },
//   noResultsTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: COLORS.darkText,
//     marginBottom: 4,
//   },
//   noResultsText: {
//     fontSize: 11,
//     color: COLORS.medText,
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10,
//   },
//   sectionHeaderLabel: {
//     fontSize: 10, fontWeight: '800', letterSpacing: 1.5,
//     color: COLORS.medText, textTransform: 'uppercase',
//   },
//   seeAllText: { fontSize: 12, color: COLORS.primary, fontWeight: '700' },
//   servicesRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     gap: 10,
//     marginBottom: 10,
//   },
//   serviceTilePlaceholder: {
//     flex: 1,
//   },
//   serviceTile: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 4,
//     position: 'relative',
//     minHeight: 72,
//   },
//   serviceTileNew: {
//     backgroundColor: '#fff2e6',
//     borderColor: '#e8a060',
//     borderWidth: 1.5,
//   },
//   newBadge: {
//     position: 'absolute', top: -6, left: 4,
//     backgroundColor: COLORS.green,
//     borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2,
//   },
//   newBadgeText: { color: '#fff', fontSize: 7, fontWeight: '800' },
//   serviceEmoji: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.darkText,
//     marginBottom: 6,
//     textAlign: 'center',
//   },
//   serviceName: { fontSize: 9, color: COLORS.medText, fontWeight: '600', textAlign: 'center' },
//   divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 16, marginVertical: 8 },
//   statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 16 },
//   statCard: {
//     flex: 1, borderRadius: 14, padding: 14,
//     alignItems: 'center',
//   },
//   statCardPrimary: { backgroundColor: COLORS.primary },
//   statCardWhite: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
//   statLabelLight: { fontSize: 10, color: '#ffcda0', fontWeight: '500', marginBottom: 4 },
//   statValueLight: { fontSize: 20, color: '#fff', fontWeight: '800' },
//   statLabelDark: { fontSize: 10, color: COLORS.medText, fontWeight: '500', marginBottom: 4 },
//   statValueOrange: { fontSize: 24, color: COLORS.primary, fontWeight: '800' },
//   alertsLabel: {
//     fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
//     color: COLORS.medText, textTransform: 'uppercase',
//     paddingHorizontal: 16, marginBottom: 10,
//   },
//   alertCard: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.white,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     marginHorizontal: 16,
//     marginBottom: 10,
//     overflow: 'hidden',
//     alignItems: 'center',
//   },
//   alertStripe: { width: 5, alignSelf: 'stretch' },
//   alertContent: { flex: 1, paddingHorizontal: 12, paddingVertical: 12 },
//   alertTitle: { fontSize: 13, color: COLORS.darkText, fontWeight: '700', marginBottom: 3 },
//   alertSubtitle: { fontSize: 10, color: COLORS.medText, marginBottom: 2 },
//   alertTime: { fontSize: 9, color: COLORS.lightText },
//   alertArrow: {
//     width: 34, height: 34, borderRadius: 17,
//     alignItems: 'center', justifyContent: 'center',
//     marginRight: 12,
//   },
//   alertArrowText: { color: '#fff', fontSize: 12, fontWeight: '700' },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.white,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     paddingBottom: 8,
//     paddingTop: 6,
//   },
//   navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
//   navEmoji: { fontSize: 12, marginBottom: 2, color: COLORS.darkText, fontWeight: '700' },
//   navLabel: { fontSize: 9, color: COLORS.lightText, fontWeight: '600' },
//   navLabelActive: { color: COLORS.primary },
// });

// export default HomeScreen;






import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const SCREEN_WIDTH = Math.min(width, 430);

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", name: "All Services", emoji: "🏷️", color: "#7c3aed" },
  { id: "household", name: "Household", emoji: "🏠", color: "#7c3aed" },
  { id: "repairs", name: "Repairs", emoji: "🔧", color: "#2563eb" },
  { id: "personalCare", name: "Personal Care", emoji: "💄", color: "#db2777" },
  { id: "healthcare", name: "Healthcare", emoji: "🏥", color: "#16a34a" },
  { id: "transport", name: "Transport", emoji: "🚗", color: "#ea580c" },
  { id: "petLifestyle", name: "Pet & Lifestyle", emoji: "🐾", color: "#92400e" },
  { id: "personalServices", name: "Personal Services", emoji: "🎓", color: "#d97706" },
  { id: "techSupport", name: "Tech & Support", emoji: "💻", color: "#0284c7" },
  { id: "events", name: "Events", emoji: "🎉", color: "#ec4899" },
  { id: "outdoor", name: "Outdoor & Safety", emoji: "🌿", color: "#10b981" },
];

const SERVICES = [
  { id: "deepCleaning", name: "Deep Cleaning", emoji: "🧽", color: "#0f766e", bg: "#e6fffb", category: "household" },
  { id: "homeChef", name: "Home Chef", emoji: "👨‍🍳", color: "#ea580c", bg: "#fff7ed", category: "household" },
  { id: "maid", name: "Maid", emoji: "🧑‍🔧", color: "#1d4ed8", bg: "#dbeafe", category: "household" },
  { id: "laundry", name: "Laundry", emoji: "🧺", color: "#2563eb", bg: "#eaf2ff", category: "household" },
  // { id: "kitchen", name: "Kitchen Help", emoji: "🍳", color: "#e8620a", bg: "#fff2e6", category: "household" },
  { id: "waterTankCleaning", name: "Water Tank Cleaning", emoji: "💧", color: "#10b981", bg: "#d1fae5", category: "household" },
  { id: "poolCleaning", name: "Pool Cleaning", emoji: "🏊", color: "#22d3ee", bg: "#e0f2fe", category: "household" },

  { id: "electrician", name: "Electrician", emoji: "💡", color: "#ca8a04", bg: "#fef9c3", category: "repairs" },
  { id: "plumber", name: "Plumber", emoji: "🔧", color: "#e62e2e", bg: "#ffcccb", category: "repairs" },
  { id: "acRepair", name: "AC Repair", emoji: "❄️", color: "#0891b2", bg: "#e0f2fe", category: "repairs" },
  { id: "applianceRepair", name: "Appliance Repair", emoji: "🔌", color: "#7c3aed", bg: "#f3e8ff", category: "repairs" },
  { id: "handyman", name: "Handyman", emoji: "🛠️", color: "#f97316", bg: "#ffedd5", category: "repairs" },
  { id: "carpenter", name: "Carpenter", emoji: "🪚", color: "#d97706", bg: "#fff7e6", category: "repairs" },
  { id: "painting", name: "Painting", emoji: "🎨", color: "#9333ea", bg: "#f3e8ff", category: "repairs" },
  { id: "furnitureAssembly", name: "Furniture Assembly", emoji: "🪑", color: "#dc2626", bg: "#fee2e2", category: "repairs" },
  { id: "homeRenovation", name: "Home Renovation", emoji: "🏡", color: "#d97706", bg: "#fff7e6", category: "repairs" },
  { id: "tiling", name: "Tiling", emoji: "🔲", color: "#16a34a", bg: "#e8fbe8", category: "repairs" },
  { id: "roofing", name: "Roofing", emoji: "🏠", color: "#ef4444", bg: "#fef2f2", category: "repairs" },
  // { id: "plumbingRepair", name: "Plumbing Repair", emoji: "🚰", color: "#e11d48", bg: "#fbe0e0", category: "repairs" },

  { id: "salonAtHome", name: "Salon at Home", emoji: "💇", color: "#db2777", bg: "#fce7f3", category: "personalCare" },
  { id: "beautician", name: "Beautician", emoji: "💅", color: "#be185d", bg: "#fdf2f8", category: "personalCare" },
  // { id: "haircutService", name: "Haircut Service", emoji: "✂️", color: "#4f46e5", bg: "#eef2ff", category: "personalCare" },
  { id: "massageTherapy", name: "Massage Therapy", emoji: "💆", color: "#0369a1", bg: "#e0f2fe", category: "personalCare" },

  { id: "doctor", name: "Doctor Visit", emoji: "🩺", color: "#0891b2", bg: "#e0f2fe", category: "healthcare" },
  { id: "homeNurse", name: "Home Nurse", emoji: "💊", color: "#16a34a", bg: "#e8fbe8", category: "healthcare" },
  { id: "physiotherapy", name: "Physiotherapy", emoji: "🦯", color: "#059669", bg: "#d1fae5", category: "healthcare" },
  { id: "labTestAtHome", name: "Lab Test at Home", emoji: "🧪", color: "#dc2626", bg: "#fee2e2", category: "healthcare" },

  { id: "driver", name: "Driver", emoji: "🚗", color: "#dc2626", bg: "#fee2e2", category: "transport" },
  // { id: "pickupDrop", name: "Pickup & Drop", emoji: "🚐", color: "#1d4ed8", bg: "#dbeafe", category: "transport" },
  { id: "carWash", name: "Car Wash", emoji: "🚙", color: "#2563eb", bg: "#eaf2ff", category: "transport" },
  { id: "moving", name: "Shifting / Moving", emoji: "📦", color: "#3b82f6", bg: "#e0f2fe", category: "transport" },

  // { id: "petGrooming", name: "Pet Grooming", emoji: "🐾", color: "#92400e", bg: "#fef3c7", category: "petLifestyle" },
  { id: "petWalking", name: "Pet training", emoji: "🦮", color: "#15803d", bg: "#dcfce7", category: "petLifestyle" },

  { id: "fitnessTrainer", name: "Fitness / Yoga", emoji: "🏋️", color: "#b45309", bg: "#fef9c3", category: "personalServices" },
  { id: "tutor", name: "Tutor", emoji: "📚", color: "#7c3aed", bg: "#f3e8ff", category: "personalServices" },

  { id: "wifiSetup", name: "WiFi Setup", emoji: "📶", color: "#0284c7", bg: "#e0f2fe", category: "techSupport" },
  { id: "cctvInstallation", name: "CCTV Installation", emoji: "📷", color: "#374151", bg: "#f3f4f6", category: "techSupport" },
  { id: "security", name: "Security Services", emoji: "🔒", color: "#d97706", bg: "#fff7e6", category: "techSupport" },

  { id: "birthdayDecor", name: "Birthday Decorations", emoji: "🎂", color: "#d97706", bg: "#fef9c3", category: "events" },
  { id: "eventPhotography", name: "Event Photography", emoji: "📸", color: "#7c3aed", bg: "#f3e8ff", category: "events" },
  { id: "cateringServices", name: "Catering Services", emoji: "🍽️", color: "#b91c1c", bg: "#fee2e2", category: "events" },
  { id: "partyPlanner", name: "Party Planner", emoji: "🎉", color: "#ec4899", bg: "#fce7f3", category: "events" },

  { id: "gardening", name: "Gardening", emoji: "🌱", color: "#10b981", bg: "#d1fae5", category: "outdoor" },
  { id: "pestControl", name: "Pest Control", emoji: "🦟", color: "#ef4444", bg: "#fef2f2", category: "outdoor" },
  { id: "sewageTreatment", name: "Sewage Treatment", emoji: "🚧", color: "#b45309", bg: "#fff7e6", category: "outdoor" },
];

const BANNERS = [
  {
    id: "b1",
    title: "Cleaning Services",
    subtitle: "Get 20% OFF",
    detail: "on first order",
    emoji: "🫧",
    ctaColor: "#16a34a",
    bg: "#f0fdf4",
    accent: "#bbf7d0",
  },
  {
    id: "b2",
    title: "Home Chef",
    subtitle: "Try Home Cooked",
    detail: "meals from ₹199",
    emoji: "👨‍🍳",
    ctaColor: "#ea580c",
    bg: "#fff7ed",
    accent: "#fed7aa",
  },
  {
    id: "b3",
    title: "Doctor at Home",
    subtitle: "Consult Now",
    detail: "in 30 minutes",
    emoji: "🩺",
    ctaColor: "#0891b2",
    bg: "#ecfeff",
    accent: "#a5f3fc",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "bookings", label: "Bookings", icon: "📋" },
  { id: "wallet", label: "Wallet", icon: "💳" },
  { id: "profile", label: "Profile", icon: "👤" },
];

// ─────────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────────
function DrawerItem({ item, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.drawerItem, active && styles.drawerItemActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.drawerItemEmoji}>{item.emoji}</Text>
      <Text style={[styles.drawerItemText, active && styles.drawerItemTextActive]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

function ServiceCard({ service, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={styles.serviceTouchable}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={[styles.cardIconWrap, { backgroundColor: service.bg }]}>
          <Text style={styles.cardEmoji}>{service.emoji}</Text>
        </View>
        <Text style={styles.cardName}>{service.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

function BannerCard({ item, onPress }) {
  return (
    <View style={[styles.bannerCard, { backgroundColor: item.bg }]}>
      <View style={[styles.bannerAccentCircle, { backgroundColor: item.accent }]} />
      <View style={styles.bannerLeft}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={[styles.bannerSubtitle, { color: item.ctaColor }]}>
          {item.subtitle}
        </Text>
        <Text style={styles.bannerDetail}>{item.detail}</Text>
        <TouchableOpacity
          style={[styles.bookBtn, { backgroundColor: item.ctaColor }]}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bannerEmoji}>{item.emoji}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeNav, setActiveNav] = useState("home");

  const bannerListRef = useRef(null);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((svc) => {
      const matchCat = activeCategory === "all" || svc.category === activeCategory;
      const matchSearch = svc.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const activeLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.name ?? "All Services";

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setDrawerOpen(false);
  };

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        const next = prev === BANNERS.length - 1 ? 0 : prev + 1;
        bannerListRef.current?.scrollToIndex({
          index: next,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onBannerScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 36)
    );
    setActiveBanner(index);
  };

  const renderBanner = ({ item }) => (
    <View style={{ width: SCREEN_WIDTH - 36 }}>
      <BannerCard
        item={item}
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );

  const getServiceTarget = (service) => {
    const memberScreenMap = {
      acRepair: "ServiceMembers",
      carpenter: "ServiceMembers",
      carWash: "ServiceMembers",
      deepCleaning: "ServiceMembers",
      homeChef: "ServiceMembers",
      kitchen: "ServiceMembers",
      cleaning: "ServiceMembers",
      gardening: "ServiceMembers",
      laundry: "ServiceMembers",
      moving: "ServiceMembers",
      painting: "ServiceMembers",
      pestControl: "ServiceMembers",
      roofing: "ServiceMembers",
      salonAtHome: "ServiceMembers",
      salon: "ServiceMembers",
      sewageTreatment: "ServiceMembers",
      tiling: "ServiceMembers",
      tutor: "ServiceMembers",
      waterTankCleaning: "ServiceMembers",
    };

    const memberScreenParams = {
      acRepair: { serviceType: "ACRepair", service },
      carpenter: { serviceType: "Carpenter", service },
      carWash: { serviceType: "CarWash", service },
      deepCleaning: { serviceType: "Cleaning", service },
      homeChef: { serviceType: "Cook", service },
      kitchen: { serviceType: "Cook", service },
      cleaning: { serviceType: "Cleaning", service },
      gardening: { serviceType: "Gardening", service },
      laundry: { serviceType: "Laundry", service },
      moving: { serviceType: "Shifting", service },
      painting: { serviceType: "Painting", service },
      pestControl: { serviceType: "PestControl", service },
      roofing: { serviceType: "Roofing", service },
      salonAtHome: { serviceType: "Salon", service },
      salon: { serviceType: "Salon", service },
      sewageTreatment: { serviceType: "Sewage", service },
      tiling: { serviceType: "Tiling", service },
      tutor: { serviceType: "Tuition", service },
      waterTankCleaning: { serviceType: "WaterTank", service },
    };

    if (service.id === "homeNurse") {
      return {
        routeName: "MedicalWorkersList",
        params: { category: "HomeNurse", icon: "💙", service },
      };
    }

    const workerListRouteMap = {
      handyman: { routeName: "WorkersCategoryList", params: { category: "Handyman", icon: "🛠️", service } },
      furnitureAssembly: { routeName: "WorkersCategoryList", params: { category: "FurnitureAssembly", icon: "🪑", service } },
      homeRenovation: { routeName: "WorkersCategoryList", params: { category: "HomeRenovation", icon: "🏡", service } },
      electrician: { routeName: "MedicalWorkersList", params: { category: "Electrician", icon: "💡", service } },
      maid: { routeName: "MedicalWorkersList", params: { category: "Maid", icon: "🧹", service } },
      poolCleaning: { routeName: "MedicalWorkersList", params: { category: "PoolCleaning", icon: "🏊", service } },
      doctor: { routeName: "MedicalWorkersList", params: { category: "Doctor", icon: "🩺", service } },
      "home-nurse": { routeName: "MedicalWorkersList", params: { category: "HomeNurse", icon: "💙", service } },
      driver: { routeName: "WorkersCategoryList", params: { category: "Driver", icon: "🚗", service } },
      plumber: { routeName: "WorkersCategoryList", params: { category: "Plumber", icon: "🔧", service } },
      repairs: { routeName: "WorkersCategoryList", params: { category: "Repairs", icon: "🛠️", service } },
      security: { routeName: "WorkersCategoryList", params: { category: "SecurityGuard", icon: "🔒", service } },
    };

    if (memberScreenMap[service.id]) {
      return {
        routeName: memberScreenMap[service.id],
        params: memberScreenParams[service.id],
      };
    }

    if (workerListRouteMap[service.id]) {
      return workerListRouteMap[service.id];
    }

    return {
      routeName: "WorkersList",
      params: { service },
    };
  };

  const handleServicePress = (service) => {
    const target = getServiceTarget(service);

    if (
      target.routeName === "ServiceMembers" ||
      service.id === "handyman" ||
      service.id === "homeRenovation" ||
      service.id === "furnitureAssembly" ||
      service.id === "doctor" ||
      service.id === "homeNurse" ||
      service.id === "electrician" ||
      service.id === "maid" ||
      service.id === "poolCleaning" ||
      service.id === "driver" ||
      service.id === "plumber" ||
      service.id === "repairs" ||
      service.id === "security"
    ) {
      navigation.navigate(target.routeName, target.params);
      return;
    }

    navigation.navigate("SignIn", {
      redirectRouteName: target.routeName,
      redirectParams: target.params,
    });
  };

  const renderService = ({ item }) => (
    <ServiceCard
      service={item}
      onPress={() => handleServicePress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Drawer Overlay */}
      <Modal visible={drawerOpen} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setDrawerOpen(false)} />

        <Animated.View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerBadge}>{SERVICES.length}+ Services</Text>
            <Text style={styles.drawerSubtitle}>Browse by category</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <DrawerItem
                key={cat.id}
                item={cat}
                active={activeCategory === cat.id}
                onPress={() => handleCategorySelect(cat.id)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>

      {/* Main */}
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setDrawerOpen(true)}
              activeOpacity={0.8}
            >
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLineShort} />
            </TouchableOpacity>

            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <Text style={styles.locationText}>📍 Gachibowli, Hyderabad ▾</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
            <Text style={styles.bellText}>🔔</Text>
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchInner}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search services..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
              <Text style={styles.searchBtnText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner Section */}
          <View style={styles.bannerSection}>
            <FlatList
              ref={bannerListRef}
              data={BANNERS}
              renderItem={renderBanner}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onBannerScrollEnd}
              snapToInterval={SCREEN_WIDTH - 36}
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: SCREEN_WIDTH - 36,
                offset: (SCREEN_WIDTH - 36) * index,
                index,
              })}
            />

            <View style={styles.dotsRow}>
              {BANNERS.map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setActiveBanner(idx);
                    bannerListRef.current?.scrollToIndex({
                      index: idx,
                      animated: true,
                    });
                  }}
                  activeOpacity={0.8}
                  style={[styles.dot, activeBanner === idx && styles.dotActive]}
                />
              ))}
            </View>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{activeLabel}</Text>
            <Text style={styles.sectionCount}>{filteredServices.length}</Text>
          </View>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <FlatList
              data={filteredServices}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.grid}
              columnWrapperStyle={styles.columnWrap}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>No services found</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => setActiveNav(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text
                style={
                  activeNav === item.id
                    ? styles.navLabelActive
                    : styles.navLabel
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const PURPLE = "#7c3aed";
const LIGHT_PURPLE = "#f3e8ff";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f8fc",
  },
  root: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#f7f8fc",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#fff",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 16,
  },
  drawerHeader: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  drawerBadge: {
    alignSelf: "flex-start",
    backgroundColor: LIGHT_PURPLE,
    color: PURPLE,
    fontWeight: "800",
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },
  drawerSubtitle: {
    fontSize: 11,
    color: "#888",
    fontWeight: "600",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  drawerItemActive: {
    borderLeftColor: PURPLE,
    backgroundColor: LIGHT_PURPLE,
  },
  drawerItemEmoji: {
    fontSize: 18,
    width: 24,
    textAlign: "center",
  },
  drawerItemText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#222",
  },
  drawerItemTextActive: {
    color: PURPLE,
  },

  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: "#333",
    borderRadius: 2,
  },
  menuLineShort: {
    width: 12,
    height: 2,
    backgroundColor: PURPLE,
    borderRadius: 2,
  },
  locationLabel: {
    fontSize: 10,
    color: "#888",
    fontWeight: "600",
    lineHeight: 12,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111",
    lineHeight: 20,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  bellText: {
    fontSize: 16,
  },
  bellDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 2,
    borderColor: "#fff",
  },

  searchWrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    borderRadius: 14,
    paddingLeft: 14,
    paddingRight: 6,
    gap: 8,
    height: 46,
  },
  searchIcon: {
    fontSize: 15,
    color: "#bbb",
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#444",
  },
  searchBtn: {
    width: 34,
    height: 34,
    backgroundColor: PURPLE,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtnText: {
    fontSize: 15,
  },

  bannerSection: {
    paddingTop: 14,
    paddingHorizontal: 18,
  },
  bannerCard: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    minHeight: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  bannerAccentCircle: {
    position: "absolute",
    right: -18,
    top: -18,
    width: 110,
    height: 110,
    borderRadius: 55,
    opacity: 0.45,
  },
  bannerLeft: {
    flex: 1,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    lineHeight: 26,
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 1,
  },
  bannerDetail: {
    fontSize: 12,
    color: "#555",
    marginBottom: 14,
  },
  bookBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  bannerEmoji: {
    fontSize: 72,
    marginRight: -4,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ddd",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#16a34a",
  },

  sectionHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },

  grid: {
    paddingHorizontal: 14,
  },
  columnWrap: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serviceTouchable: {
    width: "31.5%",
  },
  card: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 1,
  },
  cardIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardName: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    color: "#2d2d2d",
    lineHeight: 16,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#aaa",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    paddingTop: 2,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 0.2,
  },
  navLabelActive: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16a34a",
    letterSpacing: 0.2,
  },
});
