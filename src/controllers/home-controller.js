exports.homePage = (req, res) => {
  const contacts = [
    {
      name: 'Davi',
      surname: 'Alves',
      phone: '(99) 9999-9999',
      email: 'fulano@gmail.com',
    },
    {
      name: 'Maria',
      surname: 'Silva',
      phone: '(99) 9999-9999',
      email: 'fulano@gmail.com',
    },
    {
      name: 'Paulo',
      surname: 'Mariano',
      phone: '(99) 9999-9999',
      email: 'fulano@gmail.com',
    },
  ]

  res.render('index', { contacts })
  return
}
