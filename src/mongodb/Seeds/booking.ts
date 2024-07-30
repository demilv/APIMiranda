import { BookingModel } from "../Schemas/booking";
import { faker } from '@faker-js/faker';

const createRandomBooking = () => {
    const orderDate = faker.date.recent();
  
    const checkInDate = faker.date.soon(faker.number.int({ min: 1, max: 270 }), orderDate);
    const checkOutDate = faker.date.soon(faker.number.int({ min: 1, max: 30 }), checkInDate);
  
    return new BookingModel({
      fotoLink: [faker.image.url()],
      guest: `${faker.person.firstName()} ${faker.person.lastName()}`,
      orderDate: orderDate,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      specialRequest: faker.word.words({ count: { min: 5, max: 10 } }),
      status: faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
    });
  };
  
  export const randomBookings = Array.from({ length: 10 }, createRandomBooking);