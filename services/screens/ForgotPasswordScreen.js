// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ImageBackground,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { Feather, Ionicons } from "@expo/vector-icons";

// const ForgotPasswordScreen = ({ navigation }) => {
//   const [mobile, setMobile] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <ImageBackground
//       source={require("../assets/shared image.jpg")}
//       style={styles.background}
//       imageStyle={styles.backgroundImage}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay} />

//       <SafeAreaView style={styles.safeArea}>
//         <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//         >
//           <View style={styles.contentWrap}>
//             <View style={styles.topSection}>
//               <View style={styles.iconCircle}>
//                 <Ionicons name="lock-closed-outline" size={34} color="#E9C978" />
//               </View>
//               <Text style={styles.title}>Forgot Password</Text>
//               <Text style={styles.subtitle}>
//                 Reset your 5-digit password and continue
//               </Text>
//             </View>

//             <View style={styles.card}>
//               <Text style={styles.label}>Mobile Number</Text>
//               <View style={styles.inputWrapper}>
//                 <Feather name="phone" size={22} color="#D7DCE5" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter registered mobile number"
//                   placeholderTextColor="#BFC6D2"
//                   keyboardType="phone-pad"
//                   maxLength={10}
//                   value={mobile}
//                   onChangeText={setMobile}
//                 />
//               </View>

//               <Text style={styles.label}>New 5-Digit Password</Text>
//               <View style={styles.inputWrapper}>
//                 <Feather name="lock" size={22} color="#D7DCE5" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter new 5-digit password"
//                   placeholderTextColor="#BFC6D2"
//                   keyboardType="number-pad"
//                   maxLength={5}
//                   secureTextEntry
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                 />
//               </View>

//               <Text style={styles.label}>Confirm Password</Text>
//               <View style={styles.inputWrapper}>
//                 <Feather name="shield" size={22} color="#D7DCE5" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Re-enter new password"
//                   placeholderTextColor="#BFC6D2"
//                   keyboardType="number-pad"
//                   maxLength={5}
//                   secureTextEntry
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                 />
//               </View>

//               <TouchableOpacity
//                 style={styles.primaryButton}
//                 onPress={() => navigation.navigate("Login")}
//               >
//                 <Text style={styles.primaryButtonText}>Reset Password</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                 <Text style={styles.backText}>Back to Login</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   backgroundImage: {
//     opacity: 0.98,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(4, 22, 56, 0.64)",
//   },
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingVertical: 28,
//   },
//   contentWrap: {
//     width: "100%",
//     maxWidth: 460,
//   },
//   topSection: {
//     alignItems: "center",
//     marginBottom: 18,
//   },
//   iconCircle: {
//     width: 84,
//     height: 84,
//     borderRadius: 42,
//     backgroundColor: "rgba(255,255,255,0.12)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.18)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 18,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   subtitle: {
//     marginTop: 8,
//     fontSize: 15,
//     color: "#E7C779",
//     textAlign: "center",
//     fontWeight: "700",
//   },
//   card: {
//     backgroundColor: "rgba(67, 76, 95, 0.86)",
//     borderRadius: 34,
//     paddingHorizontal: 20,
//     paddingTop: 28,
//     paddingBottom: 26,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#FFFFFF",
//     marginBottom: 10,
//     marginLeft: 4,
//   },
//   inputWrapper: {
//     height: 74,
//     borderRadius: 22,
//     backgroundColor: "rgba(255,255,255,0.08)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     marginBottom: 20,
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     color: "#FFFFFF",
//     fontSize: 17,
//   },
//   primaryButton: {
//     height: 74,
//     borderRadius: 24,
//     backgroundColor: "#EBCB7A",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 18,
//     marginTop: 8,
//   },
//   primaryButtonText: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#0C1320",
//   },
//   backText: {
//     fontSize: 15,
//     textAlign: "center",
//     color: "#FFFFFF",
//     fontWeight: "700",
//   },
// });

// export default ForgotPasswordScreen;





























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
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const BASE_AUTH_URL = "http://192.168.0.14:8080/api/provider/auth";

async function apiPost(endpoint, body) {
  const res = await fetch(`${BASE_AUTH_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server error (HTTP ${res.status})`);
  }
  if (!res.ok) throw new Error(data?.message || `Request failed (HTTP ${res.status})`);
  return data;
}

const ForgotPasswordScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ── Eye toggle state ──────────────────────────────────────
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetPassword = async () => {
    setError("");
    setSuccessMsg("");

    const cleanMobile = mobile.replace(/\s/g, "");
    if (!cleanMobile) {
      setError("Mobile number is required.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!newPassword) {
      setError("New password is required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Za-z]/.test(newPassword)) {
      setError("Password must contain at least one letter.");
      return;
    }
    if (!/\d/.test(newPassword)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (!confirmPassword) {
      setError("Please re-enter your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Step 2: Reset password
      await apiPost("/reset-password", { mobile: cleanMobile, newPassword });

      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigation.navigate("Login"), 2000);
    } catch (err) {
      const msg = err.message || "Something went wrong. Please try again.";
      if (
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("no account") ||
        msg.toLowerCase().includes("not registered")
      ) {
        setError("This mobile number is not registered. Please sign up first.");
      } else {
        setError(msg);
      }
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
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed-outline" size={34} color="#E9C978" />
              </View>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                Reset your password and continue
              </Text>
            </View>

            <View style={styles.card}>

              {!!error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️  {error}</Text>
                </View>
              )}

              {!!successMsg && (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>✅  {successMsg}</Text>
                </View>
              )}

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
                  onChangeText={(v) => {
                    setMobile(v.replace(/\D/g, ""));
                    setError("");
                  }}
                />
              </View>

              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 8 characters"
                  placeholderTextColor="#BFC6D2"
                  secureTextEntry={!showNew}
                  value={newPassword}
                  onChangeText={(v) => {
                    setNewPassword(v);
                    setError("");
                  }}
                />
                <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                  <Feather
                    name={showNew ? "eye-off" : "eye"}
                    size={20}
                    color="#D7DCE5"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="shield" size={22} color="#D7DCE5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#BFC6D2"
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={(v) => {
                    setConfirmPassword(v);
                    setError("");
                  }}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <Feather
                    name={showConfirm ? "eye-off" : "eye"}
                    size={20}
                    color="#D7DCE5"
                  />
                </TouchableOpacity>
              </View>

              {confirmPassword.length > 0 && (
                <Text
                  style={{
                    color: newPassword === confirmPassword ? "#4caf50" : "#ef5350",
                    fontSize: 13,
                    marginBottom: 10,
                    marginLeft: 4,
                  }}
                >
                  {newPassword === confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#0C1320" />
                ) : (
                  <Text style={styles.primaryButtonText}>Reset Password</Text>
                )}
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
  errorBox: {
    backgroundColor: "rgba(239,83,80,0.15)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(239,83,80,0.4)",
  },
  errorText: {
    color: "#ff8a80",
    fontSize: 13,
    fontWeight: "600",
  },
  successBox: {
    backgroundColor: "rgba(76,175,80,0.15)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(76,175,80,0.4)",
  },
  successText: {
    color: "#a5d6a7",
    fontSize: 13,
    fontWeight: "600",
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