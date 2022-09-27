'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId:5,
        userId:1,
        startDate:"2021-11-19",
        endDate:"2021-11-20",
      },
      {
        spotId:4,
        userId:3,
        startDate:"2021-11-21",
        endDate:"2021-11-22",
      },
      {
        spotId:6,
        userId:2,
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      startDate: {[Op.in]:["2021-11-19","2021-11-21","2021-11-23"]}
    })
  }
};
