import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState("Admin");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/shared image.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentWrap}>
            <View style={styles.topSection}>
              <View style={styles.homeIconCircle}>
                <Ionicons name="home" size={34} color="#E9C978" />
              </View>

              <Text style={styles.appTitle}>Community{"\n"}Connect</Text>
              <Text style={styles.appSubtitle}>Stronger Community, Better Living</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Login</Text>
              <Text style={styles.cardSubtitle}>
                Select role and continue to your dashboard
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
                    color={role === "Admin" ? "#FFFFFF" : "#F0D07D"}
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
                  onPress={() => navigation.navigate("SignIn")}
                >
                  <Feather
                    name="user"
                    size={22}
                    color={role === "User" ? "#0B1220" : "#F0D07D"}
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

              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>

              <Text style={styles.label}>5-Digit Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 5-digit password"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="number-pad"
                  maxLength={5}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.forgotWrap}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.primaryButtonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.bottomText}>
                  Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.98,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(4, 22, 56, 0.64)",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
  contentWrap: {
    width: "100%",
    maxWidth: 460,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  homeIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
  },
  appSubtitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#E7C779",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(67, 76, 95, 0.86)",
    borderRadius: 34,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#D7DCE5",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 20,
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  roleButton: {
    width: "47.5%",
    height: 78,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  inactiveRole: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderColor: "rgba(255,255,255,0.10)",
  },
  activeRoleDark: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderColor: "rgba(255,255,255,0.15)",
  },
  activeRoleGold: {
    backgroundColor: "#EBCB7A",
    borderColor: "#EBCB7A",
  },
  roleIcon: {
    marginRight: 8,
  },
  roleText: {
    fontSize: 17,
    fontWeight: "800",
  },
  activeRoleText: {
    color: "#FFFFFF",
  },
  activeGoldRoleText: {
    color: "#0B1220",
  },
  inactiveRoleText: {
    color: "#FFFFFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    height: 74,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17,
  },
  forgotWrap: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 18,
  },
  forgotText: {
    color: "#EBCB7A",
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    height: 74,
    borderRadius: 24,
    backgroundColor: "#EBCB7A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
    marginTop: 4,
  },
  primaryButtonText: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0C1320",
  },
  bottomText: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
  },
  linkText: {
    color: "#EBCB7A",
    fontWeight: "800",
  },
});

export default LoginScreen;
