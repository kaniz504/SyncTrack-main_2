import {
  Tabs,
} from "expo-router";

import {
  Feather,
} from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          position: "absolute",

          bottom: 16,

          left: 16,

          right: 16,

          height: 72,

          borderRadius: 24,

          backgroundColor:
            "#0F172A",

          borderTopWidth: 0,

          elevation: 0,

          shadowColor: "#000",

          shadowOpacity: 0.2,

          shadowRadius: 12,

          paddingBottom: 10,

          paddingTop: 10,
        },

        tabBarActiveTintColor:
          "#7EA6FF",

        tabBarInactiveTintColor:
          "#64748B",

        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "700",

          marginTop: 4,
        },
      }}
    >
      {/* HOME */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Feather
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* DASHBOARD */}

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Feather
              name="grid"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PROFILE */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Feather
              name="user"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}