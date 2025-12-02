import { Controller, Post, Body } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto)
    }
}