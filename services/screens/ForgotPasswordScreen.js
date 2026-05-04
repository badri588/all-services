import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const ForgotPasswordScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed-outline" size={34} color="#E9C978" />
              </View>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                Reset your 5-digit password and continue
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter registered mobile number"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>

              <Text style={styles.label}>New 5-Digit Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter new 5-digit password"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="number-pad"
                  maxLength={5}
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>

              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="shield" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#BFC6D2"
                  keyboardType="number-pad"
                  maxLength={5}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.primaryButtonText}>Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.backText}>Back to Login</Text>
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
    marginBottom: 18,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#E7C779",
    textAlign: "center",
    fontWeight: "700",
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
  primaryButton: {
    height: 74,
    borderRadius: 24,
    backgroundColor: "#EBCB7A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0C1320",
  },
  backText: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default ForgotPasswordScreen;
