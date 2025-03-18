import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function captureImage() {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          exif: false,
          skipProcessing: false,
        });
        console.log("Photo captured:", photo); // Log the full photo object
        console.log("Photo URI:", photo.uri); // Log just the URI
        setCapturedImage(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }

  async function analyzeImage(imageUri) {
    try {
      setLoading(true);

      // Upload the image to your API
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "plant_image.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        "https://dev.api.taniverse.id/thinkflow/plant-disease/analyzer/",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      setAnalysisResult(result);
      console.log("Analysis result:", result);
      setLoading(false);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setLoading(false);
      setAnalysisResult({
        error: "Failed to analyze image. Please try again.",
      });
    }
  }

  if (analysisResult) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Analysis Results</Text>
            <View style={styles.severityBadge}>
              <Text style={styles.severityText}>
                {analysisResult.severity === "low"
                  ? "Low Risk"
                  : analysisResult.severity === "medium"
                  ? "Medium Risk"
                  : "High Risk"}
              </Text>
            </View>
          </View>

          {/* Disease Image and Basic Info */}
          <View style={styles.imageAndSummary}>
            <Image
              source={{ uri: analysisResult.image || capturedImage }}
              style={styles.resultImage}
              resizeMode="cover"
            />
            <View style={styles.basicInfoContainer}>
              <Text style={styles.diseaseName}>
                {analysisResult.disease_name}
              </Text>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence:</Text>
                <View style={styles.confidenceBarOuter}>
                  <View
                    style={[
                      styles.confidenceBarInner,
                      { width: `${analysisResult.confidence * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.confidenceValue}>
                  {Math.round(analysisResult.confidence * 100)}%
                </Text>
              </View>
            </View>
          </View>

          {/* Mini Article */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About the Disease</Text>
            <Text style={styles.articleText}>
              {analysisResult.mini_article}
            </Text>
          </View>

          {/* Symptoms */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            {analysisResult.symptoms &&
              analysisResult.symptoms.map((symptom, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.listItemText}>{symptom}</Text>
                </View>
              ))}
          </View>

          {/* Treatment Recommendations */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Treatment Recommendations</Text>
            {analysisResult.treatment_recommendations &&
              analysisResult.treatment_recommendations.map(
                (treatment, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listItemText}>{treatment}</Text>
                  </View>
                )
              )}
          </View>

          {/* Preventive Measures */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preventive Measures</Text>
            {analysisResult.preventive_measures &&
              analysisResult.preventive_measures.map((measure, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.listItemText}>{measure}</Text>
                </View>
              ))}
          </View>

          <TouchableOpacity
            style={styles.newScanButton}
            onPress={() => {
              setAnalysisResult(null);
              setCapturedImage(null);
            }}
          >
            <Text style={styles.newScanButtonText}>Take Another Photo</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: capturedImage }}
          style={styles.capturedImage}
          resizeMode="contain"
          onError={(error) =>
            console.error("Error loading image:", error.nativeEvent.error)
          }
        />
        <View style={styles.capturedButtonContainer}>
          <TouchableOpacity
            style={styles.capturedButton}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.capturedButton, styles.analyzeButton]}
            onPress={() => analyzeImage(capturedImage)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.text}>Analyze</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton} onPress={captureImage}>
            <Text style={styles.text}>Start Scan</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: "80%",
    height: "30%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  scanButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  capturedImage: {
    width: "100%",
    height: "80%",
    backgroundColor: "#f0f0f0", // Add background color to see the bounds
  },
  capturedButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
  capturedButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#666",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  analyzeButton: {
    backgroundColor: "green",
  },
  resultImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  resultContainer: {
    padding: 20,
    flex: 1,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 15,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#f39c12",
  },
  severityText: {
    color: "white",
    fontWeight: "bold",
  },
  imageAndSummary: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  basicInfoContainer: {
    padding: 15,
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  confidenceLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#7f8c8d",
  },
  confidenceBarOuter: {
    flex: 1,
    height: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
    marginRight: 10,
  },
  confidenceBarInner: {
    height: "100%",
    backgroundColor: "#2ecc71",
    borderRadius: 5,
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  sectionContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingBottom: 5,
  },
  articleText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#34495e",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 10,
    color: "#27ae60",
    fontWeight: "bold",
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: "#34495e",
    lineHeight: 22,
  },
  newScanButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  newScanButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
