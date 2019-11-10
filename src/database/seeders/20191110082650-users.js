module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        id: 1,
        name: 'Matheus Paice',
        email: 'matheus@gmail.com',
        password: '12345678',
        phone: '14 998891198',
        birth_date: new Date('1998/11/04'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Leonardo Silva',
        email: 'leonardo@gmail.com',
        password: '12345678',
        phone: '14 997272234',
        birth_date: new Date('1998/02/27'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Roger Machado',
        email: 'roger@gmail.com',
        password: '12345678',
        phone: '14 9887255241',
        birth_date: new Date('1998/08/11'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
