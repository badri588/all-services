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

export default function Signup({ navigation }) {
  const [step, setStep] = useState("signup");
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    area: "",
  });
  const [documents, setDocuments] = useState({
    aadhaar: false,
    pan: false,
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateOtp = (index, value) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
  };

  const markDocumentUploaded = (key) => {
    setDocuments((prev) => ({ ...prev, [key]: true }));
  };

  const handleVerifyOtp = () => {
    navigation?.navigate?.("SelectServices");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {step === "signup" ? (
          <>
            <Text style={styles.logo}>ServeNow</Text>
            <Text style={styles.tagline}>Create your account</Text>

            <View style={styles.progress}>
              <View style={styles.done} />
              <View style={styles.active} />
              <View style={styles.inactive} />
              <View style={styles.inactive} />
            </View>

            <View style={styles.tabRow}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation?.navigate("SignIn")}
              >
                <Text style={styles.tabText}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.tab, styles.tabActive]}>
                <Text style={styles.tabActiveText}>Sign up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              value={form.fullName}
              onChangeText={(value) => updateField("fullName", value)}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Mobile number</Text>
            <View style={styles.phoneInput}>
              <Text style={styles.flag}>+91</Text>
              <TextInput
                style={styles.phoneTextInput}
                value={form.mobile}
                onChangeText={(value) => updateField("mobile", value)}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter email address"
              placeholderTextColor="#9CA3AF"
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={form.password}
                  onChangeText={(value) => updateField("password", value)}
                  secureTextEntry
                  placeholder="Enter password"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Confirm</Text>
                <TextInput
                  style={styles.input}
                  value={form.confirmPassword}
                  onChangeText={(value) => updateField("confirmPassword", value)}
                  secureTextEntry
                  placeholder="Confirm password"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <Text style={styles.label}>City / Area</Text>
            <TextInput
              style={styles.input}
              value={form.area}
              onChangeText={(value) => updateField("area", value)}
              placeholder="Enter city / area"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Documents</Text>
            <UploadRow
              title="Aadhaar Card"
              hint="Upload front and back side"
              uploaded={documents.aadhaar}
              onPress={() => markDocumentUploaded("aadhaar")}
            />
            <UploadRow
              title="PAN Card"
              hint="Upload clear PAN card image"
              uploaded={documents.pan}
              onPress={() => markDocumentUploaded("pan")}
            />

            <View style={styles.checkRow}>
              <View style={styles.checkBox}>
                <Text style={styles.checkText}>✓</Text>
              </View>

              <Text style={styles.terms}>
                I agree to the <Text style={styles.link}>Terms of Service</Text>{" "}
                and <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setStep("otp")}
            >
              <Text style={styles.primaryText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation?.navigate("SignIn")}>
              <Text style={styles.bottomText}>
                Already have an account? <Text style={styles.link}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.logo}>ServeNow</Text>
            <Text style={styles.tagline}>Verify your number</Text>

            <View style={styles.progress}>
              <View style={styles.done} />
              <View style={styles.done} />
              <View style={styles.active} />
              <View style={styles.inactive} />
            </View>

            <View style={styles.centerBox}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>OTP</Text>
              </View>

              <Text style={styles.title}>OTP sent</Text>
              <Text style={styles.subtitle}>
                We sent a 6-digit code to{"\n"}
                <Text style={styles.bold}>
                  +91 {form.mobile || "your mobile number"}
                </Text>
              </Text>
            </View>

            <View style={styles.otpRow}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={[styles.otpBox, value ? styles.otpFilled : null]}
                  value={value}
                  onChangeText={(nextValue) => updateOtp(index, nextValue)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <Text style={styles.timer}>
              Resend OTP in <Text style={styles.link}>00:28</Text>
            </Text>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyOtp}>
              <Text style={styles.primaryText}>Verify & Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep("signup")}>
              <Text style={styles.changeText}>
                Wrong number? <Text style={styles.link}>Change</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function UploadRow({ title, hint, uploaded, onPress }) {
  return (
    <View style={styles.uploadRow}>
      <View style={styles.uploadTextWrap}>
        <Text style={styles.uploadTitle}>{title}</Text>
        <Text style={styles.uploadHint}>{uploaded ? "File selected" : hint}</Text>
      </View>

      <TouchableOpacity
        style={[styles.uploadBtn, uploaded && styles.uploadBtnDone]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={[styles.uploadBtnText, uploaded && styles.uploadBtnTextDone]}>
          {uploaded ? "Uploaded" : "Upload"}
        </Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a2e",
    textAlign: "center",
    marginTop: 8,
  },

  tagline: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 22,
  },

  progress: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 22,
  },

  done: {
    flex: 1,
    height: 5,
    borderRadius: 8,
    backgroundColor: "#4F46E5",
  },

  active: {
    flex: 1,
    height: 5,
    borderRadius: 8,
    backgroundColor: "#818CF8",
  },

  inactive: {
    flex: 1,
    height: 5,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },

  tabRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 22,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#1a1a2e",
  },

  tabText: {
    color: "#6B7280",
    fontWeight: "600",
  },

  tabActiveText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
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
    fontWeight: "800",
    color: "#111827",
    marginRight: 8,
  },

  phoneTextInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  half: {
    flex: 1,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 18,
    gap: 10,
  },

  uploadRow: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  uploadTextWrap: {
    flex: 1,
    paddingRight: 10,
  },

  uploadTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
  },

  uploadHint: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  uploadBtn: {
    borderRadius: 10,
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  uploadBtnDone: {
    backgroundColor: "#DCFCE7",
  },

  uploadBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  uploadBtnTextDone: {
    color: "#15803D",
  },

  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  terms: {
    flex: 1,
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },

  link: {
    color: "#4F46E5",
    fontWeight: "800",
  },

  primaryBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 16,
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  bottomText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
  },

  centerBox: {
    alignItems: "center",
    marginVertical: 25,
  },

  iconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  icon: {
    color: "#4F46E5",
    fontSize: 18,
    fontWeight: "900",
  },

  title: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    fontSize: 14,
  },

  bold: {
    color: "#111827",
    fontWeight: "800",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  otpBox: {
    width: 42,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  otpFilled: {
    borderColor: "#6366F1",
    backgroundColor: "#EEF2FF",
    color: "#3730A3",
  },

  timer: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 20,
  },

  changeText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
  },
});
