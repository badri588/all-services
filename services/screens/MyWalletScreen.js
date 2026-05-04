import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "../components/BottomNavBar";

const COLORS = {
  bg: "#FFFFFF",
  green: "#16A05D",
  purple: "#6C43D8",
  text: "#111827",
  muted: "#6B7280",
  border: "#EEF0F4",
  red: "#EF4444",
  orange: "#F59E0B",
  blue: "#2F80ED",
};

const TRANSACTIONS = [
  {
    id: "1",
    title: "Added to Wallet",
    date: "12 May 2024, 10:30 AM",
    amount: "+ ₹500",
    type: "credit",
    icon: "plus",
    bg: "#DFF8E9",
    color: COLORS.green,
  },
  {
    id: "2",
    title: "Deep Cleaning",
    date: "12 May 2024, 11:00 AM",
    amount: "- ₹499",
    type: "debit",
    icon: "broom",
    bg: "#FFE5E5",
    color: COLORS.red,
  },
  {
    id: "3",
    title: "Salon at Home",
    date: "10 May 2024, 02:00 PM",
    amount: "- ₹299",
    type: "debit",
    icon: "face-woman",
    bg: "#FFE2F0",
    color: "#EC407A",
  },
  {
    id: "4",
    title: "Cashback Received",
    date: "08 May 2024, 09:15 AM",
    amount: "+ ₹50",
    type: "credit",
    icon: "gift-outline",
    bg: "#FFF0CC",
    color: COLORS.orange,
  },
  {
    id: "5",
    title: "Added to Wallet",
    date: "05 May 2024, 04:45 PM",
    amount: "+ ₹300",
    type: "credit",
    icon: "plus",
    bg: "#DFF8E9",
    color: COLORS.green,
  },
];

export default function MyWalletScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Wallet</Text>
        </View>

        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹1,250.00</Text>

            <TouchableOpacity style={styles.addMoneyBtn}>
              <Ionicons name="add" size={18} color={COLORS.purple} />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.walletArtBox}>
            <Text style={styles.coinEmoji}>🪙</Text>
            <MaterialCommunityIcons
              name="wallet"
              size={95}
              color="rgba(255,255,255,0.28)"
            />
          </View>
        </View>

        <View style={styles.actionCard}>
          <WalletAction icon="plus-circle-outline" title="Add Money" />
          <View style={styles.verticalDivider} />
          <WalletAction icon="wallet-outline" title="Send Money" />
          <View style={styles.verticalDivider} />
          <WalletAction icon="history" title="Transaction History" />
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionCard}>
          {TRANSACTIONS.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity style={styles.transactionRow}>
                <View style={[styles.transactionIcon, { backgroundColor: item.bg }]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={25}
                    color={item.color}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        item.type === "credit" ? COLORS.green : COLORS.red,
                    },
                  ]}
                >
                  {item.amount}
                </Text>
              </TouchableOpacity>

              {index !== TRANSACTIONS.length - 1 && (
                <View style={styles.transactionDivider} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.inviteCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>Invite & Earn</Text>
            <Text style={styles.inviteSub}>
              Invite your friends and get up to ₹500
            </Text>

            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>Invite Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.giftEmoji}>🎁</Text>
        </View>

        <View style={{ height: 25 }} />
      </ScrollView>

      <BottomNavBar activeId="wallet" navigation={navigation} />
    </SafeAreaView>
  );
}

function WalletAction({ icon, title }) {
  return (
    <TouchableOpacity style={styles.walletAction}>
      <MaterialCommunityIcons name={icon} size={30} color={COLORS.purple} />
      <Text style={styles.walletActionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },

  header: {
    height: 72,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },

  bellBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 105,
  },

  walletCard: {
    backgroundColor: COLORS.purple,
    borderRadius: 16,
    padding: 24,
    minHeight: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  walletLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.9,
  },

  walletAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10,
  },

  addMoneyBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  addMoneyText: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 5,
  },

  walletArtBox: {
    justifyContent: "center",
    alignItems: "center",
  },

  coinEmoji: {
    fontSize: 38,
    position: "absolute",
    top: 12,
    right: 25,
    zIndex: 2,
  },

  actionCard: {
    marginTop: 18,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  walletAction: {
    flex: 1,
    alignItems: "center",
  },

  walletActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 8,
    textAlign: "center",
  },

  verticalDivider: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.border,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.text,
  },

  viewAll: {
    color: COLORS.blue,
    fontSize: 14,
    fontWeight: "700",
  },

  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  transactionDate: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 3,
  },

  transactionAmount: {
    fontSize: 15,
    fontWeight: "900",
  },

  transactionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 56,
  },

  inviteCard: {
    backgroundColor: "#EAF9F1",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
  },

  inviteTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
  },

  inviteSub: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 18,
  },

  inviteBtn: {
    backgroundColor: COLORS.green,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  inviteBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },

  giftEmoji: {
    fontSize: 82,
  },
});
