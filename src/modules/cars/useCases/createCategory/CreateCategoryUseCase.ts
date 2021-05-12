
import {ICategoriesRepository} from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository
    ) {};

    async execute({name, description}: IRequest) : Promise<void> {
        
        if (await this.categoryRepository.findByName(name)) {
            throw new Error('Já existe categoria com esse nome');
        }   

        await this.categoryRepository.create({
            name, 
            description
        });
    }
}

export { CreateCategoryUseCase };

