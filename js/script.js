const table = document.querySelector('table > tbody')
//   FETCH  NOTICES
fetch('https://gravel-few-bowler.glitch.me/notices')
  .then(respone => respone.json())
  .then(data => {
    // console.log(data.length)
    printNotices(data)
    howManyNotices(data)
  })

//    FETCH  EXPENSES
fetch('https://gravel-few-bowler.glitch.me/expenses')
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    printExpenses(data)
    amountSpentInTotal(data)
    howMuchMissing(data)
    sortByType(data)
    sortByAmount(data)
    sortByStatus(data)
    searchByID(data)
    // whichSpendTheMost(data)
  })

//   PRINT NOTICES

function printNotices (data) {
  const noticeBoard = document.querySelector('.noticeBoard')
  data.forEach(data => {
    const tweet = document.createElement('div')
    tweet.className = 'tweet'

    const tweetDate = document.createElement('div')
    tweetDate.className = 'tweetdate'
    tweetDate.textContent = new Date(Number(data.timestamp)).toLocaleDateString(
      'en'
    )

    const tweetUsername = document.createElement('div')
    tweetUsername.className = 'tweetusername'
    tweetUsername.textContent = `${data.first_name} ${data.last_name}`

    const tweetContent = document.createElement('div')
    tweetContent.className = 'tweetcontent'
    tweetContent.textContent = data.content

    noticeBoard.append(tweet)
    tweet.append(tweetDate, tweetUsername, tweetContent)
  })

  // GET RANDOM COLOR
  const allUserNames = document.querySelectorAll('.tweetusername')
  allUserNames.forEach(userName => {
    let colors = [
      'red',
      'blue',
      'teal',
      'cyan',
      'green',
      'grey',
      'purple',
      'pink',
      'tan',
      'thistle',
      'tomato',
      'turquoise',
      'brown',
      'cornflowerblue',
      'goldenrod',
      'hotpink',
      'firebrick'
    ]

    let getRandomColor = Math.floor(Math.random() * colors.length)
    userName.style.color = colors[getRandomColor]
  })
}

// PRINT EXPENSES

function printExpenses (data) {
  table.innerHTML = ''
  data.forEach(data => {
    const tr = table.insertRow()

    const td1 = tr.insertCell()
    td1.textContent = data.id

    const td2 = tr.insertCell()
    td2.textContent = data.type

    const td3 = tr.insertCell()
    td3.textContent = data.amount

    const td4 = tr.insertCell()
    td4.textContent = data.isPaidStatus

    if (data.isPaidStatus == true) {
      td4.style.background = 'linear-gradient(90deg, #088f03 0%, #39ec33 100%)'
    } else {
      td4.style.background = 'linear-gradient(90deg, #8f0303 0%, #ec3333 100%)'
    }

    const td5 = tr.insertCell()
    td5.textContent = data.email

    const td6 = tr.insertCell()
    td6.textContent = data.date
  })
}

// CALCULATE HOW MUCH SPENT IN TOTAL

function amountSpentInTotal (data) {
  const totalSpentDiv = document.getElementById('totalSpentDiv')
  let sum = []

  data.forEach(data => {
    return sum.push(Number(data.amount.slice(1)))
  })

  totalSpentDiv.textContent =
    sum.reduce((acc, cur) => acc + cur).toFixed(2) + '$'
}

// HOW MANY NOTICES

function howManyNotices (data) {
  notices = document.getElementById('howManyNotices')
  return (notices.textContent = data.length)
}

// HOW MUCH STILL MISSING

function howMuchMissing (data) {
  const howMuchMissing = document.getElementById('howMuchMissing')
  let status = false
  let sum = []
  data.forEach(data => {
    if (data.isPaidStatus === status) {
      return sum.push(Number(data.amount.slice(1)))
    }
  })
  return (howMuchMissing.textContent =
    sum.reduce((acc, curr) => acc + curr) + '$')
}

// SORT BY TYPE

function sortByType (data) {
  const sort = document.getElementById('sortByType')
  sort.addEventListener('click', e => {
    printExpenses(data.sort((a, b) => (a.type > b.type ? 1 : -1)))
  })
}

// SORT BY AMOUNT

function sortByAmount (data) {
  const sort = document.getElementById('sortByAmount')
  sort.addEventListener('click', e => {
    printExpenses(data.sort((a, b) => (a.amount > b.amount ? 1 : -1)))
  })
}

// SORT BY STATUS

function sortByStatus (data) {
  const sort = document.getElementById('sortByStatus')
  sort.addEventListener('click', e => {
    printExpenses(
      data.sort((a, b) => (a.isPaidStatus < b.isPaidStatus ? 1 : -1))
    )
  })
}

// WHICH TYPE SPEND THE MOST
//????????
