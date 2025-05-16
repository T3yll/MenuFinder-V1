import { CreateAdressDto } from "@/resources/adress/dto/create-adress.dto";
import { Adress } from "@/resources/adress/entities/adress.entity";
import { AxiosResponse } from "axios";
import axios from "axios";
import { Logger } from "winston";
import * as winston from "winston";

const APIBAN = "https://api-adresse.data.gouv.fr/search/";

export const GetCoordinates = async (address: CreateAdressDto): Promise<{ lat: number; lon: number }> => {
    const { number, street, city, postal_code, country } = address;
    const url = `${APIBAN}?q=${number}+${street}+${postal_code}+${city}`.replace(/ /g, "+") + `&limit=1`; 

    console.log(`Fetching coordinates for address: ${url}`);
    //logger.info(`Fetching coordinates for address: ${number} ${street}, ${postal_code} ${city}, ${country}`);
    const response: AxiosResponse = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 200) {
        return {
        lat: null,
        lon: null
    };
    }
    const data = response.data;
    if (data.features.length === 0) {
        return {
        lat: null,
        lon: null
    };
    }
    const coordinates = data.features[0].geometry.coordinates;

    console.log(`Coordinates found: ${coordinates[1]}, ${coordinates[0]}`);

    return {
        lat: coordinates[1],
        lon: coordinates[0],
    };


};