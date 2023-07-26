import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { DocumentPicker } from "react-native-document-picker";

const EmpleadoSubida = ({ route }) => {
  const { idEmpleado, nombreEmpleado } = route.params;
  const [loading, setLoading] = useState(true);
  const [empleadosPorId, setEmpleadosPorId] = useState([]);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [descripcionArchivo, setDescripcionArchivo] = useState("");
  const [archivosDelEmpleado, setArchivosDelEmpleado] = useState([]);

  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Canceled");
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    setLoading(true);
    axios
      .get(
        `https://apirest-production-90e7.up.railway.app/api/empleados/${idEmpleado}/archivos/`
      )
      .then((response) => {
        setEmpleadosPorId(response.data);
        setArchivosDelEmpleado(response.data);
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

  /* const handleSubirDatos = () => {
    if (!nombreArchivo || !descripcionArchivo) {
      alert("Por favor, ingresa un nombre y una descripción para el archivo.");
      return;
    }
    const datosData = {
      empleado: idEmpleado,
      nombre_archivo: nombreArchivo,
      descripcion: descripcionArchivo,
      archivo: "hola.pdf",
      fecha: new Date().toISOString(),
    };
    axios
      .post(
        "https://apirest-production-90e7.up.railway.app/api/archivos/",
        datosData
      )
      .then((response) => {
        console.log("Datos subidos correctamente:", response.data);
        cargarDatos();
      })
      .catch((error) => {
        console.error("Error al subir los datos:", error);
      });
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>EmpleadoSubida</Text>
      <Text>Nombre del empleado: {nombreEmpleado}</Text>
      <Text style={styles.heading}>Archivos subidos por el empleado:</Text>
      {archivosDelEmpleado.length === 0 ? (
        <Text>No se han subido archivos.</Text>
      ) : (
        <View style={styles.tableContainer}>
          {archivosDelEmpleado.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tableRow}
              onPress={() =>
                Linking.openURL(
                  `https://apirest-production-90e7.up.railway.app${item.archivo}`
                )
              }
            >
              <Text style={styles.tableCell}>
                Nombre del archivo: {item.nombre_archivo}
              </Text>
              <Text style={styles.tableCellLink}>Ver</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
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
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    alignSelf: "stretch", // Make the container take the full width of the parent
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
  },
  tableCellLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
export default EmpleadoSubida;
