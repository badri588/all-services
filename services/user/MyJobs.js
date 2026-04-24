import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../data/theme";

const myJobs = [
  { id: "1", title: "Pool Cleaning", status: "Assigned", schedule: "Today, 5 PM" },
  { id: "2", title: "Furniture Assembly", status: "In Progress", schedule: "Tomorrow, 11 AM" },
];

export default function MyJobs() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My Jobs</Text>
      <Text style={styles.subtitle}>Track all accepted work in one place</Text>

      {myJobs.map((job) => (
        <View key={job.id} style={styles.card}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.meta}>{job.schedule}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{job.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 32 },
  title: { fontSize: 26, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 6, marginBottom: 18 },
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  jobTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 6 },
  meta: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },
});
