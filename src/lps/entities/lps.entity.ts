/* eslint-disable camelcase */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('lps')
export class LPsEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ nullable: false })
  artist!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false, type: 'date' })
  released!: string

  @Column({ nullable: false, type: 'date' })
  purchase_date!: string

  @Column({ nullable: false })
  value!: string

  @Column()
  sale_price?: string

  @Column({ nullable: false })
  cover_url!: string

  @Column()
  origin?: string

  @Column()
  gift_from?: string

  @Column({ nullable: true, default: false })
  for_sale?: boolean

  @Column({ nullable: true, default: false })
  date_is_wrong?: boolean
}
