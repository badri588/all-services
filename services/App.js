import React, { useMemo, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AllServicesScreen from "./screens/AllServicesScreen";
import BeauticianScreen from "./screens/BeauticianScreen";
import BirthdayDecorationScreen from "./screens/BirthdayDecorationScreen";
import BookingScreen from "./screens/BookingScreen";
import CateringServicesScreen from "./screens/CateringServicesScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import DoctorScreen from "./screens/DoctorScreen";
import DriverPage from "./screens/DriverPage";
import ElectricianScreen from "./screens/ElectricianScreen";
import EventPhotographyScreen from "./screens/EventPhotographyScreen";
import FitnessYogaTrainerScreen from "./screens/FitnessYogaTrainerScreen";
import FurnitureAssemblyPage from "./screens/FurnitureAssemblyPage";
import GuardScreen from "./screens/GuardScreen";
import HandymanPage from "./screens/HandymanPage";
import HomeACRepairScreen from "./screens/HomeACRepairScreen";
import HomeCarpenterScreen from "./screens/HomeCarpenterScreen";
import HomeCarWashScreen from "./screens/HomeCarWashScreen";
import HomeCleaningScreen from "./screens/HomeCleaningScreen";
import HomeCookScreen from "./screens/HomeCookScreen";
import HomeGardenScreen from "./screens/HomeGardenScreen";
import HomeLaundryScreen from "./screens/HomeLaundryScreen";
import HomeNurseScreen from "./screens/HomeNurseScreen";
import HomePaintingScreen from "./screens/HomePaintingScreen";
import HomePestControlScreen from "./screens/HomePestControlScreen";
import HomeRenovationPage from "./screens/HomeRenovationPage";
import HomeRoofingScreen from "./screens/HomeRoofingScreen";
import HomeSalonScreen from "./screens/HomeSalonScreen";
import HomeSewageScreen from "./screens/HomeSewageScreen";
import HomeShiftingScreen from "./screens/HomeShiftingScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeTilingScreen from "./screens/HomeTilingScreen";
import HomeTutionScreen from "./screens/HomeTutionScreen";
import HomeWaterTankScreen from "./screens/HomeWaterTankScreen";
import JobDetailScreen from "./screens/JobDetailScreen";
import LabTestAtHomeScreen from "./screens/LabTestAtHomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MaidScreen from "./screens/MaidScreen";
import MassageTherapyScreen from "./screens/MassageTherapyScreen";
import MedicalWorkersListScreen from "./screens/MedicalWorkersListScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import MyWalletScreen from "./screens/MyWalletScreen";
import PartyPlannerScreen from "./screens/PartyPlannerScreen";
import PersonalDetailsScreen from "./screens/PersonalDetailsScreen";
import PhysiotherapyScreen from "./screens/PhysiotherapyScreen";
import PlumberPage from "./screens/Plumberpage";
import PoolCleaningScreen from "./screens/PoolCleaningScreen";
import RepairsPage from "./screens/RepairsPage";
import ServiceMemberScreen from "./screens/ServiceMemberScreen";
import SignupScreen from "./screens/SignupScreen";
import WifiSetupInstallationScreen from "./screens/WifiSetupInstallationScreen";
import WorkerListScreen from "./screens/WorkerListScreen";
import WorkersCategoryListScreen from "./screens/Workerslistscreen";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import ProviderTabs from "./user/ProviderTabs";
import ProviderBookingsScreen from "./user/MyBookingsScreen";
import ProviderEarningsScreen from "./user/Earnings";
import ProviderProfileScreen from "./user/Profile";
import ProviderScheduleScreen from "./user/MyScheduleScreen";
import ProviderNotificationsScreen from "./user/NotificationsScreen";
import ProviderBookingDetailsScreen from "./user/BookingDetailsScreen";
import ProviderLiveTrackingScreen from "./user/LiveTrackingScreen";

const ROUTES = {
  Login: LoginScreen,
  SignIn: SignIn,
  Signup: SignupScreen,
  SignupAllInOne: SignUp,
  ProviderTabs: ProviderTabs,
  ProviderHome: ProviderTabs,
  ProviderBookings: ProviderBookingsScreen,
  ProviderEarnings: ProviderEarningsScreen,
  ProviderProfile: ProviderProfileScreen,
  ProviderSchedule: ProviderScheduleScreen,
  ProviderNotifications: ProviderNotificationsScreen,
  ProviderBookingDetails: ProviderBookingDetailsScreen,
  ProviderLiveTracking: ProviderLiveTrackingScreen,
  ForgotPassword: ForgotPasswordScreen,
  Home: HomeScreen,
  PersonalDetails: PersonalDetailsScreen,
  ServiceMembers: ServiceMemberScreen,
  Beautician: BeauticianScreen,
  BirthdayDecoration: BirthdayDecorationScreen,
  CateringServices: CateringServicesScreen,
  HomeACRepair: HomeACRepairScreen,
  HomeCarpenter: HomeCarpenterScreen,
  HomeCarWash: HomeCarWashScreen,
  HomeCleaning: HomeCleaningScreen,
  HomeCook: HomeCookScreen,
  HomeGarden: HomeGardenScreen,
  HomeLaundry: HomeLaundryScreen,
  HomeSalon: HomeSalonScreen,
  HomePainting: HomePaintingScreen,
  HomePestControl: HomePestControlScreen,
  HomeRoofing: HomeRoofingScreen,
  HomeSewage: HomeSewageScreen,
  HomeShifting: HomeShiftingScreen,
  HomeTution: HomeTutionScreen,
  HomeTiling: HomeTilingScreen,
  HomeWaterTank: HomeWaterTankScreen,
  HomeNurse: HomeNurseScreen,
  Doctor: DoctorScreen,
  Driver: DriverPage,
  DriverNeeded: DriverPage,
  Electrician: ElectricianScreen,
  EventPhotography: EventPhotographyScreen,
  FitnessYogaTrainer: FitnessYogaTrainerScreen,
  FurnitureAssembly: FurnitureAssemblyPage,
  Handyman: HandymanPage,
  LabTestAtHome: LabTestAtHomeScreen,
  Maid: MaidScreen,
  MassageTherapy: MassageTherapyScreen,
  HomeRenovation: HomeRenovationPage,
  PartyPlanner: PartyPlannerScreen,
  Plumber: PlumberPage,
  PoolCleaning: PoolCleaningScreen,
  Physiotherapy: PhysiotherapyScreen,
  SecurityGuard: GuardScreen,
  AllServices: AllServicesScreen,
  WifiSetupInstallation: WifiSetupInstallationScreen,
  WorkersList: WorkerListScreen,
  Booking: BookingScreen,
  MyBookings: MyBookingsScreen,
  MyWallet: MyWalletScreen,
  MyProfile: MyProfileScreen,
  MedicalWorkersList: MedicalWorkersListScreen,
  WorkersCategoryList: WorkersCategoryListScreen,
  JobDetail: JobDetailScreen,
};

export default function App() {
  const [stack, setStack] = useState([{ routeName: "Login", params: {} }]);

  const currentEntry = stack[stack.length - 1];
  const ScreenComponent = ROUTES[currentEntry.routeName] ?? LoginScreen;

  const navigation = useMemo(
    () => ({
      navigate: (routeName, params = {}) => {
        if (!ROUTES[routeName]) {
          return;
        }

        setStack((prev) => [...prev, { routeName, params }]);
      },
      goBack: () => {
        setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
      },
      reset: (routeName, params = {}) => {
        if (!ROUTES[routeName]) {
          return;
        }

        setStack([{ routeName, params }]);
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScreenComponent
          navigation={navigation}
          route={{ params: currentEntry.params }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
});
