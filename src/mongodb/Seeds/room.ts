import { RoomModel } from "../Schemas/room";
import { faker } from '@faker-js/faker';

const createRandomRoom = () => {
    return new RoomModel({
      fotoLink: [faker.image.imageUrl()],
      number: faker.datatype.number({ min: 1, max: 100 }).toString(),
      floor: faker.datatype.number({ min: 1, max: 10 }),
      bedType: faker.random.string({"single", "double", "queen", "king"}),
      amenities: faker.random.arrayElement(["wifi", "tv", "air conditioning", "heating"]),
      price: faker.datatype.number({ min: 50, max: 500 }),
      status: faker.datatype.boolean(),
      offer: faker.datatype.number({ min: 0, max: 50 })
    });
  };
  


export const randomRooms = faker.helpers.multiple(createRandomRoom, {
    count: 10,
  });