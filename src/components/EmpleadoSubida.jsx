import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import axios from "axios";

const EmpleadoSubida = ({ route }) => {
  const { idEmpleado, nombreEmpleado } = route.params;
  const [nombreArchivo, setNombreArchivo] = useState("");

  const handleUpload = () => {
    // Verifica si se ha ingresado un nombre de archivo antes de continuar
    if (!nombreArchivo) {
      alert("Por favor, ingresa un nombre de archivo.");
      return;
    }

    const data = {
      id_empleado: idEmpleado,
      nombre_archivo: nombreArchivo,
    };

    // Realiza la solicitud POST a la API usando axios
    axios
      .post("https://api-nazar-production.up.railway.app/api/archivos/", data)
      .then((response) => {
        console.log("Archivo subido correctamente:", response.data);
        // Puedes realizar acciones adicionales después de la carga exitosa
      })
      .catch((error) => {
        console.error("Error al subir el archivo:", error);
        // Maneja los errores si ocurren durante la carga
      });
  };

  return (
    <View>
      <Text style={styles.heading}>EmpleadoSubida</Text>
      <Text>Nombre del empleado: {nombreEmpleado}</Text>
      <Text>ID del empleado: {idEmpleado}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del archivo"
        value={nombreArchivo}
        onChangeText={setNombreArchivo}
      />
      <Button title="Subir archivo" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default EmpleadoSubida;
