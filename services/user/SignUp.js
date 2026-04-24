import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../data/theme';
import {
  ALL_SERVICES,
  CATEGORIES,
  GENDERS,
  CITIES,
  AREAS_BY_CITY,
  EXPERIENCE_YEARS,
  LANGUAGES,
  PRICING_TYPES,
  AVAILABILITY_DAYS,
  TIME_SLOTS,
  PAYMENT_MODES,
} from '../data/services';
import {
  InputField,
  Dropdown,
  MultiSelectChips,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
  SectionHeader,
  UploadBox,
  DOBPicker,
} from '../components/UIComponents';

const STEP_LABELS = [
  'Basic & Services',
  'Location',
  'Documents',
  'Pricing & Availability',
  'Payment',
];

const DOCS = [
  { id: 'photo', label: 'Profile Photo', icon: '🤳', required: true, hint: 'Clear face photo, no sunglasses' },
  { id: 'aadhar', label: 'Aadhaar Card', icon: '🪪', required: true, hint: 'Front & back sides' },
  { id: 'pan', label: 'PAN Card', icon: '💳', required: false, hint: 'Required for tax purposes' },
  { id: 'certification', label: 'Certification / License', icon: '🏅', required: false, hint: 'Professional certificates if any' },
];

function StepCard({ number, title, subtitle, children }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeaderRow}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step {number}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.stepCardTitle}>{title}</Text>
          {!!subtitle && <Text style={styles.stepCardSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.stepBody}>{children}</View>
    </View>
  );
}

