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
  return queryInterface.bulkInsert('Reviews',[
    {
      spotId:5,
      userId:1,
      review:"The house is great",
      stars:5

    },
    {
      spotId:4,
      userId:2,
      review:"I like this place",
      stars:4

    },
    {
      spotId:6,
      userId:3,
      review:"This place is dirty",
      stars:2

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
    return queryInterface.bulkDelete('Reviews', {
      spotId: {[Op.in]:[5,4,6]}
    })
  }
};
