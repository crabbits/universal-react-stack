const express = require('express')

const app = express()
const PORT = process.env.PORT || 8081

app.use((req, res) => {
  res.send('Hello!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})