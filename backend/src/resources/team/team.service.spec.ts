// import { Test, TestingModule } from '@nestjs/testing';
// import { TeamService } from '@/resources/team/team.service';
// import { Repository } from 'typeorm';
// import { Team } from '@/resources/team/entities/team.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { NotFoundException } from '@nestjs/common';

// describe('TeamService', () => {
//   let service: TeamService;
//   let repository: Repository<Team>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         TeamService,
//         {
//           provide: getRepositoryToken(Team),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     service = module.get<TeamService>(TeamService);
//     repository = module.get<Repository<Team>>(getRepositoryToken(Team));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of teams', async () => {
//       const teams: Team[] = [
//         { id: 1, label: 'Team 1', description: 'Desc', letterHead: 'Letter' },
//       ];
//       jest.spyOn(repository, 'find').mockResolvedValue(teams);

//       expect(await service.findAll()).toBe(teams);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a single team', async () => {
//       const team: Team = {
//         id: 1,
//         label: 'Team 1',
//         description: 'Desc',
//         letterHead: 'Letter',
//       };
//       jest.spyOn(repository, 'findOneBy').mockResolvedValue(team);

//       expect(await service.findOne(1)).toBe(team);
//     });

//     it('should throw a NotFoundException', async () => {
//       jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
//       await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('create', () => {
//     it('should create a new team', async () => {
//       const teamData = {
//         label: 'Team 1',
//         description: 'Desc',
//         letterHead: 'Letter',
//       };
//       const team: Team = { id: 1, ...teamData };
//       jest.spyOn(repository, 'create').mockReturnValue(team);
//       jest.spyOn(repository, 'save').mockResolvedValue(team);

//       expect(await service.create(teamData)).toBe(team);
//     });
//   });

//   describe('update', () => {
//     it('should update a team', async () => {
//       const teamData = {
//         label: 'Updated Team',
//         description: 'Updated Desc',
//         letterHead: 'Updated Letter',
//       };
//       const existingTeam: Team = {
//         id: 1,
//         label: 'Team 1',
//         description: 'Desc',
//         letterHead: 'Letter',
//       };
//       const updatedTeam: Team = { ...existingTeam, ...teamData };

//       jest.spyOn(service, 'findOne').mockResolvedValue(existingTeam);
//       jest.spyOn(repository, 'save').mockResolvedValue(updatedTeam);

//       expect(await service.update(1, teamData)).toBe(updatedTeam);
//     });
//   });

//   describe('remove', () => {
//     it('should delete a team', async () => {
//       jest
//         .spyOn(repository, 'delete')
//         .mockResolvedValue({ affected: 1 } as any);

//       expect(await service.remove(1)).toBeUndefined();
//     });
//   });
// });
