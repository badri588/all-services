import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../data/theme';
import {
  InputField,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
} from '../components/UIComponents';

export default function SignIn({ navigation, route }) {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const redirectRouteName = route?.params?.redirectRouteName;
    const redirectParams = route?.params?.redirectParams || {};

    if (redirectRouteName) {
      navigation?.navigate?.(redirectRouteName, redirectParams);
      return;
    }

    navigation?.navigate?.('ProviderTabs');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign In</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🔐</Text>
          <Text style={styles.heroTitle}>Welcome Back</Text>
          <Text style={styles.heroSubtitle}>
            Sign in to continue using your service provider account
          </Text>
        </View>

        <View style={styles.formCard}>
          <SectionHeader
            title="Account Login"
            subtitle="Enter your user credentials to sign in"
          />

          <InputField
            label="Email or Mobile Number"
            placeholder="Enter email or 10-digit mobile number"
            value={loginValue}
            onChangeText={setLoginValue}
            keyboardType="default"
            required
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            required
          />

          <TouchableOpacity
            onPress={() => Alert.alert('Forgot Password', 'Connect your forgot password screen here.')}
            style={styles.forgotWrap}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            style={{ marginTop: 8 }}
          />

          <SecondaryButton
            title="Create New Account"
            onPress={() => navigation?.navigate?.('SignupAllInOne')}
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backArrow: { fontSize: 22, color: COLORS.text, fontWeight: '700' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },

  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },

  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  heroEmoji: { fontSize: 42, marginBottom: 10 },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    lineHeight: 20,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },

  roleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: 10,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  roleChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  roleChipTextActive: {
    color: COLORS.white,
  },

  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 4,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: -6,
    marginBottom: 8,
  },
});
