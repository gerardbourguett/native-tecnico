import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";

const EmpleadoSubida = ({ route }) => {
  const { idEmpleado, nombreEmpleado } = route.params;
  const [loading, setLoading] = useState(true);
  const [empleadosPorId, setEmpleadosPorId] = useState([]);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [archivosDelEmpleado, setArchivosDelEmpleado] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    setLoading(true);
    // Hacemos la solicitud a la API para obtener los empleados con el mismo idEmpleado
    axios
      .get(
        `https://apirest-production-90e7.up.railway.app/api/empleados/${idEmpleado}/archivos/`
      )
      .then((response) => {
        setEmpleadosPorId(response.data);
        setArchivosDelEmpleado(response.data.archivos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching empleados por ID:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleSubirDatos = () => {
    if (!nombreArchivo) {
      alert("Por favor, ingresa un nombre de archivo.");
      return;
    }

    const datosData = {
      id_empleado: idEmpleado,
      nombre_archivo: nombreArchivo,
    };

    // Realizamos la solicitud POST a la API para subir los datos
    axios
      .post(
        "https://apirest-production-90e7.up.railway.app/api/archivos/",
        datosData
      )
      .then((response) => {
        console.log("Datos subidos correctamente:", response.data);
        cargarDatos(); // Actualizamos la lista de archivos después de subir los datos
      })
      .catch((error) => {
        console.error("Error al subir los datos:", error);
      });
  };

  return (
    <View>
      <Text style={styles.heading}>EmpleadoSubida</Text>
      <Text>Nombre del empleado: {nombreEmpleado}</Text>
      <Text>Archivos subidos por el empleado:</Text>
      {archivosDelEmpleado.length === 0 ? (
        <Text>No se han subido archivos.</Text>
      ) : (
        <FlatList
          data={archivosDelEmpleado}
          renderItem={({ item }) => <Text>{item.nombre_archivo}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nombre del archivo"
        value={nombreArchivo}
        onChangeText={setNombreArchivo}
      />

      <Button title="Subir datos" onPress={handleSubirDatos} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default EmpleadoSubida;
