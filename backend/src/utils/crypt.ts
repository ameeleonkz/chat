const bcrypt = require('bcrypt')

bcrypt.hash('alice123', 10).then((hash: string) => {
  console.log('Хэш:', hash)
})

// $2b$10$yHxAC.CDvg.7Ag88YeZdQu6voQ3oeb2RfaVrSnrcGFKpwWIye1DeG
