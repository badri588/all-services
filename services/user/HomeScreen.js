// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   TextInput,
// } from "react-native";
// import Earnings from "./Earnings";
// import MyJobs from "./MyJobs";
// import Profile from "./Profile";

// const services = [
//   { id: "cleaning", name: "Cleaning", icon: "🧽", bg: "#E6FFFB", color: "#0F766E" },
//   { id: "electrician", name: "Electrician", icon: "💡", bg: "#FEF9C3", color: "#CA8A04" },
//   { id: "plumber", name: "Plumber", icon: "🔧", bg: "#FFCCCB", color: "#E62E2E" },
//   { id: "ac", name: "AC Repair", icon: "❄️", bg: "#E0F2FE", color: "#0891B2" },
//   { id: "salon", name: "Salon", icon: "💇", bg: "#FCE7F3", color: "#DB2777" },
//   { id: "gardening", name: "Gardening", icon: "🌱", bg: "#D1FAE5", color: "#10B981" },
//   { id: "beautician", name: "Beautician", icon: "💄", bg: "#FCE7F3", color: "#BE185D" },
//   { id: "massage", name: "Massage", icon: "💆", bg: "#EDE9FE", color: "#6D28D9" },
//   { id: "labtest", name: "Lab Test", icon: "🧪", bg: "#ECFDF5", color: "#059669" },
// ];

// const bookings = [
//   {
//     id: "1",
//     service: "Deep Cleaning",
//     date: "Today",
//     time: "3:00 PM",
//     amount: "₹899",
//     status: "Confirmed",
//     icon: "🧽",
//   },
//   {
//     id: "2",
//     service: "Electrician",
//     date: "Tomorrow",
//     time: "11:30 AM",
//     amount: "₹299",
//     status: "Pending",
//     icon: "💡",
//   },
//   {
//     id: "3",
//     service: "AC Repair",
//     date: "26 Apr",
//     time: "5:00 PM",
//     amount: "₹499",
//     status: "Assigned",
//     icon: "❄️",
//   },
// ];

// export default function ProviderTabs({ navigation }) {
//   const [activeTab, setActiveTab] = useState("home");
//   const [search, setSearch] = useState("");

//   const filteredServices = services.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderHome = () => (
//     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
//       <View style={styles.banner}>
//         <View>
//           <Text style={styles.bannerTitle}>Looking for services?</Text>
//           <Text style={styles.bannerSub}>Book trusted home services near you</Text>
//         </View>

//         <View style={styles.offerBadge}>
//           <Text style={styles.offerText}>20% OFF</Text>
//         </View>
//       </View>

//       <View style={styles.sectionRow}>
//         <Text style={styles.sectionTitle}>Popular Services</Text>
//         <TouchableOpacity>
//           <Text style={styles.viewAll}>View all</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.grid}>
//         {filteredServices.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={[styles.serviceCard, { backgroundColor: item.bg }]}
//           >
//             <Text style={styles.serviceIcon}>{item.icon}</Text>
//             <Text style={[styles.serviceText, { color: item.color }]}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.sectionRow}>
//         <Text style={styles.sectionTitle}>Recent Booking</Text>
//         <TouchableOpacity onPress={() => setActiveTab("bookings")}>
//           <Text style={styles.viewAll}>See all</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.recentCard}>
//         <View style={styles.recentLeft}>
//           <View style={styles.recentIcon}>
//             <Text style={styles.recentIconText}>🧽</Text>
//           </View>
//           <View>
//             <Text style={styles.recentTitle}>Deep Cleaning</Text>
//             <Text style={styles.recentSub}>Today, 3:00 PM</Text>
//           </View>
//         </View>

//         <View style={styles.statusBadge}>
//           <Text style={styles.statusText}>Confirmed</Text>
//         </View>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderBookings = () => (
//     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
//       <Text style={styles.pageTitle}>My Bookings</Text>
//       <Text style={styles.pageSub}>Track your service bookings</Text>

//       {bookings.map((item) => (
//         <TouchableOpacity key={item.id} style={styles.bookingCard}>
//           <View style={styles.bookingLeft}>
//             <View style={styles.bookingIcon}>
//               <Text style={styles.bookingIconText}>{item.icon}</Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.bookingTitle}>{item.service}</Text>
//               <Text style={styles.bookingDate}>
//                 {item.date}, {item.time}
//               </Text>
//               <Text style={styles.bookingAmount}>{item.amount}</Text>
//             </View>
//           </View>

