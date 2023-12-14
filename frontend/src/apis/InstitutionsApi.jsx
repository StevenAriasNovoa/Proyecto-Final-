const Institution_url = 'http://localhost:3001/api/v1/institutions';
const name_Institution_Url = 'http://localhost:3001/api/v1/institutions/';

async function getInstitutions() {
    try {
        const response = await fetch(Institution_url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener las instituciones.');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
}

const fetchInstitutionName = async (institutionId) => {
    try {
        const url = `${name_Institution_Url}${institutionId}`;
        console.log('URL de la solicitud:', url);

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la respuesta de la API de instituciones');
        }

        const data = await response.json();

        if (!data || !data.name) {
            console.log('La respuesta de la API de instituciones no contiene un nombre válido.');
            return { name: "Nombre no disponible" };
        }

        return data;
    } catch (error) {
        console.error('Error al obtener nombre de la institución:', error);
        throw error;
    }
};




export { getInstitutions, fetchInstitutionName };




