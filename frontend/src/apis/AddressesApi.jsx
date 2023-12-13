const Addresses_url = 'http://localhost:3001/api/v1/addresses';

async function getAddresses() {
    try {
        const response = await fetch(Addresses_url);
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
}

export { getAddresses };
