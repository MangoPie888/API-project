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
        startDate:"2023-02-09 05:33:50",
        endDate:"2023-02-10 05:33:50",
      },
      {
        spotId:2,
        userId:1,
        startDate:"2023-02-11 05:33:50",
        endDate:"2023-02-12 05:33:50",
      },
      {
        spotId:3,
        userId:3,
        startDate:"2023-02-13 05:33:50",
        endDate:"2023-02-14 05:33:50",
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
      startDate: {[Op.in]:["2023-02-09 05:33:50","2023-02-11 05:33:50","2023-02-13 05:33:50"]}
    })
  }
};
