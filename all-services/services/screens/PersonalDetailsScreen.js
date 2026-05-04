import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function PersonalDetailsScreen({ navigation }) {
  const [role, setRole] = useState("User");
  const [fullName, setFullName] = useState("Raju");
  const [mobile, setMobile] = useState("9876543210");
  const [societyName, setSocietyName] = useState("Karimnagar Colony");
  const [flatNo, setFlatNo] = useState("A-203");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#11213d" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Account</Text>
          <Text style={styles.cardSubtitle}>
            Update the same details you used while signing up.
          </Text>

          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "Admin" ? styles.activeRoleDark : styles.inactiveRole,
              ]}
              onPress={() => setRole("Admin")}
            >
              <MaterialIcons
                name="verified-user"
                size={22}
                color={role === "Admin" ? "#fff" : "#d27e1f"}
                style={styles.roleIcon}
              />
              <Text
                style={[
                  styles.roleText,
                  role === "Admin" ? styles.activeRoleText : styles.inactiveRoleText,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "User" ? styles.activeRoleGold : styles.inactiveRole,
              ]}
              onPress={() => setRole("User")}
            >
              <Feather
                name="user"
                size={22}
                color={role === "User" ? "#11213d" : "#d27e1f"}
                style={styles.roleIcon}
              />
              <Text
                style={[
                  styles.roleText,
                  role === "User" ? styles.activeGoldRoleText : styles.inactiveRoleText,
                ]}
              >
                User
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={20} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
          </View>

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={20} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>Society Name</Text>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="apartment" size={20} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput style={styles.input} value={societyName} onChangeText={setSocietyName} />
          </View>

          <Text style={styles.label}>Flat / House Number</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="home" size={18} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />
          </View>

          <Text style={styles.label}>Set 5-Digit Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              maxLength={5}
              keyboardType="number-pad"
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor="#b08972"
            />
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="shield" size={20} color="#7c5d4b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              maxLength={5}
              keyboardType="number-pad"
              secureTextEntry
              placeholder="Re-enter password"
              placeholderTextColor="#b08972"
            />
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.reset("Login")}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#11213d" },
  header: {
    backgroundColor: "#11213d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { color: "#fff", fontSize: 22, fontWeight: "700" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  headerSpacer: { width: 36 },
  scroll: { flex: 1, backgroundColor: "#fff7f0" },
  scrollContent: { padding: 16, paddingBottom: 28 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f1d8c7",
    padding: 18,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#7c5d4b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  roleButton: {
    flex: 1,
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  inactiveRole: {
    backgroundColor: "#fff7f0",
    borderColor: "#f1d8c7",
  },
  activeRoleDark: {
    backgroundColor: "#11213d",
    borderColor: "#11213d",
  },
  activeRoleGold: {
    backgroundColor: "#ebcb7a",
    borderColor: "#ebcb7a",
  },
  roleIcon: { marginRight: 8 },
  roleText: { fontSize: 16, fontWeight: "800" },
  activeRoleText: { color: "#fff" },
  activeGoldRoleText: { color: "#11213d" },
  inactiveRoleText: { color: "#7c5d4b" },
  label: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#fff7f0",
    borderWidth: 1,
    borderColor: "#f1d8c7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  inputIcon: {
    marginRight: 12,
    width: 22,
    textAlign: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
    paddingVertical: 12,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: "#e8620a",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  logoutButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: "#11213d",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
  },
});
