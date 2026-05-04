import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import BottomNavBar from "../components/BottomNavBar";

const COLORS = {
  bg: "#FFFFFF",
  green: "#16A05D",
  purple: "#6C43D8",
  text: "#111827",
  muted: "#6B7280",
  border: "#EEF0F4",
  red: "#EF4444",
};

export default function MyProfileScreen({ navigation }) {
  const accountItems = [
    {
      icon: "user",
      title: "Personal Information",
      route: "PersonalInformation",
    },
    {
      icon: "map-pin",
      title: "Addresses",
      route: "Addresses",
    },
    {
      icon: "credit-card",
      title: "Payment Methods",
      route: "PaymentMethods",
    },
    {
      icon: "gift",
      title: "Refer & Earn",
      route: "ReferEarn",
    },
    {
      icon: "bell",
      title: "Notification Settings",
      route: "NotificationSettings",
    },
    {
      icon: "help-circle",
      title: "Help & Support",
      route: "HelpSupport",
    },
  ];

  const appItems = [
    {
      icon: "globe",
      title: "Language",
      value: "English",
      route: "Language",
    },
    {
      icon: "sun",
      title: "Theme",
      value: "Light",
      route: "Theme",
    },
  ];

  const handleNavigate = (route) => {
    if (navigation && route) {
      navigation.navigate(route);
    }
  };

  const handleLogout = () => {
    if (navigation) {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileHero}>
          <View style={styles.profileTop}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarEmoji}>👨🏻‍💼</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>Rohan Kumar</Text>
              <Text style={styles.profilePhone}>+91 98765 43210</Text>
              <Text style={styles.profileEmail}>rohan.kumar@email.com</Text>
            </View>

            <Feather name="chevron-right" size={23} color={COLORS.text} />
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => handleNavigate("EditProfile")}
          >
            <Feather name="edit-2" size={16} color="#fff" />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>My Account</Text>

        <View style={styles.listCard}>
          {accountItems.map((item, index) => (
            <ProfileListItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              showDivider={index !== accountItems.length - 1}
              onPress={() => handleNavigate(item.route)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>App Settings</Text>

        <View style={styles.listCard}>
          {appItems.map((item) => (
            <ProfileListItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              value={item.value}
              showDivider={true}
              onPress={() => handleNavigate(item.route)}
            />
          ))}

          <TouchableOpacity style={styles.profileItem} onPress={handleLogout}>
            <Feather name="log-out" size={22} color={COLORS.red} />
            <Text style={[styles.profileItemTitle, { color: COLORS.red }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 25 }} />
      </ScrollView>

      <BottomNavBar activeId="profile" navigation={navigation} />
    </SafeAreaView>
  );
}

function ProfileListItem({ icon, title, value, showDivider, onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.profileItem} onPress={onPress}>
        <Feather name={icon} size={22} color={COLORS.muted} />

        <Text style={styles.profileItemTitle}>{title}</Text>

        {value ? <Text style={styles.profileItemValue}>{value}</Text> : null}

        <Feather name="chevron-right" size={22} color={COLORS.muted} />
      </TouchableOpacity>

      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },

  header: {
    height: 72,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },

  bellBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 105,
  },

  profileHero: {
    backgroundColor: "#F4F0FF",
    borderRadius: 18,
    padding: 18,
    marginTop: 4,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileAvatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#D7E4EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
    overflow: "hidden",
  },

  avatarEmoji: {
    fontSize: 68,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },

  profilePhone: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 9,
  },

  profileEmail: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 5,
  },

  editBtn: {
    marginTop: 18,
    backgroundColor: COLORS.purple,
    alignSelf: "flex-end",
    width: 175,
    height: 44,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  editBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 28,
    marginBottom: 12,
  },

  listCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  profileItem: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
  },

  profileItemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: 16,
  },

  profileItemValue: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: "600",
    marginRight: 10,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 38,
  },
});
