

const UserModel = require('../models/signUpModel')
const BookModel = require('../models/bookScheme')
const BookTransaction = require('../models/bookTransaction')

const adminHomePageInfo = async (req, res) => {

  const getBookDetails = await BookModel.find({})
  const totalBooks = getBookDetails.length


  const uniqueCategories = {}
  const uniqueAuthors = {}
 
  getBookDetails.forEach((item) => {
    const category = item.category
    uniqueCategories[category] = true 
    const author = item.author
    uniqueAuthors[author] = true
  })

  const totalCategories = Object.keys(uniqueCategories).length
  const totalAuthors = Object.keys(uniqueAuthors).length

 
  const getBookTransactionDetails = await BookTransaction.find({})

  let totalBookRequests = 0
  getBookTransactionDetails.forEach((item) => {
    if (item.issueStatus === 'PENDING') {
      totalBookRequests++
    }
  })

  let totalIssuedBooks = 0
  getBookTransactionDetails.forEach((item) => {
    if (item.isReturned == false && item.issueStatus == 'ACCEPTED') {
      totalIssuedBooks++
    }
  })

  
  const getUserDetails = await UserModel.find({
    userType: 'normal_user',
  })
  const totalRegisteredUsers = getUserDetails.length

  res.status(200).json({
    success: true,
    data: {
      totalBooks,
      totalCategories,
      totalAuthors,
      totalBookRequests,
      totalIssuedBooks,
      totalRegisteredUsers,
    },
  })
}

module.exports = adminHomePageInfo
