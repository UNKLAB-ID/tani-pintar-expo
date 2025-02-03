import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";

const VerificationScreen = ({ navigation }: any) => {
    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60); // Timer for resending code
    const [error, setError] = useState("");
    const [isResendEnabled, setIsResendEnabled] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    setIsResendEnabled(true); // Enable resend after timer reaches 0
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleVerifyCode = () => {
        const enteredCode = code.join("");
        if (enteredCode.length !== 4) {
            setError("Please enter all 4 digits.");
            return;
        }

        console.log("Verifying code:", enteredCode);
        navigation.navigate("Home");
    };

    const handleResendCode = () => {
        if (isResendEnabled) {
            setTimer(60); // Reset the timer
            setIsResendEnabled(false);
            // Logic to resend the code (e.g., API call)
            console.log("Resending verification code...");
        } else {
            setError("You can only resend the code after the timer runs out.");
        }
    };

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.slice(0, 1); // Only allow one digit per box
        setCode(newCode);

        // Move focus to the next input field
        if (text && index < 3) {
            const nextInput = index + 1;
            (nextInput as any).focus();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Input Verification Code</Text>
            <Text style={styles.subtitle}>
                We have sent a code to bausGanteng@gmail.com
            </Text>

            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        autoFocus={index === 0}
                    />
                ))}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                <Text style={styles.buttonText}>Verify Now</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Send code again </Text>
                <Text style={styles.timerText}>
                    {timer > 0
                        ? `00:${String(timer).padStart(2, "0")}`
                        : "00:00"}
                </Text>
                <TouchableOpacity
                    onPress={handleResendCode}
                    disabled={!isResendEnabled}
                >
                    <Text
                        style={[
                            styles.resendText,
                            !isResendEnabled && styles.disabledText,
                        ]}
                    >
                        {isResendEnabled ? "Resend Code" : "Wait to Resend"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        top: 100,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#166953",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#888",
        marginBottom: 40,
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    input: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#166953",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 12,
    },
    button: {
        width: "100%",
        backgroundColor: "#166953",
        padding: 18,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: "#888",
    },
    timerText: {
        fontSize: 18,
        color: "#166953",
        marginLeft: 8,
        fontWeight: "bold",
    },
    resendText: {
        fontSize: 16,
        color: "#166953",
        marginLeft: 8,
        textDecorationLine: "underline",
    },
    disabledText: {
        color: "#aaa", // Grey out the text when resend is disabled
        textDecorationLine: "none",
    },
});

export default VerificationScreen;
