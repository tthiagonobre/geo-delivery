import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    name: string;

    @Column({ length: 150})
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    latitude: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 6 })
    longitude: number;
}