// seeder/seeder.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../resources/user/user.service';
import { RestaurantService } from '../resources/restaurant/restaurant.service';
import { AdressService } from '../resources/adress/adress.service';
import { FileService } from '@/resources/file/file.service';
import { User } from '@/resources/user/entities/user.entity';
import MulterFile from '@/common/interfaces/multer-file.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export default class Seeder {
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
    private readonly adressService: AdressService,
    private readonly fileService: FileService,

  ) { }
  async seed() {

    // Seed admin user
    let admin: User;
    if ((await this.userService.findAll()).data.length == 0) {
      await this.userService.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin123',
        prenom: 'Admin',
        nom: 'User',
        bAdmin: true,
      });
    }

    admin = (await this.userService.findAll()).data.find(user => user.bAdmin);

    const ownerId = admin.id ?? 1;


    // seed des images
    const images: MulterFile[] = [
      {
        originalname: '1.jpg',
        filename: '1.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        fieldname: 'file',
        encoding: '7bit',
        path: 'samples/1.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '1.jpg')),
      },
      {
        originalname: '2.jpg',
        filename: '2.jpg',
        mimetype: 'image/jpeg',
        size: 1024,fieldname: 'file',
        encoding: '7bit',
        path: 'samples/2.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '2.jpg')),
      },
      {
        originalname: '3.jpg',
        filename: '3.jpg',
        mimetype: 'image/jpeg',
        size: 1024,fieldname: 'file',
        encoding: '7bit',
        path: 'samples/3.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '3.jpg')),
      },
      {
        originalname: '4.jpg',
        filename: '4.jpg',
        mimetype: 'image/jpeg',
        size: 1024,fieldname: 'file',
        encoding: '7bit',
        path: 'samples/4.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '4.jpg')),
      },
      {
        originalname: '5.jpg',
        filename: '5.jpg',
        mimetype: 'image/jpeg',
        size: 1024,fieldname: 'file',
        encoding: '7bit',
        path: 'samples/5.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '5.jpg')),
      },
      {
        originalname: '6.jpg',
        filename: '6.jpg',
        mimetype: 'image/jpeg',
        size: 1024,fieldname: 'file',
        encoding: '7bit',
        path: 'samples/6.jpg', 
        destination: 'samples',
        buffer: fs.readFileSync(path.join(__dirname, '..', 'seeder', 'samples', '6.jpg')),
      },
    ]

images.forEach(async (image, index) => {
  await this.fileService.create(image);
})


    if ((await this.fileService.findAll()).length == 0) {
      for (const image of images) {
        await this.fileService.create(image);
      }
    }



    // Adresses en France
    const addresses = [
      {
        number: 5,
        street: 'Avenue Anatole France',
        city: 'Paris',
        postal_code: 75007,
        country: 'France',
      },
      {
        number: 8,
        street: 'Rue de la République',
        city: 'Lyon',
        postal_code: 69001,
        country: 'France',
      },
      {
        number: 3,
        street: 'Cours Mirabeau',
        city: 'Aix-en-Provence',
        postal_code: 13100,
        country: 'France',
      },
      {
        number: 2,
        street: 'Place Masséna',
        city: 'Nice',
        postal_code: 6000,
        country: 'France',
      },
      {
        number: 12,
        street: 'Rue Sainte-Catherine',
        city: 'Bordeaux',
        postal_code: 33000,
        country: 'France',
      },
    ];

    if ((await this.adressService.findAll()).length == 0) {

      for (const address of addresses) {
        const created = await this.adressService.create(address);
      }
    }
    const createdAddresses = await this.adressService.findAll();

    // Création de restaurants
    const restaurants = [
      {
        adress_id: createdAddresses[0].adress_id,
        owner_id: ownerId,
        name: 'La Tour Gourmande',
        type: 'Gastronomique',
        image_file_id: 1,
      },
      {
        adress_id: createdAddresses[1].adress_id,
        owner_id: ownerId,
        name: 'Bouchon Lyonnais',
        type: 'Traditionnel',
        image_file_id: 2,
      },
      {
        adress_id: createdAddresses[2].adress_id,
        owner_id: ownerId,
        name: 'Le Provençal',
        type: 'Méditerranéen',
        image_file_id: 3,
      },
      {
        adress_id: createdAddresses[3].adress_id,
        owner_id: ownerId,
        name: 'Azur Gourmet',
        type: 'Poisson & Fruits de mer',
        image_file_id: 4,
      },
      {
        adress_id: createdAddresses[4].adress_id,
        owner_id: ownerId,
        name: 'Le Bordelais',
        type: 'Cuisine du Sud-Ouest',
        image_file_id: 5,
      },
    ];

    if ((await this.restaurantService.findAll()).length == 0) {
      for (const restaurant of restaurants) {
        await this.restaurantService.create(restaurant);
      }
    }



    console.log('Seeding terminé avec succès 🇫🇷');
  }

}