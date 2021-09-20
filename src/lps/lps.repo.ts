import { getRepository } from 'typeorm'
import { LPsEntity } from './entities/lps.entity'
import { PreSaveLpsEntity } from './lps.decoders'

const getAllLPs = (): Promise<LPsEntity[]> =>
  getRepository(LPsEntity)
    .createQueryBuilder()
    .orderBy('artist', 'ASC')
    .addOrderBy('released', 'ASC')
    .getMany()

const saveLP = (lp: PreSaveLpsEntity): Promise<LPsEntity> =>
  getRepository(LPsEntity).save(lp)

export default {
  getAllLPs,
  saveLP,
}
