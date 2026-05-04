import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const GREEN = '#2e7d32';
const LIGHT_GREEN = '#e8f5e9';
const PURPLE = '#5c35e8';

const NEXT_STEPS = [
  {
    id: 1,
    icon: '👤',
    iconBg: '#e8f5e9',
    title: 'Complete your profile',
    desc: 'Add more details to get more jobs.',
  },
  {
    id: 2,
    icon: '🔔',
    iconBg: '#e8f5e9',
    title: 'Stay Updated',
    desc: 'Get notified about new job requests.',
  },
  {
    id: 3,
    icon: '💼',
    iconBg: '#e8f5e9',
    title: 'Start Earning',
    desc: 'Accept jobs and grow your earnings.',
  },
];

export default function RegistrationSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Illustration Area */}
        <View style={styles.heroSection}>
          {/* Decorative dots */}
          <View style={styles.decorDots}>
            <Text style={[styles.decorDot, { top: 10, left: '30%', color: '#a5d6a7', fontSize: 20 }]}>+</Text>
            <Text style={[styles.decorDot, { top: 40, right: '25%', color: '#c8e6c9', fontSize: 14 }]}>+</Text>
            <Text style={[styles.decorDot, { top: 80, left: '15%', color: '#81c784', fontSize: 10 }]}>●</Text>
            <Text style={[styles.decorDot, { top: 60, right: '15%', color: '#a5d6a7', fontSize: 10 }]}>●</Text>
            <Text style={[styles.decorDot, { top: 20, left: '60%', color: '#c8e6c9', fontSize: 16 }]}>+</Text>
          </View>

          {/* Green check circle */}
          <View style={styles.checkCircleOuter}>
            <View style={styles.checkCircleMid}>
              <View style={styles.checkCircleInner}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
            </View>
          </View>

          {/* Worker illustration placeholder */}
          <View style={styles.workerCard}>
            <View style={styles.workerBg}>
              <Text style={{ fontSize: 80 }}>👷</Text>
              {/* thumbs up detail */}
              <View style={styles.thumbsUp}>
                <Text style={{ fontSize: 22 }}>👍</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>Registration Successful!</Text>
        <Text style={styles.welcomeText}>
          Welcome to the Community 🎉
        </Text>

        {/* Account created banner */}
        <View style={styles.successBanner}>
          <View style={styles.bannerCheck}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>✓</Text>
          </View>
          <Text style={styles.bannerText}>
            Your account has been created{'\n'}successfully.
          </Text>
        </View>

        {/* What's Next */}
        <Text style={styles.sectionTitle}>What's Next?</Text>
        {NEXT_STEPS.map((step) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={[styles.stepIcon, { backgroundColor: step.iconBg }]}>
              <Text style={{ fontSize: 22 }}>{step.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}

        {/* Go to Dashboard */}
        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate('SignIn')}
          activeOpacity={0.85}
        >
          <Text style={styles.dashboardBtnText}>Go to SignIn</Text>
        </TouchableOpacity>

        {/* Maybe Later */}
        <TouchableOpacity
          style={styles.laterBtn}
          onPress={() => navigation.navigate('SignIn')}
          activeOpacity={0.7}
        >
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },

  // Hero
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
    position: 'relative',
  },
  decorDots: { position: 'absolute', width: '100%', height: 140 },
  decorDot: { position: 'absolute', fontWeight: '700' },

  checkCircleOuter: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#c8e6c9',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  checkCircleMid: {
    width: 86, height: 86, borderRadius: 43,
    backgroundColor: '#a5d6a7',
    alignItems: 'center', justifyContent: 'center',
  },
  checkCircleInner: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { color: '#fff', fontSize: 30, fontWeight: '900' },

  workerCard: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    paddingVertical: 24,
    position: 'relative',
  },
  workerBg: { alignItems: 'center', justifyContent: 'center' },
  thumbsUp: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },

  // Text
  mainTitle: {
    fontSize: 24, fontWeight: '900', color: '#111',
    textAlign: 'center', marginBottom: 6,
  },
  welcomeText: {
    fontSize: 16, fontWeight: '700', color: GREEN,
    textAlign: 'center', marginBottom: 20,
  },

  // Banner
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GREEN,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginBottom: 24,
  },
  bannerCheck: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center',
  },
  bannerText: { fontSize: 14, color: '#2e7d32', fontWeight: '500', lineHeight: 20 },

  // What's Next
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: '#111',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12, padding: 14,
    elevation: 1,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4,
  },
  stepIcon: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
  },
  stepTitle: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 2 },
  stepDesc: { fontSize: 12, color: '#888' },

  // Buttons
  dashboardBtn: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  dashboardBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  laterBtn: { alignItems: 'center', paddingVertical: 4 },
  laterText: { color: PURPLE, fontSize: 15, fontWeight: '600' },
});