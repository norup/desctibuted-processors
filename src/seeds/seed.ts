import { AppDataSource } from '../config/data-source';
import { linksGenerator } from './linksGenerator';
import { LinksEntity } from 'src/entities/Links.entity';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('Database connected. Checking if seeding is needed...');

    const linksRepository = dataSource.getRepository(LinksEntity);
    const existingLinks = await linksRepository.count();

    if (existingLinks === 0) {
      console.log('No existing links found. Running seeds...');
      await linksGenerator(dataSource);
      console.log('Seeding complete!');
    } else {
      console.log('Database already contains data. Skipping seeds.');
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
  });
