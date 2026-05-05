import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home-outline", routeName: "Home" },
  { id: "bookings", label: "Bookings", icon: "calendar-outline", routeName: "MyBookings" },
  { id: "wallet", label: "Wallet", icon: "wallet-outline", routeName: "MyWallet" },
  { id: "profile", label: "Profile", icon: "person-outline", routeName: "MyProfile" },
];

const ACTIVE_COLOR = "#16A05D";
const INACTIVE_COLOR = "#9CA3AF";

export default function BottomNavBar({ activeId, navigation }) {
  const handlePress = (item) => {
    if (item.id === activeId) {
      return;
    }

    navigation?.navigate?.(item.routeName);
  };

  return (
    <View style={styles.bottomNav}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
          >
            <Ionicons name={item.icon} size={22} color={color} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEF0F4",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 12,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 2,
  },

  navLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: INACTIVE_COLOR,
  },

  navLabelActive: {
    color: ACTIVE_COLOR,
  },
});
