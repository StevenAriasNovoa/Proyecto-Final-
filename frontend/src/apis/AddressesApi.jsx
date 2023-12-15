const AddressesUrl = 'http://localhost:3001/api/v1/addresses';

const getAddresses = async () => {
  try {
    const response = await fetch(AddressesUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error al obtener las ubicaciones.');
      return null;
    }
  } catch (error) {
    console.error('Error de red:', error);
    return null;
  }
};

const fetchCourseAddresses = async (courseId) => {
  try {
    const url = `http://localhost:3001/api/v1/courses/${courseId}/addresses`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la respuesta de la API de direcciones');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    throw error;
  }
};

export { getAddresses, fetchCourseAddresses };
