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
      spotId:1,
      userId:1,
      review:"The house is great",
      stars:5

    },
    {
      spotId:2,
      userId:2,
      review:"I like this place",
      stars:4

    },
    {
      spotId:3,
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
