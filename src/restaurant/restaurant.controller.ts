import { Controller, Post, Get, Body, Query, ParseIntPipe, Param, ParseFloatPipe } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Controller('restaurants')
export class RestaurantController {
    constructor(
        private readonly service: RestaurantService
    ) {}

    @Post()
    create(@Body() dto: CreateRestaurantDto) {
        return this.service.create(dto)
    }

    @Get(':id/delivery-fee')
    async calculateFee(
        @Param('id', ParseIntPipe) id: number,
        @Query('lat', ParseFloatPipe) lat: number,
        @Query('long', ParseFloatPipe) long: number
    ) {
        return this.service.calculatedDeliveryFee(id, lat, long);
    }
}