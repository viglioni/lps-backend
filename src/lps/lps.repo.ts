import * as O from 'fp-ts/Option'
import { getRepository } from 'typeorm'
import { LPsEntity } from './entities/lps.entity'
import { PreSaveLpsEntity } from './lps.decoders'

const getAllForSale = (): Promise<LPsEntity[]> =>
  getRepository(LPsEntity)
    .createQueryBuilder()
    .where('for_sale = true')
    .orderBy('artist', 'ASC')
    .addOrderBy('released', 'ASC')
    .getMany()

const getAllLPs = (): Promise<LPsEntity[]> =>
  getRepository(LPsEntity)
    .createQueryBuilder()
    .orderBy('artist', 'ASC')
    .addOrderBy('released', 'ASC')
    .getMany()

const saveLP = (lp: PreSaveLpsEntity): Promise<LPsEntity> =>
  getRepository(LPsEntity).save(lp)

const getRandomLP = (): Promise<LPsEntity> =>
  getRepository(LPsEntity)
    .createQueryBuilder()
    .orderBy('RAND()')
    .getOneOrFail()

type GetLP = (p: {
  name: string
  artist: string
}) => Promise<O.Option<LPsEntity>>
const getLP: GetLP = ({ name, artist }) =>
  getRepository(LPsEntity)
    .findOneOrFail({ where: { name, artist } })
    .then(O.some)
    .catch(_e => O.none)

export default {
  getAllForSale,
  getAllLPs,
  saveLP,
  getRandomLP,
  getLP,
}
