import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly repository: Repository<Restaurant>
    ) {}

    async create(dto: CreateRestaurantDto): Promise<Restaurant> {
        const entity = this.repository.create({
            ...dto,
        })

        return this.repository.save(entity)
    }

    async calculatedDeliveryFee(restaurantId: number, userLat: number, userLong: number): Promise<number> {
        const restaurant = await this.repository.findOne({ where: { id: restaurantId }});
        
        if(!restaurant) {
            throw new NotFoundException('Restaurante não encontrado');
        }

        const distanceInKm = this.haversineDistance(
            userLat, userLong,
            restaurant.latitude, restaurant.longitude
        );

        const pricePerKm = 5.00;

        return distanceInKm * pricePerKm;
    }

    private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371; //Raio da terra em km

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distância em Km
    }
}