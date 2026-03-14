/**
 * Importa múltiples fragmentos de un archivo externo y los une en un contenedor.
 * @param {string} urlArchivo - Ruta al HTML (ej: '../../templates/user/profile.html')
 * @param {Array} selectores - Lista de clases o IDs (ej: ['.avatar', '.name-row'])
 * @param {string} idDestino - ID del contenedor en el dashboard
 */
async function importarMultiplesFragmentos(urlArchivo, selectores, idDestino) {
    const contenedorDestino = document.getElementById(idDestino);
 
    if (!contenedorDestino) return; // evita crash si el contenedor no existe
 
    try {
        const response = await fetch(urlArchivo);
 
        if (!response.ok) {
            console.warn(`Archivo no encontrado: ${urlArchivo}`);
            return;
        }
 
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
 
        contenedorDestino.innerHTML = '';
 
        selectores.forEach(selector => {
            const elementoOrigen = doc.querySelector(selector);
            if (elementoOrigen) {
                const clon = elementoOrigen.cloneNode(true);
                contenedorDestino.appendChild(clon);
            } else {
                console.warn(`Selector "${selector}" no encontrado en ${urlArchivo}`);
            }
        });
 
    } catch (error) {
        console.error(`Error cargando fragmentos de ${urlArchivo}:`, error);
        contenedorDestino.innerHTML = '<p class="text-danger">Error de carga</p>';
    }
}
 
// Carta 1: Perfil (avatar y trofeo destacado)
importarMultiplesFragmentos('../../templates/user/profile.html', ['.avatar', '.insignia', '.name-insignia', '.link'], 'preview-profile');
 
// Carta 2: Actividad (racha y lista de actividad)
importarMultiplesFragmentos('../../templates/user/profile.html', ['.stats', '.activity'], 'preview-activity');
 
// Carta 3: Cursos — corregido: era "courser.html", el archivo real es "courses.html"
importarMultiplesFragmentos('../../templates/user/courses.html', ['.cursos', '.module', '.btn-continue'], 'preview-courses');
 