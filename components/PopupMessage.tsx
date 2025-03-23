import React, { useEffect } from "react";
import { Text, Animated } from "react-native";

const PopoutMessage = ({ message, visible, onHide }: { message: string; visible: boolean; onHide: () => void }) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(onHide);
                }, 2000); // Hide after 2 seconds
            });
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={{
                position: "absolute",
                bottom: 100,
                alignSelf: "center",
                backgroundColor: "purple",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                opacity: fadeAnim,
            }}
        >
            <Text style={{ color: "white", fontSize: 16 }}>{message}</Text>
        </Animated.View>
    );
};

export default PopoutMessage;