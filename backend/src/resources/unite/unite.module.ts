import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unite } from './entities/unite.entity';
import { UniteDepartement } from './entities/unite-departement.entity';
import { UniteInstitution } from './entities/unite-institution.entity';
import { UniteRegion } from './entities/unite-region.entity';
import { UniteSubdivision } from './entities/unite-subdivision.entity';
import { UniteType } from './entities/unite-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unite, UniteDepartement, UniteInstitution, UniteRegion, UniteSubdivision, UniteType])],
  providers: [],
  exports: [],
  controllers: [],
})
export class UniteModule {}