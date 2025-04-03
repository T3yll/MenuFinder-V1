// import { Test, TestingModule } from '@nestjs/testing';
// import { TeamController } from '@/resources/team/team.controller';
// import { TeamService } from '@/resources/team/team.service';
// import { Team } from '@/resources/team/entities/team.entity';
// import { CreateTeamDto } from '@/resources/team/dto/create-team.dto';
// import { UpdateTeamDto } from '@/resources/team/dto/update-team.dto';

// describe('TeamController', () => {
//   let controller: TeamController;
//   let service: TeamService;

//   const mockTeamService = {
//     findAll: jest.fn(),
//     findOne: jest.fn(),
//     create: jest.fn(),
//     update: jest.fn(),
//     remove: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TeamController],
//       providers: [
//         {
//           provide: TeamService,
//           useValue: mockTeamService,
//         },
//       ],
//     }).compile();

//     controller = module.get<TeamController>(TeamController);
//     service = module.get<TeamService>(TeamService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of teams', async () => {
//       const result: Team[] = [
//         {
//           id: 1,
//           label: 'Team A',
//           description: 'Description A',
//           letterHead: 'A',          
//         },
//       ];
//       mockTeamService.findAll.mockResolvedValue(result);

//       expect(await controller.findAll()).toBe(result);
//       expect(mockTeamService.findAll).toHaveBeenCalled();
//     });
//   });

//   describe('findOne', () => {
//     it('should return a single team', async () => {
//       const result: Team = {
//         id: 1,
//         label: 'Team A',
//         description: 'Description A',
//         letterHead: 'A',
//       };
//       mockTeamService.findOne.mockResolvedValue(result);

//       expect(await controller.findOne('1')).toBe(result);
//       expect(mockTeamService.findOne).toHaveBeenCalledWith(1);
//     });
//   });

//   describe('create', () => {
//     it('should successfully create a new team', async () => {
//       const createTeamDto: CreateTeamDto = {
//         label: 'New Team',
//         description: undefined,
//         letterHead: 'Header',
//       };

//       const team: Team = {
//         id: 1,
//         label: 'New Team',
//         description: '',
//         letterHead: 'Header',
//       };

//       jest.spyOn(service, 'create').mockResolvedValue(team);
//       const result = await controller.create(createTeamDto);
//       expect(result).toEqual(team);
//     });
//   });

//   describe('update', () => {
//     it('should update a team', async () => {
//       const updateTeamDto: UpdateTeamDto = { label: 'Updated Team A' };
//       const result: Team = {
//         id: 1,
//         label: 'Updated Team A',
//         description: 'Description A',
//         letterHead: 'A',
//       };
//       mockTeamService.update.mockResolvedValue(result);

//       expect(await controller.update('1', updateTeamDto)).toBe(result);
//       expect(mockTeamService.update).toHaveBeenCalledWith(1, updateTeamDto);
//     });
//   });

//   describe('remove', () => {
//     it('should delete a team', async () => {
//       mockTeamService.remove.mockResolvedValue(undefined);

//       await controller.remove('1');
//       expect(mockTeamService.remove).toHaveBeenCalledWith(1);
//     });
//   });
// });
