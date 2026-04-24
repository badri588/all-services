import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../data/theme";

const jobs = [
  { id: "1", title: "House Cleaning", area: "Madhapur", pay: "Rs 900 / visit", time: "Today, 4 PM" },
  { id: "2", title: "Electrician Repair", area: "Gachibowli", pay: "Rs 650 / job", time: "Tomorrow, 10 AM" },
  { id: "3", title: "Home Nurse Visit", area: "Karimnagar Colony", pay: "Rs 1,200 / shift", time: "Today, 7 PM" },
];

export default function AvailableJobs() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Available Jobs</Text>
      <Text style={styles.subtitle}>New jobs near your location</Text>

      {jobs.map((job) => (
        <View key={job.id} style={styles.card}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.meta}>{job.area}</Text>
          <Text style={styles.meta}>{job.time}</Text>
          <Text style={styles.pay}>{job.pay}</Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Apply Now</Text>
          </TouchableOpacity>
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
  jobTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 8 },
  meta: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
  pay: { fontSize: 15, fontWeight: "700", color: COLORS.primary, marginTop: 6, marginBottom: 12 },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 12,
  },
  buttonText: { color: COLORS.white, fontSize: 14, fontWeight: "700" },
});
