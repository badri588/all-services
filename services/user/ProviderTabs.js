import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import Earnings from "./Earnings";
import MyJobs from "./MyJobs";
import Profile from "./Profile";

const services = [
  { id: "cleaning", name: "Cleaning", icon: "🧽", bg: "#E6FFFB", color: "#0F766E" },
  { id: "electrician", name: "Electrician", icon: "💡", bg: "#FEF9C3", color: "#CA8A04" },
  { id: "plumber", name: "Plumber", icon: "🔧", bg: "#FFCCCB", color: "#E62E2E" },
  { id: "ac", name: "AC Repair", icon: "❄️", bg: "#E0F2FE", color: "#0891B2" },
  { id: "salon", name: "Salon", icon: "💇", bg: "#FCE7F3", color: "#DB2777" },
  { id: "gardening", name: "Gardening", icon: "🌱", bg: "#D1FAE5", color: "#10B981" },
  { id: "beautician", name: "Beautician", icon: "💄", bg: "#FCE7F3", color: "#BE185D" },
  { id: "massage", name: "Massage", icon: "💆", bg: "#EDE9FE", color: "#6D28D9" },
  { id: "labtest", name: "Lab Test", icon: "🧪", bg: "#ECFDF5", color: "#059669" },
];

const bookings = [
  {
    id: "1",
    service: "Deep Cleaning",
    date: "Today",
    time: "3:00 PM",
    amount: "₹899",
    status: "Confirmed",
    icon: "🧽",
  },
  {
    id: "2",
    service: "Electrician",
    date: "Tomorrow",
    time: "11:30 AM",
    amount: "₹299",
    status: "Pending",
    icon: "💡",
  },
  {
    id: "3",
    service: "AC Repair",
    date: "26 Apr",
    time: "5:00 PM",
    amount: "₹499",
    status: "Assigned",
    icon: "❄️",
  },
];

