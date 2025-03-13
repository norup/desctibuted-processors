import { LinksEntity } from 'src/entities/Links.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export async function linksGenerator(dataSource: DataSource) {
  const linksRepository = dataSource.getRepository(LinksEntity);
  const validLinks = [
    'https://www.google.com',
    'https://www.facebook.com',
    'https://www.twitter.com',
    'https://www.instagram.com',
    'https://www.linkedin.com',
    'https://www.youtube.com',
    'https://www.github.com',
    'https://www.stackoverflow.com',
    'https://www.medium.com',
    'https://www.reddit.com',
    'https://www.pinterest.com',
    'https://www.tiktok.com',
    'https://www.twitch.tv',
    'https://www.spotify.com',
    'https://www.apple.com',
    'https://www.amazon.com',
  ];

  const links = Array.from({ length: 100 }, () => ({
    url: faker.internet.url(),
  }));

  links.push(...validLinks.map((link) => ({ url: link })));

  await linksRepository.save(links);
}
