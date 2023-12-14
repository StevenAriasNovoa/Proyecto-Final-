import { useState, useEffect } from "react";

const PrivateText = ({ currUser }) => {
    const [message, setMessage] = useState(null);

    const getText = async () => {
        try {
            // Obtiene el token almacenado
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3001/private/test", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setMessage(data.message);
        } catch (error) {
            console.log("Error al obtener el texto privado", error);
            setMessage(error.message);
        }
    };


    useEffect(() => {
        // Llama a getText cuando currUser cambia
        if (currUser) {
            getText();
        }
    }, [currUser]);

    return <div>{message}</div>;
};

export default PrivateText;
