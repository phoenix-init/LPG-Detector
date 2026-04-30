import { CameraView, useCameraPermissions } from "expo-camera";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react"; 
import { useQrStore } from "@/store/useQrStore";

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isTorchOn, setIsTorchOn] = useState<boolean>(false);
    const [scanned, setScanned] = useState<boolean>(false);

    const {setIsOpeningQR} = useQrStore();

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        
        if (scanned) return; 
        
        setScanned(true);
        console.log("Scanned Data:", data); 
        
        // TODO: backend logic here
        
        setTimeout(() => setScanned(false), 2000); 
    };

    if (!permission) {
        return <View />;
    }

    // 2. If permission is denied, show a button to ask for it
    if (!permission.granted) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', marginBottom: 20 }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                enableTorch={isTorchOn} 
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            />

            <View style={styles.overlay}>
                
                {/* Header Controls */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => setIsOpeningQR()}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => setIsTorchOn(!isTorchOn)}
                    >
                        <Text style={styles.buttonText}>
                            {isTorchOn ? "Flash: ON" : "Flash: OFF"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Targeting Box */}
                <View style={styles.reticleContainer}>
                    <View style={styles.reticle} />
                </View>

                {/* Footer Instructions */}
                <View style={styles.footer}>
                    <Text style={styles.instructionText}>
                        Align the QR code within the frame to scan
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', 
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    iconButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    reticleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reticle: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#ffffff', 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: 20,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        overflow: 'hidden',
    }
});