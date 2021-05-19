import {getRepository, Repository} from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import {User} from "../entities";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({name, email, driver_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, 
            email, 
            driver_license, 
            password,
            avatar,
            id
        });

        await this.repository.save(user);
    }

    async listAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({id})

        return user;
    }
}

export {UsersRepository};
