import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

const EmpleadoSubida = ({ route }) => {
  const { idEmpleado, nombreEmpleado } = route.params;
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.type === "success") {
        setArchivoSeleccionado(result);
        setNombreArchivo(result.name);
      }
    } catch (err) {
      console.log("Error al seleccionar el documento:", err);
    }
  };

  const subirArchivo = async () => {
    if (!archivoSeleccionado) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("id_empleado", idEmpleado);
    formData.append("nombre_archivo", {
      uri: archivoSeleccionado.uri,
      name: archivoSeleccionado.name,
      type: archivoSeleccionado.type,
    });

    try {
      console.log(formData);
      const response = await axios.post(
        "https://api-nazar-production.up.railway.app/api/archivos/",
        formData
      );

      console.log("Archivo subido correctamente:", response.data);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>EmpleadoSubida</Text>
      <Text>Nombre del empleado: {nombreEmpleado}</Text>
      <Button title="Seleccionar documento" onPress={handleDocumentPicker} />
      <Button title="Subir archivo" onPress={subirArchivo} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default EmpleadoSubida;
