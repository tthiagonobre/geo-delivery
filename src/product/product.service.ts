import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
    ) {}

    async create(dto: CreateProductDto): Promise<Product> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id: dto.restaurantId }})

        if (!restaurant) {
            throw new BadRequestException('Restaurant não encontrado');
        }

        const newProduct = this.productRepository.create({
            ...dto,
            restaurant: restaurant,
        })

        return this.productRepository.save(newProduct);
    }
}