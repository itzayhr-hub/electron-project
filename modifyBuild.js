// scripts/modify-index-dts.js
import replace from "replace-in-file"

const options = {
    // Archivo en el que queremos hacer las modificaciones
    files: 'dist/index.html',

    // Patrón a buscar y reemplazar
    from: new RegExp("/assets", "g"),
    to: "assets", // Personaliza la ruta de la importación según tus necesidades
    countMatches: true,
    // Opciones adicionales para replace-in-file
    // ...
};

try {
    const results = replace.sync(options);
    console.log('Rutas de importación modificadas con éxito:', results);
} catch (error) {
    console.error('Error al modificar las rutas de importación:', error);
}