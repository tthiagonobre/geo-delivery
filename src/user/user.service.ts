import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const entity = this.repository.create({
            ...dto,
            password: passwordHash,
        })

        return this.repository.save(entity);
    }

    async findByEmail(email: string): Promise<User | null> {

        return this.repository.findOne({ where: { email }});
    }
}