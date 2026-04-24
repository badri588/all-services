import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../data/theme";

export default function Earnings() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Earnings</Text>
      <Text style={styles.subtitle}>Your recent income summary</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>This Month</Text>
        <Text style={styles.heroValue}>Rs 18,450</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.rowTitle}>Completed Jobs</Text>
        <Text style={styles.rowValue}>24</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.rowTitle}>Pending Payout</Text>
        <Text style={styles.rowValue}>Rs 2,300</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.rowTitle}>Average per Job</Text>
        <Text style={styles.rowValue}>Rs 768</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 32 },
  title: { fontSize: 26, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 6, marginBottom: 18 },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  heroLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 },
  heroValue: { color: COLORS.white, fontSize: 30, fontWeight: "800" },
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowTitle: { fontSize: 15, color: COLORS.textSecondary, fontWeight: "600" },
  rowValue: { fontSize: 18, color: COLORS.text, fontWeight: "800" },
});
