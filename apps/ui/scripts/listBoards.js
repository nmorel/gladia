const baseBoardsApiUrl = `https://api.klaxoon.com/v1/boards`
const {access_token: token} = require('../db/token.json')

async function run() {
  const boardsResponse = await fetch(baseBoardsApiUrl, {
    headers: {
      accept: `application/json`,
      authorization: `Bearer ${token}`,
      'user-agent': '',
    },
  })
  if (boardsResponse.ok) {
    const {items: boards} = await boardsResponse.json()
    console.log(
      boards
        .map((board) => `${board.title} (https://app.klaxoon.com/join/${board.accessCode.toUpperCase()})`)
        .join('\n')
    )
  } else {
    console.error('Error', boardsResponse.status)
  }
}

run()
