import { RoomModel } from "../Schemas/room";
import { faker } from '@faker-js/faker';

const createRandomRoom = () => {

const amenitiesOptions = ["AC", "Shower", "Double Bed", "Towel", "Bathup", "Coffee Set", "LED TV", "Wifi"];
const amenities = faker.helpers.arrayElements(amenitiesOptions, faker.datatype.number({ min: 0, max: amenitiesOptions.length }));

return new RoomModel({
    fotoLink: [faker.image.imageUrl()],
    number: faker.datatype.number({ min: 1, max: 100 }).toString(),
    floor: faker.datatype.number({ min: 1, max: 10 }),
    bedType: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
    amenities: amenities,
    price: faker.datatype.number({ min: 150, max: 200 }),
    status: faker.datatype.boolean(),
    offer: faker.datatype.number({ min: 100, max: 140 })
  });
};

export const randomRooms = Array.from({ length: 10 }, createRandomRoom);