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
  return queryInterface.bulkInsert("SpotImages", [
    {
      spotId:1,
      url:'https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg?im_w=1200',
      preview:true
    },
    {
      spotId:2,
      url:'https://a0.muscache.com/im/pictures/974d5d84-b58e-4ca4-aa77-4159b2bb7beb.jpg?im_w=960',
      preview:true
    },
    {
      spotId:3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-51826867/original/f9450a8a-f77d-4f00-8154-d9553bc73394.jpeg?im_w=960',
      preview:true
    },
    {
      spotId:4,
      url:'https://a0.muscache.com/im/pictures/c29b646e-ddec-4b8e-9034-9786f733dd4c.jpg?im_w=960',
      preview:true
    },
    {
      spotId:5,
      url:'https://a0.muscache.com/im/pictures/c36247ce-c96b-42b6-a2c6-c8cc2a5654eb.jpg?im_w=960',
      preview:true
    },
    {
      spotId:6,
      url:'https://a0.muscache.com/im/pictures/c429a5f1-0ad0-45d9-8ee9-65e825865710.jpg?im_w=960',
      preview:true
    },
    {
      spotId:7,
      url:'https://a0.muscache.com/im/pictures/764b3545-3d53-4d23-9b4a-03d0122880ac.jpg?im_w=960',
      preview:true
    },
    {
      spotId:8,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54016193/original/54b04728-698b-4193-8943-a5a2d61e8096.jpeg?im_w=960',
      preview:true
    },
    {
      spotId:9,
      url:'https://a0.muscache.com/im/pictures/9e9d1e97-ae4f-4683-a050-df2556375d04.jpg?im_w=960',
      preview:true
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
    return queryInterface.bulkDelete('SpotImages', {
      url: {[Op.in]:['dsda.png','dsdaasd.jpag','asdd.png']}
    })
  }
};
