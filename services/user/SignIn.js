import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";

export default function SignIn({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const openProviderTabs = () => {
    if (navigation?.reset) {
      navigation.reset("ProviderTabs");
      return;
    }

    navigation?.navigate?.("ProviderTabs");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>ServeNow</Text>
        <Text style={styles.tagline}>Welcome back! Sign in to continue</Text>

        <Text style={styles.label}>Mobile number</Text>
        <View style={styles.phoneInput}>
          <Text style={styles.flag}>+91</Text>
          <TextInput
            style={styles.phoneTextInput}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholder="Enter mobile number"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={openProviderTabs}
        >
          <Text style={styles.primaryText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialText}>Sign in with OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate("SignupAllInOne")}>
          <Text style={styles.bottomText}>
            Don't have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 22,
    paddingBottom: 35,
  },
  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1a1a2e",
    textAlign: "center",
    marginTop: 28,
  },
  tagline: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
    fontSize: 14,
  },
  label: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  flag: {
    fontSize: 14,
    marginRight: 8,
  },
  phoneTextInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  forgot: {
    color: "#4F46E5",
    fontWeight: "800",
    textAlign: "right",
    marginBottom: 18,
  },
  primaryBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  or: {
    color: "#9CA3AF",
    fontWeight: "700",
  },
  socialBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 10,
  },
  socialText: {
    color: "#6B7280",
    fontWeight: "800",
  },
  bottomText: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 14,
  },
  link: {
    color: "#4F46E5",
    fontWeight: "900",
  },
});
