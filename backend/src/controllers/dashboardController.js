const QuoteRequest = require('../models/QuoteRequest')
const ContactInquiry = require('../models/ContactInquiry')

// GET /api/dashboard  (admin)
const getDashboard = async (req, res, next) => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    try {
      const [
        totalQuotes,
        newQuotes,
        quotesThisMonth,
        quotesLastMonth,
        totalContacts,
        unreadContacts,
        quotesByStatus,
        quotesByService,
        recentQuotes,
        recentContacts,
      ] = await Promise.all([
        QuoteRequest.countDocuments(),
        QuoteRequest.countDocuments({ status: 'new' }),
        QuoteRequest.countDocuments({ createdAt: { $gte: startOfMonth } }),
        QuoteRequest.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfMonth } }),
        ContactInquiry.countDocuments(),
        ContactInquiry.countDocuments({ read: false }),
        QuoteRequest.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
        QuoteRequest.aggregate([
          { $group: { _id: '$serviceType', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 6 },
        ]),
        QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
        ContactInquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      ])

      res.json({
        success: true,
        stats: {
          totalQuotes,
          newQuotes,
          quotesThisMonth,
          quotesLastMonth,
          quoteGrowth: quotesLastMonth > 0
            ? Math.round(((quotesThisMonth - quotesLastMonth) / quotesLastMonth) * 100)
            : null,
          totalContacts,
          unreadContacts,
        },
        charts: { quotesByStatus, quotesByService },
        recent: { quotes: recentQuotes, contacts: recentContacts },
      })
    } catch (dbErr) {
      // Return empty data if database is not available
      res.json({
        success: true,
        stats: {
          totalQuotes: 0,
          newQuotes: 0,
          quotesThisMonth: 0,
          quotesLastMonth: 0,
          quoteGrowth: null,
          totalContacts: 0,
          unreadContacts: 0,
        },
        charts: { quotesByStatus: [], quotesByService: [] },
        recent: { quotes: [], contacts: [] },
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { getDashboard }
