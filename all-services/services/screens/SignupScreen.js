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
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { apiRequest } from "../config/api";
import { getStoredProfileExtras, setStoredItem } from "../config/storage";

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeDigits = (value, maxLength) => value.replace(/\D/g, "").slice(0, maxLength);

  const handleSignup = async () => {
    const payload = {
      fullName: fullName.trim(),
      mobile: normalizeDigits(mobile, 10),
      societyName: societyName.trim(),
      flatNo: flatNo.trim(),
      password: normalizeDigits(password, 5),
      confirmPassword: normalizeDigits(confirmPassword, 5),
    };

    if (
      !payload.fullName ||
      !payload.mobile ||
      !payload.societyName ||
      !payload.flatNo ||
      !payload.password ||
      !payload.confirmPassword
    ) {
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
    if (payload.password !== payload.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const json = await apiRequest("/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (json.success) {
        const storedExtras = await getStoredProfileExtras(json.data);
        const mergedProfile = { ...json.data, ...storedExtras };
        navigation?.setSessionProfile?.(mergedProfile);

        try {
          // Save profile data locally so profile screen can read it
          await setStoredItem("adminProfile", JSON.stringify(mergedProfile));
        } catch (storageError) {
          console.log("Failed to save profile locally", storageError);
        }
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Error", json.message || "Signup failed");
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

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentWrap}>
            <View style={styles.topSection}>
              <Text style={styles.createTitle}>Create Account</Text>
              <Text style={styles.subTop}>Register as Admin</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor="#BFC6D2"
                  value={fullName}
                  onChangeText={setFullName}
                />
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

              <Text style={styles.label}>Society Name</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="apartment" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter society name"
                  placeholderTextColor="#BFC6D2"
                  value={societyName}
                  onChangeText={setSocietyName}
                />
              </View>

              <Text style={styles.label}>Flat / House Number</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="home" size={20} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter flat / house number"
                  placeholderTextColor="#BFC6D2"
                  value={flatNo}
                  onChangeText={setFlatNo}
                />
              </View>

              <Text style={styles.label}>Set 5-Digit Password</Text>
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

              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="shield" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter 5-digit password"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="number-pad"
                  maxLength={5}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(value) => setConfirmPassword(normalizeDigits(value, 5))}
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#0C1320" />
                ) : (
                  <Text style={styles.primaryButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.bottomText}>
                  Already have an account? <Text style={styles.linkText}>Log In</Text>
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
    backgroundColor: "rgba(4, 22, 56, 0.64)",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 25,
    paddingBottom: 30,
  },
  contentWrap: { width: "100%", maxWidth: 460 },
  topSection: { alignItems: "center", marginBottom: 14 },
  createTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subTop: {
    marginTop: 6,
    color: "#E7C779",
    fontSize: 16,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "rgba(67, 76, 95, 0.86)",
    borderRadius: 34,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
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
  inputIcon: { marginRight: 12, width: 24, textAlign: "center" },
  input: { flex: 1, color: "#FFFFFF", fontSize: 17 },
  primaryButton: {
    height: 74,
    borderRadius: 24,
    backgroundColor: "#EBCB7A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
    marginTop: 8,
  },
  primaryButtonText: { fontSize: 20, fontWeight: "800", color: "#0C1320" },
  bottomText: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
  },
  linkText: { color: "#EBCB7A", fontWeight: "800" },
});

export default SignupScreen;
