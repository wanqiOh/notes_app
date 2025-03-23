import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import NewNoteScreen from "../screens/NewNote";
import SummaryScreen from "../screens/Summary";

const Tab = createBottomTabNavigator();

const BottomTabNav: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "help-circle"; // 避免 TypeScript 报错

                    switch (route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "NewNote":
                            iconName = "add-circle";
                            break;
                        case "Summary":
                            iconName = "stats-chart";
                            break;
                        case "Settings":
                            iconName = "settings";
                            break;
                    }

                    return <Ionicons
                        name={iconName}
                        size={iconName === "add-circle" ? 30 : size}
                        color={color} />;
                },
                tabBarStyle: { backgroundColor: "#25163E" },
                tabBarActiveTintColor: "#FF3B78",
                tabBarInactiveTintColor: "#A0A0A0",
                headerShown: false, // 隐藏顶部默认 Header
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="NewNote" component={NewNoteScreen} options={{ tabBarShowLabel: false, title: "" }} />
            <Tab.Screen name="Summary" component={SummaryScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNav;