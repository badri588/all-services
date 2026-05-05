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
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { apiRequest } from "../config/api";
import { getStoredProfileExtras, setStoredItem } from "../config/storage";

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [loading, setLoading] = useState(false);

  const normalizeDigits = (value, maxLength) => value.replace(/\D/g, "").slice(0, maxLength);

  const handleLogin = async () => {
    const payload = {
      mobile: normalizeDigits(mobile, 10),
      password: normalizeDigits(password, 5),
    };

    if (!payload.mobile || !payload.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (!/^\d{10}$/.test(payload.mobile)) {
      Alert.alert("Error", "Mobile must be 10 digits");
      return;
    }
    if (!/^\d{5}$/.test(payload.password)) {
      Alert.alert("Error", "Password must be 5 digits");
      return;
    }

    setLoading(true);
    try {
      const json = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (json.success) {
        const storedExtras = await getStoredProfileExtras(json.data);
        const mergedProfile = { ...json.data, ...storedExtras };
        navigation?.setSessionProfile?.(mergedProfile);

        try {
          // Save profile to AsyncStorage so MyProfileScreen can read it
          await setStoredItem("adminProfile", JSON.stringify(mergedProfile));
        } catch (storageError) {
          console.log("Failed to save profile locally", storageError);
        }
        navigation.navigate("Home", { adminProfile: mergedProfile });
      } else {
        Alert.alert("Error", json.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Cannot connect to server. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/shared image.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.topCircle} />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentWrap}>
            <View style={styles.topSection}>
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
                    selectedRole === "Admin" && styles.roleButtonActive,
                  ]}
                  onPress={() => setSelectedRole("Admin")}
                  activeOpacity={0.85}
                >
                  <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                  <Text style={styles.roleText}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    selectedRole === "User" && styles.roleButtonActive,
                  ]}
                  onPress={() => {
                    setSelectedRole("User");
                    navigation.navigate("SignIn");
                  }}
                  activeOpacity={0.85}
                >
                  <FontAwesome5 name="user" size={18} color="#EBCB7A" />
                  <Text style={styles.roleText}>User</Text>
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
                  onChangeText={(value) => setMobile(normalizeDigits(value, 10))}
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
                  onChangeText={(value) => setPassword(normalizeDigits(value, 5))}
                />
              </View>

              <TouchableOpacity
                style={styles.forgotWrap}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#0C1320" />
                ) : (
                  <Text style={styles.primaryButtonText}>Log In</Text>
                )}
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
  background: { flex: 1 },
  backgroundImage: { opacity: 0.98 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(4, 22, 56, 0.58)",
  },
  topCircle: {
    position: "absolute",
    top: -36,
    alignSelf: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 36,
    paddingBottom: 8,
  },
  contentWrap: { width: "100%", maxWidth: 460 },
  topSection: { alignItems: "center", marginBottom: 48 },
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
  },
  appSubtitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "900",
    color: "#E7C779",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(74, 84, 105, 0.88)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  cardTitle: {
    fontSize: 29,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#D7DCE5",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 22,
    lineHeight: 20,
  },
  roleRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    height: 74,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.11)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  roleButtonActive: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.20)",
  },
  roleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    height: 70,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  inputIcon: { marginRight: 12, width: 24, textAlign: "center" },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16 },
  forgotWrap: { alignSelf: "flex-end", marginTop: -4, marginBottom: 22 },
  forgotText: { color: "#EBCB7A", fontSize: 13, fontWeight: "900" },
  primaryButton: {
    height: 72,
    borderRadius: 22,
    backgroundColor: "#EBCB7A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButtonText: { fontSize: 19, fontWeight: "900", color: "#0C1320" },
  bottomText: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "800",
  },
  linkText: { color: "#EBCB7A", fontWeight: "900" },
});

export default LoginScreen;
