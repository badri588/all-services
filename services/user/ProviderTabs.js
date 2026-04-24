import React, { useMemo, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvailableJobs from "./AvailableJobs";
import MyJobs from "./MyJobs";
import Earnings from "./Earnings";
import Profile from "./Profile";
import { COLORS } from "../data/theme";

const TABS = [
  { key: "AvailableJobs", label: "Available Jobs", icon: "Jobs" },
  { key: "MyJobs", label: "My Jobs", icon: "Work" },
  { key: "Earnings", label: "Earnings", icon: "Cash" },
  { key: "Profile", label: "Profile", icon: "Me" },
];

export default function ProviderTabs({ navigation }) {
  const [activeTab, setActiveTab] = useState("AvailableJobs");

  const content = useMemo(() => {
    const sharedProps = { navigation };

    switch (activeTab) {
      case "MyJobs":
        return <MyJobs {...sharedProps} />;
      case "Earnings":
        return <Earnings {...sharedProps} />;
      case "Profile":
        return <Profile {...sharedProps} />;
      case "AvailableJobs":
      default:
        return <AvailableJobs {...sharedProps} />;
    }
  }, [activeTab, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.content}>{content}</View>

      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              activeOpacity={0.85}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primaryLight,
  },
  tabIcon: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 4,
  },
  tabIconActive: {
    color: COLORS.primary,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
});
