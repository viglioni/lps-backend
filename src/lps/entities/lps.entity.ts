import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('lps')
export class LPsEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ nullable: false })
  artist!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  year!: number

  @Column({ nullable: false })
  boughtat!: Date

  @Column({ nullable: false })
  value!: string
}
