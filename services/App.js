import React, { useMemo, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AllServicesScreen from "./screens/AllServicesScreen";
import BookingScreen from "./screens/BookingScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import DoctorScreen from "./screens/DoctorScreen";
import DriverPage from "./screens/DriverPage";
import ElectricianScreen from "./screens/ElectricianScreen";
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
import LoginScreen from "./screens/LoginScreen";
import MaidScreen from "./screens/MaidScreen";
import MedicalWorkersListScreen from "./screens/MedicalWorkersListScreen";
import PersonalDetailsScreen from "./screens/PersonalDetailsScreen";
import PlumberPage from "./screens/Plumberpage";
import PoolCleaningScreen from "./screens/PoolCleaningScreen";
import RepairsPage from "./screens/RepairsPage";
import ServiceMemberScreen from "./screens/ServiceMemberScreen";
import SignupScreen from "./screens/SignupScreen";
import WorkerListScreen from "./screens/WorkerListScreen";
import WorkersCategoryListScreen from "./screens/Workerslistscreen";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import ProviderTabs from "./user/ProviderTabs";

const ROUTES = {
  Login: LoginScreen,
  SignIn: SignIn,
  Signup: SignupScreen,
  SignupAllInOne: SignUp,
  ProviderTabs: ProviderTabs,
  ForgotPassword: ForgotPasswordScreen,
  Home: HomeScreen,
  PersonalDetails: PersonalDetailsScreen,
  ServiceMembers: ServiceMemberScreen,
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
  Electrician: ElectricianScreen,
  FurnitureAssembly: FurnitureAssemblyPage,
  Handyman: HandymanPage,
  Maid: MaidScreen,
  HomeRenovation: HomeRenovationPage,
  Plumber: PlumberPage,
  PoolCleaning: PoolCleaningScreen,
  SecurityGuard: GuardScreen,
  AllServices: AllServicesScreen,
  WorkersList: WorkerListScreen,
  Booking: BookingScreen,
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
