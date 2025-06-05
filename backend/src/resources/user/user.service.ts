import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, offset: number = 10, search?: string) {
  // Création de la requête de base
  const query = this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.image', 'image'); // Jointure avec la table image

  // Ajout du filtre de recherche si fourni
  if (search) {
    query.where(
      'user.username ILIKE :search OR user.nom ILIKE :search OR user.prenom ILIKE :search OR user.email ILIKE :search',
      { search: `%${search}%` }
    );
  }

  // Exécution de la requête avec pagination
  const [data, totalRecords] = await query
    .skip((page - 1) * offset)
    .take(offset)
    .orderBy('user.id', 'DESC') // Utilisation de l'ID à la place de createdAt
    .getManyAndCount();

  // Retourne les données et le total
  return {
    data,
    totalRecords,
    currentPage: page,
    totalPages: Math.ceil(totalRecords / offset),
    pageSize: offset
  };
}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async selectPublicInfo(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        nom: true,
        prenom: true,
        image_file_id:true,
        bAdmin: false,
        email: false,
        password: false,
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    // Generate username if not provided
    let username = createUserDto.username;
    if (!username) {
      username = `${createUserDto.prenom}-${createUserDto.nom}-${Math.floor(Math.random() * 1000)}`;
    }

    // Ensure username is unique
    let uniqueUsername = username;
    let counter = 1;
    while (await this.usernameExists(uniqueUsername)) {
      uniqueUsername = `${username}-${counter}`;
      counter++;
    }

    // Extraire tous les champs du DTO
    const { 
      password, 
      nom, 
      prenom, 
      email, 
      bAdmin,
      image_file_id
    } = createUserDto;

    // Créer l'utilisateur avec tous les champs obligatoires
    const newUser = this.usersRepository.create({
      username: uniqueUsername, // Use the generated unique username
      password: hashedPassword,
      nom,
      prenom,
      email,
      bAdmin: bAdmin || false,
      image_file_id
    });

    // Sauvegarder l'utilisateur
    await this.usersRepository.save(newUser);

    return newUser;
  }

  // Helper method to check if username exists
  private async usernameExists(username: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({
      where: { username }
    });
    return !!existingUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.entries(updateUserDto).forEach(([key, value]) => {
      (user as any)[key] = value;
    });

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}