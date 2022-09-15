import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import {
  convertHourtStringToMinutes,
  convertMinutesToHourString,
} from './utils';

const app = express();

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.status(200).json(games);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response.status(200).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hoursStart: convertMinutesToHourString(ad.hoursStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.status(200).json(ad);
});

app.post('/games/:id/ads', async (request, response) => {
  const body = request.body;
  const gameId = request.params.id;
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHourtStringToMinutes(body.hoursStart),
      hourEnd: convertHourtStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.status(201).json(ad);
});

app.listen(3000, () => {
  console.log('Server started in PORT 3000');
});
