import axios from "axios";

const url = import.meta.env.VITE_API_URL || ""

const getAllFood = async() => {
    try {
        let result = await axios.get(`${url}/food`)
        return result.data
    } catch (error) {
        throw error
    }
}

const createNewFood = async(data: {name: string}) => {
    try {
        return await axios.request({
            method: "POST",
            url: `${url}/food`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
    } catch (error) {
        throw error
    }
}

const deleteFood = async(id: string) => {
    try {
        return await axios.request({
            method: "DELETE",
            url: `${url}/food/${id}`
        })
    } catch (error) {
        throw error
    }
}

export {
    getAllFood,
    createNewFood,
    deleteFood
}