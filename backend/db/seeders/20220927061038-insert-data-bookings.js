'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'; 
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:2,
        startDate:"2021-11-19",
        endDate:"2021-11-20",
      },
      {
        spotId:2,
        userId:1,
        startDate:"2021-11-21",
        endDate:"2021-11-22",
      },
      {
        spotId:3,
        userId:3,
        startDate:"2021-11-23",
        endDate:"2021-11-24",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'; 
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: {[Op.in]:["2021-11-19","2021-11-21","2021-11-23"]}
    })
  }
};
