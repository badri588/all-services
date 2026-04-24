import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../data/theme";

export default function Profile({ navigation }) {
  const handleLogout = () => {
    navigation?.reset?.("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>RS</Text>
      </View>
      <Text style={styles.title}>Raju Services</Text>
      <Text style={styles.subtitle}>Community provider profile</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>+91 9876543210</Text>
        <Text style={styles.infoLabel}>Primary Skill</Text>
        <Text style={styles.infoValue}>Home Services</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
                                                                                          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginBottom: 18,
  },
  infoCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 14,
  },
  logoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