export default function SignUp({ navigation }) {
  // Step 1
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Home');

  // Step 2
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [languages, setLanguages] = useState([]);

  // Step 3
  const [uploaded, setUploaded] = useState({});

  // Step 4
  const [pricingType, setPricingType] = useState('');
  const [rate, setRate] = useState('');
  const [minCharge, setMinCharge] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [hasVehicle, setHasVehicle] = useState(null);
  const [hasTools, setHasTools] = useState(null);

  // Step 5
  const [paymentMode, setPaymentMode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState({});

  const filteredServices = useMemo(
    () => ALL_SERVICES.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const selectedServiceObjects = useMemo(
    () => ALL_SERVICES.filter((s) => selectedServices.includes(s.id)),
    [selectedServices]
  );

  const areas = city ? AREAS_BY_CITY[city] || [] : [];

  const requiredDocs = DOCS.filter((d) => d.required);
  const allRequiredUploaded = requiredDocs.every((d) => uploaded[d.id]);
  const uploadCount = Object.keys(uploaded).length;

  const showUpi = paymentMode === 'UPI' || paymentMode === 'All Methods';
  const showBank = paymentMode === 'Bank Transfer' || paymentMode === 'All Methods';

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateUpi = (value) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(value);
  const validateIfsc = (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase());

  const handlePhoneChange = (text) => {
    const digits = text.replace(/[^0-9]/g, '');
    if (digits.length <= 10) setPhone(digits);
  };

  const handlePincodeChange = (text) => {
    const digits = text.replace(/[^0-9]/g, '');
    if (digits.length <= 6) setPincode(digits);
  };

  const handleRateChange = (text) => setRate(text.replace(/[^0-9]/g, ''));
  const handleMinChargeChange = (text) => setMinCharge(text.replace(/[^0-9]/g, ''));
  const handleAccountNoChange = (text) => setAccountNo(text.replace(/[^0-9]/g, ''));

  const handleCityChange = (val) => {
    setCity(val);
    setArea('');
  };

  const toggleUpload = (docId) => {
    const doc = DOCS.find((d) => d.id === docId);
    Alert.alert(
      uploaded[docId] ? 'Remove Document' : 'Upload Document',
      uploaded[docId]
        ? `Remove ${doc?.label}?`
        : `This would open your camera/gallery to upload ${doc?.label}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: uploaded[docId] ? 'Remove' : 'Upload',
          onPress: () => {
            setUploaded((prev) => {
              const next = { ...prev };
              if (next[docId]) delete next[docId];
              else next[docId] = true;
              return next;
            });
          },
        },
      ]
    );
  };

  const validateAll = () => {
    const e = {};

    // Step 1
    if (!name.trim()) e.name = 'Full name is required';
    if (!phone.trim() || phone.length !== 10) e.phone = 'Enter exactly 10-digit mobile number';
    if (!email.trim() || !validateEmail(email)) e.email = 'Enter a valid email address';
    if (!dob) e.dob = 'Date of birth is required';
    if (!gender) e.gender = 'Please select gender';
    if (selectedServices.length === 0) e.services = 'Select at least 1 service';

    // Step 2
    if (!address.trim()) e.address = 'Address is required';
    if (!city) e.city = 'Select your city';
    if (!area) e.area = 'Select your area';
    if (!pincode.trim() || pincode.length !== 6) e.pincode = 'Valid 6-digit pincode required';
    if (!experience) e.experience = 'Select experience';

    // Step 3
    if (!allRequiredUploaded) e.documents = 'Please upload all required documents';

    // Step 4
    if (!pricingType) e.pricingType = 'Select pricing type';
    if (!rate.trim()) e.rate = 'Enter your rate';
    if (availableDays.length === 0) e.days = 'Select at least one day';
    if (timeSlots.length === 0) e.slots = 'Select at least one time slot';

    // Step 5
    if (!paymentMode) e.paymentMode = 'Select payment method';
    if (showUpi && !upiId.trim()) e.upiId = 'Enter your UPI ID';
    else if (showUpi && !validateUpi(upiId.trim())) e.upiId = 'Enter a valid UPI ID';
    if (showBank && !accountNo.trim()) e.accountNo = 'Enter account number';
    if (showBank && !ifsc.trim()) e.ifsc = 'Enter IFSC code';
    else if (showBank && !validateIfsc(ifsc.trim())) e.ifsc = 'Enter a valid IFSC code';
    if (!agreed) e.agreed = 'You must agree to the terms';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validateAll()) {
      Alert.alert('Form Incomplete', 'Please fill all required fields in all steps.');
      return;
    }

    const fullData = {
      name,
      phone,
      email,
      dob,
      gender,
      selectedServices,
      address,
      city,
      area,
      pincode,
      experience,
      bio,
      languages,
      documents: uploaded,
      pricingType,
      rate,
      minCharge,
      availableDays,
      timeSlots,
      hasVehicle,
      hasTools,
      paymentMode,
      upiId,
      bankName,
      accountNo,
      ifsc,
    };

    Alert.alert(
      'Registration Submitted',
      `Signup completed successfully for ${fullData.name}.`,
      [
        {
          text: 'OK',
          onPress: () => navigation?.navigate?.('SignIn'),
        },
      ]
    );
  };

  const YesNoToggle = ({ label, value, onChange }) => (
    <View style={styles.yesNoRow}>
      <Text style={styles.yesNoLabel}>{label}</Text>
      <View style={styles.yesNoButtons}>
        <TouchableOpacity
          style={[styles.yesNoBtn, value === true && styles.yesNoBtnActive]}
          onPress={() => onChange(true)}
        >
          <Text style={[styles.yesNoBtnText, value === true && styles.yesNoBtnTextActive]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.yesNoBtn, value === false && styles.yesNoBtnNo]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.yesNoBtnText, value === false && styles.yesNoBtnTextActive]}>
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getPricingLabel = () => {
    if (pricingType === 'Hourly Rate') return 'Rate per Hour (₹)';
    if (pricingType === 'Per Job / Visit') return 'Rate per Visit (₹)';
    if (pricingType === 'Monthly Package') return 'Monthly Rate (₹)';
    return 'Your Rate (₹)';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Provider Registration</Text>
        <View style={{ width: 40 }} />
      </View>

      <ProgressBar step={5} total={5} labels={STEP_LABELS} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader
          title="Complete Signup"
          subtitle="All signup steps are shown below in one page without changing the original step structure."
        />

        {/* STEP 1 */}
        <StepCard
          number="1"
          title="Basic & Services"
          subtitle="Tell us a bit about yourself and the services you provide"
        >
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            required
            error={errors.name}
          />

          <InputField
            label="Phone Number"
            placeholder="10-digit mobile number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={10}
            required
            error={errors.phone}
            leftText="🇮🇳 +91"
          />

          <InputField
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            required
            error={errors.email}
          />

          <DOBPicker
            label="Date of Birth"
            value={dob}
            onChange={setDob}
            required
            error={errors.dob}
          />

          <Dropdown
            label="Gender"
            options={GENDERS}
            value={gender}
            onChange={setGender}
            required
            error={errors.gender}
          />

          <View style={styles.divider} />
          <SectionHeader
            title="Your Services"
            subtitle="Select all services you can provide"
          />

          {errors.services ? <Text style={styles.serviceError}>⚠️ {errors.services}</Text> : null}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat) => {
              const catServices = ALL_SERVICES.filter((s) => s.category === cat);
              const selectedInCat = catServices.filter((s) => selectedServices.includes(s.id)).length;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catTab, activeCategory === cat && styles.catTabActive]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text
                    style={[
                      styles.catTabText,
                      activeCategory === cat && styles.catTabTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                  {selectedInCat > 0 && (
                    <View style={styles.catBadge}>
                      <Text style={styles.catBadgeText}>{selectedInCat}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <MultiSelectChips
            label={`${activeCategory} Services`}
            options={filteredServices}
            selected={selectedServices}
            onChange={setSelectedServices}
            required
          />

          {selectedServiceObjects.length > 0 && (
            <View style={styles.selectedPanel}>
              <View style={styles.selectedPanelHeader}>
                <Text style={styles.selectedPanelTitle}>
                  ✅ Selected Services ({selectedServiceObjects.length})
                </Text>
                <TouchableOpacity onPress={() => setSelectedServices([])}>
                  <Text style={styles.clearAllText}>Clear all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.selectedChips}>
                {selectedServiceObjects.map((svc) => (
                  <View key={svc.id} style={styles.selectedChip}>
                    <Text style={styles.selectedChipText}>
                      {svc.icon} {svc.label}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedServices(selectedServices.filter((s) => s !== svc.id))
                      }
                      style={styles.selectedChipRemove}
                    >
                      <Text style={styles.selectedChipRemoveText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </StepCard>

        {/* STEP 2 */}
        <StepCard
          number="2"
          title="Location"
          subtitle="Where do you offer your services?"
        >
          <TouchableOpacity
            style={styles.locationBtn}
            onPress={() => Alert.alert('Map Picker', 'You can connect your MapPicker screen here.')}
          >
            <Text style={styles.locationBtnText}>📍 Use Current Location</Text>
          </TouchableOpacity>

          <InputField
            label="Full Address"
            placeholder="House no., Street, Landmark"
            value={address}
            onChangeText={setAddress}
            multiline
            required
            error={errors.address}
          />

          <Dropdown
            label="City"
            options={CITIES}
            value={city}
            onChange={handleCityChange}
            required
            error={errors.city}
            placeholder="Select city..."
          />

          <Dropdown
            label="Area / Locality"
            options={areas.length > 0 ? areas : ['Select city first']}
            value={area}
            onChange={setArea}
            required
            error={errors.area}
            placeholder={city ? 'Select area...' : 'Select city first'}
          />

          <InputField
            label="Pincode"
            placeholder="6-digit pincode"
            value={pincode}
            onChangeText={handlePincodeChange}
            keyboardType="numeric"
            maxLength={6}
            required
            error={errors.pincode}
          />

          <View style={styles.gpsBanner}>
            <Text style={styles.gpsIcon}>📍</Text>
            <Text style={styles.gpsText}>
              We'll use GPS to show you nearby jobs automatically
            </Text>
          </View>

          <View style={styles.divider} />
          <SectionHeader
            title="Experience"
            subtitle="Help customers understand your background"
          />

          <Dropdown
            label="Years of Experience"
            options={EXPERIENCE_YEARS}
            value={experience}
            onChange={setExperience}
            required
            error={errors.experience}
          />

          <InputField
            label="About Yourself"
            placeholder="Describe your skills, specializations, and why customers should choose you..."
            value={bio}
            onChangeText={setBio}
            multiline
          />

          <MultiSelectChips
            label="Languages You Speak"
            options={LANGUAGES}
            selected={languages}
            onChange={setLanguages}
          />
        </StepCard>

        {/* STEP 3 */}
        <StepCard
          number="3"
          title="Documents"
          subtitle="Identity verification documents"
        >
          <View style={styles.secureNote}>
            <Text style={styles.secureIcon}>🔒</Text>
            <Text style={styles.secureText}>
              Your documents are encrypted and never shared without your consent
            </Text>
          </View>

          <View style={styles.uploadProgress}>
            <View style={styles.uploadProgressBar}>
              <View
                style={[
                  styles.uploadProgressFill,
                  { width: `${(uploadCount / DOCS.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.uploadProgressText}>
              {uploadCount}/{DOCS.length} documents uploaded
            </Text>
          </View>

          {errors.documents ? (
            <Text style={styles.serviceError}>⚠️ {errors.documents}</Text>
          ) : null}

          {DOCS.map((doc) => (
            <View key={doc.id}>
              <UploadBox
                label={doc.label}
                icon={doc.icon}
                uploaded={!!uploaded[doc.id]}
                onPress={() => toggleUpload(doc.id)}
                required={doc.required}
              />
              <Text style={styles.docHint}>{doc.hint}</Text>
            </View>
          ))}

          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
            <Text style={styles.tipItem}>• Use good lighting</Text>
            <Text style={styles.tipItem}>• Ensure all text is clear and readable</Text>
            <Text style={styles.tipItem}>• Accepted: JPG, PNG, PDF</Text>
            <Text style={styles.tipItem}>• Max file size: 5MB each</Text>
          </View>
        </StepCard>

        {/* STEP 4 */}
        <StepCard
          number="4"
          title="Pricing & Availability"
          subtitle="Set your pricing and work schedule"
        >
          <Dropdown
            label="Pricing Model"
            options={PRICING_TYPES}
            value={pricingType}
            onChange={setPricingType}
            required
            error={errors.pricingType}
          />

          {pricingType ? (
            <InputField
              label={getPricingLabel()}
              placeholder="e.g. 500"
              value={rate}
              onChangeText={handleRateChange}
              keyboardType="numeric"
              required
              error={errors.rate}
            />
          ) : null}

          <InputField
            label="Minimum Charge (₹)"
            placeholder="e.g. 300 (optional)"
            value={minCharge}
            onChangeText={handleMinChargeChange}
            keyboardType="numeric"
          />

          <View style={styles.tipBanner}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              Service provider with transparent pricing get 3x more bookings on average
            </Text>
          </View>

          <View style={styles.divider} />
          <SectionHeader
            title="Your Availability"
            subtitle="When are you available to take jobs?"
          />

          <MultiSelectChips
            label="Available Days"
            options={AVAILABILITY_DAYS}
            selected={availableDays}
            onChange={setAvailableDays}
            required
          />
          {errors.days ? <Text style={styles.errorText}>{errors.days}</Text> : null}

          <MultiSelectChips
            label="Preferred Time Slots"
            options={TIME_SLOTS}
            selected={timeSlots}
            onChange={setTimeSlots}
            required
          />
          {errors.slots ? <Text style={styles.errorText}>{errors.slots}</Text> : null}

          <View style={styles.divider} />
          <SectionHeader
            title="Additional Info"
            subtitle="Helps customers know what to expect"
          />

          <YesNoToggle
            label="🚗  Do you have your own vehicle?"
            value={hasVehicle}
            onChange={setHasVehicle}
          />

          <YesNoToggle
            label="🔧  Do you bring your own tools/equipment?"
            value={hasTools}
            onChange={setHasTools}
          />
        </StepCard>

        {/* STEP 5 */}
        <StepCard
          number="5"
          title="Payment"
          subtitle="Payment details and final agreement"
        >
          <Dropdown
            label="Payment Mode"
            options={PAYMENT_MODES}
            value={paymentMode}
            onChange={setPaymentMode}
            required
            error={errors.paymentMode}
          />

          {showUpi && (
            <InputField
              label="UPI ID"
              placeholder="yourname@upi"
              value={upiId}
              onChangeText={setUpiId}
              keyboardType="email-address"
              required
              error={errors.upiId}
            />
          )}

          {showBank && (
            <>
              <InputField
                label="Bank Name"
                placeholder="e.g. State Bank of India"
                value={bankName}
                onChangeText={setBankName}
              />
              <InputField
                label="Account Number"
                placeholder="Enter account number"
                value={accountNo}
                onChangeText={handleAccountNoChange}
                keyboardType="numeric"
                required
                error={errors.accountNo}
              />
              <InputField
                label="IFSC Code"
                placeholder="e.g. SBIN0001234"
                value={ifsc}
                onChangeText={(text) => setIfsc(text.toUpperCase())}
                required
                error={errors.ifsc}
              />
            </>
          )}

          {paymentMode === 'Cash' && (
            <View style={styles.cashNote}>
              <Text style={styles.cashNoteText}>
                💵 You'll collect payments directly from customers in cash
              </Text>
            </View>
          )}

          <View style={styles.divider} />
          <SectionHeader
            title="Registration Summary"
            subtitle="Review before submitting"
          />

          <View style={styles.summaryCard}>
            {[
              ['👤 Name', name],
              ['📱 Phone', phone],
              ['📧 Email', email],
              ['📍 City', city],
              ['📍 Area', area],
              ['🛠 Services', selectedServices.length ? `${selectedServices.length} selected` : '—'],
              ['⏱ Experience', experience],
              ['💰 Pricing', pricingType],
            ].map(([label, val]) =>
              val ? (
                <View key={label} style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{label}</Text>
                  <Text style={styles.summaryVal}>{val}</Text>
                </View>
              ) : null
            )}
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.agreeRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreeText}>
              I agree to the <Text style={styles.agreeLink}>Terms & Conditions</Text>,{' '}
              <Text style={styles.agreeLink}>Privacy Policy</Text>, and confirm all
              information provided is accurate
            </Text>
          </TouchableOpacity>
          {errors.agreed ? <Text style={styles.errorText}>{errors.agreed}</Text> : null}
        </StepCard>

        <PrimaryButton
          title="🚀 Submit Registration"
          onPress={handleSubmit}
          style={{ marginTop: SPACING.md }}
        />

        <SecondaryButton
          title="Already have an account? Sign In"
          onPress={() => navigation?.navigate?.('SignIn')}
          style={{ marginTop: 12, marginBottom: 30 }}
        />
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

  content: { padding: SPACING.lg, paddingBottom: 40 },

  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginTop: 2,
  },
  stepBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  stepCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  stepCardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  stepBody: { marginTop: 6 },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },

  serviceError: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
  },

  catScroll: { marginBottom: 14 },
  catTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  catTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  catTabText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  catTabTextActive: { color: COLORS.white },
  catBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  selectedPanel: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  selectedPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPanelTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  clearAllText: {
    fontSize: 12,
    color: COLORS.error,
    fontWeight: '600',
  },
  selectedChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedChipText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  selectedChipRemove: { marginLeft: 5 },
  selectedChipRemoveText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '700',
  },

  locationBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  locationBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  gpsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 10,
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  gpsIcon: { fontSize: 18, marginRight: 8 },
  gpsText: {
    fontSize: 13,
    color: '#1565C0',
    fontWeight: '500',
    flex: 1,
  },

  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: SPACING.md,
  },
  secureIcon: { fontSize: 18, marginRight: 8 },
  secureText: {
    fontSize: 13,
    color: '#283593',
    fontWeight: '500',
    flex: 1,
  },

  uploadProgress: { marginBottom: SPACING.md },
  uploadProgressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 4,
  },
  uploadProgressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 10,
  },
  uploadProgressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  docHint: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: -4,
    marginBottom: 10,
    marginLeft: 4,
  },

  tipsCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5D4037',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#795548',
    lineHeight: 22,
  },

  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.md,
    padding: 10,
    marginBottom: SPACING.md,
  },
  tipIcon: { fontSize: 18, marginRight: 8 },
  tipText: {
    fontSize: 13,
    color: '#795548',
    fontWeight: '500',
    flex: 1,
  },

  yesNoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  yesNoLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
  },
  yesNoButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  yesNoBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  yesNoBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  yesNoBtnNo: {
    backgroundColor: COLORS.textSecondary,
    borderColor: COLORS.textSecondary,
  },
  yesNoBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  yesNoBtnTextActive: { color: COLORS.white },

  cashNote: {
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.md,
    padding: 12,
    marginTop: 4,
  },
  cashNoteText: {
    color: COLORS.success,
    fontSize: 13,
    fontWeight: '500',
  },

  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  summaryVal: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1.5,
    textAlign: 'right',
  },

  agreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  agreeText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  agreeLink: {
    color: COLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
  },
});