//           <View
//             style={[
//               styles.bookingStatus,
//               item.status === "Confirmed"
//                 ? styles.confirmed
//                 : item.status === "Pending"
//                 ? styles.pending
//                 : styles.assigned,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.bookingStatusText,
//                 item.status === "Confirmed"
//                   ? styles.confirmedText
//                   : item.status === "Pending"
//                   ? styles.pendingText
//                   : styles.assignedText,
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );

//   const renderWallet = () => (
//     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
//       <Text style={styles.pageTitle}>My Wallet</Text>
//       <Text style={styles.pageSub}>Manage balance, rewards and payments</Text>

//       <View style={styles.walletCard}>
//         <Text style={styles.walletLabel}>Available Balance</Text>
//         <Text style={styles.walletAmount}>₹2,450</Text>
//         <Text style={styles.walletSmall}>Rewards + refunds + cashback</Text>

//         <TouchableOpacity style={styles.walletBtn}>
//           <Text style={styles.walletBtnText}>Add Money</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.sectionTitle}>Recent Transactions</Text>

//       <View style={styles.transactionCard}>
//         <View>
//           <Text style={styles.transactionTitle}>Deep Cleaning Cashback</Text>
//           <Text style={styles.transactionDate}>Today</Text>
//         </View>
//         <Text style={styles.credit}>+ ₹120</Text>
//       </View>

//       <View style={styles.transactionCard}>
//         <View>
//           <Text style={styles.transactionTitle}>AC Repair Payment</Text>
//           <Text style={styles.transactionDate}>Yesterday</Text>
//         </View>
//         <Text style={styles.debit}>- ₹499</Text>
//       </View>

//       <View style={styles.transactionCard}>
//         <View>
//           <Text style={styles.transactionTitle}>Wallet Top-up</Text>
//           <Text style={styles.transactionDate}>22 Apr</Text>
//         </View>
//         <Text style={styles.credit}>+ ₹1,000</Text>
//       </View>
//     </ScrollView>
//   );

//   const renderProfile = () => (
//     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
//       <Text style={styles.pageTitle}>My Profile</Text>
//       <Text style={styles.pageSub}>Manage your account details</Text>

//       <View style={styles.profileCard}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>RK</Text>
//         </View>

//         <Text style={styles.profileName}>Rajesh Kumar</Text>
//         <Text style={styles.profileMobile}>+91 98765 43210</Text>
//         <Text style={styles.profileEmail}>rajesh@email.com</Text>
//       </View>

//       <TouchableOpacity style={styles.profileOption}>
//         <Text style={styles.optionIcon}>👤</Text>
//         <Text style={styles.optionText}>Edit Profile</Text>
//         <Text style={styles.optionArrow}>›</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.profileOption}>
//         <Text style={styles.optionIcon}>📍</Text>
//         <Text style={styles.optionText}>Saved Addresses</Text>
//         <Text style={styles.optionArrow}>›</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.profileOption}>
//         <Text style={styles.optionIcon}>💳</Text>
//         <Text style={styles.optionText}>Payment Methods</Text>
//         <Text style={styles.optionArrow}>›</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.profileOption}>
//         <Text style={styles.optionIcon}>🔔</Text>
//         <Text style={styles.optionText}>Notifications</Text>
//         <Text style={styles.optionArrow}>›</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation?.goBack()}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderScreen = () => {
//     if (activeTab === "home") return renderHome();
//     if (activeTab === "bookings") return <MyJobs navigation={navigation} />;
//     if (activeTab === "wallet") return <Earnings navigation={navigation} />;
//     return <Profile navigation={navigation} />;
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

//       {activeTab === "home" && (
//         <View style={styles.header}>
//           <Text style={styles.locationLabel}>📍 Current location</Text>
//           <Text style={styles.locationText}>Banjara Hills, Hyderabad</Text>

//           <View style={styles.searchBox}>
//             <Text style={styles.searchIcon}>🔍</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search for a service..."
//               placeholderTextColor="#9CA3AF"
//               value={search}
//               onChangeText={setSearch}
//             />
//           </View>
//         </View>
//       )}

//       {renderScreen()}

//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
//           <Text style={styles.navIcon}>{activeTab === "home" ? "🏠" : "⌂"}</Text>
//           <Text style={[styles.navText, activeTab === "home" && styles.navActive]}>
//             Home
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("bookings")}>
//           <Text style={styles.navIcon}>📋</Text>
//           <Text style={[styles.navText, activeTab === "bookings" && styles.navActive]}>
//             Bookings
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("wallet")}>
//           <Text style={styles.navIcon}>👛</Text>
//           <Text style={[styles.navText, activeTab === "wallet" && styles.navActive]}>
//             Wallet
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("profile")}>
//           <Text style={styles.navIcon}>👤</Text>
//           <Text style={[styles.navText, activeTab === "profile" && styles.navActive]}>
//             Profile
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },

