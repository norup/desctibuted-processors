import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum LinkStatus {
  DONE = 'DONE',
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
}

@Entity('links')
export class LinksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'url', unique: true, nullable: false })
  url: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: LinkStatus,
    nullable: false,
    default: LinkStatus.NEW,
  })
  status: LinkStatus;

  @Column({ name: 'http_code', nullable: true })
  httpCode: string;
}
