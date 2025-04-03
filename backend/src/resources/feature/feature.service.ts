import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '@/resources/feature/feature.entity';
import { CreateFeatureDto } from '@/resources/feature/dto/create-feature.dto';
import { UpdateFeatureDto } from '@/resources/feature/dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>
  ) {}

  async isFeatureEnabled(featureLabel: string): Promise<boolean> {
    const feature = await this.featureRepository.findOne({
      where: { label: featureLabel },
    });
    return feature ? feature.isEnabled : false;
  }

  async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    const feature = this.featureRepository.create(createFeatureDto);
    return this.featureRepository.save(feature);
  }

  async findAll(page: number = 1, offset: number = 10, search?: string) {
    const query = this.featureRepository.createQueryBuilder('feature');

    if (search) {
      query.where('feature.label ILIKE :search', { search: `%${search}%` });
    }

    const [data, totalRecords] = await query
      .skip((page - 1) * offset)
      .take(offset)
      .orderBy('feature.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      totalRecords,
    };
  }

  async findDisabledFeatures(): Promise<Feature[]> {
    return this.featureRepository.find({ where: { isEnabled: false } });
  }

  async findOne(id: number): Promise<Feature> {
    const feature = await this.featureRepository.findOne({ where: { id } });
    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }
    return feature;
  }

  async update(
    id: number,
    updateFeatureDto: UpdateFeatureDto
  ): Promise<Feature> {
    const feature = await this.findOne(id);
    const updatedFeature = Object.assign(feature, updateFeatureDto);
    return this.featureRepository.save(updatedFeature);
  }

  async remove(id: number): Promise<void> {
    const feature = await this.findOne(id);
    await this.featureRepository.remove(feature);
  }

  async setFeatureState(label: string, isEnabled: boolean): Promise<Feature> {
    let feature = await this.featureRepository.findOne({ where: { label } });
    if (!feature) {
      feature = this.featureRepository.create({ label, isEnabled });
    } else {
      feature.isEnabled = isEnabled;
    }
    return this.featureRepository.save(feature);
  }
}
