const Category_url = 'http://localhost:3001/api/v1/categories';

async function getCategories() {
    try {
        const response = await fetch(Category_url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener las categorías.');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
}

export { getCategories };