export default function ProviderTabs({ navigation }) {
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Looking for services?</Text>
          <Text style={styles.bannerSub}>Book trusted home services near you</Text>
        </View>

        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>20% OFF</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {filteredServices.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.serviceCard, { backgroundColor: item.bg }]}
          >
            <Text style={styles.serviceIcon}>{item.icon}</Text>
            <Text style={[styles.serviceText, { color: item.color }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Recent Booking</Text>
        <TouchableOpacity onPress={() => setActiveTab("bookings")}>
          <Text style={styles.viewAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recentCard}>
        <View style={styles.recentLeft}>
          <View style={styles.recentIcon}>
            <Text style={styles.recentIconText}>🧽</Text>
          </View>
          <View>
            <Text style={styles.recentTitle}>Deep Cleaning</Text>
            <Text style={styles.recentSub}>Today, 3:00 PM</Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderBookings = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>My Bookings</Text>
      <Text style={styles.pageSub}>Track your service bookings</Text>

      {bookings.map((item) => (
        <TouchableOpacity key={item.id} style={styles.bookingCard}>
          <View style={styles.bookingLeft}>
            <View style={styles.bookingIcon}>
              <Text style={styles.bookingIconText}>{item.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.bookingTitle}>{item.service}</Text>
              <Text style={styles.bookingDate}>
                {item.date}, {item.time}
              </Text>
              <Text style={styles.bookingAmount}>{item.amount}</Text>
            </View>
          </View>

          <View
            style={[
              styles.bookingStatus,
              item.status === "Confirmed"
                ? styles.confirmed
                : item.status === "Pending"
                ? styles.pending
                : styles.assigned,
            ]}
          >
            <Text
              style={[
                styles.bookingStatusText,
                item.status === "Confirmed"
                  ? styles.confirmedText
                  : item.status === "Pending"
                  ? styles.pendingText
                  : styles.assignedText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderWallet = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>My Wallet</Text>
      <Text style={styles.pageSub}>Manage balance, rewards and payments</Text>

      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Available Balance</Text>
        <Text style={styles.walletAmount}>₹2,450</Text>
        <Text style={styles.walletSmall}>Rewards + refunds + cashback</Text>

        <TouchableOpacity style={styles.walletBtn}>
          <Text style={styles.walletBtnText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <View style={styles.transactionCard}>
        <View>
          <Text style={styles.transactionTitle}>Deep Cleaning Cashback</Text>
          <Text style={styles.transactionDate}>Today</Text>
        </View>
        <Text style={styles.credit}>+ ₹120</Text>
      </View>

      <View style={styles.transactionCard}>
        <View>
          <Text style={styles.transactionTitle}>AC Repair Payment</Text>
          <Text style={styles.transactionDate}>Yesterday</Text>
        </View>
        <Text style={styles.debit}>- ₹499</Text>
      </View>

      <View style={styles.transactionCard}>
        <View>
          <Text style={styles.transactionTitle}>Wallet Top-up</Text>
          <Text style={styles.transactionDate}>22 Apr</Text>
        </View>
        <Text style={styles.credit}>+ ₹1,000</Text>
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>My Profile</Text>
      <Text style={styles.pageSub}>Manage your account details</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RK</Text>
        </View>

        <Text style={styles.profileName}>Rajesh Kumar</Text>
        <Text style={styles.profileMobile}>+91 98765 43210</Text>
        <Text style={styles.profileEmail}>rajesh@email.com</Text>
      </View>

      <TouchableOpacity style={styles.profileOption}>
        <Text style={styles.optionIcon}>👤</Text>
        <Text style={styles.optionText}>Edit Profile</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileOption}>
        <Text style={styles.optionIcon}>📍</Text>
        <Text style={styles.optionText}>Saved Addresses</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileOption}>
        <Text style={styles.optionIcon}>💳</Text>
        <Text style={styles.optionText}>Payment Methods</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileOption}>
        <Text style={styles.optionIcon}>🔔</Text>
        <Text style={styles.optionText}>Notifications</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation?.goBack()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderScreen = () => {
    if (activeTab === "home") return renderHome();
    if (activeTab === "bookings") return <MyJobs navigation={navigation} />;
    if (activeTab === "wallet") return <Earnings navigation={navigation} />;
    return <Profile navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {activeTab === "home" && (
        <View style={styles.header}>
          <Text style={styles.locationLabel}>📍 Current location</Text>
          <Text style={styles.locationText}>Banjara Hills, Hyderabad</Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a service..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
      )}

      {renderScreen()}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
          <Text style={styles.navIcon}>{activeTab === "home" ? "🏠" : "⌂"}</Text>
          <Text style={[styles.navText, activeTab === "home" && styles.navActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("bookings")}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={[styles.navText, activeTab === "bookings" && styles.navActive]}>
            Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("wallet")}>
          <Text style={styles.navIcon}>👛</Text>
          <Text style={[styles.navText, activeTab === "wallet" && styles.navActive]}>
            Wallet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("profile")}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navText, activeTab === "profile" && styles.navActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  locationLabel: {
    color: "#A5B4FC",
    fontSize: 13,
    fontWeight: "700",
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 3,
  },

  searchBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 13,
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },

  content: {
    padding: 18,
    paddingBottom: 105,
  },

  banner: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerTitle: {
    color: "#3730A3",
    fontSize: 16,
    fontWeight: "900",
  },

  bannerSub: {
    color: "#6366F1",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },

  offerBadge: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  offerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },

  viewAll: {
    color: "#4F46E5",
    fontSize: 13,
    fontWeight: "800",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },

  serviceCard: {
    width: "30.8%",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 6,
    alignItems: "center",
  },

  serviceIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  serviceText: {
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },

  recentCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  recentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  recentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  recentIconText: {
    fontSize: 24,
  },

  recentTitle: {
    color: "#111827",
    fontWeight: "900",
    fontSize: 14,
  },

  recentSub: {
    color: "#6B7280",
    fontWeight: "600",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  statusText: {
    color: "#15803D",
    fontWeight: "900",
    fontSize: 12,
  },

  pageTitle: {
    color: "#111827",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 4,
  },

  pageSub: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 20,
  },

  bookingCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 15,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  bookingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  bookingIconText: {
    fontSize: 24,
  },

  bookingTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  bookingDate: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  bookingAmount: {
    color: "#1a1a2e",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },

  bookingStatus: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  bookingStatusText: {
    fontSize: 12,
    fontWeight: "900",
  },

  confirmed: {
    backgroundColor: "#DCFCE7",
  },

  confirmedText: {
    color: "#15803D",
  },

  pending: {
    backgroundColor: "#FEF9C3",
  },

  pendingText: {
    color: "#CA8A04",
  },

  assigned: {
    backgroundColor: "#E0F2FE",
  },

  assignedText: {
    color: "#0891B2",
  },

  walletCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
  },

  walletLabel: {
    color: "#C7D2FE",
    fontSize: 13,
    fontWeight: "700",
  },

  walletAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 8,
  },

  walletSmall: {
    color: "#A5B4FC",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "600",
  },

  walletBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 18,
  },

  walletBtnText: {
    color: "#1a1a2e",
    fontWeight: "900",
    fontSize: 15,
  },

  transactionCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
  },

  transactionDate: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  credit: {
    color: "#16A34A",
    fontSize: 15,
    fontWeight: "900",
  },

  debit: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "900",
  },

  profileCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#A5B4FC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  avatarText: {
    color: "#3730A3",
    fontSize: 24,
    fontWeight: "900",
  },

  profileName: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "900",
  },

  profileMobile: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },

  profileEmail: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
  },

  profileOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 15,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    fontSize: 21,
    marginRight: 12,
  },

  optionText: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },

  optionArrow: {
    color: "#9CA3AF",
    fontSize: 28,
    fontWeight: "600",
  },

  logoutBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "900",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    paddingTop: 9,
    paddingBottom: 13,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
  },

  navIcon: {
    fontSize: 22,
  },

  navText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },

  navActive: {
    color: "#4F46E5",
    fontWeight: "900",
  },
});
