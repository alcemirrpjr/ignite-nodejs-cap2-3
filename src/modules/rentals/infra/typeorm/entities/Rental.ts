import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { v4 as uuidv4} from "uuid";
import { User } from "@modules/accounts/infra/typeorm/entities";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";


@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Car)
    @JoinColumn({ name: "car_id"})
    car: Car;

    @Column()
    car_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;
    
    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date?: Date;

    @Column()
    expected_return_date?: Date;

    @Column()
    total?: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

}

export {Rental}