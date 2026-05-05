import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Platform,
    ActivityIndicator,
    Alert,
    TextInput,
    Modal,
    Image,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../config/api";
import { getStoredItem, getStoredProfileExtras, setStoredItem, setStoredProfileExtras } from "../config/storage";

const COLORS = {
    bg: "#F7F8FA",
    white: "#FFFFFF",
    purple: "#6C43D8",
    text: "#111827",
    muted: "#6B7280",
    border: "#EEF0F4",
    green: "#16A05D",
    greenLight: "#ECFDF5",
    label: "#9CA3AF",
    divider: "#F3F4F6",
    inputBg: "#F9FAFB",
};

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];

export default function PersonalInformationScreen({ navigation, route, sessionProfile }) {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [genderModal, setGenderModal] = useState(false);
    const [adminId, setAdminId] = useState(null);
    const [calendarModal, setCalendarModal] = useState(false);
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth()); // 0-indexed

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const MONTH_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const formatDOB = (day, month, year) => `${String(day).padStart(2, "0")} ${MONTHS[month]} ${year}`;

    const parseDOB = (dobStr) => {
        if (!dobStr) return null;
        const parts = dobStr.split(" ");
        if (parts.length !== 3) return null;
        const day = parseInt(parts[0]);
        const month = MONTHS.indexOf(parts[1]);
        const year = parseInt(parts[2]);
        if (isNaN(day) || month === -1 || isNaN(year)) return null;
        return { day, month, year };
    };
    // Editable fields state
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [occupation, setOccupation] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const openCalendar = () => {
        const parsed = parseDOB(dateOfBirth);
        if (parsed) {
            setCalendarYear(parsed.year);
            setCalendarMonth(parsed.month);
        } else {
            setCalendarYear(new Date().getFullYear() - 25);
            setCalendarMonth(0);
        }
        setCalendarModal(true);
    };

    const selectedDOBParsed = parseDOB(dateOfBirth);


    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const profile =
                    sessionProfile ||
                    navigation?.getSessionProfile?.() ||
                    route?.params?.adminProfile ||
                    JSON.parse((await getStoredItem("adminProfile")) || "null");

                if (!profile?.id) {
                    setInfo(null);
                    return;
                }

                setAdminId(profile.id);
                setInfo(profile);
                populateFields(profile);

                const json = await apiRequest(`/${profile.id}/personal-info`);
                if (json.success) {
                    const storedExtras = await getStoredProfileExtras({ ...profile, ...json.data });
                    const mergedInfo = { ...profile, ...json.data, ...storedExtras };
                    setInfo(mergedInfo);
                    populateFields(mergedInfo);
                }
            } catch (e) {
                console.log("Failed to load personal info", e);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, [navigation, route?.params?.adminProfile, sessionProfile]);

    const populateFields = (data) => {
        setFullName(data?.fullName || "");
        setMobile(data?.mobile || "");
        setEmail(data?.email || "");
        setDateOfBirth(data?.dateOfBirth || "");
        setGender(data?.gender || "");
        setOccupation(data?.occupation || "");
        setProfileImage(data?.profileImage || "");
    };

    const handleEdit = () => {
        populateFields(info); // reset to saved values before editing
        setIsEditing(true);
    };

    const handleCancel = () => {
        populateFields(info); // discard unsaved changes
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            Alert.alert("Error", "Full name is required");
            return;
        }
        if (mobile.length !== 10) {
            Alert.alert("Error", "Mobile must be 10 digits");
            return;
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert("Error", "Enter a valid email address");
            return;
        }
        if (!adminId) {
            Alert.alert("Error", "Please login again to update your information");
            return;
        }

        setSaving(true);
        try {
            const json = await apiRequest(`/${adminId}/personal-info`, {
                method: "PUT",
                body: JSON.stringify({ fullName, mobile, email, dateOfBirth, gender, occupation }),
            });

            if (json.success) {
                const mergedInfo = { ...(info || {}), ...json.data, profileImage };
                setInfo(mergedInfo);
                setIsEditing(false);

                const storedProfile = JSON.parse((await getStoredItem("adminProfile")) || "null");
                const updatedProfile = {
                    ...(storedProfile || navigation?.getSessionProfile?.() || {}),
                    ...json.data,
                    profileImage,
                    fullName,
                    mobile,
                };

                navigation?.setSessionProfile?.(updatedProfile);
                await setStoredItem("adminProfile", JSON.stringify(updatedProfile));
                await setStoredProfileExtras(updatedProfile, { profileImage });

                Alert.alert("Success", "Information updated successfully!");
            } else {
                Alert.alert("Error", json.message || "Update failed");
            }
        } catch (e) {
            Alert.alert("Error", e.message || "Cannot connect to server. Check your network.");
        } finally {
            setSaving(false);
        }
    };

    const handlePickProfileImage = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission needed", "Please allow gallery access to choose a profile picture.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (result.canceled || !result.assets?.length) {
                return;
            }

            setProfileImage(result.assets[0].uri);
        } catch (error) {
            Alert.alert("Error", "Unable to open gallery right now.");
        }
    };

    const initials = (info?.fullName || fullName)
        ? (info?.fullName || fullName).split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    if (loading) {
        return (
            <SafeAreaView style={[styles.safe, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={COLORS.purple} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => (isEditing ? handleCancel() : navigation?.goBack())}
                >
                    <Ionicons name="arrow-back" size={22} color={COLORS.text} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Personal Information</Text>

                {isEditing ? (
                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 52 }} />
                )}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Avatar ── */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.initialsText}>{initials}</Text>
                            )}
                        </View>
                        {isEditing && (
                            <TouchableOpacity style={styles.cameraBtn} onPress={handlePickProfileImage}>
                                <Feather name="camera" size={14} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.nameRow}>
                        <Text style={styles.avatarName}>{info?.fullName || "—"}</Text>
                        {info?.verified && (
                            <View style={styles.verifiedBadge}>
                                <MaterialIcons name="verified" size={14} color={COLORS.green} />
                                <Text style={styles.verifiedText}>Verified</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* ── Info / Edit Card ── */}
                <View style={styles.card}>
                    {isEditing ? (
                        <>
                            <EditField label="Full Name" icon="user" value={fullName} onChangeText={setFullName} placeholder="Enter full name" />
                            <EditField label="Phone Number" icon="phone" value={mobile} onChangeText={setMobile} placeholder="10-digit mobile number" keyboardType="phone-pad" maxLength={10} />
                            <EditField label="Email Address" icon="mail" value={email} onChangeText={setEmail} placeholder="Enter email address" keyboardType="email-address" autoCapitalize="none" />
                            {/* Date of Birth — calendar picker */}
                            <Text style={styles.fieldLabel}>Date of Birth</Text>
                            <TouchableOpacity style={styles.inputWrapper} onPress={openCalendar}>
                                <Feather name="calendar" size={17} color={COLORS.muted} style={styles.inputIcon} />
                                <Text style={[styles.inputValue, !dateOfBirth && { color: COLORS.label }]}>
                                    {dateOfBirth || "Select date of birth"}
                                </Text>
                                <Feather name="chevron-down" size={17} color={COLORS.muted} />
                            </TouchableOpacity>

                            <Text style={styles.fieldLabel}>Gender</Text>
                            <TouchableOpacity style={styles.inputWrapper} onPress={() => setGenderModal(true)}>
                                <Feather name="user" size={17} color={COLORS.muted} style={styles.inputIcon} />
                                <Text style={[styles.inputValue, !gender && { color: COLORS.label }]}>
                                    {gender || "Select gender"}
                                </Text>
                                <Feather name="chevron-down" size={17} color={COLORS.muted} />
                            </TouchableOpacity>

                            <EditField label="Occupation" icon="briefcase" value={occupation} onChangeText={setOccupation} placeholder="Enter your occupation" isLast />
                        </>
                    ) : (
                        <>
                            <InfoRow label="Full Name" value={info?.fullName} />
                            <Divider />
                            <InfoRow label="Phone Number" value={info?.mobile ? `+91 ${info.mobile}` : null} />
                            <Divider />
                            <InfoRow label="Email Address" value={info?.email} />
                            <Divider />
                            <InfoRow label="Date of Birth" value={info?.dateOfBirth} />
                            <Divider />
                            <InfoRow label="Gender" value={info?.gender} />
                            <Divider />
                            <InfoRow label="Occupation" value={info?.occupation} />
                        </>
                    )}
                </View>

                {/* ── Bottom Button ── */}
                {isEditing ? (
                    <TouchableOpacity
                        style={[styles.primaryBtn, saving && { opacity: 0.7 }]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.primaryBtnText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.primaryBtn} onPress={handleEdit}>
                        <Feather name="edit-2" size={17} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.primaryBtnText}>Edit Information</Text>
                    </TouchableOpacity>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* ── Gender Bottom Sheet ── */}
            <Modal
                visible={genderModal}
                transparent
                animationType="slide"
                onRequestClose={() => setGenderModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setGenderModal(false)}
                >
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Select Gender</Text>
                        {GENDER_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.modalOption, gender === option && styles.modalOptionActive]}
                                onPress={() => { setGender(option); setGenderModal(false); }}
                            >
                                <Text style={[styles.modalOptionText, gender === option && styles.modalOptionTextActive]}>
                                    {option}
                                </Text>
                                {gender === option && <Feather name="check" size={18} color={COLORS.purple} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
            {/* ── Calendar Date Picker Modal ── */}
            <Modal
                visible={calendarModal}
                transparent
                animationType="fade"
                onRequestClose={() => setCalendarModal(false)}
            >
                <TouchableOpacity
                    style={styles.calendarOverlay}
                    activeOpacity={1}
                    onPress={() => setCalendarModal(false)}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.calendarSheet}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Select Date of Birth</Text>

                        {/* Month / Year navigation */}
                        <View style={styles.calNavRow}>
                            <TouchableOpacity
                                style={styles.calNavBtn}
                                onPress={() => {
                                    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); }
                                    else setCalendarMonth(m => m - 1);
                                }}
                            >
                                <Feather name="chevron-left" size={22} color={COLORS.purple} />
                            </TouchableOpacity>

                            <Text style={styles.calMonthYear}>
                                {MONTH_FULL[calendarMonth]} {calendarYear}
                            </Text>

                            <TouchableOpacity
                                style={styles.calNavBtn}
                                onPress={() => {
                                    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); }
                                    else setCalendarMonth(m => m + 1);
                                }}
                            >
                                <Feather name="chevron-right" size={22} color={COLORS.purple} />
                            </TouchableOpacity>
                        </View>

                        {/* Day labels */}
                        <View style={styles.calDayLabels}>
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                                <Text key={d} style={styles.calDayLabel}>{d}</Text>
                            ))}
                        </View>

                        {/* Day grid */}
                        <View style={styles.calGrid}>
                            {/* Empty slots for first day offset */}
                            {Array.from({ length: getFirstDayOfMonth(calendarYear, calendarMonth) }).map((_, i) => (
                                <View key={`empty-${i}`} style={styles.calCell} />
                            ))}
                            {/* Day numbers */}
                            {Array.from({ length: getDaysInMonth(calendarYear, calendarMonth) }).map((_, i) => {
                                const day = i + 1;
                                const isSelected =
                                    selectedDOBParsed?.day === day &&
                                    selectedDOBParsed?.month === calendarMonth &&
                                    selectedDOBParsed?.year === calendarYear;
                                const today = new Date();
                                const isFuture = new Date(calendarYear, calendarMonth, day) > today;
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[styles.calCell, isSelected && styles.calCellSelected, isFuture && styles.calCellDisabled]}
                                        disabled={isFuture}
                                        onPress={() => {
                                            setDateOfBirth(formatDOB(day, calendarMonth, calendarYear));
                                            setCalendarModal(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.calCellText,
                                            isSelected && styles.calCellTextSelected,
                                            isFuture && styles.calCellTextDisabled,
                                        ]}>
                                            {day}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Year quick jump row */}
                        <View style={styles.calYearRow}>
                            {[-2, -1, 0, 1, 2].map(offset => {
                                const yr = calendarYear + offset;
                                const isActive = offset === 0;
                                return (
                                    <TouchableOpacity
                                        key={yr}
                                        style={[styles.calYearChip, isActive && styles.calYearChipActive]}
                                        onPress={() => setCalendarYear(yr)}
                                    >
                                        <Text style={[styles.calYearChipText, isActive && styles.calYearChipTextActive]}>
                                            {yr}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>


        </SafeAreaView>
    );
}

// ── Sub-components ──
function InfoRow({ label, value }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value || "—"}</Text>
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

function EditField({ label, icon, value, onChangeText, placeholder, keyboardType, maxLength, autoCapitalize, isLast }) {
    return (
        <>
            <Text style={styles.fieldLabel}>{label}</Text>
            <View style={[styles.inputWrapper, isLast && { marginBottom: 0 }]}>
                <Feather name={icon} size={17} color={COLORS.muted} style={styles.inputIcon} />
                <TextInput
                    style={styles.inputValue}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.label}
                    keyboardType={keyboardType || "default"}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize || "words"}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    },
    header: {
        height: 64, paddingHorizontal: 16,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        backgroundColor: COLORS.white,
        borderBottomWidth: 1, borderBottomColor: COLORS.border,
    },
    backBtn: {
        width: 38, height: 38, alignItems: "center", justifyContent: "center",
        borderRadius: 10, backgroundColor: COLORS.bg,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
    cancelText: { fontSize: 15, fontWeight: "700", color: COLORS.purple, width: 52, textAlign: "right" },
    scrollContent: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 40 },

    avatarSection: { alignItems: "center", marginBottom: 28 },
    avatarWrapper: { position: "relative", marginBottom: 14 },
    avatarCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: COLORS.purple, alignItems: "center", justifyContent: "center",
        overflow: "hidden",
    },
    avatarImage: { width: "100%", height: "100%" },
    initialsText: { fontSize: 34, fontWeight: "800", color: "#fff", letterSpacing: 2 },
    cameraBtn: {
        position: "absolute", bottom: 2, right: 2,
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: COLORS.purple, alignItems: "center", justifyContent: "center",
        borderWidth: 2, borderColor: "#fff",
    },
    nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    avatarName: { fontSize: 20, fontWeight: "900", color: COLORS.text },
    verifiedBadge: {
        flexDirection: "row", alignItems: "center",
        backgroundColor: COLORS.greenLight, paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 20, gap: 3,
    },
    verifiedText: { fontSize: 12, fontWeight: "700", color: COLORS.green },

    card: {
        backgroundColor: COLORS.white, borderRadius: 16,
        paddingHorizontal: 18, paddingVertical: 6,
        borderWidth: 1, borderColor: COLORS.border,
        marginBottom: 24,
        shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 }, elevation: 1,
    },

    infoRow: { paddingVertical: 16 },
    infoLabel: {
        fontSize: 11, fontWeight: "600", color: COLORS.label,
        marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5,
    },
    infoValue: { fontSize: 15, fontWeight: "700", color: COLORS.text },
    divider: { height: 1, backgroundColor: COLORS.divider },

    fieldLabel: {
        fontSize: 11, fontWeight: "700", color: COLORS.label,
        marginBottom: 8, marginTop: 16, textTransform: "uppercase", letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: "row", alignItems: "center",
        backgroundColor: COLORS.inputBg, borderRadius: 10,
        borderWidth: 1, borderColor: COLORS.border,
        paddingHorizontal: 14, height: 52, marginBottom: 4,
    },
    inputIcon: { marginRight: 10 },
    inputValue: { flex: 1, fontSize: 15, fontWeight: "600", color: COLORS.text },

    primaryBtn: {
        height: 58, borderRadius: 14, backgroundColor: COLORS.purple,
        flexDirection: "row", alignItems: "center", justifyContent: "center",
    },
    primaryBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },

    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    modalSheet: {
        backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: 24, paddingBottom: 36,
    },
    modalHandle: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: COLORS.border, alignSelf: "center", marginBottom: 18,
    },
    modalTitle: { fontSize: 17, fontWeight: "800", color: COLORS.text, marginBottom: 12 },
    modalOption: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border,
    },
    modalOptionActive: { backgroundColor: "#F4F0FF", borderRadius: 10, paddingHorizontal: 12 },
    modalOptionText: { fontSize: 15, fontWeight: "600", color: COLORS.text },
    modalOptionTextActive: { color: COLORS.purple, fontWeight: "800" },

    calendarOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.42)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
    },
    calendarSheet: {
        width: "100%",
        maxWidth: 390,
        backgroundColor: COLORS.white,
        borderRadius: 22,
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 18,
        shadowColor: "#000",
        shadowOpacity: 0.16,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    calNavRow: {
        height: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    calNavBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4F0FF",
    },
    calMonthYear: {
        flex: 1,
        textAlign: "center",
        fontSize: 17,
        fontWeight: "900",
        color: COLORS.text,
    },
    calDayLabels: {
        flexDirection: "row",
        marginBottom: 4,
    },
    calDayLabel: {
        width: "14.285%",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "800",
        color: COLORS.label,
        paddingVertical: 8,
    },
    calGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    calCell: {
        width: "14.285%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginVertical: 1,
    },
    calCellSelected: {
        backgroundColor: COLORS.purple,
    },
    calCellDisabled: {
        opacity: 0.28,
    },
    calCellText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.text,
    },
    calCellTextSelected: {
        color: COLORS.white,
        fontWeight: "900",
    },
    calCellTextDisabled: {
        color: COLORS.label,
    },
    calYearRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 14,
    },
    calYearChip: {
        flex: 1,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.inputBg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    calYearChipActive: {
        backgroundColor: "#F4F0FF",
        borderColor: COLORS.purple,
    },
    calYearChipText: {
        fontSize: 12,
        fontWeight: "800",
        color: COLORS.muted,
    },
    calYearChipTextActive: {
        color: COLORS.purple,
    },
});
