import { getRepository } from 'typeorm'
import { LPsEntity } from './entities/lps.entity'

const getAllLPs = (): Promise<LPsEntity[]> =>
  getRepository(LPsEntity).createQueryBuilder().getMany()

export default {
  getAllLPs,
}
