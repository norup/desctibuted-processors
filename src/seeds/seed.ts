import { AppDataSource } from '../config/data-source';
import { linksGenerator } from './linksGenerator';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('Database connected. Running seeds...');
    await linksGenerator(dataSource);
    console.log('Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