//   header: {
//     backgroundColor: "#1a1a2e",
//     paddingHorizontal: 20,
//     paddingTop: 18,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },

//   locationLabel: {
//     color: "#A5B4FC",
//     fontSize: 13,
//     fontWeight: "700",
//   },

//   locationText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "900",
//     marginTop: 3,
//   },

//   searchBox: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     marginTop: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   searchIcon: {
//     fontSize: 16,
//     marginRight: 8,
//   },

//   searchInput: {
//     flex: 1,
//     paddingVertical: 13,
//     color: "#111827",
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   content: {
//     padding: 18,
//     paddingBottom: 105,
//   },

//   banner: {
//     backgroundColor: "#EEF2FF",
//     borderWidth: 1,
//     borderColor: "#C7D2FE",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   bannerTitle: {
//     color: "#3730A3",
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   bannerSub: {
//     color: "#6366F1",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 4,
//   },

//   offerBadge: {
//     backgroundColor: "#4F46E5",
//     borderRadius: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//   },

//   offerText: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "900",
//   },

//   sectionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 13,
//   },

//   sectionTitle: {
//     color: "#111827",
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },

//   viewAll: {
//     color: "#4F46E5",
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginBottom: 22,
//   },

//   serviceCard: {
//     width: "30.8%",
//     borderRadius: 16,
//     paddingVertical: 15,
//     paddingHorizontal: 6,
//     alignItems: "center",
//   },

//   serviceIcon: {
//     fontSize: 28,
//     marginBottom: 6,
//   },

//   serviceText: {
//     fontSize: 12,
//     fontWeight: "900",
//     textAlign: "center",
//   },

//   recentCard: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 16,
//     padding: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   recentLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   recentIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#EEF2FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   recentIconText: {
//     fontSize: 24,
//   },

//   recentTitle: {
//     color: "#111827",
//     fontWeight: "900",
//     fontSize: 14,
//   },

//   recentSub: {
//     color: "#6B7280",
//     fontWeight: "600",
//     marginTop: 4,
//   },

//   statusBadge: {
//     backgroundColor: "#DCFCE7",
//     borderRadius: 10,
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//   },

//   statusText: {
//     color: "#15803D",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   pageTitle: {
//     color: "#111827",
//     fontSize: 25,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   pageSub: {
//     color: "#6B7280",
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 4,
//     marginBottom: 20,
//   },

//   bookingCard: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 16,
//     padding: 15,
//     marginBottom: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   bookingLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },

//   bookingIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#EEF2FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   bookingIconText: {
//     fontSize: 24,
//   },

//   bookingTitle: {
//     color: "#111827",
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   bookingDate: {
//     color: "#6B7280",
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 4,
//   },

//   bookingAmount: {
//     color: "#1a1a2e",
//     fontSize: 13,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   bookingStatus: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },

//   bookingStatusText: {
//     fontSize: 12,
//     fontWeight: "900",
//   },

//   confirmed: {
//     backgroundColor: "#DCFCE7",
//   },

//   confirmedText: {
//     color: "#15803D",
//   },

//   pending: {
//     backgroundColor: "#FEF9C3",
//   },

//   pendingText: {
//     color: "#CA8A04",
//   },

//   assigned: {
//     backgroundColor: "#E0F2FE",
//   },

//   assignedText: {
//     color: "#0891B2",
//   },

//   walletCard: {
//     backgroundColor: "#1a1a2e",
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 22,
//   },

//   walletLabel: {
//     color: "#C7D2FE",
//     fontSize: 13,
//     fontWeight: "700",
//   },

//   walletAmount: {
//     color: "#FFFFFF",
//     fontSize: 34,
//     fontWeight: "900",
//     marginTop: 8,
//   },

//   walletSmall: {
//     color: "#A5B4FC",
//     fontSize: 13,
//     marginTop: 5,
//     fontWeight: "600",
//   },

//   walletBtn: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 13,
//     paddingVertical: 13,
//     alignItems: "center",
//     marginTop: 18,
//   },

//   walletBtnText: {
//     color: "#1a1a2e",
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   transactionCard: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   transactionTitle: {
//     color: "#111827",
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   transactionDate: {
//     color: "#6B7280",
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   credit: {
//     color: "#16A34A",
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   debit: {
//     color: "#DC2626",
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   profileCard: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 18,
//   },

//   avatar: {
//     width: 78,
//     height: 78,
//     borderRadius: 39,
//     backgroundColor: "#EEF2FF",
//     borderWidth: 1,
//     borderColor: "#A5B4FC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 13,
//   },

//   avatarText: {
//     color: "#3730A3",
//     fontSize: 24,
//     fontWeight: "900",
//   },

//   profileName: {
//     color: "#111827",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   profileMobile: {
//     color: "#6B7280",
//     fontSize: 13,
//     fontWeight: "700",
//     marginTop: 5,
//   },

//   profileEmail: {
//     color: "#6B7280",
//     fontSize: 13,
//     fontWeight: "700",
//     marginTop: 3,
//   },

//   profileOption: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 11,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   optionIcon: {
//     fontSize: 21,
//     marginRight: 12,
//   },

//   optionText: {
//     flex: 1,
//     color: "#111827",
//     fontSize: 15,
//     fontWeight: "800",
//   },

//   optionArrow: {
//     color: "#9CA3AF",
//     fontSize: 28,
//     fontWeight: "600",
//   },

//   logoutBtn: {
//     backgroundColor: "#FEE2E2",
//     borderRadius: 14,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginTop: 8,
//   },

//   logoutText: {
//     color: "#DC2626",
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   bottomNav: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#FFFFFF",
//     borderTopWidth: 1,
//     borderTopColor: "#E5E7EB",
//     flexDirection: "row",
//     paddingTop: 9,
//     paddingBottom: 13,
//   },

//   navItem: {
//     flex: 1,
//     alignItems: "center",
//   },

//   navIcon: {
//     fontSize: 22,
//   },

//   navText: {
//     color: "#6B7280",
//     fontSize: 12,
//     fontWeight: "700",
//     marginTop: 3,
//   },

//   navActive: {
//     color: "#4F46E5",
//     fontWeight: "900",
//   },
// });



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// const ProviderTabs = () => {
//   const [isOnline, setIsOnline] = useState(true);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerLeft}>
//             <Text style={styles.greeting}>
//               Hi, Rajesh <Text style={styles.wave}>👋</Text>
//             </Text>
//             <View style={styles.onlineBadge}>
//               <View style={styles.onlineDot} />
//               <Text style={styles.onlineBadgeText}>Online</Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.bellButton}>
//             <Text style={styles.bellIcon}>🔔</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Earnings Card */}
//         <View style={styles.earningsCard}>
//           <View style={styles.earningsContent}>
//             <Text style={styles.earningsLabel}>Today's Earnings</Text>
//             <Text style={styles.earningsAmount}>₹1,250</Text>
//             <TouchableOpacity style={styles.viewEarningsBtn}>
//               <Text style={styles.viewEarningsBtnText}>View Earnings</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.walletEmoji}>
//             <Text style={{ fontSize: 64 }}>👜</Text>
//             <Text style={{ fontSize: 28, marginTop: -10 }}>💰</Text>
//           </View>
//         </View>

//         {/* Online Status Toggle */}
//         <View style={styles.onlineToggleCard}>
//           <View style={styles.onlineToggleLeft}>
//             <Text style={styles.onlineToggleIcon}>🕐</Text>
//             <View>
//               <Text style={styles.onlineToggleTitle}>You are Online</Text>
//               <Text style={styles.onlineToggleSubtitle}>
//                 You will receive new booking requests
//               </Text>
//             </View>
//           </View>
//           <Switch
//             value={isOnline}
//             onValueChange={setIsOnline}
//             trackColor={{ false: '#ccc', true: '#2e7d32' }}
//             thumbColor="#fff"
//           />
//         </View>

//         {/* Today's Overview */}
//         <Text style={styles.sectionTitle}>Today's Overview</Text>
//         <View style={styles.overviewRow}>
//           <View style={styles.overviewCard}>
//             <Text style={styles.overviewIcon}>📋</Text>
//             <Text style={styles.overviewValue}>4</Text>
//             <Text style={styles.overviewLabel}>Bookings</Text>
//           </View>
//           <View style={styles.overviewCard}>
//             <Text style={styles.overviewIcon}>✅</Text>
//             <Text style={styles.overviewValue}>3</Text>
//             <Text style={styles.overviewLabel}>Completed</Text>
//           </View>
//           <View style={styles.overviewCard}>
//             <Text style={styles.overviewIcon}>⭐</Text>
//             <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>4.8</Text>
//             <Text style={styles.overviewLabel}>Rating</Text>
//           </View>
//         </View>

//         {/* Current Booking */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Current Booking</Text>
//           <TouchableOpacity>
//             <Text style={styles.viewAll}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.bookingCard}>
//           <View style={styles.bookingHeader}>
//             <Text style={styles.bookingTitle}>Deep Cleaning</Text>
//             <View style={styles.inProgressBadge}>
//               <Text style={styles.inProgressText}>In Progress</Text>
//             </View>
//           </View>
//           <View style={styles.bookingRow}>
//             <Text style={styles.bookingIcon}>👤</Text>
//             <Text style={styles.bookingInfo}>Priya Sharma</Text>
//           </View>
//           <View style={styles.bookingRow}>
//             <Text style={styles.bookingIcon}>📍</Text>
//             <Text style={styles.bookingInfo}>Banjara Hills, Hyd</Text>
//           </View>
//           <View style={styles.arrivingRow}>
//             <Text style={styles.arrivingLabel}>Arriving in</Text>
//             <Text style={styles.arrivingTime}>8 mins</Text>
//           </View>
//           <TouchableOpacity style={styles.openDetailsBtn}>
//             <Text style={styles.openDetailsBtnText}>Open Details</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {[
//           { icon: '🏠', label: 'Home', active: true },
//           { icon: '📅', label: 'Bookings', active: false },
//           { icon: '💳', label: 'Earnings', active: false },
//           { icon: '👤', label: 'Profile', active: false },
//         ].map((tab) => (
//           <TouchableOpacity key={tab.label} style={styles.navItem}>
//             <Text style={styles.navIcon}>{tab.icon}</Text>
//             <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// const GREEN = '#2e7d32';
// const LIGHT_GREEN = '#e8f5e9';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//     marginBottom: 16,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111',
//   },
//   wave: {
//     fontSize: 20,
//   },
//   onlineBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: LIGHT_GREEN,
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     gap: 4,
//   },
//   onlineDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: GREEN,
//   },
//   onlineBadgeText: {
//     color: GREEN,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bellButton: {
//     padding: 4,
//   },
//   bellIcon: {
//     fontSize: 22,
//   },

//   // Earnings Card
//   earningsCard: {
//     backgroundColor: GREEN,
//     borderRadius: 16,
//     padding: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   earningsContent: {
//     flex: 1,
//   },
//   earningsLabel: {
//     color: '#c8e6c9',
//     fontSize: 13,
//     marginBottom: 4,
//   },
//   earningsAmount: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: '800',
//     marginBottom: 14,
//   },
//   viewEarningsBtn: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     alignSelf: 'flex-start',
//   },
//   viewEarningsBtnText: {
//     color: GREEN,
//     fontWeight: '600',
//     fontSize: 13,
//   },
//   walletEmoji: {
//     alignItems: 'center',
//     marginLeft: 8,
//   },

//   // Online Toggle
//   onlineToggleCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   onlineToggleLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     flex: 1,
//   },
//   onlineToggleIcon: {
//     fontSize: 22,
//   },
//   onlineToggleTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111',
//   },
//   onlineToggleSubtitle: {
//     fontSize: 11,
//     color: '#888',
//     marginTop: 2,
//   },

//   // Section
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 12,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     marginTop: 4,
//   },
//   viewAll: {
//     color: GREEN,
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   // Overview
//   overviewRow: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 20,
//   },
//   overviewCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 14,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   overviewIcon: {
//     fontSize: 20,
//     marginBottom: 4,
//   },
//   overviewValue: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#111',
//   },
//   overviewLabel: {
//     fontSize: 11,
//     color: '#888',
//     marginTop: 2,
//   },

//   // Booking Card
//   bookingCard: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   bookingTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111',
//   },
//   inProgressBadge: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   inProgressText: {
//     color: GREEN,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bookingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     marginBottom: 6,
//   },
//   bookingIcon: {
//     fontSize: 14,
//   },
//   bookingInfo: {
//     fontSize: 13,
//     color: '#555',
//   },
//   arrivingRow: {
//     alignItems: 'flex-end',
//     marginBottom: 14,
//     marginTop: 4,
//   },
//   arrivingLabel: {
//     fontSize: 11,
//     color: '#888',
//   },
//   arrivingTime: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#111',
//   },
//   openDetailsBtn: {
//     backgroundColor: GREEN,
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   openDetailsBtnText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 15,
//   },

//   // Bottom Nav
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     paddingVertical: 8,
//     paddingBottom: 12,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     gap: 2,
//   },
//   navIcon: {
//     fontSize: 22,
//   },
//   navLabel: {
//     fontSize: 11,
//     color: '#888',
//   },
//   navLabelActive: {
//     color: GREEN,
//     fontWeight: '600',
//   },
// });

// export default ProviderTabs;






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
